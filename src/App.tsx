/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { IdeaDialogueSpace } from './components/IdeaDialogueSpace';
import { ProjectSection } from './components/ProjectSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDesk } from './components/AdminDesk';
import { 
  IdeaSession, 
  STORAGE_KEY, 
  ADMIN_AUTH_KEY, 
  defaultSessions 
} from './types/dialogue';

export default function App() {
  // Shared idea dialogue sessions
  const [sessions, setSessions] = useState<IdeaSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return defaultSessions;
  });

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  // Real-time synchronization state
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  // View mode: 'visitor' (regular public website) vs 'admin-desk' (dedicated admin workspace)
  const [viewMode, setViewMode] = useState<'visitor' | 'admin-desk'>('visitor');

  // Initial load from server and establish WebSocket real-time channel
  useEffect(() => {
    let isMounted = true;
    let reconnectTimeout: any;

    // 1. Initial REST fetch for server truth (no-store to ensure cross-device consistency)
    const fetchLatestSessions = () => {
      fetch(`/api/sessions?_t=${Date.now()}`, { cache: 'no-store' })
        .then((res) => {
          if (!res.ok) throw new Error('Network error');
          return res.json();
        })
        .then((data) => {
          if (isMounted && data.success && Array.isArray(data.sessions)) {
            setSessions(data.sessions);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(data.sessions));
            } catch (_) {}
          }
        })
        .catch(() => {
          // Graceful fallback to local cache
        });
    };

    fetchLatestSessions();

    // Re-fetch immediately when the tab/window regains focus or visibility (crucial for mobile/desktop switching)
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        fetchLatestSessions();
      }
    };
    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

    // 2. Real-time WebSocket connection
    const connectWebSocket = () => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        if (!host) return;

        const ws = new WebSocket(`${protocol}//${host}/ws`);
        wsRef.current = ws;

        ws.onopen = () => {
          if (isMounted) setIsLiveConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'sync:sessions' && Array.isArray(data.payload)) {
              if (isMounted) {
                setSessions(data.payload);
                try {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.payload));
                } catch (_) {}
              }
            }
          } catch (e) {
            console.error('Failed to parse websocket message:', e);
          }
        };

        ws.onclose = () => {
          if (isMounted) {
            setIsLiveConnected(false);
            reconnectTimeout = setTimeout(connectWebSocket, 2500);
          }
        };

        ws.onerror = () => {
          ws.close();
        };
      } catch (err) {
        if (isMounted) {
          reconnectTimeout = setTimeout(connectWebSocket, 3000);
        }
      }
    };

    connectWebSocket();

    // 3. Fallback polling every 3 seconds to guarantee cross-device sync
    const pollTimer = setInterval(fetchLatestSessions, 3000);

    return () => {
      isMounted = false;
      clearTimeout(reconnectTimeout);
      clearInterval(pollTimer);
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Update sessions locally and broadcast to server for instant multi-user synchronization
  const handleUpdateSessions = useCallback((updated: IdeaSession[]) => {
    setSessions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (_) {}

    // Send bulk synchronization to server so all other devices update immediately
    fetch('/api/sessions/bulk-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({ sessions: updated }),
    }).catch((err) => {
      console.warn('Sync POST error:', err);
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_AUTH_KEY, isAdmin ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdmin]);

  const handleToggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setViewMode('visitor');
    } else {
      setIsAdmin(true);
      setViewMode('admin-desk');
    }
  };

  const scrollToContact = () => {
    setViewMode('visitor');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToDialogue = () => {
    setViewMode('visitor');
    setTimeout(() => {
      const el = document.getElementById('dialogue');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToProject = () => {
    setViewMode('visitor');
    setTimeout(() => {
      const el = document.getElementById('project');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToAbout = () => {
    setViewMode('visitor');
    setTimeout(() => {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F8F6F0] text-[#2A2215] selection:bg-[#809671] selection:text-white font-sans ${isAdmin ? 'pt-8' : ''}`}>
      <Header 
        onContactClick={scrollToDialogue}
        isAdmin={isAdmin}
        viewMode={viewMode}
        onToggleAdmin={handleToggleAdmin}
        onChangeViewMode={(mode) => setViewMode(mode)}
      />
      
      <main className="flex-1">
        {/* If in Admin Desk view mode, render the Admin Control Room */}
        {isAdmin && viewMode === 'admin-desk' ? (
          <div className="pt-16">
            <AdminDesk
              sessions={sessions}
              onUpdateSessions={handleUpdateSessions}
              onExitAdmin={handleToggleAdmin}
              onSwitchToUserView={() => setViewMode('visitor')}
              isLiveConnected={isLiveConnected}
            />
          </div>
        ) : (
          /* Regular Public / Visitor Website Screen */
          <>
            <Hero 
              onExploreProject={scrollToProject} 
              onExploreAbout={scrollToAbout} 
              onContactClick={scrollToDialogue} 
            />
            <About />
            <IdeaDialogueSpace 
              sessions={sessions}
              onUpdateSessions={handleUpdateSessions}
              isAdmin={isAdmin}
              onOpenAdminDesk={() => setViewMode('admin-desk')}
              isLiveConnected={isLiveConnected}
            />
            <ProjectSection />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
