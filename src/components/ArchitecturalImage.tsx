import React, { useState } from 'react';

interface ArchitecturalImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  type?: 'section' | 'site-plan' | 'plan' | 'model' | 'general';
  sheetPage?: number;
  sheetTitle?: string;
  onClick?: () => void;
}

export const ArchitecturalImage: React.FC<ArchitecturalImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  priority = false,
  type = 'general',
  sheetPage,
  sheetTitle,
  onClick,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If primary image fails, attempt fallback source first
  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    // Beautiful, authentic Architectural Schematic Fallback rendered natively in SVG
    return (
      <div 
        onClick={onClick}
        className={`w-full h-full min-h-[160px] bg-[#F2EFE8] flex flex-col items-center justify-center p-4 border border-[#725C3A]/20 relative overflow-hidden select-none ${className}`}
      >
        {/* Architectural Grid & Coordinate Lines */}
        <div className="absolute inset-0 architectural-earth-grid opacity-60 pointer-events-none"></div>

        <svg 
          viewBox="0 0 400 250" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-h-[85%] object-contain text-[#725C3A]"
        >
          {/* Topography Hillside Contour Lines */}
          <path d="M10 220 C 100 210, 180 180, 260 140 C 320 110, 370 90, 390 85" stroke="#725C3A" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <path d="M10 235 C 120 225, 200 195, 290 150 C 340 125, 380 105, 390 100" stroke="#725C3A" strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
          
          {/* Terraced Architecture Volumes */}
          <rect x="90" y="150" width="130" height="60" fill="#E5E0D8" stroke="#725C3A" strokeWidth="2" rx="2" />
          <rect x="150" y="110" width="120" height="50" fill="#F8F6F0" stroke="#809671" strokeWidth="2" rx="2" />
          <rect x="200" y="70" width="100" height="45" fill="#E5E0D8" stroke="#725C3A" strokeWidth="2" rx="2" />

          {/* Roof Greenery & Terraces */}
          <line x1="85" y1="150" x2="225" y2="150" stroke="#809671" strokeWidth="3" />
          <line x1="145" y1="110" x2="275" y2="110" stroke="#809671" strokeWidth="3" />
          <line x1="195" y1="70" x2="305" y2="70" stroke="#809671" strokeWidth="3" />

          {/* Natural Tree Form in Matcha Green */}
          <path d="M60 215 L60 170 C55 160 50 145 60 135 C70 125 80 140 75 155 C70 165 65 170 60 170" fill="#809671" fillOpacity="0.4" stroke="#809671" strokeWidth="1.5" />
          <path d="M330 115 L330 75 C325 65 315 50 330 40 C345 30 355 50 345 65 C340 75 335 75 330 75" fill="#809671" fillOpacity="0.4" stroke="#809671" strokeWidth="1.5" />

          {/* Architectural Dimension Lines & Arrows */}
          <line x1="30" y1="70" x2="30" y2="210" stroke="#725C3A" strokeWidth="1" />
          <line x1="25" y1="70" x2="35" y2="70" stroke="#725C3A" strokeWidth="1" />
          <line x1="25" y1="210" x2="35" y2="210" stroke="#725C3A" strokeWidth="1" />
          <text x="35" y="145" fill="#725C3A" fontSize="9" fontFamily="monospace">ΔH = 14.5M</text>

          {/* Air flow arrows (Wind house concept) */}
          <path d="M20 90 Q 120 70, 220 50" stroke="#809671" strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="225,50 215,46 217,54" fill="#809671" />

          {/* Title tag */}
          <text x="200" y="235" textAnchor="middle" fill="#725C3A" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
            {sheetTitle ? sheetTitle.toUpperCase() : 'IDEARIC ARCHITECTURAL SCHEMATIC'}
          </text>
        </svg>

        {/* Blueprint Label Badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded border border-[#E5E0D8] text-[9px] font-mono text-[#725C3A]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#809671]"></span>
          <span>{sheetPage ? `SHEET P.0${sheetPage}` : 'SCHEMATIC BLUEPRINT'}</span>
          <span className="text-[#827869] hidden sm:inline">· 생태 건축 도면 모드</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} onClick={onClick}>
      {/* Subtle loader shimmer behind image */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#F2EFE8] flex items-center justify-center animate-pulse">
          <div className="flex items-center gap-2 text-xs font-mono text-[#725C3A]/60">
            <span className="w-2 h-2 rounded-full bg-[#809671] animate-ping"></span>
            <span>도면 불러오는 중...</span>
          </div>
        </div>
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
