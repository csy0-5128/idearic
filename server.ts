import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { defaultSessions, IdeaSession, Message } from './src/types/dialogue.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

app.use(express.json());

// Persistent storage setup
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'sessions.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let sessions: IdeaSession[] = [];

try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    sessions = JSON.parse(raw);
  } else {
    sessions = [...defaultSessions];
    fs.writeFileSync(DATA_FILE, JSON.stringify(sessions, null, 2), 'utf-8');
  }
} catch (err) {
  console.error('Failed to read sessions data file, using defaultSessions:', err);
  sessions = [...defaultSessions];
}

function saveSessions() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(sessions, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving sessions to disk:', err);
  }
}

// Broadcast updated sessions to all connected clients
function broadcastSessions() {
  const payload = JSON.stringify({
    type: 'sync:sessions',
    payload: sessions,
    timestamp: new Date().toISOString(),
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

// WebSocket connection lifecycle
wss.on('connection', (ws: WebSocket) => {
  // Send full initial state immediately upon connection
  ws.send(JSON.stringify({
    type: 'sync:sessions',
    payload: sessions,
    timestamp: new Date().toISOString(),
  }));

  ws.on('message', (data: string) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === 'create:session') {
        const newSession: IdeaSession = msg.payload;
        // Guard against duplicate id
        if (!sessions.some(s => s.id === newSession.id)) {
          sessions = [newSession, ...sessions];
          saveSessions();
          broadcastSessions();
        }
      } else if (msg.type === 'update:session') {
        const updated: IdeaSession = msg.payload;
        sessions = sessions.map(s => s.id === updated.id ? updated : s);
        saveSessions();
        broadcastSessions();
      } else if (msg.type === 'delete:session') {
        const idToDelete = msg.payload;
        sessions = sessions.filter(s => s.id !== idToDelete);
        saveSessions();
        broadcastSessions();
      }
    } catch (e) {
      console.error('Error processing websocket message:', e);
    }
  });
});

// 1. Get all sessions
app.get('/api/sessions', (_req, res) => {
  res.json({ success: true, sessions });
});

// 1-b. Bulk synchronize sessions
app.post('/api/sessions/bulk-sync', (req, res) => {
  if (Array.isArray(req.body.sessions)) {
    sessions = req.body.sessions;
    saveSessions();
    broadcastSessions();
    res.json({ success: true, count: sessions.length });
  } else {
    res.status(400).json({ error: 'Expected sessions array' });
  }
});

// 2. Create a new session (from visitor or admin)
app.post('/api/sessions', (req, res) => {
  const newSession: IdeaSession = req.body;
  if (!newSession || !newSession.id || !newSession.title) {
    res.status(400).json({ error: 'Invalid session data' });
    return;
  }

  // Prevent duplicate additions
  const exists = sessions.some(s => s.id === newSession.id);
  if (!exists) {
    sessions = [newSession, ...sessions];
    saveSessions();
    broadcastSessions();
  }

  res.status(201).json({ success: true, session: newSession });
});

// 3. Add message to an existing session
app.post('/api/sessions/:id/messages', (req, res) => {
  const { id } = req.params;
  const message: Message = req.body;

  let found = false;
  sessions = sessions.map(s => {
    if (s.id === id) {
      found = true;
      const isAlreadyIncluded = s.messages.some(m => m.id === message.id);
      if (isAlreadyIncluded) return s;
      return {
        ...s,
        messages: [...s.messages, message],
      };
    }
    return s;
  });

  if (!found) {
    res.status(404).json({ error: 'Session not found' });
    return;
  }

  saveSessions();
  broadcastSessions();
  res.json({ success: true });
});

// 4. Update session (status, answers, tags)
app.put('/api/sessions/:id', (req, res) => {
  const { id } = req.params;
  const updatedSession: IdeaSession = req.body;

  let found = false;
  sessions = sessions.map(s => {
    if (s.id === id) {
      found = true;
      return updatedSession;
    }
    return s;
  });

  if (!found) {
    res.status(404).json({ error: 'Session not found' });
    return;
  }

  saveSessions();
  broadcastSessions();
  res.json({ success: true, session: updatedSession });
});

// 5. Delete session
app.delete('/api/sessions/:id', (req, res) => {
  const { id } = req.params;
  sessions = sessions.filter(s => s.id !== id);
  saveSessions();
  broadcastSessions();
  res.json({ success: true });
});

// Development mode with Vite middleware vs Production static serving
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[IDEARIC] Real-time full-stack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
