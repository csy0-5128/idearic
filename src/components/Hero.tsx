import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ArchitecturalImage } from './ArchitecturalImage';

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
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 bg-[#F7F6F2] text-[#222628] overflow-hidden">
      
      {/* Background Architectural Canvas with Travertine Grid & Subtle Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 architectural-earth-grid opacity-75"></div>
        <div className="absolute -top-36 right-0 w-[580px] h-[580px] bg-[#EFECE6] rounded-full blur-3xl opacity-80"></div>
        <div className="absolute bottom-10 left-10 w-[480px] h-[480px] bg-[#465839]/8 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-center py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typographic Hierarchy with requested keywords */}
          <div className="lg:col-span-8">
            
            {/* Micro Top Eyebrow with user's requested keywords: architecture, space, from */}
            <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono tracking-[0.25em] text-[#58514C] uppercase mb-4">
              <span className="font-bold text-[#465839]">architecture</span>
              <span className="text-[#A88153]">/</span>
              <span className="font-bold text-[#313639]">space</span>
              <span className="text-[#A88153]">/</span>
              <span className="text-[#58514C]">from concept to spatial form</span>
            </div>

            {/* Giant Title: IDEARIC with surrounding micro labels */}
            <div className="relative my-2 select-none">
              <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-[#847E79] uppercase mb-1">
                <span>[ from abstract thought ]</span>
                <span className="w-8 h-px bg-[#313639]/30"></span>
                <span>[ to ecological reality ]</span>
              </div>

              {/* Giant Title: IDEARIC */}
              <h1 className="font-condensed text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight text-[#222628] uppercase leading-[0.88] mb-4">
                IDEARIC.
              </h1>

              {/* Adjacent micro words: architecture · space · from */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-[0.22em] text-[#58514C] uppercase mb-6">
                <span className="font-bold text-[#A88153]">from</span>
                <span className="w-1.5 h-1.5 bg-[#465839]"></span>
                <span className="font-medium text-[#222628]">philosophical ideas</span>
                <span className="w-1.5 h-1.5 bg-[#A88153]"></span>
                <span className="font-bold text-[#465839]">to architecture</span>
                <span className="w-1.5 h-1.5 bg-[#313639]"></span>
                <span className="font-bold text-[#58514C]">and breathing space</span>
              </div>
            </div>

            {/* Minimalist Horizontal Hairline Accent in Matt Peru Oak */}
            <div className="w-16 h-1 bg-[#A88153] mb-6"></div>

            {/* Core User Brief Text (Verbatim & Authentic) */}
            <div className="max-w-xl mb-10">
              <p className="text-xl sm:text-2xl font-medium text-[#222628] tracking-tight mb-2.5 leading-snug">
                막연한 아이디어에 구체적인 시작점을 만듭니다.
              </p>
              <p className="text-sm sm:text-base text-[#58514C] font-normal leading-relaxed">
                철학적 개념과 깊이 있는 리서치로 공간과 디자인의 방향을 설계합니다.
              </p>
            </div>

            {/* Action Buttons styled in Caretta Green & Dolphin Grey Outline */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProject}
                className="px-6 py-3.5 text-xs font-mono tracking-[0.2em] uppercase arch-btn-outline flex items-center gap-3 cursor-pointer group font-semibold rounded-2xl"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4 text-[#313639] group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={onContactClick}
                className="px-6 py-3.5 text-xs font-mono tracking-[0.2em] uppercase text-white bg-[#465839] hover:bg-[#37472D] transition-all flex items-center gap-3 cursor-pointer font-bold group border border-[#37472D] rounded-2xl shadow-sm"
              >
                <span>1:1 아이디어 질문하기</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Architectural Visual Anchor with Moodboard Material Tactility */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Visual Preview Card: Study Model in Dolphin / Peru Oak Architectural Frame */}
            <div className="relative group bg-white p-3.5 border border-[#313639]/20 shadow-xs rounded-3xl">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#58514C] pb-2.5 mb-2.5 border-b border-[#313639]/12">
                <span className="font-bold text-[#313639]">ECOLOGICAL STUDY</span>
                <span className="text-[#465839] font-semibold">바람이 통하는 집</span>
              </div>

              <div 
                onClick={onExploreProject}
                className="relative aspect-4/3 overflow-hidden bg-[#222628] border border-[#313639]/20 cursor-pointer rounded-2xl"
              >
                <ArchitecturalImage
                  src="/assets/images/hillside_model_web.jpg"
                  fallbackSrc="/assets/images/hillside_architecture_model_1793260635825.jpg"
                  alt="경사지 생태 건축 스터디 모형"
                  priority={true}
                  type="model"
                  sheetTitle="HILLSIDE ECOLOGICAL MODEL"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222628]/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between pointer-events-none">
                  <div>
                    <span className="text-[10px] font-mono text-[#C49D6C] uppercase block">
                      SECTION & TOPOGRAPHY
                    </span>
                    <p className="text-xs font-semibold">경사지 수목과 인간의 공생 공간</p>
                  </div>
                  <span className="text-[10px] font-mono bg-[#465839] text-white px-2.5 py-1 border border-white/20 rounded-lg">
                    도면 보기 →
                  </span>
                </div>
              </div>
            </div>

            {/* Architectural Practice Specs Card in Dolphin Grey / Slate Harmony */}
            <div className="p-5 bg-white border border-[#313639]/15 shadow-xs rounded-3xl">
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-widest text-[#313639] uppercase font-bold">
                <span>PRACTICE SPECS</span>
                <span className="text-[#465839] font-semibold">OPEN DIALOGUE</span>
              </div>
              <div className="space-y-2.5 text-xs font-mono text-[#58514C]">
                <div className="flex justify-between items-center py-1 border-b border-[#313639]/10">
                  <span className="text-[#847E79]">TYPOLOGY</span>
                  <span className="font-semibold text-[#222628]">Ecological & Spatial</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#313639]/10">
                  <span className="text-[#847E79]">METHODOLOGY</span>
                  <span className="font-semibold text-[#222628]">1:1 Collaborative Brief</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#847E79]">LOCATION</span>
                  <span className="font-semibold text-[#222628]">Seoul · Site Specific</span>
                </div>
              </div>

              {/* Material Board Reference Note */}
              <div className="mt-4 pt-3 border-t border-[#313639]/10 flex items-center justify-between text-[10px] font-mono text-[#847E79]">
                <span>PALETTE</span>
                <span className="text-[#465839] font-semibold">CARETTA GREEN · PERU OAK · DOLPHIN</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Floating Bar with Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex items-center justify-between text-xs font-mono text-[#58514C] border-t border-[#313639]/15 pt-6">
        <div className="flex items-center gap-6">
          <button
            onClick={onExploreAbout}
            className="hover:text-[#222628] transition-colors cursor-pointer flex items-center gap-2 font-medium"
          >
            <span>↓ ABOUT PHILOSOPHY</span>
          </button>
          <span className="text-[#313639]/20">|</span>
          <span className="hidden sm:inline text-[#847E79]">
            ARCHITECTURE · SPACE · FORM · CONTEXT
          </span>
        </div>

        {/* 01 / 03 indicator box with architectural framing */}
        <div className="flex items-center gap-3 bg-white border border-[#313639]/20 px-3.5 py-1.5 text-[11px] tracking-widest rounded-xl">
          <span className="text-[#313639] font-bold">01</span>
          <span className="text-[#313639]/30">—</span>
          <span className="text-[#847E79]">03</span>
        </div>
      </div>

    </section>
  );
};
