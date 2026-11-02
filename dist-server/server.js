// server.ts
import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// src/types/dialogue.ts
var defaultSessions = [
  {
    id: "session-1",
    title: "\uACBD\uC0AC\uC9C0 \uC9C0\uD615\uC744 \uBCF4\uC874\uD558\uBA70 \uC790\uC5F0 \uCC44\uAD11\uC744 \uD655\uBCF4\uD558\uB294 \uC2A4\uD14C\uC774 \uAE30\uD68D",
    stage: "01. \uC544\uC774\uB514\uC5B4 \uCC29\uC0C1 \uB2E8\uACC4 (\uB9C9\uC5F0\uD55C \uCD08\uAE30 \uC0C1\uD0DC)",
    visitorName: "\uAC74\uCD95\uC8FC / \uD504\uB85C\uC81D\uD2B8 \uAE30\uD68D\uC790",
    createdAt: "2026. 10. 27",
    status: "\uB2F5\uBCC0 \uC644\uB8CC",
    messages: [
      {
        id: "m1",
        sender: "visitor",
        senderName: "\uAC74\uCD95\uC8FC / \uD504\uB85C\uC81D\uD2B8 \uAE30\uD68D\uC790",
        timestamp: "14:20",
        content: "\uC0B0 \uC911\uD131\uC758 30\uB3C4 \uAE09\uACBD\uC0AC\uC9C0\uC5D0 \uC791\uC740 \uC2A4\uD14C\uC774 \uACF5\uAC04\uC744 \uAE30\uD68D\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4. \uB300\uC9C0\uB97C \uD3C9\uD0C4\uD654\uD558\uC9C0 \uC54A\uACE0 \uC790\uC5F0\uC744 \uCD5C\uB300\uD55C \uBCF4\uC874\uD558\uACE0 \uC2F6\uC740\uB370, \uACBD\uC0AC\uC9C0 \uB54C\uBB38\uC5D0 \uCC44\uAD11\uACFC \uC9C4\uC785 \uB3D9\uC120\uC744 \uC5B4\uB5BB\uAC8C \uD480\uC5B4\uC57C \uD560\uC9C0 \uB9C9\uB9C9\uD569\uB2C8\uB2E4. \uC5B4\uB5A4 \uC2DC\uC791\uC810\uC744 \uC7A1\uC544\uC57C \uD560\uAE4C\uC694?"
      },
      {
        id: "m2",
        sender: "planner",
        senderName: "\uAE30\uD68D\uC790 (\uBCF8\uC778)",
        timestamp: "16:05",
        content: "\uACBD\uC0AC\uC9C0\uB294 \uC7A5\uC560\uBB3C\uC774 \uC544\uB2C8\uB77C \uAC00\uC7A5 \uB3C5\uCC3D\uC801\uC778 \uACF5\uAC04 \uACBD\uD5D8\uC744 \uB9CC\uB4E4\uC5B4\uC8FC\uB294 \uC785\uCCB4\uC801 \uC790\uC0B0\uC785\uB2C8\uB2E4. \uC81C\uAC00 \uC81C\uC548\uB4DC\uB9AC\uB294 \uAD6C\uCCB4\uC801\uC778 \uC2DC\uC791\uC810\uC740 \uB2E4\uC74C\uACFC \uAC19\uC2B5\uB2C8\uB2E4:\n\n1. \uB300\uC9C0 \uC808\uD1A0(Cut-and-Fill)\uB97C \uCD5C\uC18C\uD654\uD558\uB294 \uACC4\uB2E8\uC2DD \uC2A4\uD0B5\uD50C\uB85C\uC5B4(Skip-floor) \uB2E8\uBA74 \uACC4\uD68D\n2. \uC0C1\uBD80 \uCE35\uC758 \uC9C0\uBD95\uC744 \uD558\uBD80 \uCE35\uC758 \uC57C\uC678 \uD14C\uB77C\uC2A4\uB85C \uC77C\uCCB4\uD654\uD558\uC5EC \uC9C0\uD615 \uACBD\uC0AC\uAC01\uC5D0 \uC21C\uC751\uD558\uB294 \uCC44\uAD11 \uB370\uD06C \uC870\uC131\n3. \uD558\uBD80\uC5D0\uB294 \uC790\uC0DD \uC218\uBAA9\uC758 \uC218\uD3C9 \uC131\uC7A5\uC744 \uBC29\uD574\uD558\uC9C0 \uC54A\uB294 \uB3C5\uB9BD \uAE30\uB465(Pilotis) \uAE30\uCD08\uB97C \uC801\uC6A9\uD574 \uC232\uC18D\uC5D0 \uB5A0 \uC788\uB294 \uB4EF\uD55C \uC2DC\uC57C \uD655\uBCF4\n\n\uC774\uB7EC\uD55C \uB2E8\uBA74 \uC2A4\uCF00\uCE58\uBD80\uD130 \uC2DC\uC791\uD558\uC2DC\uBA74 \uB9C9\uC5F0\uD588\uB358 \uBC30\uCE58\uAC00 \uBA85\uD655\uD55C \uCD95\uC744 \uAC16\uAC8C \uB429\uB2C8\uB2E4.",
        keyInsights: [
          "\uB300\uC9C0 \uC808\uD1A0 \uCD5C\uC18C\uD654 \uBC0F \uACC4\uB2E8\uC2DD \uB2E8\uBA74 \uACC4\uD68D",
          "\uC0C1\uBD80 \uC9C0\uBD95 = \uD558\uBD80 \uD14C\uB77C\uC2A4 \uC77C\uCCB4\uD654",
          "\uC218\uBAA9 \uBCF4\uC874\uC744 \uC704\uD55C \uB3C5\uB9BD \uD544\uB85C\uD2F0 \uAE30\uCD08"
        ]
      }
    ]
  },
  {
    id: "session-2",
    title: "\u2018\uC27C\u2019\uC774\uB77C\uB294 \uCCA0\uD559\uC801 \uAC1C\uB150\uC744 \uACF5\uAC04\uC801 \uC5B8\uC5B4\uB85C \uBC88\uC5ED\uD558\uAE30",
    stage: "02. \uB9AC\uC11C\uCE58 & \uAC1C\uB150\uD654 \uB2E8\uACC4",
    visitorName: "\uBE0C\uB79C\uB4DC \uB514\uB809\uD130",
    createdAt: "2026. 10. 28",
    status: "\uB2F5\uBCC0 \uC644\uB8CC",
    messages: [
      {
        id: "m1",
        sender: "visitor",
        senderName: "\uBE0C\uB79C\uB4DC \uB514\uB809\uD130",
        timestamp: "11:15",
        content: "\uBE0C\uB79C\uB4DC \uC1FC\uB8F8\uC744 \uC900\uBE44 \uC911\uC778\uB370 \u2018\uBE44\uC6C0\uACFC \uC27C\u2019\uC774\uB77C\uB294 \uCD94\uC0C1\uC801\uC778 \uD0A4\uC6CC\uB4DC\uB9CC \uC788\uACE0, \uC2E4\uC81C \uACF5\uAC04 \uBC29\uBB38\uAC1D\uC5D0\uAC8C \uC774\uB97C \uC5B4\uB5A4 \uBB3C\uB9AC\uC801 \uC5B8\uC5B4(\uB3D9\uC120, \uBE5B, \uC9C8\uAC10)\uB85C \uCCB4\uAC10\uC2DC\uCF1C\uC57C \uD560\uC9C0 \uBC29\uD5A5\uC744 \uBABB \uC7A1\uACE0 \uC788\uC2B5\uB2C8\uB2E4."
      },
      {
        id: "m2",
        sender: "planner",
        senderName: "\uAE30\uD68D\uC790 (\uBCF8\uC778)",
        timestamp: "13:40",
        content: "\u2018\uBE44\uC6C0\u2019\uC744 \uC2DC\uAC01\uD654\uD560 \uB54C \uAC00\uC7A5 \uD754\uD55C \uC2E4\uC218\uB294 \uADF8\uB0E5 \uBE48 \uACF5\uAC04\uC744 \uB113\uAC8C \uB450\uB294 \uAC83\uC785\uB2C8\uB2E4. \uACF5\uAC04\uC5D0\uC11C \uC27C\uC774 \uB290\uAEF4\uC9C0\uB824\uBA74 \u2018\uC2DC\uC120\uC758 \uC18D\uB3C4\u2019\uB97C \uB2A6\uCD94\uB294 \uBB3C\uB9AC\uC801 \uC7A5\uCE58\uAC00 \uC120\uD589\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4.\n\n\uCD94\uCC9C\uD558\uB294 \uC2DC\uC791\uC810:\n1. \uC785\uAD6C\uC5D0\uC11C \uBA54\uC778 \uD640\uAE4C\uC9C0 \uC989\uC2DC \uC2DC\uC57C\uAC00 \uD2B8\uC774\uC9C0 \uC54A\uB3C4\uB85D \uC6B0\uD68C\uD558\uB294 \uD68C\uB791(Cloister) \uB3D9\uC120 \uC124\uACC4\n2. \uC9C1\uC0AC\uAD11\uC120 \uB300\uC2E0 \uBCBD\uBA74\uC744 \uD0C0\uACE0 \uC644\uB9CC\uD558\uAC8C \uB5A8\uC5B4\uC9C0\uB294 \uC740\uC740\uD55C \uCC9C\uCC3D(Skylight) \uBC18\uC0AC\uAD11 \uBC30\uCE58\n3. \uB2E8\uCC28\uB97C \uB454 \uC88C\uC2DD \uB610\uB294 \uBCA4\uCE58 \uB808\uBCA8\uC744 \uB3C4\uBA74\uC0C1\uC5D0 \uC2DC\uAC01\uD654\uD558\uC5EC \uBC29\uBB38\uC790\uAC00 \uC790\uC5F0\uC2A4\uB7FD\uAC8C \uBA38\uBB34\uB974\uAC8C \uC720\uB3C4",
        keyInsights: [
          "\uC2DC\uC120\uC758 \uC18D\uB3C4\uB97C \uB2A6\uCD94\uB294 \uC6B0\uD68C \uD68C\uB791 \uB3D9\uC120",
          "\uCC9C\uCC3D \uBC18\uC0AC\uAD11\uC744 \uD65C\uC6A9\uD55C \uAC04\uC811 \uC870\uB3C4 \uACC4\uD68D",
          "\uBA38\uBB34\uB984\uC744 \uC720\uB3C4\uD558\uB294 \uB2E8\uCC28 \uB808\uBCA8 \uB2E4\uC774\uC5B4\uADF8\uB7A8"
        ]
      }
    ]
  }
];

// server.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var server = createServer(app);
var wss = new WebSocketServer({ server, path: "/ws" });
app.use(express.json());
var DATA_DIR = path.join(__dirname, "data");
var DATA_FILE = path.join(DATA_DIR, "sessions.json");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
var sessions = [];
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    sessions = JSON.parse(raw);
  } else {
    sessions = [...defaultSessions];
    fs.writeFileSync(DATA_FILE, JSON.stringify(sessions, null, 2), "utf-8");
  }
} catch (err) {
  console.error("Failed to read sessions data file, using defaultSessions:", err);
  sessions = [...defaultSessions];
}
function saveSessions() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(sessions, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving sessions to disk:", err);
  }
}
function broadcastSessions() {
  const payload = JSON.stringify({
    type: "sync:sessions",
    payload: sessions,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}
wss.on("connection", (ws) => {
  ws.send(JSON.stringify({
    type: "sync:sessions",
    payload: sessions,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  }));
  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === "create:session") {
        const newSession = msg.payload;
        if (!sessions.some((s) => s.id === newSession.id)) {
          sessions = [newSession, ...sessions];
          saveSessions();
          broadcastSessions();
        }
      } else if (msg.type === "update:session") {
        const updated = msg.payload;
        sessions = sessions.map((s) => s.id === updated.id ? updated : s);
        saveSessions();
        broadcastSessions();
      } else if (msg.type === "delete:session") {
        const idToDelete = msg.payload;
        sessions = sessions.filter((s) => s.id !== idToDelete);
        saveSessions();
        broadcastSessions();
      }
    } catch (e) {
      console.error("Error processing websocket message:", e);
    }
  });
});
app.get("/api/sessions", (_req, res) => {
  res.json({ success: true, sessions });
});
app.post("/api/sessions/bulk-sync", (req, res) => {
  if (Array.isArray(req.body.sessions)) {
    sessions = req.body.sessions;
    saveSessions();
    broadcastSessions();
    res.json({ success: true, count: sessions.length });
  } else {
    res.status(400).json({ error: "Expected sessions array" });
  }
});
app.post("/api/sessions", (req, res) => {
  const newSession = req.body;
  if (!newSession || !newSession.id || !newSession.title) {
    res.status(400).json({ error: "Invalid session data" });
    return;
  }
  const exists = sessions.some((s) => s.id === newSession.id);
  if (!exists) {
    sessions = [newSession, ...sessions];
    saveSessions();
    broadcastSessions();
  }
  res.status(201).json({ success: true, session: newSession });
});
app.post("/api/sessions/:id/messages", (req, res) => {
  const { id } = req.params;
  const message = req.body;
  let found = false;
  sessions = sessions.map((s) => {
    if (s.id === id) {
      found = true;
      const isAlreadyIncluded = s.messages.some((m) => m.id === message.id);
      if (isAlreadyIncluded) return s;
      return {
        ...s,
        messages: [...s.messages, message]
      };
    }
    return s;
  });
  if (!found) {
    res.status(404).json({ error: "Session not found" });
    return;
  }
  saveSessions();
  broadcastSessions();
  res.json({ success: true });
});
app.put("/api/sessions/:id", (req, res) => {
  const { id } = req.params;
  const updatedSession = req.body;
  let found = false;
  sessions = sessions.map((s) => {
    if (s.id === id) {
      found = true;
      return updatedSession;
    }
    return s;
  });
  if (!found) {
    res.status(404).json({ error: "Session not found" });
    return;
  }
  saveSessions();
  broadcastSessions();
  res.json({ success: true, session: updatedSession });
});
app.delete("/api/sessions/:id", (req, res) => {
  const { id } = req.params;
  sessions = sessions.filter((s) => s.id !== id);
  saveSessions();
  broadcastSessions();
  res.json({ success: true });
});
var isProd = process.env.NODE_ENV === "production";
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false
      },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }
  const PORT = 3e3;
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`[IDEARIC] Real-time full-stack server running at http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
