import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#090A0D] text-white text-xs border-t border-white/10 font-mono">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-white/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white"></span>
            </div>
            <span className="font-condensed text-base font-bold tracking-[0.15em] text-white">
              IDEARIC
            </span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <p className="text-[11px] text-neutral-500 tracking-wider">
            © 2026 IDEARIC ARCHITECTS & SPATIAL PLANNING. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Center Nav / Socials matching reference */}
        <div className="flex items-center gap-6 text-[11px] text-neutral-400 tracking-widest uppercase">
          <a href="#hero" className="hover:text-white transition-colors">HOME</a>
          <span className="text-white/20">|</span>
          <a href="#project" className="hover:text-white transition-colors">PROJECTS</a>
          <span className="text-white/20">|</span>
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
          <span className="text-white/20">|</span>
          <a href="#dialogue" className="hover:text-white transition-colors">1:1 DIALOGUE</a>
        </div>

        {/* Email & Top Button */}
        <div className="flex items-center gap-6 text-[11px] text-neutral-400">
          <a
            href="mailto:csy50533394@gmail.com"
            className="hover:text-white transition-colors text-white font-medium"
          >
            csy50533394@gmail.com
          </a>
          <span className="text-white/20">|</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
