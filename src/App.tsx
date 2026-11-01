/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

  // View mode: 'visitor' (regular public website) vs 'admin-desk' (dedicated admin workspace)
  const [viewMode, setViewMode] = useState<'visitor' | 'admin-desk'>('visitor');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error(e);
    }
  }, [sessions]);

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
              onUpdateSessions={(updated) => setSessions(updated)}
              onExitAdmin={handleToggleAdmin}
              onSwitchToUserView={() => setViewMode('visitor')}
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
              onUpdateSessions={(updated) => setSessions(updated)}
              isAdmin={isAdmin}
              onOpenAdminDesk={() => setViewMode('admin-desk')}
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
