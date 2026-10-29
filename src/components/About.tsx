import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#F4F2EC] border-b border-[#E5E0D5]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Giant Lowercase Header ("about us" style from reference image) */}
        <div className="flex items-start justify-between mb-16 pb-6 border-b border-[#DFDACF]">
          <div>
            <div className="flex items-baseline gap-4">
              <h2 className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#1C1E22] leading-none">
                about me
              </h2>
            </div>
            {/* Fine subscripts under letters like reference */}
            <div className="flex items-center gap-8 mt-2 text-[10px] font-mono tracking-widest text-[#848A96] uppercase">
              <span>development</span>
              <span>philosophy</span>
              <span>spatial language</span>
            </div>
          </div>

          <div className="pt-2 select-none">
            <span className="text-[#C49B74] text-3xl sm:text-4xl font-bold">✦</span>
          </div>
        </div>

        {/* Editorial Statement with Inline Thumbnail Image Capsules (Directly inspired by reference) */}
        <div className="max-w-5xl mb-20">
          
          {/* Main Korean Prompt Body with Inline Architectural Capsules */}
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#1C1E22] leading-[1.6] md:leading-[1.7] tracking-tight mb-8">
            <span className="text-[#C49B74] font-semibold">본질에서 출발하는 기획. </span>
            추상적인 생각과 개념을 시각적·공간적 언어로 번역하는 과정에 집중합니다.{' '}
            <span className="inline-flex align-middle mx-1 w-12 sm:w-16 h-6 sm:h-8 rounded-full overflow-hidden border border-[#C49B74]/50 shadow-xs bg-white">
              <img
                src="/assets/drawings/drawing_page_02.png"
                alt="실제 건축 단면도 도면 디테일"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-center filter contrast-125"
              />
            </span>{' '}
            누군가 막막함에 부딪혔을 때 가장 먼저 찾게 되는 명확한 시작점과{' '}
            <span className="inline-flex align-middle mx-1 w-12 sm:w-16 h-6 sm:h-8 rounded-full overflow-hidden border border-[#C49B74]/50 shadow-xs">
              <img
                src="/src/assets/images/hillside_architecture_model_1793260635825.jpg"
                alt="공간 스터디 모형 디테일"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </span>{' '}
            영감을 건네는 기획자입니다.{' '}
            <span className="text-[#C49B74] font-mono text-xl sm:text-2xl font-light">///</span>
          </div>

          {/* Bilingual Architectural Concept Sub-Editorial in Uppercase like Reference */}
          <p className="font-mono text-xs sm:text-sm text-[#5C5F66] tracking-wider uppercase leading-relaxed max-w-4xl">
            WHERE PHILOSOPHICAL ESSENCE, RIGOROUS RESEARCH AND SPATIAL TRANSLATION COEXIST IN EQUILIBRIUM. OUR DIRECTION IS NOT JUST TO ARRANGE VOLUMES — BUT TO DELIVER ACTIONABLE INSPIRATION AND SUBSTANTIATED FOUNDATIONS FOR COMPLEX PROJECTS.
          </p>

        </div>

        {/* 2 Wide Rounded Architectural Image Cards (like the 2 perspective cards in reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          
          <div className="group relative aspect-16/9 rounded-2xl overflow-hidden bg-[#E7E2D8] border border-[#DFDACF] shadow-sm">
            <img
              src="/src/assets/images/hillside_architecture_model_1793260635825.jpg"
              alt="경사지 생태 건축 스터디 뷰"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#C49B74] uppercase block">
                  PHYSICAL STUDY
                </span>
                <p className="text-sm font-semibold tracking-tight">
                  경사지 수목과 인간의 거주가 만나는 입체 볼륨
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-300">01 / 02</span>
            </div>
          </div>

          <div className="group relative aspect-16/9 rounded-2xl overflow-hidden bg-white border border-[#DFDACF] shadow-sm flex items-center justify-center p-3">
            <img
              src="/assets/drawings/drawing_page_02.png"
              alt="실제 건축 단면도 도면 (수목 및 계단식 테라스)"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#C49B74] uppercase block">
                  ORIGINAL SECTION DRAWING
                </span>
                <p className="text-sm font-semibold tracking-tight">
                  단면도 도면: 경사지 수목과 계단식 테라스 1·2 구조
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-300">02 / 02</span>
            </div>
          </div>

        </div>

        {/* Bottom Two-Column Editorial Text Block (matching reference layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-[#DFDACF] text-xs sm:text-sm text-[#5C5F66] leading-relaxed">
          <div>
            <span className="font-mono text-[#1C1E22] font-semibold block mb-2 uppercase tracking-wider">
              01. 왜 본질에서 출발하는가?
            </span>
            <p>
              초기 기획이 흐릿하면 프로젝트는 실행 단계에서 필연적으로 방황합니다. 
              표면적인 시각물 이전에 철학적 질문과 학술 연구를 선행하여, 
              흔들리지 않는 설계 명분과 지속 가능한 공간의 방향성을 정립합니다.
            </p>
          </div>
          <div>
            <span className="font-mono text-[#1C1E22] font-semibold block mb-2 uppercase tracking-wider">
              02. 시각적·공간적 언어로의 번역
            </span>
            <p>
              단순한 텍스트 기획에 머무르지 않고, 단면도와 축척 모델 등의 구체적인 도면 언어로 증명합니다. 
              협업자가 첫 회의에서부터 명확한 영감과 실질적인 다음 걸음을 내디딜 수 있도록 돕습니다.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
