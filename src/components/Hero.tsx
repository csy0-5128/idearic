import React from 'react';
import { ArrowRight, ArrowUpRight, Compass, Layers, Sparkles } from 'lucide-react';

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
  // Brand Swatches from user attachment:
  // MATCHA #809671, ALMOND #E5E0D8, PISTACHE #B3B792, CHAI #D2AB80, CAROB #725C3A, VANILLA #E5D2B8
  const swatches = [
    { name: 'MATCHA', hex: '#809671', desc: '생태 수목' },
    { name: 'ALMOND', hex: '#E5E0D8', desc: '석재 캔버스' },
    { name: 'PISTACHE', hex: '#B3B792', desc: '자연 채광' },
    { name: 'CHAI', hex: '#D2AB80', desc: '목재 테라스' },
    { name: 'CAROB', hex: '#725C3A', desc: '대지 토양' },
    { name: 'VANILLA', hex: '#E5D2B8', desc: '실내 온기' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 bg-[#F8F6F0] text-[#2A2215] overflow-hidden">
      
      {/* Background Architectural Canvas with Earth Warmth & Organic Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 architectural-earth-grid opacity-70"></div>
        <div className="absolute -top-32 right-0 w-[550px] h-[550px] bg-[#E5E0D8]/60 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#B3B792]/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-center py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typographic Hierarchy with requested keywords */}
          <div className="lg:col-span-8">
            
            {/* Micro Top Eyebrow with user's requested keywords: architecture, space, from */}
            <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono tracking-[0.25em] text-[#725C3A] uppercase mb-4">
              <span className="font-bold text-[#809671]">architecture</span>
              <span className="text-[#B3B792]">/</span>
              <span className="font-bold text-[#725C3A]">space</span>
              <span className="text-[#B3B792]">/</span>
              <span className="text-[#5C5243]">from concept to spatial form</span>
            </div>

            {/* Giant Title: IDEARIC with surrounding micro labels */}
            <div className="relative my-2 select-none">
              <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-[#827869] uppercase mb-1">
                <span>[ from abstract thought ]</span>
                <span className="w-8 h-px bg-[#725C3A]/30"></span>
                <span>[ to ecological reality ]</span>
              </div>

              {/* Giant Title: IDEARIC */}
              <h1 className="font-condensed text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight text-[#2A2215] uppercase leading-[0.88] mb-4">
                IDEARIC.
              </h1>

              {/* Adjacent micro words: architecture · space · from */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-[0.22em] text-[#5C5243] uppercase mb-6">
                <span className="font-bold text-[#725C3A]">from</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#809671]"></span>
                <span className="font-medium">philosophical ideas</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2AB80]"></span>
                <span className="font-bold text-[#809671]">to architecture</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B3B792]"></span>
                <span className="font-bold text-[#725C3A]">and breathing space</span>
              </div>
            </div>

            {/* Minimalist Horizontal Hairline Accent in Chai color */}
            <div className="w-16 h-1 bg-[#D2AB80] mb-6"></div>

            {/* Core User Brief Text (Verbatim & Authentic) */}
            <div className="max-w-xl mb-10">
              <p className="text-xl sm:text-2xl font-medium text-[#2A2215] tracking-tight mb-2.5 leading-snug">
                막연한 아이디어에 구체적인 시작점을 만듭니다.
              </p>
              <p className="text-sm sm:text-base text-[#5C5243] font-normal leading-relaxed">
                철학적 개념과 깊이 있는 리서치로 공간과 디자인의 방향을 설계합니다.
              </p>
            </div>

            {/* Action Buttons styled in Matcha and Carob */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProject}
                className="px-6 py-3.5 text-xs font-mono tracking-[0.2em] uppercase arch-btn-earth flex items-center gap-3 cursor-pointer group shadow-xs font-semibold"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4 text-[#725C3A] group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={onContactClick}
                className="px-6 py-3.5 text-xs font-mono tracking-[0.2em] uppercase text-white bg-[#809671] hover:bg-[#6E8360] transition-all flex items-center gap-3 cursor-pointer font-bold group shadow-md"
              >
                <span>1:1 아이디어 질문하기</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Architectural Visual Anchor with Palette Swatches preview */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Visual Preview Card: Study Model in Warm Almond/Carob Frame */}
            <div className="relative group bg-[#E5E0D8]/80 p-3 border border-[#725C3A]/25 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#5C5243] pb-2 mb-2 border-b border-[#725C3A]/15">
                <span className="font-bold text-[#725C3A]">ECOLOGICAL STUDY</span>
                <span className="text-[#809671] font-semibold">바람이 통하는 집</span>
              </div>

              <div 
                onClick={onExploreProject}
                className="relative aspect-4/3 overflow-hidden rounded-xl bg-white border border-[#725C3A]/15 cursor-pointer"
              >
                <img
                  src="/src/assets/images/hillside_architecture_model_1793260635825.jpg"
                  alt="경사지 생태 건축 스터디 모형"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2215]/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#E5D2B8] uppercase block">
                      SECTION & TOPOGRAPHY
                    </span>
                    <p className="text-xs font-semibold">경사지 수목과 인간의 공생 공간</p>
                  </div>
                  <span className="text-[10px] font-mono bg-[#809671] text-white px-2 py-0.5 rounded">
                    도면 보기 →
                  </span>
                </div>
              </div>
            </div>

            {/* Studio Swatch Palette Card (Exact Colors from User Image) */}
            <div className="p-4 bg-white/80 backdrop-blur-xs border border-[#E5E0D8] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-widest text-[#725C3A] uppercase font-bold">
                <span>BRAND COLOR SWATCHES</span>
                <span className="text-[#809671]">STUDIO FLEUR PALETTE</span>
              </div>

              <div className="grid grid-cols-6 gap-1.5">
                {swatches.map((swatch) => (
                  <div key={swatch.name} className="flex flex-col items-center">
                    <div 
                      style={{ backgroundColor: swatch.hex }}
                      className="w-full h-8 rounded-lg shadow-2xs border border-black/5 mb-1"
                      title={`${swatch.name} (${swatch.hex})`}
                    ></div>
                    <span className="text-[8px] font-mono text-[#5C5243] font-semibold">
                      {swatch.name.slice(0, 4)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Floating Bar with Swatch Dots & Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex items-center justify-between text-xs font-mono text-[#5C5243] border-t border-[#E5E0D8] pt-6">
        <div className="flex items-center gap-6">
          <button
            onClick={onExploreAbout}
            className="hover:text-[#2A2215] transition-colors cursor-pointer flex items-center gap-2 font-medium"
          >
            <span>↓ ABOUT PHILOSOPHY</span>
          </button>
          <span className="text-[#725C3A]/20">|</span>
          <span className="hidden sm:inline text-[#827869]">
            MATCHA · ALMOND · PISTACHE · CHAI · CAROB · VANILLA
          </span>
        </div>

        {/* 01 / 03 indicator box */}
        <div className="flex items-center gap-3 bg-[#E5E0D8]/60 border border-[#725C3A]/20 px-3.5 py-1.5 text-[11px] tracking-widest">
          <span className="text-[#725C3A] font-bold">01</span>
          <span className="text-[#725C3A]/30">—</span>
          <span className="text-[#827869]">03</span>
        </div>
      </div>

    </section>
  );
};
