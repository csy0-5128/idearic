import React, { useState } from 'react';
import { 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  FileDown, 
  ExternalLink,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { DrawingSheet } from '../types/dialogue';
import { ArchitecturalImage } from './ArchitecturalImage';

export const ProjectSection: React.FC = () => {
  // 6 Authentic Drawing Sheets from User's Uploaded PDF with web-optimized versions and fallbacks
  const drawingSheets: DrawingSheet[] = [
    {
      id: 'section',
      name: '단면도 (대표 도면)',
      category: 'SECTION',
      pageNumber: 2,
      imageSrc: '/assets/drawings/drawing_page_02_web.png',
      fallbackSrc: '/assets/drawings/drawing_page_02.png',
      thumbSrc: '/assets/drawings/drawing_page_02_thumb.png',
      desc: '경사지 수목과 외부테라스 1·2, 내부테라스 1, 중앙공간 및 거주 볼륨의 수직적 위계와 바람길'
    },
    {
      id: 'site-plan',
      name: '배치도',
      category: 'SITE PLAN',
      pageNumber: 1,
      imageSrc: '/assets/drawings/drawing_page_01_web.png',
      fallbackSrc: '/assets/drawings/drawing_page_01.png',
      thumbSrc: '/assets/drawings/drawing_page_01_thumb.png',
      desc: '경사지 등고선과 도로망, 대지 내 건축물과 테라스 배치를 나타낸 대지 배치도'
    },
    {
      id: 'slope-1f',
      name: '경사 1층 평면도',
      category: 'PLAN',
      pageNumber: 3,
      imageSrc: '/assets/drawings/drawing_page_03_web.png',
      fallbackSrc: '/assets/drawings/drawing_page_03.png',
      thumbSrc: '/assets/drawings/drawing_page_03_thumb.png',
      desc: '수목 사이로 열린 최하단 외부테라스2 및 경사 진입 계단 구조'
    },
    {
      id: 'slope-2f',
      name: '경사 2층 평면도',
      category: 'PLAN',
      pageNumber: 4,
      imageSrc: '/assets/drawings/drawing_page_04_web.png',
      fallbackSrc: '/assets/drawings/drawing_page_04.png',
      thumbSrc: '/assets/drawings/drawing_page_04_thumb.png',
      desc: '경사면과 유기적으로 맞물리는 내부테라스1 및 층간 연계 계단'
    },
    {
      id: '1f',
      name: '1층 평면도',
      category: 'PLAN',
      pageNumber: 5,
      imageSrc: '/assets/drawings/drawing_page_05_web.png',
      fallbackSrc: '/assets/drawings/drawing_page_05.png',
      thumbSrc: '/assets/drawings/drawing_page_05_thumb.png',
      desc: '현관, 중앙공간, 그리고 대형 외부테라스1로 구성된 주 생활 공간'
    },
    {
      id: '2f',
      name: '2층 평면도',
      category: 'PLAN',
      pageNumber: 6,
      imageSrc: '/assets/drawings/drawing_page_06_web.png',
      fallbackSrc: '/assets/drawings/drawing_page_06.png',
      thumbSrc: '/assets/drawings/drawing_page_06_thumb.png',
      desc: '방1, 방2, 중앙 보이드 공간, 화장실, 다용도실이 배치된 상부 층'
    }
  ];

  const [selectedSheetId, setSelectedSheetId] = useState<string>('section');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const currentSheet = drawingSheets.find((sheet) => sheet.id === selectedSheetId) || drawingSheets[0];
  const pdfFilePath = '/assets/aistudio/________b1c41d8d.pdf';

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 3.0));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.65));
  const handleResetZoom = () => setZoomLevel(1);

  // 3 Selected Focus Cards in Swatch Palette with reliable web asset paths
  const showcaseCards = [
    {
      num: '01',
      sheetId: 'section',
      title: '단면도 (대표 도면)',
      subtitle: '경사지 생태 건축 기본 설계 · 수목 보존 및 테라스 일체화',
      tag: 'SECTION DRAWING',
      accentColor: '#809671', // Matcha
      image: '/assets/drawings/drawing_page_02_web.png',
      fallbackImage: '/assets/drawings/drawing_page_02.png',
      type: 'section' as const,
    },
    {
      num: '02',
      sheetId: 'site-plan',
      title: '대지 배치도',
      subtitle: '경사지 등고선 분석 및 도로망 순응형 입체 배치 계획',
      tag: 'SITE CONTOUR PLAN',
      accentColor: '#D2AB80', // Chai
      image: '/assets/drawings/drawing_page_01_web.png',
      fallbackImage: '/assets/drawings/drawing_page_01.png',
      type: 'site-plan' as const,
    },
    {
      num: '03',
      sheetId: 'model',
      title: '입체 공간 스터디 모형',
      subtitle: '경사면 테라스와 캔틸레버 옥상 녹화의 입체 볼륨 스터디',
      tag: 'PHYSICAL STUDY MODEL',
      accentColor: '#725C3A', // Carob
      image: '/assets/images/hillside_model_web.jpg',
      fallbackImage: '/assets/images/hillside_architecture_model_1793260635825.jpg',
      type: 'model' as const,
    }
  ];

  return (
    <section id="project" className="py-24 sm:py-32 bg-[#F2EFE8] text-[#2A2215] border-b border-[#E5E0D8] relative overflow-hidden">
      
      {/* Background Subtle Earth Pattern */}
      <div className="absolute inset-0 architectural-earth-grid opacity-60 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header Strip: SELECTED WORK ──────── VIEW ALL PROJECTS → */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14 pb-4 border-b border-[#E5E0D8] text-xs font-mono tracking-[0.25em] uppercase text-[#725C3A]">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#2A2215]">SELECTED WORK</span>
            <span className="w-16 sm:w-24 h-px bg-[#725C3A]/30"></span>
            <span className="text-[#809671] font-semibold hidden md:inline">AUTHENTIC ARCHITECTURAL SCHEMATICS</span>
          </div>

          <a
            href="#blueprint-details"
            className="hover:text-[#2A2215] transition-colors flex items-center gap-2 text-[#725C3A] font-semibold group"
          >
            <span>VIEW ALL 6 DRAWING SHEETS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Project Title & Manifesto Card (Verbatim User Prompt Requirements) */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#809671] uppercase mb-3 font-semibold">
            <span>REPRESENTATIVE PROJECT</span>
            <span className="text-[#B3B792]">/</span>
            <span className="text-[#725C3A] font-bold">바람이 통하는 집</span>
          </div>

          <h2 className="font-condensed text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#2A2215] uppercase leading-none mb-6">
            HOUSE WHERE THE WIND PASSES.
          </h2>

          <p className="text-base sm:text-lg text-[#5C5243] font-normal leading-relaxed mb-6 text-balance">
            경사지 나무의 생태적 특성과 관련 논문을 바탕으로, 나무에게는 수평적 성장 환경을 제공하고 인간에게는 테라스와 지붕이 되는 공간을 설계한 건축 기본 설계 프로젝트. (첨부된 단면도 도면 기반 구조 반영)
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#5C5243]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#809671]"></span>
              <span className="font-semibold text-[#2A2215]">검증된 실제 건축 도면집 (PDF 총 6면)</span>
            </span>
            <a
              href={pdfFilePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#725C3A] hover:text-[#2A2215] hover:underline flex items-center gap-1.5 font-bold"
            >
              <FileDown className="w-3.5 h-3.5 text-[#809671]" />
              <span>원본 PDF 열기 / 다운로드</span>
            </a>
          </div>
        </div>

        {/* Social Proof Architectural Metrics Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#E5E0D8]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#809671]"></span>
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#725C3A] font-bold">
                KEY PERFORMANCE & SOCIAL PROOF · 핵심 지표
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#5C5243] hidden sm:inline">
              철학적 리서치와 도면 결과물 기반의 실증된 기획 데이터
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Metric 1: Projects Completed */}
            <div className="bg-white/90 backdrop-blur-xs p-6 border border-[#E5E0D8] rounded-2xl shadow-xs hover:border-[#809671] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#809671]/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 bg-[#809671]/15 text-[#809671] font-bold rounded-sm">
                  PORTFOLIO
                </span>
                <span className="text-xs font-mono text-[#5C5243]">01</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold text-[#2A2215] tracking-tight group-hover:text-[#809671] transition-colors">
                  1
                </span>
                <span className="text-sm font-mono font-semibold text-[#809671]">Project</span>
              </div>
              <h4 className="text-sm font-bold text-[#2A2215] tracking-wide mb-1.5 uppercase font-condensed">
                Projects Completed
              </h4>
              <p className="text-[11px] font-mono text-[#5C5243] leading-relaxed">
                경사지 생태 건축 '바람이 통하는 집' 기본설계 및 6면 마스터 도면집 완성
              </p>
            </div>

            {/* Metric 2: Years of Experience */}
            <div className="bg-white/90 backdrop-blur-xs p-6 border border-[#E5E0D8] rounded-2xl shadow-xs hover:border-[#D2AB80] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#D2AB80]/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 bg-[#D2AB80]/20 text-[#725C3A] font-bold rounded-sm">
                  PRACTICE
                </span>
                <span className="text-xs font-mono text-[#5C5243]">02</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold text-[#2A2215] tracking-tight group-hover:text-[#D2AB80] transition-colors">
                  4+
                </span>
                <span className="text-sm font-mono font-semibold text-[#D2AB80]">Years</span>
              </div>
              <h4 className="text-sm font-bold text-[#2A2215] tracking-wide mb-1.5 uppercase font-condensed">
                Years of Experience
              </h4>
              <p className="text-[11px] font-mono text-[#5C5243] leading-relaxed">
                건축학 전공 및 공간 리서치·철학적 개념화 실무 연구 집중 기간
              </p>
            </div>

            {/* Metric 3: Concepts Developed */}
            <div className="bg-white/90 backdrop-blur-xs p-6 border border-[#E5E0D8] rounded-2xl shadow-xs hover:border-[#725C3A] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#725C3A]/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 bg-[#725C3A]/15 text-[#725C3A] font-bold rounded-sm">
                  FRAMEWORKS
                </span>
                <span className="text-xs font-mono text-[#5C5243]">03</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold text-[#2A2215] tracking-tight group-hover:text-[#725C3A] transition-colors">
                  12+
                </span>
                <span className="text-sm font-mono font-semibold text-[#725C3A]">Concepts</span>
              </div>
              <h4 className="text-sm font-bold text-[#2A2215] tracking-wide mb-1.5 uppercase font-condensed">
                Concepts Developed
              </h4>
              <p className="text-[11px] font-mono text-[#5C5243] leading-relaxed">
                대지 순응, 수목 성장 순응, 테라스-지붕 일체화 등 공간 기획 프레임워크
              </p>
            </div>

            {/* Metric 4: Drawing Sheets Delivered */}
            <div className="bg-white/90 backdrop-blur-xs p-6 border border-[#E5E0D8] rounded-2xl shadow-xs hover:border-[#B3B792] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#B3B792]/15 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 bg-[#B3B792]/25 text-[#5C5243] font-bold rounded-sm">
                  SCHEMATICS
                </span>
                <span className="text-xs font-mono text-[#5C5243]">04</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold text-[#2A2215] tracking-tight group-hover:text-[#809671] transition-colors">
                  6
                </span>
                <span className="text-sm font-mono font-semibold text-[#809671]">Sheets</span>
              </div>
              <h4 className="text-sm font-bold text-[#2A2215] tracking-wide mb-1.5 uppercase font-condensed">
                Drawing Sheets Delivered
              </h4>
              <p className="text-[11px] font-mono text-[#5C5243] leading-relaxed">
                배치도·단면도·층별 평면도 100% 자체 도면화 및 공학적 핀업 검증 완료
              </p>
            </div>
          </div>
        </div>

        {/* 3-Column Architectural Cards Grid in Swatch Harmony */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {showcaseCards.map((card) => (
            <div
              key={card.num}
              onClick={() => {
                if (card.sheetId !== 'model') {
                  setSelectedSheetId(card.sheetId);
                }
                setIsLightboxOpen(true);
              }}
              className="group flex flex-col cursor-pointer bg-white p-5 border border-[#E5E0D8] rounded-2xl shadow-xs hover:border-[#725C3A]/50 transition-all"
            >
              {/* Media Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#F8F6F0] border border-[#E5E0D8] rounded-xl mb-4">
                <ArchitecturalImage
                  src={card.image}
                  fallbackSrc={card.fallbackImage}
                  alt={card.title}
                  sheetTitle={card.title}
                  type={card.type}
                  className="w-full h-full p-2 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 text-[10px] font-mono tracking-wider px-2 py-1 text-white font-semibold rounded-md shadow-2xs z-10"
                  style={{ backgroundColor: card.accentColor }}
                >
                  {card.tag}
                </div>
              </div>

              {/* Card Meta & Typography */}
              <div className="flex flex-col">
                <span className="text-xs font-mono text-[#725C3A] font-bold tracking-widest mb-1">
                  {card.num}
                </span>

                <h3 className="font-condensed text-2xl font-bold text-[#2A2215] tracking-wide uppercase group-hover:text-[#725C3A] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs font-mono text-[#5C5243] mt-1.5 line-clamp-2 leading-relaxed">
                  {card.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-xs font-mono tracking-wider text-[#725C3A] group-hover:text-[#2A2215] font-bold transition-colors">
                  <span>VIEW INSPECTION</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform text-[#809671]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Drawing Sheet Selector & High-Resolution Viewer */}
        <div id="blueprint-details" className="pt-10 border-t border-[#E5E0D8]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#809671] uppercase block mb-1 font-bold">
                INTERACTIVE DRAWING ARCHIVE
              </span>
              <h3 className="font-condensed text-2xl sm:text-3xl font-bold text-[#2A2215] uppercase tracking-wider">
                실제 기본 설계 도면 시트 탐색기 (6 SHEETS)
              </h3>
            </div>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="self-start sm:self-auto px-4 py-2 text-xs font-mono arch-btn-earth flex items-center gap-2 cursor-pointer font-semibold rounded-lg"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#809671]" />
              <span>전체화면 정밀 검토</span>
            </button>
          </div>

          {/* Sheets Navigation Bar in Matcha and Almond */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
            {drawingSheets.map((sheet) => {
              const isSelected = sheet.id === selectedSheetId;
              return (
                <button
                  key={sheet.id}
                  onClick={() => {
                    setSelectedSheetId(sheet.id);
                    handleResetZoom();
                  }}
                  className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2.5 rounded-xl border ${
                    isSelected
                      ? 'bg-[#809671] text-white border-[#809671] font-bold shadow-xs'
                      : 'bg-white hover:bg-[#E5E0D8] text-[#5C5243] hover:text-[#2A2215] border-[#E5E0D8]'
                  }`}
                >
                  <span className="text-[10px] opacity-80">P.0{sheet.pageNumber}</span>
                  <span>{sheet.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Sheet Display Canvas */}
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-white border border-[#E5E0D8] p-3 sm:p-6 flex items-center justify-center cursor-zoom-in group mb-8 shadow-sm">
            <ArchitecturalImage
              src={currentSheet.imageSrc}
              fallbackSrc={currentSheet.fallbackSrc}
              alt={currentSheet.name}
              sheetPage={currentSheet.pageNumber}
              sheetTitle={currentSheet.name}
              type={currentSheet.category === 'SECTION' ? 'section' : 'plan'}
              className="w-full h-full filter contrast-[1.05]"
              onClick={() => setIsLightboxOpen(true)}
            />

            {/* Click to expand overlay */}
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-5 right-5 z-10 bg-[#2A2215]/85 backdrop-blur-md text-white text-[11px] font-mono tracking-wider px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2 transition-all group-hover:bg-[#2A2215]"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#B3B792]" />
              <span>도면 클릭 시 돋보기 확대 검토</span>
            </div>
          </div>

          {/* Active Sheet Annotation Strip */}
          <div className="p-6 bg-white border border-[#E5E0D8] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono shadow-2xs">
            <div>
              <span className="text-[#809671] block text-[10px] uppercase tracking-wider mb-1 font-bold">
                SHEET 0{currentSheet.pageNumber} / {currentSheet.category}
              </span>
              <p className="text-[#2A2215] font-semibold text-sm">
                {currentSheet.name} : <span className="font-normal text-[#5C5243]">{currentSheet.desc}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <a
                href={pdfFilePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#725C3A] hover:text-[#2A2215] hover:underline flex items-center gap-1.5 font-bold"
              >
                <span>원본 PDF 전체 보기</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#809671]" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* High-Resolution Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#2A2215]/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Header */}
          <div 
            className="w-full max-w-7xl flex items-center justify-between text-white pb-4 border-b border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#B3B792] uppercase block font-bold">
                AUTHENTIC ARCHITECTURAL INSPECTOR
              </span>
              <h3 className="font-condensed text-xl sm:text-2xl font-bold text-white tracking-wide uppercase">
                {currentSheet.name} (P.0{currentSheet.pageNumber})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomIn}
                className="p-2.5 text-white hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
                title="확대 (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2.5 text-white hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
                title="축소 (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2.5 text-white hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
                title="초기화"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 text-white hover:bg-red-500/80 rounded-lg border border-white/20 transition-colors ml-2"
                title="닫기 (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Drawing Stage */}
          <div 
            className="w-full max-w-7xl flex-1 flex items-center justify-center overflow-auto my-4 cursor-default p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              style={{ transform: `scale(${zoomLevel})` }}
              className="transition-transform duration-200 origin-center max-w-full max-h-full bg-white p-3 sm:p-6 rounded-xl shadow-2xl flex items-center justify-center min-w-[320px] min-h-[220px]"
            >
              <ArchitecturalImage
                src={currentSheet.imageSrc}
                fallbackSrc={currentSheet.fallbackSrc}
                alt={currentSheet.name}
                sheetPage={currentSheet.pageNumber}
                sheetTitle={currentSheet.name}
                type={currentSheet.category === 'SECTION' ? 'section' : 'plan'}
                priority={true}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div 
            className="w-full max-w-7xl text-xs font-mono text-[#E5D2B8] pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span>{currentSheet.desc}</span>
              <span className="ml-2 text-white">({Math.round(zoomLevel * 100)}%)</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href={pdfFilePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D2AB80] hover:underline flex items-center gap-1.5"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>PDF 다운로드</span>
              </a>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="text-neutral-300 hover:text-white"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
