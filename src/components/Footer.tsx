import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 bg-[#1C1E22] text-white text-xs border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center">
            <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4 stroke-[#C49B74] stroke-[2]">
              <rect x="8" y="8" width="16" height="16" transform="rotate(45 16 16)" rx="2" />
              <circle cx="16" cy="16" r="3" fill="currentColor" />
            </svg>
          </div>
          <div>
            <p className="font-syne font-bold text-sm tracking-wide text-white">
              SPATIAL PLANNING PORTFOLIO
            </p>
            <p className="text-[11px] font-mono text-neutral-400">
              막연한 아이디어에 구체적인 시작점을 만듭니다.
            </p>
          </div>
        </div>

        {/* Links & Scroll to top */}
        <div className="flex items-center gap-6 font-mono text-[11px] text-neutral-300">
          <a
            href="mailto:csy50533394@gmail.com"
            className="hover:text-[#C49B74] transition-colors"
          >
            csy50533394@gmail.com
          </a>
          <span className="text-white/20">|</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3 h-3 text-[#C49B74]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
