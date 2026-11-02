import React, { useState } from 'react';
import { 
  IdeaSession, 
  Message 
} from '../types/dialogue';
import { 
  MessageSquare, 
  Send, 
  Mail, 
  PlusCircle, 
  ShieldCheck,
  ArrowUpRight,
  ChevronRight,
  Lightbulb
} from 'lucide-react';

interface IdeaDialogueSpaceProps {
  sessions: IdeaSession[];
  onUpdateSessions: (sessions: IdeaSession[]) => void;
  isAdmin: boolean;
  onOpenAdminDesk?: () => void;
  isLiveConnected?: boolean;
}

export const IdeaDialogueSpace: React.FC<IdeaDialogueSpaceProps> = ({
  sessions,
  onUpdateSessions,
  isAdmin,
  onOpenAdminDesk,
  isLiveConnected = true,
}) => {
  const verifiedEmail = 'csy50533394@gmail.com';

  const [activeSessionId, setActiveSessionId] = useState<string>(sessions[0]?.id || '');
  const [inputText, setInputText] = useState('');
  
  // New session modal / form states
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStage, setNewStage] = useState('01. 아이디어 착상 단계 (막연한 초기 상태)');
  const [newVisitorName, setNewVisitorName] = useState('');
  const [newFirstQuestion, setNewFirstQuestion] = useState('');

  const currentSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // Post a message in the active session
  const handleSendMessage = () => {
    if (!inputText.trim() || !currentSession) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: isAdmin ? 'planner' : 'visitor',
      senderName: isAdmin ? '기획자 (본인)' : (currentSession.visitorName || '방문자'),
      timestamp: timeStr,
      content: inputText.trim()
    };

    const updatedSessions = sessions.map((s) => {
      if (s.id === currentSession.id) {
        return {
          ...s,
          status: isAdmin ? ('답변 완료' as const) : ('새 질문' as const),
          messages: [...s.messages, newMsg]
        };
      }
      return s;
    });

    onUpdateSessions(updatedSessions);
    setInputText('');
  };

  // Create a brand new 1-on-1 idea question session
  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newFirstQuestion.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateStr = `${now.getFullYear()}. ${now.getMonth() + 1}. ${now.getDate()}`;

    const newSession: IdeaSession = {
      id: `session-${Date.now()}`,
      title: newTitle.trim(),
      stage: newStage,
      visitorName: newVisitorName.trim() || '방문자',
      createdAt: dateStr,
      status: '새 질문',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'visitor',
          senderName: newVisitorName.trim() || '방문자',
          timestamp: timeStr,
          content: newFirstQuestion.trim()
        }
      ]
    };

    onUpdateSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
    setShowNewModal(false);
    setNewTitle('');
    setNewFirstQuestion('');
    setNewVisitorName('');
  };

  // Send current thread to the planner's email
  const handleEmailThread = () => {
    if (!currentSession) return;
    const subject = encodeURIComponent(`[1:1 아이디어 질문] ${currentSession.title}`);
    const transcript = currentSession.messages
      .map((m) => `[${m.senderName} - ${m.timestamp}]\n${m.content}`)
      .join('\n\n--------------------\n\n');

    const body = encodeURIComponent(
      `안녕하세요,\n\n웹사이트 1:1 대화 공간에서 공유된 질문 및 대화 내용입니다.\n\n주제: ${currentSession.title}\n진행 단계: ${currentSession.stage}\n작성자: ${currentSession.visitorName}\n\n[대화 기록]\n${transcript}\n\n---\n추가 논의나 답변을 이메일로 회신 부탁드립니다.`
    );

    window.location.href = `mailto:${verifiedEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="dialogue" className="py-24 sm:py-32 bg-[#F8F6F0] text-[#2A2215] border-b border-[#E5E0D8] relative overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-earth-grid opacity-50 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#E5E0D8]">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#725C3A] uppercase mb-3">
              <span className="font-bold text-[#809671]">1:1 IDEA DIALOGUE</span>
              <span className="w-12 h-px bg-[#725C3A]/30"></span>
              <span>아이디어 대화 공간</span>
              
              {/* Real-time live synchronization indicator */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white border border-[#E5E0D8] rounded-full text-[10px] text-[#2A2215] shadow-2xs font-semibold lowercase tracking-normal">
                <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-[#809671] animate-pulse' : 'bg-[#D2AB80]'}`}></span>
                <span>실시간 즉시 연동 중</span>
              </div>

              {isAdmin && (
                <span className="bg-[#809671] text-white px-2 py-0.5 text-[10px] font-bold rounded">
                  ADMIN VIEW
                </span>
              )}
            </div>
            
            <h2 className="font-condensed text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#2A2215] uppercase leading-none mb-4">
              COLLABORATION & IDEAS.
            </h2>
            
            <p className="text-sm sm:text-base text-[#5C5243] font-normal max-w-2xl leading-relaxed text-balance">
              어떤 주제로 어떻게 진행하고 싶으신가요? 현재 막막하거나 방향이 고민되는 점을 질문해 주세요.
              철학적 본질 파악과 공간적 언어로 구체적인 시작점을 함께 찾아드립니다.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isAdmin && onOpenAdminDesk && (
              <button
                onClick={onOpenAdminDesk}
                className="px-4 py-3 text-xs font-mono tracking-wider uppercase text-[#725C3A] bg-[#E5E0D8] hover:bg-[#D2AB80]/40 border border-[#725C3A]/25 rounded-xl flex items-center gap-2 transition-all cursor-pointer font-semibold"
              >
                <ShieldCheck className="w-4 h-4 text-[#809671]" />
                <span>관리자 데스크 열기</span>
              </button>
            )}

            <button
              onClick={() => setShowNewModal(true)}
              className="px-5 py-3 text-xs font-mono tracking-wider uppercase text-white bg-[#809671] hover:bg-[#6E8360] font-bold rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>새 아이디어 질문하기</span>
            </button>
          </div>
        </div>

        {/* 1:1 Dialogue Workspace Layout (Master / Detail) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Topics / Sessions List (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#5C5243] px-1 mb-1 font-semibold">
              <span className="uppercase tracking-wider">대화 주제 목록 ({sessions.length})</span>
              <span className="text-[11px] text-[#809671]">
                {isAdmin ? 'ADMIN' : 'VISITOR'}
              </span>
            </div>

            <div className="flex flex-col gap-3 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin">
              {sessions.map((session) => {
                const isActive = session.id === (currentSession?.id);
                return (
                  <div
                    key={session.id}
                    onClick={() => setActiveSessionId(session.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-white border-[#809671] shadow-md ring-2 ring-[#809671]/20'
                        : 'bg-white/80 hover:bg-white border-[#E5E0D8] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        session.status === '답변 완료'
                          ? 'bg-[#E5E0D8] text-[#725C3A]'
                          : 'bg-[#809671] text-white'
                      }`}>
                        {session.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#827869]">
                        {session.createdAt}
                      </span>
                    </div>

                    <h4 className="font-condensed text-lg font-bold text-[#2A2215] tracking-wide line-clamp-2 mb-1 leading-snug">
                      {session.title}
                    </h4>

                    <p className="text-[11px] font-mono text-[#5C5243] line-clamp-1 mb-3">
                      {session.stage}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#827869] pt-2 border-t border-[#E5E0D8]">
                      <span>질문자: {session.visitorName}</span>
                      <span className="flex items-center gap-1 text-[#809671] font-semibold">
                        메시지 {session.messages.length}
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Helper Note */}
            <div className="p-4 bg-white/70 border border-[#E5E0D8] rounded-2xl text-xs font-mono text-[#5C5243] mt-2 shadow-2xs">
              <span className="text-[#725C3A] block font-bold uppercase mb-1">
                1:1 질문 가이드
              </span>
              <p className="text-[11px] text-[#5C5243] leading-relaxed">
                공간 기획, 건축 설계 방향성, 대지 분석, 철학적 개념의 시각화 등 해결하고 싶은 막막함을 솔직하게 남겨주시면 가장 실효성 있는 시작점을 회신드립니다.
              </p>
            </div>
          </div>

          {/* Right Column: Active Conversation Thread (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col">
            {currentSession ? (
              <div className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden flex flex-col min-h-[620px] shadow-sm">
                
                {/* Active Session Top Bar */}
                <div className="p-6 bg-[#F2EFE8] border-b border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#809671] font-bold">
                        {currentSession.stage}
                      </span>
                      <span className="text-[#725C3A]/30">·</span>
                      <span className="text-[11px] font-mono text-[#5C5243]">
                        의뢰자: {currentSession.visitorName}
                      </span>
                    </div>
                    <h3 className="font-condensed text-xl sm:text-2xl font-bold text-[#2A2215] tracking-wide uppercase">
                      {currentSession.title}
                    </h3>
                  </div>

                  {/* Actions: Send to Email */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleEmailThread}
                      className="px-3.5 py-2 text-xs font-mono tracking-wider uppercase text-[#725C3A] bg-white hover:bg-[#E5E0D8] border border-[#725C3A]/25 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer font-semibold shadow-2xs"
                      title="이 대화 내용을 기획자 이메일로 전송하여 추가 논의"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#809671]" />
                      <span>이메일로 이어가기</span>
                    </button>
                  </div>
                </div>

                {/* Messages Timeline */}
                <div className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[460px] bg-[#FAF9F5]">
                  {currentSession.messages.map((msg) => {
                    const isPlanner = msg.sender === 'planner';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isPlanner ? 'items-start' : 'items-end'}`}
                      >
                        <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-[#5C5243]">
                          <span className={`font-semibold ${isPlanner ? 'text-[#809671]' : 'text-[#725C3A]'}`}>
                            {msg.senderName}
                          </span>
                          <span className="text-[10px] text-[#827869]">{msg.timestamp}</span>
                        </div>

                        <div
                          className={`max-w-2xl p-5 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                            isPlanner
                              ? 'bg-white text-[#2A2215] border-[#E5E0D8] rounded-tl-xs shadow-xs'
                              : 'bg-[#725C3A] text-white border-[#725C3A] rounded-tr-xs shadow-sm'
                          }`}
                        >
                          <div className="whitespace-pre-line font-normal">{msg.content}</div>

                          {/* Key Insight Tags if present */}
                          {msg.keyInsights && msg.keyInsights.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-[#E5E0D8]">
                              <span className="text-[10px] font-mono text-[#809671] uppercase tracking-wider block mb-1.5 font-bold">
                                기획 핵심 시작점 (Key Foundations)
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {msg.keyInsights.map((insight, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[11px] font-mono bg-[#E5E0D8]/60 px-2.5 py-1 rounded-md border border-[#725C3A]/20 text-[#2A2215] font-semibold"
                                  >
                                    ✓ {insight}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input Area */}
                <div className="p-4 sm:p-6 bg-[#F2EFE8] border-t border-[#E5E0D8]">
                  <div className="flex items-center justify-between mb-2 text-xs font-mono text-[#5C5243]">
                    <span>
                      {isAdmin ? (
                        <span className="text-[#809671] font-bold">
                          ● 기획자 본인 모드로 공식 답변 작성 중
                        </span>
                      ) : (
                        <span>
                          방문자로서 추가 질문 및 대화 작성
                        </span>
                      )}
                    </span>
                    <span className="text-[11px] text-[#827869] hidden sm:inline">
                      Enter로 전송
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <textarea
                      rows={2}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder={
                        isAdmin
                          ? '기획자로서 방문자에게 전달할 아이디어와 조언을 작성하세요...'
                          : '추가 질문이나 진행하고 싶은 방향, 현재 상황에 대해 적어주세요...'
                      }
                      className="flex-1 p-3 bg-white border border-[#E5E0D8] rounded-xl text-xs sm:text-sm text-[#2A2215] focus:outline-hidden focus:border-[#809671] resize-none"
                    />

                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                      className="px-6 text-white bg-[#809671] hover:bg-[#6E8360] disabled:opacity-40 disabled:hover:bg-[#809671] rounded-xl flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>

      {/* New Question Modal */}
      {showNewModal && (
        <div 
          className="fixed inset-0 z-50 bg-[#2A2215]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setShowNewModal(false)}
        >
          <div 
            className="w-full max-w-xl bg-[#F8F6F0] text-[#2A2215] p-7 sm:p-9 rounded-3xl border border-[#725C3A]/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E0D8]">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#809671] uppercase block font-bold">
                  1:1 IDEA CONSULTATION
                </span>
                <h3 className="font-condensed text-2xl font-bold text-[#2A2215] uppercase tracking-wide">
                  새로운 아이디어 질문 및 고민 공유
                </h3>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-1.5 text-[#5C5243] hover:text-[#2A2215]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#5C5243] font-semibold mb-1.5 uppercase text-[10px] tracking-wider">
                  어떤 주제에 대한 질문인가요? *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 경사지 카페 공간의 수목 보존 배치 방향"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 bg-white border border-[#E5E0D8] rounded-xl text-[#2A2215] focus:outline-hidden focus:border-[#809671]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#5C5243] font-semibold mb-1.5 uppercase text-[10px] tracking-wider">
                    현재 프로젝트 진행 단계
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full p-3 bg-white border border-[#E5E0D8] rounded-xl text-[#2A2215] focus:outline-hidden focus:border-[#809671] cursor-pointer"
                  >
                    <option value="01. 아이디어 착상 단계 (막연한 초기 상태)">01. 아이디어 착상 (막연한 초기 상태)</option>
                    <option value="02. 리서치 & 개념화 단계">02. 리서치 & 개념화 단계</option>
                    <option value="03. 공간 도면화 & 형태 스케치 단계">03. 공간 도면화 & 형태 스케치</option>
                    <option value="04. 협업 제안 및 실행 준비 단계">04. 협업 제안 및 실행 준비</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#5C5243] font-semibold mb-1.5 uppercase text-[10px] tracking-wider">
                    보내시는 분 (이름 또는 직무)
                  </label>
                  <input
                    type="text"
                    placeholder="예: 예비 창업자 / 디자이너"
                    value={newVisitorName}
                    onChange={(e) => setNewVisitorName(e.target.value)}
                    className="w-full p-3 bg-white border border-[#E5E0D8] rounded-xl text-[#2A2215] focus:outline-hidden focus:border-[#809671]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#5C5243] font-semibold mb-1.5 uppercase text-[10px] tracking-wider">
                  어떤 방식으로 진행하고 싶으신가요? (고민 내용 및 질문) *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="막연하게 머릿속에만 있는 생각이나, 현재 부딪힌 한계점, 구체화하고 싶은 방향성을 자유롭게 적어주세요."
                  value={newFirstQuestion}
                  onChange={(e) => setNewFirstQuestion(e.target.value)}
                  className="w-full p-3 bg-white border border-[#E5E0D8] rounded-xl text-[#2A2215] focus:outline-hidden focus:border-[#809671] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2.5 text-xs text-[#5C5243] hover:text-[#2A2215]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-mono font-bold tracking-wider uppercase text-white bg-[#809671] hover:bg-[#6E8360] rounded-xl shadow-md transition-all"
                >
                  질문 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
