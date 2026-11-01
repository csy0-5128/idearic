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
    <section id="contact" className="relative py-28 sm:py-36 bg-[#F2EFE8] text-[#2A2215] overflow-hidden border-b border-[#E5E0D8]">
      
      {/* Background Subtle Grid & Swatch Blur */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 architectural-earth-grid opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E5D2B8]/40 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#B3B792]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="max-w-3xl bg-white p-8 sm:p-14 rounded-3xl border border-[#E5E0D8] shadow-sm">
          
          {/* Eyebrow Label in Matcha */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#809671] uppercase mb-4 font-bold">
            <span>READY TO CREATE?</span>
            <span className="w-12 h-px bg-[#725C3A]/30"></span>
            <span>COLLABORATION & INSPIRATION</span>
          </div>

          {/* Headline matching user prompt & grand style */}
          <h2 className="font-condensed text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#2A2215] uppercase leading-[0.92] mb-6">
            LET’S BUILD<br />
            SOMETHING TIMELESS.
          </h2>

          <h3 className="text-xl sm:text-2xl font-semibold text-[#725C3A] tracking-tight mb-4">
            새로운 영감과 시작을 함께 나누고 싶다면
          </h3>

          <p className="text-base sm:text-lg text-[#5C5243] font-normal leading-relaxed mb-10 max-w-xl text-balance">
            아이디어가 필요하거나 협업을 제안하고 싶으신가요? 편하게 연락 주세요.
          </p>

          {/* Email Container & Action Buttons */}
          <div className="max-w-xl mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:pl-5 bg-[#F8F6F0] rounded-2xl border border-[#E5E0D8]">
              <span className="font-mono text-sm text-[#2A2215] font-bold select-all">
                {verifiedEmail}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* One-Click Copy Button */}
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-mono tracking-wider uppercase text-[#5C5243] hover:text-[#2A2215] bg-white hover:bg-[#E5E0D8] border border-[#E5E0D8] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs font-semibold"
                  title="이메일 주소 복사"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#809671]" />
                      <span className="text-[#809671] font-bold">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>복사</span>
                    </>
                  )}
                </button>

                {/* Primary Button from prompt: [이메일 보내기] in Matcha */}
                <a
                  href={`mailto:${verifiedEmail}?subject=${encodeURIComponent('[협업 문의] 프로젝트 시작점 제안')}`}
                  className="flex-1 sm:flex-initial px-6 py-2.5 text-xs font-mono tracking-wider uppercase font-bold text-white bg-[#809671] hover:bg-[#6E8360] rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
                >
                  <span>이메일 보내기</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </a>
              </div>
            </div>

            {copied && (
              <p className="text-xs text-[#809671] mt-2 font-mono font-semibold">
                ✓ 이메일 주소가 클립보드에 복사되었습니다 ({verifiedEmail})
              </p>
            )}
          </div>

          {/* Quick Draft Helper Drawer */}
          <div>
            <button
              onClick={() => setShowHelper(!showHelper)}
              className="text-xs font-mono tracking-wider uppercase text-[#725C3A] hover:text-[#2A2215] flex items-center gap-2 transition-colors cursor-pointer font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#809671]" />
              <span>{showHelper ? '간편 제안 도우미 닫기 ✕' : '협업 주제를 선택하여 이메일 초안 작성하기 ↓'}</span>
            </button>

            {showHelper && (
              <div className="mt-6 text-left max-w-xl bg-[#F8F6F0] p-6 rounded-2xl border border-[#E5E0D8] animate-in fade-in duration-200">
                <span className="text-[10px] font-mono tracking-widest text-[#809671] uppercase block mb-3 font-bold">
                  DRAFT COLLABORATION EMAIL
                </span>

                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-[#5C5243] mb-1 font-semibold">관심 주제</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full p-3 bg-white border border-[#E5E0D8] rounded-xl text-[#2A2215] focus:outline-hidden focus:border-[#809671]"
                    >
                      {topicOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#5C5243] mb-1 font-semibold">보내시는 분 (이름 또는 소속)</label>
                    <input
                      type="text"
                      placeholder="예: 김민수 (○○ 기획팀)"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full p-3 bg-white border border-[#E5E0D8] rounded-xl text-[#2A2215] focus:outline-hidden focus:border-[#809671]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5C5243] mb-1 font-semibold">간단한 제안 내용</label>
                    <textarea
                      rows={3}
                      placeholder="프로젝트의 목적이나 함께 나누고 싶은 방향성을 자유롭게 적어주세요."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 bg-white border border-[#E5E0D8] rounded-xl text-[#2A2215] focus:outline-hidden focus:border-[#809671] resize-none"
                    />
                  </div>

                  <a
                    href={constructedMailto()}
                    className="w-full py-3 text-xs font-mono font-bold tracking-wider uppercase text-white bg-[#809671] hover:bg-[#6E8360] rounded-xl flex items-center justify-center gap-2 transition-colors mt-2 shadow-xs"
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
