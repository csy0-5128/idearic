import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onContactClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECT', href: '#project' },
    { label: '1:1 DIALOGUE', href: '#dialogue' },
    { label: 'DRAWING', href: '#blueprint-details' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#181A1F]/80 backdrop-blur-md border-b border-white/10 text-white shadow-lg'
          : 'bg-black/25 backdrop-blur-xs border-b border-white/10 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[11px] font-mono tracking-widest text-neutral-300">
          <a href="#hero" className="hover:text-white transition-colors">HOME</a>
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
          <a href="#project" className="hover:text-white transition-colors">PROJECT</a>
        </nav>

        {/* Center Geometric Emblem Logo (like the reference image's dual rhombic emblem) */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity"
        >
          <div className="w-7 h-7 relative flex items-center justify-center">
            {/* Interlocking geometric diamond mark */}
            <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 stroke-white stroke-[1.5]">
              <rect x="8" y="8" width="16" height="16" transform="rotate(45 16 16)" rx="2" />
              <circle cx="16" cy="16" r="3" fill="currentColor" />
            </svg>
          </div>
          <span className="font-syne font-bold text-sm tracking-wider uppercase hidden sm:inline">
            Spatial Planning
          </span>
        </a>

        {/* Right Nav Links & Language / CTA */}
        <div className="hidden md:flex items-center gap-6 text-[11px] font-mono tracking-widest text-neutral-300">
          <a href="#dialogue" className="hover:text-[#C49B74] transition-colors text-white font-medium">1:1 DIALOGUE</a>
          <a href="#blueprint-details" className="hover:text-white transition-colors">DRAWING</a>
          <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
          <span className="text-white/30">|</span>
          <a
            href="#dialogue"
            className="text-[11px] font-mono text-[#EFECE6] bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-full border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>1:1 질문하기</span>
            <ArrowUpRight className="w-3 h-3 text-[#C49B74]" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
            className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181A1F]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 text-white animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-xs font-mono tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-neutral-300 hover:text-white border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="w-full py-2.5 text-xs font-mono font-semibold text-[#181A1F] bg-white rounded-full flex items-center justify-center gap-1.5"
              >
                <span>협업 제안하기 (이메일)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
