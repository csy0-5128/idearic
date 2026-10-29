import React from 'react';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreProject: () => void;
  onExploreAbout: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProject,
  onExploreAbout,
  onContactClick,
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-0 text-white overflow-hidden bg-[#15171C]">
      
      {/* Background Architectural Canvas with Warm Sunset Lighting & Cantilever Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hillside_architecture_model_1793260635825.jpg"
          alt="경사지 생태 건축 배경"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.72] contrast-[1.1] saturate-[0.9]"
        />
        {/* Cinematic dusk warm glow & twilight gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15171C] via-[#15171C]/45 to-black/60"></div>
        <div className="absolute inset-0 bg-radial-at-tr from-[#D49F73]/25 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-between py-10">
        
        {/* Top Editorial Ribbon: Right-aligned micro text like reference */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-[11px] font-mono tracking-widest text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C49B74] rounded-full"></span>
            <span className="text-white/80">PORTFOLIO ARCHITECTURE</span>
          </div>
          <div className="hidden sm:block text-right text-neutral-300/80">
            defined by research, elevated by design, substantiated by drawing.
          </div>
        </div>

        {/* Hero Typography & Floating Glass Metric Cushion Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end my-auto">
          
          {/* Left / Center Display Typography ("vela armon" avant-garde style) */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* Massive stylized Latin header reminiscent of "vela armon" */}
            <div className="mb-4">
              <div className="flex items-baseline gap-4">
                <span className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold tracking-tight text-white leading-none">
                  spatia
                </span>
                <span className="text-xs sm:text-sm font-mono text-[#C49B74] tracking-widest uppercase">
                  architectural
                </span>
              </div>
              <div className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold tracking-tight text-[#EFEBE3] leading-none -mt-1 sm:-mt-3">
                planning
              </div>
            </div>

            {/* Left micro emblem & descriptive tagline */}
            <div className="flex items-start gap-3 my-4">
              <span className="text-[#C49B74] text-xl font-bold leading-none select-none">✦</span>
              <p className="text-[11px] font-mono tracking-wider text-neutral-300 uppercase max-w-xs leading-relaxed">
                A sculptural form rising from the natural slope · hillside ecological architecture
              </p>
            </div>

            {/* Korean Core Prompt Headlines (Verbatim) */}
            <div className="mt-4 pt-6 border-t border-white/15 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug mb-3 text-balance">
                막연한 아이디어에 구체적인 시작점을 만듭니다.
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed text-balance">
                철학적 개념과 깊이 있는 리서치로 공간과 디자인의 방향을 설계합니다.
              </p>
            </div>

          </div>

          {/* Right Column: Floating Liquid Cushion Glass Metric Cards (like 15 Years / 120 Homes in reference) */}
          <div className="lg:col-span-4 flex flex-col gap-4 items-start lg:items-end">
            
            {/* Floating Cushion Card 1 */}
            <div className="w-full max-w-xs liquid-cushion-dark rounded-2xl p-5 border border-white/20 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-syne text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  생태 공생
                </span>
                <span className="text-[10px] font-mono text-[#C49B74] uppercase tracking-wider">
                  ECOLOGICAL
                </span>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-snug">
                경사지 수목의 수평적 성장 환경 제공
              </p>
            </div>

            {/* Floating Cushion Card 2 */}
            <div className="w-full max-w-xs liquid-cushion-dark rounded-2xl p-5 border border-white/20 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-syne text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  단면 설계
                </span>
                <span className="text-[10px] font-mono text-[#C49B74] uppercase tracking-wider">
                  SCHEMATIC
                </span>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-snug">
                바람길과 인간의 테라스·지붕 일체화 구조
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Signature Concave Scoop Bottom Contour with Centered Contact Pill (as in reference image) */}
      <div className="relative z-20 w-full">
        {/* Concave architectural curve transition to light travertine */}
        <div className="relative h-20 bg-[#F4F2EC] flex items-center justify-center">
          
          {/* Subtle curved dip cutout container */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <button
              onClick={onContactClick}
              className="group px-7 py-3 bg-white text-[#1C1E22] rounded-full shadow-xl border border-neutral-200/80 flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <span className="text-xs font-mono font-bold tracking-wider uppercase">1:1 아이디어 질문하기</span>
              <div className="w-6 h-6 rounded-full bg-[#C49B74] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>
          </div>

          {/* Quick horizontal jump links */}
          <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between text-[11px] font-mono text-[#5C5F66]">
            <button
              onClick={onExploreAbout}
              className="hover:text-[#1C1E22] transition-colors cursor-pointer"
            >
              ↓ 기획 철학 읽어보기
            </button>
            <div className="flex items-center gap-6">
              <button
                onClick={onContactClick}
                className="hover:text-[#1C1E22] text-[#B88E68] font-semibold transition-colors cursor-pointer"
              >
                1:1 대화 공간 참여하기 →
              </button>
              <button
                onClick={onExploreProject}
                className="hover:text-[#1C1E22] transition-colors cursor-pointer hidden sm:inline"
              >
                대표 도면 바로보기 →
              </button>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
