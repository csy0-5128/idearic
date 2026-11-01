import React, { useState } from 'react';
import { 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  Trees, 
  Home, 
  Wind, 
  Compass, 
  FileDown, 
  Layers, 
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { DrawingSheet } from '../types/dialogue';

export const ProjectSection: React.FC = () => {
  // 6 Authentic Drawing Sheets from User's Uploaded PDF
  const drawingSheets = [
    {
      id: 'section',
      name: '단면도 (대표 도면)',
      category: 'SECTION',
      pageNumber: 2,
      imageSrc: '/assets/drawings/drawing_page_02.png',
      desc: '경사지 수목과 외부테라스 1·2, 내부테라스 1, 중앙공간 및 거주 볼륨의 수직적 위계와 바람길'
    },
    {
      id: 'site-plan',
      name: '배치도',
      category: 'SITE PLAN',
      pageNumber: 1,
      imageSrc: '/assets/drawings/drawing_page_01.png',
      desc: '경사지 등고선과 도로망, 대지 내 건축물과 테라스 배치를 나타낸 대지 배치도'
    },
    {
      id: 'slope-1f',
      name: '경사 1층 평면도',
      category: 'PLAN',
      pageNumber: 3,
      imageSrc: '/assets/drawings/drawing_page_03.png',
      desc: '수목 사이로 열린 최하단 외부테라스2 및 경사 진입 계단 구조'
    },
    {
      id: 'slope-2f',
      name: '경사 2층 평면도',
      category: 'PLAN',
      pageNumber: 4,
      imageSrc: '/assets/drawings/drawing_page_04.png',
      desc: '경사면과 유기적으로 맞물리는 내부테라스1 및 층간 연계 계단'
    },
    {
      id: '1f',
      name: '1층 평면도',
      category: 'PLAN',
      pageNumber: 5,
      imageSrc: '/assets/drawings/drawing_page_05.png',
      desc: '현관, 중앙공간, 그리고 대형 외부테라스1로 구성된 주 생활 공간'
    },
    {
      id: '2f',
      name: '2층 평면도',
      category: 'PLAN',
      pageNumber: 6,
      imageSrc: '/assets/drawings/drawing_page_06.png',
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

  // 3 Selected Project Focus Cards matching the 3-column grid in reference image
  const showcaseCards = [
    {
      num: '01',
      sheetId: 'section',
      title: '단면도 (대표 도면)',
      subtitle: '경사지 생태 건축 기본 설계 · 수목 보존 및 테라스 일체화',
      tag: 'SECTION DRAWING',
      image: '/assets/drawings/drawing_page_02.png'
    },
    {
      num: '02',
      sheetId: 'site-plan',
      title: '대지 배치도',
      subtitle: '경사지 등고선 분석 및 도로망 순응형 입체 배치 계획',
      tag: 'SITE CONTOUR PLAN',
      image: '/assets/drawings/drawing_page_01.png'
    },
    {
      num: '03',
      sheetId: 'model',
      title: '입체 공간 스터디 모형',
      subtitle: '경사면 테라스와 캔틸레버 옥상 녹화의 입체 볼륨 스터디',
      tag: 'PHYSICAL STUDY MODEL',
      image: '/src/assets/images/hillside_architecture_model_1793260635825.jpg'
    }
  ];

  return (
    <section id="project" className="py-24 sm:py-32 bg-[#0D0E11] text-white border-b border-white/10 relative overflow-hidden">
      
      {/* Background Dark Architectural Grid */}
      <div className="absolute inset-0 architectural-dark-grid opacity-30 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header Strip: SELECTED WORK ──────── VIEW ALL PROJECTS → */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14 pb-4 border-b border-white/10 text-xs font-mono tracking-[0.25em] uppercase text-neutral-400">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold">SELECTED WORK</span>
            <span className="w-16 sm:w-24 h-px bg-white/20"></span>
            <span className="text-neutral-500 hidden md:inline">AUTHENTIC ARCHITECTURAL SCHEMATICS</span>
          </div>

          <a
            href="#blueprint-details"
            className="hover:text-white transition-colors flex items-center gap-2 text-white font-medium group"
          >
            <span>VIEW ALL 6 DRAWING SHEETS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Project Title & Manifesto Card (Verbatim User Prompt Requirements) */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase mb-3">
            <span>REPRESENTATIVE PROJECT</span>
            <span className="text-white/30">/</span>
            <span className="text-white font-medium">바람이 통하는 집</span>
          </div>

          <h2 className="font-condensed text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-none mb-6">
            HOUSE WHERE THE WIND PASSES.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-6 text-balance">
            경사지 나무의 생태적 특성과 관련 논문을 바탕으로, 나무에게는 수평적 성장 환경을 제공하고 인간에게는 테라스와 지붕이 되는 공간을 설계한 건축 기본 설계 프로젝트. (첨부된 단면도 도면 기반 구조 반영)
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span>검증된 실제 건축 도면집 (PDF 총 6면)</span>
            </span>
            <a
              href={pdfFilePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline flex items-center gap-1.5 font-semibold"
            >
              <FileDown className="w-3.5 h-3.5 text-white" />
              <span>원본 PDF 열기 / 다운로드</span>
            </a>
          </div>
        </div>

        {/* 3-Column Architectural Cards Grid (matching the reference image layout) */}
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
              className="group flex flex-col cursor-pointer"
            >
              {/* Media Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#14161C] border border-white/15 mb-4 group-hover:border-white/50 transition-colors">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain p-4 filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute top-3 right-3 text-[10px] font-mono tracking-wider bg-black/70 backdrop-blur-xs px-2 py-1 text-neutral-300 border border-white/10">
                  {card.tag}
                </div>
              </div>

              {/* Card Meta & Typography matching reference */}
              <div className="flex flex-col">
                <span className="text-xs font-mono text-neutral-500 tracking-widest mb-1">
                  {card.num}
                </span>

                <h3 className="font-condensed text-2xl font-bold text-white tracking-wide uppercase group-hover:text-neutral-200 transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs font-mono text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {card.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                  <span>VIEW INSPECTION</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Drawing Sheet Selector & High-Resolution Viewer */}
        <div id="blueprint-details" className="pt-10 border-t border-white/10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1">
                INTERACTIVE DRAWING ARCHIVE
              </span>
              <h3 className="font-condensed text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
                실제 기본 설계 도면 시트 탐색기 (6 SHEETS)
              </h3>
            </div>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="self-start sm:self-auto px-4 py-2 text-xs font-mono text-white arch-btn flex items-center gap-2 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>전체화면 정밀 검토</span>
            </button>
          </div>

          {/* Sheets Navigation Bar */}
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
                  className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2.5 border ${
                    isSelected
                      ? 'bg-white text-black border-white font-bold shadow-md'
                      : 'bg-[#14161C] hover:bg-[#1A1D24] text-neutral-400 hover:text-white border-white/15'
                  }`}
                >
                  <span className="text-[10px] opacity-70">P.0{sheet.pageNumber}</span>
                  <span>{sheet.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Sheet Display Canvas */}
          <div className="relative aspect-16/9 rounded-none overflow-hidden bg-[#12141A] border border-white/15 p-4 sm:p-8 flex items-center justify-center cursor-zoom-in group mb-8 shadow-2xl">
            <img
              src={currentSheet.imageSrc}
              alt={currentSheet.name}
              onClick={() => setIsLightboxOpen(true)}
              className="w-full h-full object-contain filter contrast-[1.08] transition-transform duration-500 group-hover:scale-[1.01]"
            />

            {/* Click to expand overlay */}
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-5 right-5 bg-black/85 backdrop-blur-md text-white text-[11px] font-mono tracking-wider px-4 py-2 border border-white/20 flex items-center gap-2 transition-all group-hover:border-white"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>도면 클릭 시 돋보기 확대 검토</span>
            </div>
          </div>

          {/* Active Sheet Annotation Strip */}
          <div className="p-6 bg-[#14161C] border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider mb-1">
                SHEET 0{currentSheet.pageNumber} / {currentSheet.category}
              </span>
              <p className="text-white font-semibold text-sm">
                {currentSheet.name} : <span className="font-normal text-neutral-300">{currentSheet.desc}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <a
                href={pdfFilePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline flex items-center gap-1.5"
              >
                <span>원본 PDF 전체 보기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* High-Resolution Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Header */}
          <div 
            className="w-full max-w-7xl flex items-center justify-between text-white pb-4 border-b border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase block">
                AUTHENTIC ARCHITECTURAL INSPECTOR
              </span>
              <h3 className="font-condensed text-xl sm:text-2xl font-bold text-white tracking-wide uppercase">
                {currentSheet.name} (P.0{currentSheet.pageNumber})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomIn}
                className="p-2.5 text-white hover:bg-white/20 border border-white/20 transition-colors"
                title="확대 (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2.5 text-white hover:bg-white/20 border border-white/20 transition-colors"
                title="축소 (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2.5 text-white hover:bg-white/20 border border-white/20 transition-colors"
                title="초기화"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 text-white hover:bg-red-500/80 border border-white/20 transition-colors ml-2"
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
              className="transition-transform duration-200 origin-center max-w-full max-h-full bg-white p-4 sm:p-8 shadow-2xl"
            >
              <img
                src={currentSheet.imageSrc}
                alt={currentSheet.name}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div 
            className="w-full max-w-7xl text-xs font-mono text-neutral-400 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2"
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
                className="text-white hover:underline flex items-center gap-1.5"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>PDF 다운로드</span>
              </a>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="text-neutral-400 hover:text-white"
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
