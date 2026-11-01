import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 bg-[#2A2215] text-[#E5E0D8] text-xs border-t border-[#725C3A]/30 font-mono">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-[#809671] flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-[#809671]"></span>
            </div>
            <span className="font-condensed text-base font-bold tracking-[0.2em] text-[#F8F6F0]">
              IDEARIC
            </span>
          </div>
          <span className="text-[#725C3A] hidden sm:inline">|</span>
          <p className="text-[11px] text-[#B3B792] tracking-wider">
            © 2026 IDEARIC ARCHITECTS & SPATIAL PLANNING. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Center Nav */}
        <div className="flex items-center gap-6 text-[11px] text-[#E5D2B8] tracking-widest uppercase">
          <a href="#hero" className="hover:text-white transition-colors">HOME</a>
          <span className="text-[#725C3A]">|</span>
          <a href="#project" className="hover:text-white transition-colors">PROJECTS</a>
          <span className="text-[#725C3A]">|</span>
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
          <span className="text-[#725C3A]">|</span>
          <a href="#dialogue" className="hover:text-white transition-colors">1:1 DIALOGUE</a>
        </div>

        {/* Email & Top Button */}
        <div className="flex items-center gap-6 text-[11px] text-[#E5E0D8]">
          <a
            href="mailto:csy50533394@gmail.com"
            className="hover:text-[#D2AB80] transition-colors text-white font-medium"
          >
            csy50533394@gmail.com
          </a>
          <span className="text-[#725C3A]">|</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#B3B792] hover:text-white transition-colors cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#809671]" />
          </button>
        </div>

      </div>
    </footer>
  );
};

