import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  FileDown, 
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight
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

  const currentSheetIndex = drawingSheets.findIndex((sheet) => sheet.id === selectedSheetId);
  const safeIndex = currentSheetIndex !== -1 ? currentSheetIndex : 0;
  const currentSheet = drawingSheets[safeIndex];
  const pdfFilePath = '/assets/aistudio/________b1c41d8d.pdf';

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 3.0));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.65));
  const handleResetZoom = () => setZoomLevel(1);

  const handleSelectSheet = (sheetId: string) => {
    setSelectedSheetId(sheetId);
    handleResetZoom();
  };

  const handlePrevSheet = () => {
    const prevIndex = (safeIndex - 1 + drawingSheets.length) % drawingSheets.length;
    setSelectedSheetId(drawingSheets[prevIndex].id);
    handleResetZoom();
  };

  const handleNextSheet = () => {
    const nextIndex = (safeIndex + 1) % drawingSheets.length;
    setSelectedSheetId(drawingSheets[nextIndex].id);
    handleResetZoom();
  };

  // Keyboard navigation when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrevSheet();
      } else if (e.key === 'ArrowRight') {
        handleNextSheet();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, safeIndex]);

  // 3 Selected Focus Cards in Swatch Palette with reliable web asset paths
  const showcaseCards = [
    {
      num: '01',
      sheetId: 'section',
      title: '단면도 (대표 도면)',
      subtitle: '경사지 생태 건축 기본 설계 · 수목 보존 및 테라스 일체화',
      tag: 'SECTION DRAWING',
      accentColor: '#465839', // Caretta Green
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
      accentColor: '#A88153', // Peru Oak
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
      accentColor: '#313639', // Dolphin Grey
      image: '/assets/images/hillside_model_web.jpg',
      fallbackImage: '/assets/images/hillside_architecture_model_1793260635825.jpg',
      type: 'model' as const,
    }
  ];

  return (
    <section id="project" className="py-24 sm:py-32 bg-[#EFECE6] text-[#222628] border-b border-[#313639]/15 relative overflow-hidden">
      
      {/* Background Subtle Earth Pattern */}
      <div className="absolute inset-0 architectural-earth-grid opacity-60 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header Strip: SELECTED WORK ──────── VIEW ALL PROJECTS → */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14 pb-4 border-b border-[#313639]/15 text-xs font-mono tracking-[0.25em] uppercase text-[#58514C]">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#222628]">SELECTED WORK</span>
            <span className="w-16 sm:w-24 h-px bg-[#313639]/30"></span>
            <span className="text-[#465839] font-semibold hidden md:inline">AUTHENTIC ARCHITECTURAL SCHEMATICS</span>
          </div>

          <a
            href="#blueprint-details"
            className="hover:text-[#222628] transition-colors flex items-center gap-2 text-[#313639] font-semibold group"
          >
            <span>VIEW ALL 6 DRAWING SHEETS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Project Title & Manifesto Card (Verbatim User Prompt Requirements) */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#465839] uppercase mb-3 font-semibold">
            <span>REPRESENTATIVE PROJECT</span>
            <span className="text-[#A88153]">/</span>
            <span className="text-[#313639] font-bold">바람이 통하는 집</span>
          </div>

          <h2 className="font-condensed text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#222628] uppercase leading-none mb-6">
            HOUSE WHERE THE WIND PASSES.
          </h2>

          <p className="text-base sm:text-lg text-[#58514C] font-normal leading-relaxed mb-6 text-balance">
            경사지 나무의 생태적 특성과 관련 논문을 바탕으로, 나무에게는 수평적 성장 환경을 제공하고 인간에게는 테라스와 지붕이 되는 공간을 설계한 건축 기본 설계 프로젝트. (첨부된 단면도 도면 기반 구조 반영)
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#58514C]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#465839]"></span>
              <span className="font-semibold text-[#222628]">검증된 실제 건축 도면집 (PDF 총 6면)</span>
            </span>
            <a
              href={pdfFilePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#313639] hover:text-[#465839] hover:underline flex items-center gap-1.5 font-bold"
            >
              <FileDown className="w-3.5 h-3.5 text-[#465839]" />
              <span>원본 PDF 열기 / 다운로드</span>
            </a>
          </div>
        </div>

        {/* Social Proof Architectural Metrics Section (Zero-Pill Discipline) */}
        <div className="mb-16">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#313639]/15">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-[#465839]"></span>
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#313639] font-bold">
                KEY PERFORMANCE & SOCIAL PROOF · 핵심 지표
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#58514C] hidden sm:inline">
              철학적 리서치와 도면 결과물 기반의 실증된 기획 데이터
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Metric 1: Projects Completed */}
            <div className="bg-white p-6 border border-[#313639]/15 shadow-xs hover:border-[#465839] transition-all group relative overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-widest text-[#58514C]">
                <span className="text-[#465839] font-bold">PORTFOLIO // 01</span>
                <span>COMPLETED</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold text-[#222628] tracking-tight group-hover:text-[#465839] transition-colors">
                  1
                </span>
                <span className="text-sm font-mono font-semibold text-[#465839]">Project</span>
              </div>
              <h4 className="text-sm font-bold text-[#222628] tracking-wide mb-1.5 uppercase font-condensed">
                Projects Completed
              </h4>
              <p className="text-[11px] font-mono text-[#58514C] leading-relaxed">
                경사지 생태 건축 '바람이 통하는 집' 기본설계 및 6면 마스터 도면집 완성
              </p>
            </div>

            {/* Metric 2: Years of Experience */}
            <div className="bg-white p-6 border border-[#313639]/15 shadow-xs hover:border-[#A88153] transition-all group relative overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-widest text-[#58514C]">
                <span className="text-[#A88153] font-bold">PRACTICE // 02</span>
                <span>RESEARCH</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold text-[#222628] tracking-tight group-hover:text-[#A88153] transition-colors">
                  4+
                </span>
                <span className="text-sm font-mono font-semibold text-[#A88153]">Years</span>
              </div>
              <h4 className="text-sm font-bold text-[#222628] tracking-wide mb-1.5 uppercase font-condensed">
                Years of Experience
              </h4>
              <p className="text-[11px] font-mono text-[#58514C] leading-relaxed">
                건축학 전공 및 공간 리서치·철학적 개념화 실무 연구 집중 기간
              </p>
            </div>

            {/* Metric 3: Concepts Developed */}
            <div className="bg-white p-6 border border-[#313639]/15 shadow-xs hover:border-[#58514C] transition-all group relative overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-widest text-[#58514C]">
                <span className="text-[#58514C] font-bold">FRAMEWORKS // 03</span>
                <span>PHILOSOPHY</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold text-[#222628] tracking-tight group-hover:text-[#313639] transition-colors">
                  12+
                </span>
                <span className="text-sm font-mono font-semibold text-[#58514C]">Concepts</span>
              </div>
              <h4 className="text-sm font-bold text-[#222628] tracking-wide mb-1.5 uppercase font-condensed">
                Concepts Developed
              </h4>
              <p className="text-[11px] font-mono text-[#58514C] leading-relaxed">
                대지 순응, 수목 성장 순응, 테라스-지붕 일체화 등 공간 기획 프레임워크
              </p>
            </div>

            {/* Metric 4: Drawing Sheets Delivered */}
            <div className="bg-white p-6 border border-[#313639]/15 shadow-xs hover:border-[#313639] transition-all group relative overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-widest text-[#58514C]">
                <span className="text-[#313639] font-bold">SCHEMATICS // 04</span>
                <span>AUTHENTIC</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold text-[#222628] tracking-tight group-hover:text-[#465839] transition-colors">
                  6
                </span>
                <span className="text-sm font-mono font-semibold text-[#465839]">Sheets</span>
              </div>
              <h4 className="text-sm font-bold text-[#222628] tracking-wide mb-1.5 uppercase font-condensed">
                Drawing Sheets Delivered
              </h4>
              <p className="text-[11px] font-mono text-[#58514C] leading-relaxed">
                배치도·단면도·층별 평면도 100% 자체 도면화 및 공학적 핀업 검증 완료
              </p>
            </div>
          </div>
        </div>

        {/* 3-Column Architectural Cards Grid in Moodboard Harmony */}
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
              className="group flex flex-col cursor-pointer bg-white p-5 border border-[#313639]/15 shadow-xs hover:border-[#313639] transition-all rounded-3xl"
            >
              {/* Media Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#F7F6F2] border border-[#313639]/15 mb-4 rounded-2xl">
                <ArchitecturalImage
                  src={card.image}
                  fallbackSrc={card.fallbackImage}
                  alt={card.title}
                  sheetTitle={card.title}
                  type={card.type}
                  className="w-full h-full p-2 group-hover:scale-105 transition-transform duration-700"
                />
                <div 
                  className="absolute top-3 right-3 text-[10px] font-mono tracking-wider px-2.5 py-1 text-white font-semibold z-10 rounded-lg shadow-2xs"
                  style={{ backgroundColor: card.accentColor }}
                >
                  {card.tag}
                </div>
              </div>

              {/* Card Meta & Typography */}
              <div className="flex flex-col">
                <span className="text-xs font-mono text-[#A88153] font-bold tracking-widest mb-1">
                  {card.num}
                </span>

                <h3 className="font-condensed text-2xl font-bold text-[#222628] tracking-wide uppercase group-hover:text-[#465839] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs font-mono text-[#58514C] mt-1.5 line-clamp-2 leading-relaxed">
                  {card.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-[#313639]/10 flex items-center justify-between text-xs font-mono tracking-wider text-[#313639] group-hover:text-[#465839] font-bold transition-colors">
                  <span>VIEW INSPECTION</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform text-[#465839]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Drawing Sheet Selector & High-Resolution Viewer */}
        <div id="blueprint-details" className="pt-10 border-t border-[#313639]/15">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#465839] uppercase block mb-1 font-bold">
                INTERACTIVE DRAWING ARCHIVE
              </span>
              <h3 className="font-condensed text-2xl sm:text-3xl font-bold text-[#222628] uppercase tracking-wider">
                실제 기본 설계 도면 시트 탐색기 (6 SHEETS)
              </h3>
            </div>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="self-start sm:self-auto px-4 py-2 text-xs font-mono arch-btn-outline flex items-center gap-2 cursor-pointer font-semibold rounded-xl"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#465839]" />
              <span>전체화면 정밀 검토</span>
            </button>
          </div>

          {/* Sheets Navigation Bar in Caretta & Dolphin */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
            {drawingSheets.map((sheet) => {
              const isSelected = sheet.id === selectedSheetId;
              return (
                <button
                  key={sheet.id}
                  onClick={() => handleSelectSheet(sheet.id)}
                  className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2.5 border rounded-xl ${
                    isSelected
                      ? 'bg-[#465839] text-white border-[#37472D] font-bold shadow-xs'
                      : 'bg-white hover:bg-[#EFECE6] text-[#58514C] hover:text-[#222628] border-[#313639]/15'
                  }`}
                >
                  <span className="text-[10px] opacity-75">P.0{sheet.pageNumber}</span>
                  <span>{sheet.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Sheet Display Canvas (Clicking opens fullscreen) */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="relative aspect-16/9 overflow-hidden bg-white border border-[#313639]/15 p-3 sm:p-6 flex items-center justify-center cursor-zoom-in group mb-8 shadow-sm rounded-3xl"
          >
            <ArchitecturalImage
              key={`main-${currentSheet.id}`}
              src={currentSheet.imageSrc}
              fallbackSrc={currentSheet.fallbackSrc}
              alt={currentSheet.name}
              sheetPage={currentSheet.pageNumber}
              sheetTitle={currentSheet.name}
              type={currentSheet.category === 'SECTION' ? 'section' : 'plan'}
              className="w-full h-full filter contrast-[1.05]"
            />

            {/* Click to expand overlay */}
            <div 
              className="absolute bottom-5 right-5 z-10 bg-[#222628]/90 backdrop-blur-md text-white text-[11px] font-mono tracking-wider px-4 py-2 border border-white/20 flex items-center gap-2 transition-all hover:bg-[#222628] rounded-xl shadow-lg pointer-events-none"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#C49D6C]" />
              <span>도면 클릭 시 전체화면 정밀 검토</span>
            </div>
          </div>

          {/* Active Sheet Annotation Strip */}
          <div className="p-6 bg-white border border-[#313639]/15 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono shadow-xs rounded-2xl">
            <div>
              <span className="text-[#465839] block text-[10px] uppercase tracking-wider mb-1 font-bold">
                SHEET 0{currentSheet.pageNumber} / {currentSheet.category}
              </span>
              <p className="text-[#222628] font-semibold text-sm">
                {currentSheet.name} : <span className="font-normal text-[#58514C]">{currentSheet.desc}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <a
                href={pdfFilePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#313639] hover:text-[#465839] hover:underline flex items-center gap-1.5 font-bold"
              >
                <span>원본 PDF 전체 보기</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#465839]" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* High-Resolution Fullscreen Lightbox Modal with Multi-Sheet Navigation */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#222628]/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Top Header */}
          <div 
            className="w-full max-w-7xl flex flex-col gap-3 text-white pb-3 border-b border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#C49D6C] uppercase block font-bold">
                  AUTHENTIC ARCHITECTURAL INSPECTOR · 전체화면 도면 뷰어
                </span>
                <h3 className="font-condensed text-xl sm:text-2xl font-bold text-white tracking-wide uppercase">
                  {currentSheet.name} (P.0{currentSheet.pageNumber})
                </h3>
              </div>

              {/* Top Zoom & Close Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomIn}
                  className="p-2.5 text-white hover:bg-white/20 border border-white/20 transition-colors rounded-xl cursor-pointer"
                  title="확대 (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-2.5 text-white hover:bg-white/20 border border-white/20 transition-colors rounded-xl cursor-pointer"
                  title="축소 (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-2.5 text-white hover:bg-white/20 border border-white/20 transition-colors rounded-xl cursor-pointer"
                  title="초기화"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2.5 text-white hover:bg-red-500/80 border border-white/20 transition-colors ml-2 rounded-xl cursor-pointer"
                  title="닫기 (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Sheet Selector Navigation Tabs inside Fullscreen Modal */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {drawingSheets.map((sheet) => {
                const isSelected = sheet.id === currentSheet.id;
                return (
                  <button
                    key={sheet.id}
                    onClick={() => handleSelectSheet(sheet.id)}
                    className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 rounded-xl border ${
                      isSelected
                        ? 'bg-[#465839] text-white border-[#465839] font-bold shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white border-white/15'
                    }`}
                  >
                    <span className="text-[10px] opacity-75">P.0{sheet.pageNumber}</span>
                    <span>{sheet.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lightbox Drawing Stage with Floating Prev / Next Navigation Arrows */}
          <div 
            className="relative w-full max-w-7xl flex-1 flex items-center justify-center overflow-auto my-3 cursor-default p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating Previous Sheet Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevSheet();
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 bg-[#222628]/90 hover:bg-[#465839] text-white rounded-full border border-white/25 shadow-2xl transition-all cursor-pointer group flex items-center gap-2"
              title="이전 도면 보기 (←)"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden lg:inline text-xs font-mono pr-1">이전 도면</span>
            </button>

            {/* Floating Next Sheet Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextSheet();
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 bg-[#222628]/90 hover:bg-[#465839] text-white rounded-full border border-white/25 shadow-2xl transition-all cursor-pointer group flex items-center gap-2"
              title="다음 도면 보기 (→)"
            >
              <span className="hidden lg:inline text-xs font-mono pl-1">다음 도면</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Drawing Image Stage */}
            <div 
              style={{ transform: `scale(${zoomLevel})` }}
              className="transition-transform duration-200 origin-center max-w-full max-h-full bg-white p-3 sm:p-6 shadow-2xl flex items-center justify-center min-w-[320px] min-h-[220px] rounded-2xl"
            >
              <ArchitecturalImage
                key={`lightbox-${currentSheet.id}`}
                src={currentSheet.imageSrc}
                fallbackSrc={currentSheet.fallbackSrc}
                alt={currentSheet.name}
                sheetPage={currentSheet.pageNumber}
                sheetTitle={currentSheet.name}
                type={currentSheet.category === 'SECTION' ? 'section' : 'plan'}
                priority={true}
                className="max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>

          {/* Modal Footer Controls with Sheet Navigator */}
          <div 
            className="w-full max-w-7xl text-xs font-mono text-[#EFECE6] pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Description & Zoom */}
            <div className="flex items-center gap-2">
              <span className="text-[#C49D6C] font-bold">P.0{currentSheet.pageNumber} / 06</span>
              <span className="text-white/30">|</span>
              <span className="line-clamp-1">{currentSheet.desc}</span>
              <span className="ml-1 text-white/80">({Math.round(zoomLevel * 100)}%)</span>
            </div>

            {/* Center Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevSheet}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-mono text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
                title="이전 도면으로 이동"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#C49D6C]" />
                <span>이전 도면</span>
              </button>
              <button
                onClick={handleNextSheet}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-mono text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
                title="다음 도면으로 이동"
              >
                <span>다음 도면</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C49D6C]" />
              </button>
            </div>

            {/* Download & Close */}
            <div className="flex items-center gap-5">
              <a
                href={pdfFilePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C49D6C] hover:underline flex items-center gap-1.5"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>PDF 다운로드</span>
              </a>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-neutral-300 hover:text-white cursor-pointer transition-colors"
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
