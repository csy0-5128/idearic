import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, ShieldCheck, Lock, Eye, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  onContactClick: () => void;
  isAdmin: boolean;
  viewMode: 'visitor' | 'admin-desk';
  onToggleAdmin: () => void;
  onChangeViewMode: (mode: 'visitor' | 'admin-desk') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onContactClick,
  isAdmin,
  viewMode,
  onToggleAdmin,
  onChangeViewMode
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [inputPasscode, setInputPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'PROJECTS', href: '#project' },
    { label: 'ABOUT', href: '#about' },
    { label: '1:1 DIALOGUE', href: '#dialogue' },
    { label: 'DRAWINGS', href: '#blueprint-details' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPasscode.trim() === '01280128') {
      onToggleAdmin();
      setShowAuthModal(false);
      setInputPasscode('');
      setAuthError('');
    } else {
      setAuthError('비밀번호가 올바르지 않습니다. 다시 입력해 주세요.');
    }
  };

  return (
    <>
      {/* Top Admin Notice Bar (Visible only when Admin is logged in) */}
      {isAdmin && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#222628] text-[#F7F6F2] border-b border-[#313639] px-6 py-2 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#465839] animate-pulse"></span>
            <span className="font-bold tracking-wider text-white">IDEARIC ADMIN DESK ACTIVE</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-[#C49D6C] hidden sm:inline">
              현재 모드: {viewMode === 'admin-desk' ? '관리자 대시보드' : '사용자(방문자) 화면'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {viewMode === 'admin-desk' ? (
              <button
                onClick={() => onChangeViewMode('visitor')}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-[11px] text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#C49D6C]" />
                <span>사용자 화면 보기</span>
              </button>
            ) : (
              <button
                onClick={() => onChangeViewMode('admin-desk')}
                className="px-3 py-1 bg-[#465839] text-white font-semibold hover:bg-[#37472D] text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>관리자 데스크 열기</span>
              </button>
            )}

            <button
              onClick={onToggleAdmin}
              className="text-[#A88153] hover:text-white text-[11px] underline ml-2 cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isAdmin ? 'top-9' : 'top-0'
        } ${
          isScrolled
            ? 'bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#313639]/15 text-[#222628] shadow-xs'
            : 'bg-[#F7F6F2]/85 backdrop-blur-xs border-b border-[#313639]/10 text-[#222628]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Left Brand Wordmark: Interlocking Wireframe Emblem + "IDEARIC ARCHITECTS" */}
          <a
            href="#hero"
            className="flex items-center gap-3.5 text-[#222628] hover:opacity-90 transition-opacity group"
          >
            {/* Interlocking geometric rectangular lines logo in Peru Oak & Caretta Green */}
            <div className="w-7 h-7 relative flex items-center justify-center shrink-0">
              <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 stroke-[#313639] stroke-[1.5]">
                <rect x="3" y="3" width="18" height="18" rx="0.5" />
                <rect x="11" y="11" width="18" height="18" rx="0.5" className="stroke-[#465839]" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-condensed text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#222628] leading-none">
                IDEARIC
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#465839] uppercase leading-none mt-1 font-semibold">
                ARCHITECTS & PLANNING
              </span>
            </div>
          </a>

          {/* Center Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-[0.2em] text-[#58514C]">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="hover:text-[#222628] transition-colors uppercase whitespace-nowrap relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#465839] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: 1:1 CTA Button, Admin Lock, and Menu */}
          <div className="hidden sm:flex items-center gap-3.5">
            <a
              href="#dialogue"
              className="px-4 py-2.5 text-[11px] font-mono tracking-wider uppercase text-white bg-[#465839] hover:bg-[#37472D] flex items-center gap-2 cursor-pointer transition-all border border-[#37472D] rounded-xl shadow-xs"
            >
              <span>1:1 질문하기</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </a>

            {/* Admin Lock Button */}
            <button
              onClick={() => {
                if (isAdmin) {
                  onChangeViewMode(viewMode === 'admin-desk' ? 'visitor' : 'admin-desk');
                } else {
                  setShowAuthModal(true);
                }
              }}
              className={`p-2.5 border transition-all cursor-pointer rounded-xl ${
                isAdmin
                  ? 'bg-[#313639] text-white border-[#222628]'
                  : 'bg-white hover:bg-[#EFECE6] text-[#58514C] border-[#313639]/20'
              }`}
              title={isAdmin ? '관리자 데스크 전환' : '관리자 로그인'}
            >
              {isAdmin ? <ShieldCheck className="w-3.5 h-3.5 text-[#C49D6C]" /> : <Lock className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => {
                if (isAdmin) {
                  onChangeViewMode(viewMode === 'admin-desk' ? 'visitor' : 'admin-desk');
                } else {
                  setShowAuthModal(true);
                }
              }}
              className="p-2 text-[#58514C] hover:text-[#222628] border border-[#313639]/25 rounded-lg"
              title="관리자"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기"
              className="p-2 text-[#222628] hover:bg-[#EFECE6] transition-colors rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F6F2] border-b border-[#313639]/20 px-8 py-8 text-[#222628] animate-in slide-in-from-top-2 duration-200 shadow-lg">
            <nav className="flex flex-col gap-5 text-xs font-mono tracking-[0.2em]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-[#58514C] hover:text-[#222628] border-b border-[#313639]/10"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="#dialogue"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-xs font-mono tracking-wider uppercase text-center text-white bg-[#465839] hover:bg-[#37472D] flex items-center justify-center gap-2 border border-[#37472D] rounded-xl"
                >
                  <span>1:1 질문하기</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (isAdmin) {
                      onChangeViewMode(viewMode === 'admin-desk' ? 'visitor' : 'admin-desk');
                    } else {
                      setShowAuthModal(true);
                    }
                  }}
                  className="w-full py-2.5 text-xs font-mono tracking-wider text-[#313639] border border-[#313639]/30 flex items-center justify-center gap-2 rounded-xl"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#465839]" />
                  <span>{isAdmin ? '관리자 데스크 전환' : '관리자(기획자) 로그인'}</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Admin Passcode Modal */}
      {showAuthModal && (
        <div 
          className="fixed inset-0 z-50 bg-[#222628]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowAuthModal(false)}
        >
          <div 
            className="w-full max-w-sm bg-[#F7F6F2] text-[#222628] p-7 border border-[#313639]/30 shadow-2xl rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#313639]/15">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#313639] uppercase font-bold">
                <ShieldCheck className="w-4 h-4 text-[#465839]" />
                <span>IDEARIC ADMIN AUTH</span>
              </div>
              <button 
                onClick={() => setShowAuthModal(false)}
                className="text-[#58514C] hover:text-[#222628] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#58514C] font-mono mb-5 leading-relaxed">
              기획자 관리자 모드로 진입하여 접수된 1:1 질문을 확인하고 공식 답변을 발행합니다.
            </p>

            <form onSubmit={handleAdminAuthSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[#58514C] mb-1.5 uppercase text-[10px] tracking-wider font-semibold">
                  관리자 전용 비밀번호
                </label>
                <input
                  type="password"
                  autoFocus
                  placeholder="비밀번호를 입력하세요"
                  value={inputPasscode}
                  onChange={(e) => setInputPasscode(e.target.value)}
                  className="w-full p-3 bg-white border border-[#313639]/20 text-[#222628] focus:outline-hidden focus:border-[#465839] rounded-xl"
                />
              </div>

              {authError && (
                <p className="text-xs text-red-600 font-mono font-medium">{authError}</p>
              )}

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#465839] hover:bg-[#37472D] text-white font-mono font-bold tracking-wider uppercase border border-[#37472D] transition-all cursor-pointer rounded-xl"
                >
                  인증하고 관리자 모드 진입
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
