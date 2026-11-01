import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowRight, MessageSquare, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const verifiedEmail = 'csy50533394@gmail.com';
  const [copied, setCopied] = useState(false);

  const [senderName, setSenderName] = useState('');
  const [topic, setTopic] = useState('공간 기획 및 프로젝트 시작점 논의');
  const [message, setMessage] = useState('');
  const [showHelper, setShowHelper] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(verifiedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const topicOptions = [
    '공간 기획 및 프로젝트 시작점 논의',
    '경사지 및 생태 건축 리서치 협업',
    '새로운 디자인 컨셉 방향성 브레인스토밍',
    '기타 기획 및 협업 제안'
  ];

  const constructedMailto = () => {
    const subject = encodeURIComponent(`[협업 제안] ${topic}${senderName ? ` - ${senderName}` : ''}`);
    const body = encodeURIComponent(
      `안녕하세요,\n\n${topic}과 관련하여 협업을 제안드리고자 연락드립니다.\n\n${
        message ? `[내용]\n${message}\n\n` : ''
      }보낸 사람: ${senderName || '방문자'}\n연락처/소속: `
    );
    return `mailto:${verifiedEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[#0D0E11] text-white overflow-hidden border-b border-white/10">
      
      {/* Background Architectural Scenery matching the bottom banner of the reference image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/assets/aistudio/image_8cc74ad8.png"
          alt="Architectural Scenery"
          className="w-full h-full object-cover object-bottom scale-105 filter brightness-[0.4] contrast-[1.2] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/70 to-[#0D0E11]/90"></div>
        <div className="absolute inset-0 architectural-dark-grid opacity-30 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="max-w-3xl">
          
          {/* Eyebrow Label matching reference */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase mb-4">
            <span className="text-white font-bold">READY TO CREATE?</span>
            <span className="w-12 h-px bg-white/20"></span>
            <span>COLLABORATION & INSPIRATION</span>
          </div>

          {/* Headline matching user prompt & reference grand style */}
          <h2 className="font-condensed text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white uppercase leading-[0.92] mb-6">
            LET’S BUILD<br />
            SOMETHING TIMELESS.
          </h2>

          <h3 className="text-xl sm:text-2xl font-light text-neutral-200 tracking-tight mb-4">
            새로운 영감과 시작을 함께 나누고 싶다면
          </h3>

          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed mb-10 max-w-xl text-balance">
            아이디어가 필요하거나 협업을 제안하고 싶으신가요? 편하게 연락 주세요.
          </p>

          {/* Email Container & Action Buttons */}
          <div className="max-w-xl mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:pl-5 bg-[#14161C]/90 backdrop-blur-md border border-white/20">
              <span className="font-mono text-sm text-white font-semibold select-all">
                {verifiedEmail}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* One-Click Copy Button */}
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-mono tracking-wider uppercase text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="이메일 주소 복사"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>복사</span>
                    </>
                  )}
                </button>

                {/* Primary Button from prompt: [이메일 보내기] */}
                <a
                  href={`mailto:${verifiedEmail}?subject=${encodeURIComponent('[협업 문의] 프로젝트 시작점 제안')}`}
                  className="flex-1 sm:flex-initial px-6 py-2.5 text-xs font-mono tracking-wider uppercase font-bold text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg whitespace-nowrap"
                >
                  <span>이메일 보내기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {copied && (
              <p className="text-xs text-emerald-400 mt-2 font-mono">
                ✓ 이메일 주소가 클립보드에 복사되었습니다 ({verifiedEmail})
              </p>
            )}
          </div>

          {/* Quick Draft Helper Drawer */}
          <div>
            <button
              onClick={() => setShowHelper(!showHelper)}
              className="text-xs font-mono tracking-wider uppercase text-neutral-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{showHelper ? '간편 제안 도우미 닫기 ✕' : '협업 주제를 선택하여 이메일 초안 작성하기 ↓'}</span>
            </button>

            {showHelper && (
              <div className="mt-6 text-left max-w-xl bg-[#14161C]/95 backdrop-blur-md p-6 border border-white/20 animate-in fade-in duration-200">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-3 font-bold">
                  DRAFT COLLABORATION EMAIL
                </span>

                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-neutral-400 mb-1">관심 주제</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full p-3 bg-black/60 border border-white/20 text-white focus:outline-hidden focus:border-white"
                    >
                      {topicOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#14161C]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">보내시는 분 (이름 또는 소속)</label>
                    <input
                      type="text"
                      placeholder="예: 김민수 (○○ 기획팀)"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full p-3 bg-black/60 border border-white/20 text-white focus:outline-hidden focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">간단한 제안 내용</label>
                    <textarea
                      rows={3}
                      placeholder="프로젝트의 목적이나 함께 나누고 싶은 방향성을 자유롭게 적어주세요."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 bg-black/60 border border-white/20 text-white focus:outline-hidden focus:border-white resize-none"
                    />
                  </div>

                  <a
                    href={constructedMailto()}
                    className="w-full py-3 text-xs font-mono font-bold tracking-wider uppercase text-black bg-white hover:bg-neutral-200 flex items-center justify-center gap-2 transition-colors mt-2"
                  >
                    <span>작성된 내용으로 이메일 전송</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </section>
  );
};
