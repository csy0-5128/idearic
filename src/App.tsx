/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { IdeaDialogueSpace } from './components/IdeaDialogueSpace';
import { ProjectSection } from './components/ProjectSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDialogue = () => {
    const el = document.getElementById('dialogue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProject = () => {
    const el = document.getElementById('project');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F2EC] text-[#1C1E22] selection:bg-[#C49B74] selection:text-white font-sans">
      <Header onContactClick={scrollToDialogue} />
      
      <main className="flex-1">
        <Hero 
          onExploreProject={scrollToProject} 
          onExploreAbout={scrollToAbout} 
          onContactClick={scrollToDialogue} 
        />
        <About />
        <IdeaDialogueSpace />
        <ProjectSection />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
