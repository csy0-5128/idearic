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
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 bg-[#0D0E11] text-white overflow-hidden">
      
      {/* Background Architectural Scenery with Dusk Atmosphere (inspired by reference image) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/assets/aistudio/image_8cc74ad8.png"
          alt="IDEARIC Architectural Scenery"
          className="w-full h-full object-cover object-top scale-105 filter brightness-[0.55] contrast-[1.2] saturate-[0.85]"
        />
        {/* Cinematic dark gradients matching the brutalist modern style */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/60 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11] via-[#0D0E11]/80 to-transparent"></div>
        <div className="absolute inset-0 architectural-dark-grid opacity-40 pointer-events-none"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-center py-12">
        
        {/* Left Column: Typographic Hierarchy inspired by FORMA reference */}
        <div className="max-w-3xl">
          
          {/* Micro Top Eyebrow with small keywords requested by user: architecture, space, from */}
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono tracking-[0.28em] text-neutral-400 uppercase mb-4">
            <span className="text-white font-medium">architecture</span>
            <span className="text-white/30">/</span>
            <span>space</span>
            <span className="text-white/30">/</span>
            <span className="text-neutral-300">from concept to form</span>
          </div>

          {/* User Requested Massive Headline: "IDEARIC" with surrounding micro labels */}
          <div className="relative my-2 select-none">
            {/* Small floating annotation text around IDEARIC */}
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase mb-1">
              <span>[ from abstract thought ]</span>
              <span className="w-8 h-px bg-white/20"></span>
              <span>[ to spatial reality ]</span>
            </div>

            {/* Giant Title: IDEARIC */}
            <h1 className="font-condensed text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight text-white uppercase leading-[0.88] mb-4">
              IDEARIC.
            </h1>

            {/* Adjacent micro words: architecture · space · from */}
            <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase mb-6">
              <span className="text-white font-medium">from</span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span>ideas</span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span>to</span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span className="text-white font-medium">architecture & space</span>
            </div>
          </div>

          {/* Minimalist Horizontal Hairline Accent */}
          <div className="w-16 h-px bg-white/40 mb-6"></div>

          {/* Core User Brief Text (Verbatim & Authentic) */}
          <div className="max-w-xl mb-10">
            <p className="text-xl sm:text-2xl font-light text-white tracking-tight mb-2 leading-snug">
              막연한 아이디어에 구체적인 시작점을 만듭니다.
            </p>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              철학적 개념과 깊이 있는 리서치로 공간과 디자인의 방향을 설계합니다.
            </p>
          </div>

          {/* Action Buttons matching the reference image's sharp outline buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreProject}
              className="px-6 py-3.5 text-xs font-mono tracking-[0.2em] uppercase text-white arch-btn flex items-center gap-3 cursor-pointer group"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </button>

            <button
              onClick={onContactClick}
              className="px-6 py-3.5 text-xs font-mono tracking-[0.2em] uppercase text-black bg-white hover:bg-neutral-200 transition-all flex items-center gap-3 cursor-pointer font-bold group shadow-lg"
            >
              <span>1:1 아이디어 질문하기</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Floating Bar with Pagination Indicator (01 / 03) like Reference Image */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex items-center justify-between text-xs font-mono text-neutral-400 border-t border-white/10 pt-6">
        <div className="flex items-center gap-6">
          <button
            onClick={onExploreAbout}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>↓ ABOUT PHILOSOPHY</span>
          </button>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline text-neutral-500">
            ECOLOGICAL HILLSIDE ARCHITECTURE · RESEARCH-LED PLANNING
          </span>
        </div>

        {/* 01 / 03 indicator box from reference */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-3 py-1.5 text-[11px] tracking-widest">
          <span className="text-white font-bold">01</span>
          <span className="text-white/30">—</span>
          <span className="text-neutral-500">03</span>
        </div>
      </div>

    </section>
  );
};
