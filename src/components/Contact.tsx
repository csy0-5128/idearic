import React, { useState } from 'react';
import { Copy, Check, ArrowRight, MessageSquare, ArrowUpRight } from 'lucide-react';

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
    <section id="contact" className="relative py-28 sm:py-36 bg-[#EFECE6] text-[#222628] overflow-hidden border-b border-[#313639]/15">
      
      {/* Background Subtle Grid & Atmospheric Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 architectural-earth-grid opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#A88153]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#465839]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="max-w-3xl bg-white p-8 sm:p-14 border border-[#313639]/15 shadow-xs rounded-3xl">
          
          {/* Eyebrow Label in Caretta Green */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#465839] uppercase mb-4 font-bold">
            <span>READY TO CREATE?</span>
            <span className="w-12 h-px bg-[#313639]/30"></span>
            <span>COLLABORATION & INSPIRATION</span>
          </div>

          {/* Headline matching user prompt & grand style */}
          <h2 className="font-condensed text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#222628] uppercase leading-[0.92] mb-6">
            LET’S BUILD<br />
            SOMETHING TIMELESS.
          </h2>

          <h3 className="text-xl sm:text-2xl font-semibold text-[#A88153] tracking-tight mb-4">
            새로운 영감과 시작을 함께 나누고 싶다면
          </h3>

          <p className="text-base sm:text-lg text-[#58514C] font-normal leading-relaxed mb-10 max-w-xl text-balance">
            아이디어가 필요하거나 협업을 제안하고 싶으신가요? 편하게 연락 주세요.
          </p>

          {/* Email Container & Action Buttons */}
          <div className="max-w-xl mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:pl-5 bg-[#F7F6F2] border border-[#313639]/15 rounded-2xl">
              <span className="font-mono text-sm text-[#222628] font-bold select-all">
                {verifiedEmail}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* One-Click Copy Button */}
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-mono tracking-wider uppercase text-[#58514C] hover:text-[#222628] bg-white hover:bg-[#EFECE6] border border-[#313639]/15 transition-all flex items-center justify-center gap-2 cursor-pointer font-semibold rounded-xl"
                  title="이메일 주소 복사"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#465839]" />
                      <span className="text-[#465839] font-bold">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>복사</span>
                    </>
                  )}
                </button>

                {/* Primary Button from prompt: [이메일 보내기] in Caretta Green */}
                <a
                  href={`mailto:${verifiedEmail}?subject=${encodeURIComponent('[협업 문의] 프로젝트 시작점 제안')}`}
                  className="flex-1 sm:flex-initial px-6 py-2.5 text-xs font-mono tracking-wider uppercase font-bold text-white bg-[#465839] hover:bg-[#37472D] transition-all flex items-center justify-center gap-2 border border-[#37472D] whitespace-nowrap rounded-xl shadow-xs"
                >
                  <span>이메일 보내기</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </a>
              </div>
            </div>

            {copied && (
              <p className="text-xs text-[#465839] mt-2 font-mono font-semibold">
                ✓ 이메일 주소가 클립보드에 복사되었습니다 ({verifiedEmail})
              </p>
            )}
          </div>

          {/* Quick Draft Helper Drawer */}
          <div>
            <button
              onClick={() => setShowHelper(!showHelper)}
              className="text-xs font-mono tracking-wider uppercase text-[#313639] hover:text-[#465839] flex items-center gap-2 transition-colors cursor-pointer font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#465839]" />
              <span>{showHelper ? '간편 제안 도우미 닫기 ✕' : '협업 주제를 선택하여 이메일 초안 작성하기 ↓'}</span>
            </button>

            {showHelper && (
              <div className="mt-6 text-left max-w-xl bg-[#F7F6F2] p-6 border border-[#313639]/15 animate-in fade-in duration-200 rounded-2xl">
                <span className="text-[10px] font-mono tracking-widest text-[#465839] uppercase block mb-3 font-bold">
                  DRAFT COLLABORATION EMAIL
                </span>

                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-[#58514C] mb-1 font-semibold">관심 주제</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full p-3 bg-white border border-[#313639]/20 text-[#222628] focus:outline-hidden focus:border-[#465839] rounded-xl"
                    >
                      {topicOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#58514C] mb-1 font-semibold">보내시는 분 (이름 또는 소속)</label>
                    <input
                      type="text"
                      placeholder="예: 김민수 (○○ 기획팀)"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full p-3 bg-white border border-[#313639]/20 text-[#222628] focus:outline-hidden focus:border-[#465839] rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[#58514C] mb-1 font-semibold">간단한 제안 내용</label>
                    <textarea
                      rows={3}
                      placeholder="프로젝트의 목적이나 함께 나누고 싶은 방향성을 자유롭게 적어주세요."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 bg-white border border-[#313639]/20 text-[#222628] focus:outline-hidden focus:border-[#465839] resize-none rounded-xl"
                    />
                  </div>

                  <a
                    href={constructedMailto()}
                    className="w-full py-3 text-xs font-mono font-bold tracking-wider uppercase text-white bg-[#465839] hover:bg-[#37472D] flex items-center justify-center gap-2 transition-colors mt-2 border border-[#37472D] rounded-xl shadow-xs"
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
