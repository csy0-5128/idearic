import React from 'react';
import { ArrowRight, Compass, Layers, ShieldCheck, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: '본질 추출 (ESSENCE)',
      desc: '복잡하고 모호한 아이디어 속에서 가장 핵심적인 철학적 물음과 해결해야 할 본질을 찾아냅니다.',
    },
    {
      num: '02',
      title: '심층 리서치 (RESEARCH)',
      desc: '직관에만 의존하지 않고, 관련 학술 논문과 생태·지형 데이터를 깊이 파고들어 설계의 탄탄한 근거를 구축합니다.',
    },
    {
      num: '03',
      title: '공간적 언어 번역 (TRANSLATION)',
      desc: '문장과 개념으로만 머무는 기획을 단면도, 다이어그램, 3차원 볼륨 등의 명확한 물리적 형태로 전환합니다.',
    },
    {
      num: '04',
      title: '구체적인 시작점 (FOUNDATION)',
      desc: '협업자들이 주저 없이 다음 단계로 나아갈 수 있도록 가장 명료하고 설득력 있는 첫 단추를 제공합니다.',
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#12141A] text-white border-b border-white/10 relative overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-dark-grid opacity-20 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Eyebrow Strip */}
        <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase mb-8">
          <span className="text-white font-bold">PHILOSOPHY & STANCE</span>
          <span className="w-16 h-px bg-white/20"></span>
          <span>기획 철학</span>
        </div>

        {/* Section Heading & Core Statement (Verbatim User Prompt Requirements) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 pb-12 border-b border-white/10">
          <div className="lg:col-span-8">
            <h2 className="font-condensed text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white uppercase leading-none mb-6">
              FROM ESSENCE TO FORM.
            </h2>
            <h3 className="text-xl sm:text-2xl font-light text-neutral-200 tracking-tight mb-4">
              본질에서 출발하는 기획
            </h3>
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl text-balance">
              추상적인 생각과 개념을 시각적·공간적 언어로 번역하는 과정에 집중합니다. 누군가 막막함에 부딪혔을 때 가장 먼저 찾게 되는 명확한 시작점과 영감을 건네는 기획자입니다.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end text-xs font-mono text-neutral-400 border-l border-white/10 pl-6">
            <span className="text-white font-bold tracking-widest uppercase mb-1">
              SPATIAL ATTITUDE
            </span>
            <p className="leading-relaxed">
              과장 없는 리서치와 실제 도면 언어로 증명하는 명확한 프로젝트 시작점 설계.
            </p>
          </div>
        </div>

        {/* 4 Process Pillars (Dark Minimalist Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 bg-[#16181F] border border-white/10 hover:border-white/30 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-neutral-500 tracking-widest block mb-4">
                  STEP // {step.num}
                </span>
                <h4 className="font-condensed text-xl font-bold text-white tracking-wide uppercase mb-2">
                  {step.title}
                </h4>
                <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Two-Column Deep-Dive Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-[#16181F] border border-white/10">
          <div>
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase block mb-2">
              01. 왜 프로젝트의 시작점이 중요한가?
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              많은 프로젝트가 실행력의 부재가 아니라, 초기 단계의 방향성 모호함으로 인해 표류합니다. 
              단순히 멋진 외형을 그리는 것에 그치지 않고, 대지가 가진 자연 조건과 사람의 행위, 학술적 데이터가 맞물리는 
              타당한 논리를 설계하여 누구나 공감할 수 있는 든든한 기준점을 만듭니다.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase block mb-2">
              02. 도면을 통한 명확한 번역
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              추상적인 콘셉트 키워드에 그치지 않고 실제 건축 단면도와 평면도, 모형 볼륨으로 시각화합니다.
              방문자가 협업을 제안하거나 새로운 아이디어를 나눌 때, 모호함 대신 만질 수 있는 실질적인 토대를 제공합니다.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
