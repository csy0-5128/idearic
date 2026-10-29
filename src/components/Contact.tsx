import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowUpRight, MessageSquare } from 'lucide-react';

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
    <section id="contact" className="py-24 md:py-32 bg-[#F4F2EC] relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C49B74]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-6">
        
        {/* Main Floating Glassmorphic Container */}
        <div className="liquid-cushion-card rounded-3xl p-8 sm:p-14 border border-white/90 shadow-xl text-center">
          
          {/* Top Micro Label & Emblem */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-[#B88E68] uppercase mb-6">
            <span>✦</span>
            <span>CONTACT & COLLABORATION</span>
            <span>✦</span>
          </div>

          {/* Exact Prompt Heading with Avant-Garde Syne Typography Pairing */}
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1E22] tracking-tight mb-4 text-balance">
            새로운 영감과 시작을 함께 나누고 싶다면
          </h2>

          {/* Exact Prompt Lead Body */}
          <p className="text-base sm:text-lg text-[#5C5F66] max-w-xl mx-auto leading-relaxed mb-10 text-balance font-light">
            아이디어가 필요하거나 협업을 제안하고 싶으신가요? 편하게 연락 주세요.
          </p>

          {/* Verified Email Card with Actions */}
          <div className="max-w-lg mx-auto mb-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 sm:pl-5 bg-white/80 rounded-2xl border border-[#DFDACF] shadow-sm">
              <span className="font-mono text-sm text-[#1C1E22] font-semibold select-all">
                {verifiedEmail}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* One-Click Copy Button */}
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-mono font-medium text-[#1C1E22] bg-[#F4F2EC] hover:bg-white border border-[#DFDACF] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  title="이메일 주소 복사"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#5C5F66]" />
                      <span>복사</span>
                    </>
                  )}
                </button>

                {/* Direct [이메일 보내기] Button */}
                <a
                  href={`mailto:${verifiedEmail}?subject=${encodeURIComponent('[협업 문의] 프로젝트 시작점 제안')}`}
                  className="flex-1 sm:flex-initial px-5 py-2 text-xs font-mono font-semibold text-white bg-[#1C1E22] hover:bg-[#34373E] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5 text-[#C49B74]" />
                  <span>이메일 보내기</span>
                </a>
              </div>
            </div>

            {copied && (
              <p className="text-xs text-emerald-700 mt-2 font-mono animate-in fade-in">
                ✓ 이메일 주소가 클립보드에 복사되었습니다 ({verifiedEmail})
              </p>
            )}
          </div>

          {/* Interactive Proposal Helper Drawer */}
          <div className="pt-8 border-t border-[#DFDACF]">
            <button
              onClick={() => setShowHelper(!showHelper)}
              className="text-xs font-mono text-[#5C5F66] hover:text-[#1C1E22] flex items-center gap-1.5 mx-auto transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#B88E68]" />
              <span>{showHelper ? '간편 제안 도우미 닫기' : '협업 주제를 선택해 이메일 초안 작성하기 ↓'}</span>
            </button>

            {showHelper && (
              <div className="mt-6 text-left max-w-lg mx-auto bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-md animate-in fade-in duration-200">
                <p className="text-xs font-mono font-bold text-[#1C1E22] mb-3 uppercase tracking-wider">
                  협업 제안 내용 미리 작성하기
                </p>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-mono text-[#5C5F66] mb-1">관심 주제</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#DFDACF] rounded-xl text-[#1C1E22] text-xs focus:outline-hidden focus:border-[#B88E68]"
                    >
                      {topicOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[#5C5F66] mb-1">보내시는 분 (이름 또는 소속)</label>
                    <input
                      type="text"
                      placeholder="예: 김민수 (○○ 기획팀)"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#DFDACF] rounded-xl text-[#1C1E22] text-xs focus:outline-hidden focus:border-[#B88E68]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[#5C5F66] mb-1">간단한 제안 내용</label>
                    <textarea
                      rows={3}
                      placeholder="프로젝트의 목적이나 함께 나누고 싶은 방향성을 자유롭게 적어주세요."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#DFDACF] rounded-xl text-[#1C1E22] text-xs focus:outline-hidden focus:border-[#B88E68] resize-none"
                    />
                  </div>

                  <a
                    href={constructedMailto()}
                    className="w-full py-3 text-xs font-mono font-semibold text-white bg-[#1C1E22] hover:bg-[#34373E] rounded-xl flex items-center justify-center gap-2 transition-colors mt-2 shadow-sm"
                  >
                    <span>작성된 내용으로 메일 앱 열기</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C49B74]" />
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
