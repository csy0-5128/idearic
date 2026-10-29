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
  ExternalLink
} from 'lucide-react';

interface DrawingSheet {
  id: string;
  name: string;
  category: string;
  pageNumber: number;
  imageSrc: string;
  desc: string;
}

export const ProjectSection: React.FC = () => {
  // Full drawing sheets from user's uploaded PDF
  const drawingSheets: DrawingSheet[] = [
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

  // Structural insights directly derived from the user's authentic Section Drawing (page 2)
  const sectionPoints = [
    {
      id: 'point-1',
      title: '외부테라스 2 (경사 1층 레벨)',
      badge: '수목 성장 환경',
      desc: '대지 최하단 자생 수목 줄기와 가지가 자연스럽게 수평 및 상부로 뻗어나갈 수 있도록 독립 기둥 구조로 공중에 띄운 개방형 테라스입니다.',
      icon: Trees
    },
    {
      id: 'point-2',
      title: '내부테라스 1 (경사 2층 레벨)',
      badge: '입체 완충 공간',
      desc: '경사면 단차를 따라 하부 외부테라스2와 상부 1층을 잇는 중간 완충 지대로, 거주자에게 숲속 풍경을 실내외 경계 없이 선사합니다.',
      icon: Home
    },
    {
      id: 'point-3',
      title: '외부테라스 1 & 지붕 일체화 (1층)',
      badge: '테라스 및 지붕',
      desc: '1층 중앙공간과 직결되는 넓은 외부테라스1은 하부 공간의 지붕이자 상부 2층에서는 외부 조망 데크로 기능하는 복합 입체 구조입니다.',
      icon: Compass
    },
    {
      id: 'point-4',
      title: '중앙공간 수직 보이드 & 바람길 (1~2층)',
      badge: '자연 대류 환기',
      desc: '경사면을 따라 불어오는 산곡풍이 하부 테라스와 계단을 통해 유입되고 중앙 보이드(1층~2층)를 거쳐 상부로 순환 배출되는 자연 환기 구조입니다.',
      icon: Wind
    }
  ];

  return (
    <section id="project" className="py-24 md:py-32 bg-[#EBE7DF] border-b border-[#D8D2C5] relative overflow-hidden">
      
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 architectural-grid opacity-60 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Section Top Header (styled like "why vela armon" in reference image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[#DFDACF]">
          
          <div className="lg:col-span-8">
            <span className="text-[11px] font-mono tracking-widest text-[#B88E68] uppercase block mb-2">
              REPRESENTATIVE SCHEMATIC PROJECT
            </span>

            {/* Giant Stylized Typography (matching "why vela armon" dual-tone typography) */}
            <div className="flex flex-col">
              <span className="font-syne text-5xl sm:text-7xl md:text-8xl font-extrabold text-[#1C1E22] leading-none tracking-tight">
                wind house
              </span>
              <span className="font-syne text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#B88E68] leading-none tracking-tight -mt-1 sm:-mt-2">
                바람이 통하는 집
              </span>
            </div>

            {/* Korean Prompt Subtitle */}
            <p className="text-sm sm:text-base font-mono text-[#5C5F66] mt-3">
              경사지 생태 건축 설계 · Hillside Ecological Architecture
            </p>
          </div>

          <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-6 text-right">
            <div className="text-left lg:text-right text-xs font-mono text-[#5C5F66]">
              <p className="text-[#1C1E22] font-semibold">증거 자료</p>
              <p>실제 건축 기본 설계 도면집 (6 Sheets)</p>
            </div>
            <span className="font-mono text-2xl text-[#B88E68] font-light select-none">///</span>
          </div>

        </div>

        {/* Verbatim Prompt Description Card */}
        <div className="max-w-4xl mb-12 bg-white/75 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/80 shadow-xs">
          <p className="text-base sm:text-lg md:text-xl text-[#1C1E22] leading-relaxed font-normal text-balance">
            경사지 나무의 생태적 특성과 관련 논문을 바탕으로, 나무에게는 수평적 성장 환경을 제공하고 인간에게는 테라스와 지붕이 되는 공간을 설계한 건축 기본 설계 프로젝트. (첨부된 단면도 도면 기반 구조 반영)
          </p>

          <div className="mt-4 pt-4 border-t border-[#DFDACF]/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#5C5F66]">
            <span className="flex items-center gap-1.5 text-[#1C1E22] font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#B88E68]" />
              <span>실제 프로젝트 기본 설계 도면 전체 수록 (단면도, 배치도, 평면도)</span>
            </span>
            <a
              href={pdfFilePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1C1E22] hover:text-[#B88E68] font-semibold flex items-center gap-1 underline underline-offset-4"
            >
              <span>도면집 원본 PDF 다운로드 / 열기</span>
              <FileDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Drawing Sheets Navigation Bar (Segmented Controls) */}
        <div className="mb-6">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DFDACF]">
            <span className="text-xs font-mono text-[#5C5F66] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#B88E68]" />
              <span>도면 시트 선택 (SELECT DRAWING SHEET)</span>
            </span>
            <span className="text-[11px] font-mono text-[#848A96]">
              현재 표시: {currentSheet.category} · {currentSheet.name} (P.0{currentSheet.pageNumber})
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {drawingSheets.map((sheet) => {
              const isSelected = sheet.id === selectedSheetId;
              return (
                <button
                  key={sheet.id}
                  onClick={() => {
                    setSelectedSheetId(sheet.id);
                    handleResetZoom();
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-[#1C1E22] text-white border-[#1C1E22] shadow-sm font-semibold'
                      : 'bg-white/70 hover:bg-white text-[#5C5F66] hover:text-[#1C1E22] border-white/80'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#C49B74]' : 'bg-neutral-300'}`}></span>
                  <span>{sheet.name}</span>
                  <span className="text-[10px] opacity-70">P.0{sheet.pageNumber}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Drawing Visual Canvas & Interactive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left/Center Drawing Stage */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Stage Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-white border border-white/90 shadow-md">
              
              {/* Drawing Title Header */}
              <div className="px-5 py-3.5 bg-[#F9F8F5] border-b border-[#DFDACF] flex items-center justify-between text-xs font-mono text-[#5C5F66]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-xs bg-[#B88E68]"></span>
                  <span className="font-bold text-[#1C1E22] tracking-wide">{currentSheet.name}</span>
                  <span className="text-[#848A96]">/ SHEET {currentSheet.pageNumber} OF 6</span>
                </div>
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="hover:text-[#1C1E22] flex items-center gap-1.5 font-semibold text-[#1C1E22] cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#B88E68]" />
                  <span>도면 확대 검토</span>
                </button>
              </div>

              {/* High-Resolution Drawing Canvas */}
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="relative aspect-4/3 sm:aspect-16/10 flex items-center justify-center p-4 sm:p-8 cursor-zoom-in group bg-[#FFFFFF]"
              >
                <img
                  src={currentSheet.imageSrc}
                  alt={`바람이 통하는 집 - ${currentSheet.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter contrast-[1.05] transition-transform duration-500 group-hover:scale-[1.01]"
                />

                {/* Floating zoom trigger banner */}
                <div className="absolute bottom-5 right-5 bg-[#1C1E22]/90 backdrop-blur-md text-white text-[11px] font-mono px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg group-hover:bg-[#1C1E22] transition-colors">
                  <Maximize2 className="w-3 h-3 text-[#C49B74]" />
                  <span>클릭하여 도면 고화질 확대 (라이트박스)</span>
                </div>
              </div>

              {/* Bottom Sheet Description */}
              <div className="px-5 py-3 bg-[#F9F8F5] border-t border-[#DFDACF] text-xs font-mono text-[#5C5F66] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="line-clamp-1 sm:line-clamp-none">
                  <strong className="text-[#1C1E22]">도면 설명:</strong> {currentSheet.desc}
                </p>
                <span className="text-[10px] text-[#848A96] shrink-0">
                  ARCHITECTURAL DRAWING SHEET
                </span>
              </div>

            </div>

            {/* Quick Helper to switch between Section & Plans */}
            <div className="flex items-center justify-between text-xs font-mono text-[#5C5F66] px-1">
              <span>{selectedSheetId === 'section' ? '★ 현재 대표 도면인 "단면도"를 보고 계십니다.' : '※ 상단 탭에서 "단면도 (대표 도면)"를 언제든 다시 확인하실 수 있습니다.'}</span>
              <a 
                href={pdfFilePath}
                target="_blank"
                rel="noopener noreferrer" 
                className="hover:text-[#1C1E22] underline underline-offset-2 flex items-center gap-1"
              >
                <span>원본 PDF 열기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Right Column: Floating Cushion Glass Cards with Section Structural Insights */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="pb-1 mb-1">
              <span className="text-[11px] font-mono tracking-widest text-[#B88E68] uppercase block">
                STRUCTURAL LOGIC
              </span>
              <h3 className="text-base font-bold text-[#1C1E22]">
                단면도 기반 핵심 구조 분석
              </h3>
              <p className="text-xs text-[#5C5F66] mt-0.5">
                도면(단면도 P.02)에 명시된 주요 실별 배치와 생태 기류 구조
              </p>
            </div>

            {sectionPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div 
                  key={point.id}
                  className="liquid-cushion-card rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 text-[#B88E68]">
                      <Icon className="w-4 h-4 stroke-[2]" />
                      <h4 className="text-xs sm:text-sm font-bold text-[#1C1E22]">
                        {point.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-[#5C5F66] bg-black/5 px-2 py-0.5 rounded">
                      {point.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C5F66] leading-relaxed pl-6">
                    {point.desc}
                  </p>
                </div>
              );
            })}

          </div>

        </div>

        {/* Drawing Spec Factsheet */}
        <div id="blueprint-details" className="bg-white/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/80 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#DFDACF]">
            <h4 className="text-xs font-mono font-bold text-[#1C1E22] uppercase tracking-wider">
              Project Drawing Specification · 도면집 정보
            </h4>
            <span className="text-xs font-mono text-[#848A96]">TOTAL 6 SHEETS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-mono">
            <div className="p-3 bg-white/70 rounded-xl border border-white/80">
              <span className="text-[#848A96] block text-[10px] mb-1">01. 배치도</span>
              <span className="font-semibold text-[#1C1E22] block">대지 및 도로 배치</span>
              <span className="text-[10px] text-[#5C5F66]">경사 지형 순응</span>
            </div>
            <div className="p-3 bg-[#1C1E22] text-white rounded-xl shadow-xs">
              <span className="text-[#C49B74] block text-[10px] mb-1">02. 단면도 (대표)</span>
              <span className="font-semibold text-white block">수직 계단식 단면</span>
              <span className="text-[10px] text-neutral-300">수목·테라스·바람길</span>
            </div>
            <div className="p-3 bg-white/70 rounded-xl border border-white/80">
              <span className="text-[#848A96] block text-[10px] mb-1">03. 경사 1층</span>
              <span className="font-semibold text-[#1C1E22] block">외부테라스 2</span>
              <span className="text-[10px] text-[#5C5F66]">최하단 수목 데크</span>
            </div>
            <div className="p-3 bg-white/70 rounded-xl border border-white/80">
              <span className="text-[#848A96] block text-[10px] mb-1">04. 경사 2층</span>
              <span className="font-semibold text-[#1C1E22] block">내부테라스 1</span>
              <span className="text-[10px] text-[#5C5F66]">중층 완충 테라스</span>
            </div>
            <div className="p-3 bg-white/70 rounded-xl border border-white/80">
              <span className="text-[#848A96] block text-[10px] mb-1">05. 지상 1층</span>
              <span className="font-semibold text-[#1C1E22] block">중앙공간·외부테라스1</span>
              <span className="text-[10px] text-[#5C5F66]">주 진입 거주층</span>
            </div>
            <div className="p-3 bg-white/70 rounded-xl border border-white/80">
              <span className="text-[#848A96] block text-[10px] mb-1">06. 지상 2층</span>
              <span className="font-semibold text-[#1C1E22] block">방1·방2·보이드</span>
              <span className="text-[10px] text-[#5C5F66]">상부 거주 볼륨</span>
            </div>
          </div>
        </div>

      </div>

      {/* High-Resolution Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-lg flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Toolbar */}
          <div 
            className="w-full max-w-6xl flex items-center justify-between text-white pb-3 border-b border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] font-mono text-[#C49B74] uppercase tracking-widest block">
                AUTHENTIC ARCHITECTURAL DRAWING INSPECTION
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-white">
                바람이 통하는 집 · {currentSheet.name} (Sheet P.0{currentSheet.pageNumber})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomIn}
                className="p-2 text-white hover:bg-white/20 rounded-md transition-colors"
                title="확대 (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 text-white hover:bg-white/20 rounded-md transition-colors"
                title="축소 (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 text-white hover:bg-white/20 rounded-md transition-colors"
                title="배율 초기화"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-white hover:bg-red-500/80 rounded-md transition-colors ml-2"
                title="닫기 (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Drawing Stage */}
          <div 
            className="w-full max-w-6xl flex-1 flex items-center justify-center overflow-auto my-4 cursor-default p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              style={{ transform: `scale(${zoomLevel})` }}
              className="transition-transform duration-200 origin-center max-w-full max-h-full bg-white rounded-lg p-3 sm:p-6 shadow-2xl"
            >
              <img
                src={currentSheet.imageSrc}
                alt={`바람이 통하는 집 - ${currentSheet.name}`}
                className="max-h-[72vh] w-auto object-contain"
              />
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div 
            className="w-full max-w-6xl text-xs font-mono text-neutral-400 pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span>{currentSheet.desc}</span>
              <span>· 배율: {Math.round(zoomLevel * 100)}%</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={pdfFilePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C49B74] hover:underline flex items-center gap-1 text-xs"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>PDF 전체 도면집 다운로드</span>
              </a>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="text-white hover:underline text-xs"
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
