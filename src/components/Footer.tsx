import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 bg-[#222628] text-[#EFECE6] text-xs border-t border-[#313639] font-mono">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-[#465839] flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-[#465839]"></span>
            </div>
            <span className="font-condensed text-base font-bold tracking-[0.2em] text-white">
              IDEARIC
            </span>
          </div>
          <span className="text-[#313639] hidden sm:inline">|</span>
          <p className="text-[11px] text-[#A88153] tracking-wider">
            © 2026 IDEARIC ARCHITECTS & SPATIAL PLANNING. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Center Nav */}
        <div className="flex items-center gap-6 text-[11px] text-[#EFECE6] tracking-widest uppercase">
          <a href="#hero" className="hover:text-white transition-colors">HOME</a>
          <span className="text-[#313639]">|</span>
          <a href="#project" className="hover:text-white transition-colors">PROJECTS</a>
          <span className="text-[#313639]">|</span>
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
          <span className="text-[#313639]">|</span>
          <a href="#dialogue" className="hover:text-white transition-colors">1:1 DIALOGUE</a>
        </div>

        {/* Email & Top Button */}
        <div className="flex items-center gap-6 text-[11px] text-[#EFECE6]">
          <a
            href="mailto:csy50533394@gmail.com"
            className="hover:text-[#C49D6C] transition-colors text-white font-medium"
          >
            csy50533394@gmail.com
          </a>
          <span className="text-[#313639]">|</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#A88153] hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#465839]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
