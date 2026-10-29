import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  User, 
  Compass, 
  Layers, 
  ArrowRight, 
  Mail, 
  Check, 
  Clock, 
  PlusCircle, 
  Share2, 
  RotateCcw,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'visitor' | 'planner';
  senderName: string;
  timestamp: string;
  content: string;
  keyInsights?: string[];
}

interface IdeaSession {
  id: string;
  title: string;
  stage: string;
  visitorName: string;
  createdAt: string;
  status: '진행 중' | '답변 완료' | '새 질문';
  messages: Message[];
}

const STORAGE_KEY = 'spatial_idea_dialogues_v1';

// Initial authentic sample sessions demonstrating how the 1-on-1 dialogue works
const defaultSessions: IdeaSession[] = [
  {
    id: 'session-1',
    title: '경사지 지형을 보존하며 자연 채광을 확보하는 스테이 기획',
    stage: '01. 아이디어 착상 단계 (막연한 초기 상태)',
    visitorName: '건축주 / 프로젝트 기획자',
    createdAt: '2026. 10. 27',
    status: '답변 완료',
    messages: [
      {
        id: 'm1',
        sender: 'visitor',
        senderName: '건축주 / 프로젝트 기획자',
        timestamp: '14:20',
        content: '산 중턱의 30도 급경사지에 작은 스테이 공간을 기획하고 있습니다. 대지를 평탄화하지 않고 자연을 최대한 보존하고 싶은데, 경사지 때문에 채광과 진입 동선을 어떻게 풀어야 할지 막막합니다. 어떤 시작점을 잡아야 할까요?'
      },
      {
        id: 'm2',
        sender: 'planner',
        senderName: '기획자 (본인)',
        timestamp: '16:05',
        content: '경사지는 장애물이 아니라 가장 독창적인 공간 경험을 만들어주는 입체적 자산입니다. 제가 제안드리는 구체적인 시작점은 다음과 같습니다:\n\n1. 대지 절토(Cut-and-Fill)를 최소화하는 계단식 스킵플로어(Skip-floor) 단면 계획\n2. 상부 층의 지붕을 하부 층의 야외 테라스로 일체화하여 지형 경사각에 순응하는 채광 데크 조성\n3. 하부에는 자생 수목의 수평 성장을 방해하지 않는 독립 기둥(Pilotis) 기초를 적용해 숲속에 떠 있는 듯한 시야 확보\n\n이러한 단면 스케치부터 시작하시면 막연했던 배치가 명확한 축을 갖게 됩니다.',
        keyInsights: [
          '대지 절토 최소화 및 계단식 단면 계획',
          '상부 지붕 = 하부 테라스 일체화',
          '수목 보존을 위한 독립 필로티 기초'
        ]
      }
    ]
  },
  {
    id: 'session-2',
    title: '‘쉼’이라는 철학적 개념을 공간적 언어로 번역하기',
    stage: '02. 리서치 & 개념화 단계',
    visitorName: '브랜드 디렉터',
    createdAt: '2026. 10. 28',
    status: '답변 완료',
    messages: [
      {
        id: 'm1',
        sender: 'visitor',
        senderName: '브랜드 디렉터',
        timestamp: '11:15',
        content: '브랜드 쇼룸을 준비 중인데 ‘비움과 쉼’이라는 추상적인 키워드만 있고, 실제 공간 방문객에게 이를 어떤 물리적 언어(동선, 빛, 질감)로 체감시켜야 할지 방향을 못 잡고 있습니다.'
      },
      {
        id: 'm2',
        sender: 'planner',
        senderName: '기획자 (본인)',
        timestamp: '13:40',
        content: '‘비움’을 시각화할 때 가장 흔한 실수는 그냥 빈 공간을 넓게 두는 것입니다. 공간에서 쉼이 느껴지려면 ‘시선의 속도’를 늦추는 물리적 장치가 선행되어야 합니다.\n\n추천하는 시작점:\n1. 입구에서 메인 홀까지 즉시 시야가 트이지 않도록 우회하는 회랑(Cloister) 동선 설계\n2. 직사광선 대신 벽면을 타고 완만하게 떨어지는 은은한 천창(Skylight) 반사광 배치\n3. 단차를 둔 좌식 또는 벤치 레벨을 도면상에 시각화하여 방문자가 자연스럽게 머무르게 유도',
        keyInsights: [
          '시선의 속도를 늦추는 우회 회랑 동선',
          '천창 반사광을 활용한 간접 조도 계획',
          '머무름을 유도하는 단차 레벨 다이어그램'
        ]
      }
    ]
  }
];

export const IdeaDialogueSpace: React.FC = () => {
  const verifiedEmail = 'csy50533394@gmail.com';
  
  // Local persistence
  const [sessions, setSessions] = useState<IdeaSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return defaultSessions;
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(sessions[0]?.id || 'session-1');
  const [activeRole, setActiveRole] = useState<'visitor' | 'planner'>('visitor');
  const [inputText, setInputText] = useState('');
  
  // New session modal / form states
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStage, setNewStage] = useState('01. 아이디어 착상 단계 (막연한 초기 상태)');
  const [newVisitorName, setNewVisitorName] = useState('');
  const [newFirstQuestion, setNewFirstQuestion] = useState('');
  const [copiedStatus, setCopiedStatus] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error(e);
    }
  }, [sessions]);

  const currentSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // Post a message in the active session
  const handleSendMessage = () => {
    if (!inputText.trim() || !currentSession) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: activeRole,
      senderName: activeRole === 'visitor' ? (currentSession.visitorName || '방문자') : '기획자 (본인)',
      timestamp: timeStr,
      content: inputText.trim()
    };

    const updatedSessions = sessions.map((s) => {
      if (s.id === currentSession.id) {
        return {
          ...s,
          status: activeRole === 'planner' ? ('답변 완료' as const) : ('새 질문' as const),
          messages: [...s.messages, newMsg]
        };
      }
      return s;
    });

    setSessions(updatedSessions);
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

    setSessions([newSession, ...sessions]);
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

  const handleResetToDefault = () => {
    if (window.confirm('기본 예시 대화 목록으로 초기화하시겠습니까?')) {
      setSessions(defaultSessions);
      setActiveSessionId(defaultSessions[0].id);
    }
  };

  return (
    <section id="dialogue" className="py-24 md:py-32 bg-[#F4F2EC] border-b border-[#DFDACF] relative overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 architectural-grid opacity-50 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#DFDACF]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B88E68] uppercase mb-2">
              <MessageSquare className="w-4 h-4 stroke-[2]" />
              <span>1:1 IDEA DIALOGUE & PROJECT INITIATION</span>
            </div>
            
            <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1E22] tracking-tight mb-3">
              1:1 아이디어 대화 공간
            </h2>
            
            <p className="text-sm sm:text-base text-[#5C5F66] font-light max-w-2xl leading-relaxed text-balance">
              어떤 주제로 어떻게 진행하고 싶으신가요? 현재 막막하거나 방향이 고민되는 점을 질문해 주세요.
              철학적 본질 파악과 공간적 언어로 구체적인 시작점을 함께 찾아드립니다.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowNewModal(true)}
              className="px-5 py-3 text-xs font-mono font-semibold text-white bg-[#1C1E22] hover:bg-[#34373E] rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#C49B74]" />
              <span>새 아이디어 질문하기</span>
            </button>
          </div>
        </div>

        {/* 1:1 Dialogue Workspace Layout (Master / Detail) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Topics / Sessions List (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#5C5F66] px-1 mb-1">
              <span>진행 중인 대화 주제 ({sessions.length})</span>
              <button
                onClick={handleResetToDefault}
                className="hover:text-[#1C1E22] flex items-center gap-1 text-[11px] cursor-pointer"
                title="기본 예시 복원"
              >
                <RotateCcw className="w-3 h-3" />
                <span>예시 복원</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin">
              {sessions.map((session) => {
                const isActive = session.id === activeSessionId;
                return (
                  <div
                    key={session.id}
                    onClick={() => setActiveSessionId(session.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-white border-[#B88E68] shadow-md ring-1 ring-[#B88E68]/30'
                        : 'bg-white/70 hover:bg-white border-white/90 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        session.status === '답변 완료'
                          ? 'bg-[#EFECE3] text-[#B88E68] font-semibold'
                          : 'bg-[#1C1E22] text-white'
                      }`}>
                        {session.status}
                      </span>
                      <span className="text-[11px] font-mono text-[#848A96]">
                        {session.createdAt}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#1C1E22] line-clamp-2 mb-1.5 leading-snug">
                      {session.title}
                    </h4>

                    <p className="text-[11px] font-mono text-[#5C5F66] line-clamp-1 mb-3">
                      {session.stage}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#848A96] pt-2 border-t border-[#DFDACF]/60">
                      <span>질문자: {session.visitorName}</span>
                      <span>메시지 {session.messages.length}개</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Helper Banner */}
            <div className="p-4 rounded-xl bg-white/50 border border-white/80 text-xs font-mono text-[#5C5F66] mt-2">
              <div className="flex items-center gap-1.5 font-bold text-[#1C1E22] mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-[#B88E68]" />
                <span>1:1 질문 가이드</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                공간 기획, 건축 설계 방향성, 대지 분석, 철학적 개념의 시각화 등 해결하고 싶은 막막함을 솔직하게 남겨주시면 가장 실효성 있는 시작점을 회신드립니다.
              </p>
            </div>
          </div>

          {/* Right Column: Active Conversation Thread & Direct Dialogue Space (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col">
            {currentSession ? (
              <div className="bg-white rounded-3xl border border-white/90 shadow-md overflow-hidden flex flex-col min-h-[620px]">
                
                {/* Active Session Top Bar */}
                <div className="p-6 bg-[#FAF9F5] border-b border-[#DFDACF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B88E68] font-bold">
                        {currentSession.stage}
                      </span>
                      <span className="text-neutral-300">·</span>
                      <span className="text-[11px] font-mono text-[#5C5F66]">
                        의뢰자: {currentSession.visitorName}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1C1E22]">
                      {currentSession.title}
                    </h3>
                  </div>

                  {/* Actions: Send to Email */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleEmailThread}
                      className="px-3.5 py-2 text-xs font-mono text-[#1C1E22] bg-white hover:bg-neutral-50 border border-[#DFDACF] rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      title="이 대화 내용을 기획자 이메일로 전송하여 추가 논의"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#B88E68]" />
                      <span>이메일로 이어가기</span>
                    </button>
                  </div>
                </div>

                {/* Messages Timeline */}
                <div className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[460px] bg-[#FFFFFF]">
                  {currentSession.messages.map((msg) => {
                    const isPlanner = msg.sender === 'planner';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isPlanner ? 'items-start' : 'items-end'}`}
                      >
                        <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-[#5C5F66]">
                          <span className={`font-semibold ${isPlanner ? 'text-[#B88E68]' : 'text-[#1C1E22]'}`}>
                            {msg.senderName}
                          </span>
                          <span className="text-[10px] text-[#848A96]">{msg.timestamp}</span>
                        </div>

                        <div
                          className={`max-w-2xl p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            isPlanner
                              ? 'bg-[#F9F8F4] text-[#1C1E22] border border-[#E7E2D8] rounded-tl-xs shadow-2xs'
                              : 'bg-[#1C1E22] text-white rounded-tr-xs shadow-xs'
                          }`}
                        >
                          <div className="whitespace-pre-line">{msg.content}</div>

                          {/* Key Insight Tags if present */}
                          {msg.keyInsights && msg.keyInsights.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-[#DFDACF]/60">
                              <span className="text-[10px] font-mono text-[#B88E68] uppercase tracking-wider block mb-1.5 font-bold">
                                기획 핵심 시작점 (Key Foundations)
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {msg.keyInsights.map((insight, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[11px] bg-white px-2.5 py-1 rounded-md border border-[#DFDACF] text-[#1C1E22] font-medium"
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

                {/* Input Area with Role Selector */}
                <div className="p-4 sm:p-6 bg-[#FAF9F5] border-t border-[#DFDACF]">
                  
                  {/* Role Selector: Visitor vs Planner */}
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-[#5C5F66]">대화 작성 역할:</span>
                      <div className="flex items-center bg-white rounded-lg p-0.5 border border-[#DFDACF]">
                        <button
                          type="button"
                          onClick={() => setActiveRole('visitor')}
                          className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                            activeRole === 'visitor'
                              ? 'bg-[#1C1E22] text-white font-semibold'
                              : 'text-[#5C5F66] hover:text-[#1C1E22]'
                          }`}
                        >
                          방문자 (질문/진행 공유)
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveRole('planner')}
                          className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                            activeRole === 'planner'
                              ? 'bg-[#B88E68] text-white font-semibold'
                              : 'text-[#5C5F66] hover:text-[#1C1E22]'
                          }`}
                        >
                          기획자 (아이디어 답변)
                        </button>
                      </div>
                    </div>

                    <span className="text-[11px] text-[#848A96] hidden sm:inline">
                      Enter로 전송 가능
                    </span>
                  </div>

                  {/* Input Box */}
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
                        activeRole === 'visitor'
                          ? '추가 질문이나 진행하고 싶은 방향, 현재 상황에 대해 적어주세요...'
                          : '기획 관점에서 구체적인 시작점과 아이디어를 작성해 주세요...'
                      }
                      className="flex-1 p-3 bg-white border border-[#DFDACF] rounded-xl text-xs sm:text-sm text-[#1C1E22] focus:outline-hidden focus:border-[#B88E68] resize-none"
                    />

                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                      className="px-5 text-white bg-[#1C1E22] hover:bg-[#34373E] disabled:opacity-40 disabled:hover:bg-[#1C1E22] rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#C49B74]" />
                    </button>
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>

      {/* New Question / Ideation Session Modal */}
      {showNewModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setShowNewModal(false)}
        >
          <div 
            className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#DFDACF]">
              <div>
                <span className="text-[10px] font-mono text-[#B88E68] uppercase tracking-wider block font-bold">
                  START 1:1 IDEA CONSULTATION
                </span>
                <h3 className="text-lg font-bold text-[#1C1E22]">
                  새로운 아이디어 질문 및 고민 공유
                </h3>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-1.5 text-[#5C5F66] hover:text-[#1C1E22] rounded-md transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#1C1E22] font-semibold mb-1">
                  어떤 주제에 대한 질문인가요? *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 경사지 카페 공간의 수목 보존 배치 방향"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 bg-[#FAF9F5] border border-[#DFDACF] rounded-xl text-xs text-[#1C1E22] focus:outline-hidden focus:border-[#B88E68]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1C1E22] font-semibold mb-1">
                    현재 프로젝트 진행 단계
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full p-3 bg-[#FAF9F5] border border-[#DFDACF] rounded-xl text-xs text-[#1C1E22] focus:outline-hidden focus:border-[#B88E68]"
                  >
                    <option value="01. 아이디어 착상 단계 (막연한 초기 상태)">01. 아이디어 착상 (막연한 초기 상태)</option>
                    <option value="02. 리서치 & 개념화 단계">02. 리서치 & 개념화 단계</option>
                    <option value="03. 공간 도면화 & 형태 스케치 단계">03. 공간 도면화 & 형태 스케치</option>
                    <option value="04. 협업 제안 및 실행 준비 단계">04. 협업 제안 및 실행 준비</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#1C1E22] font-semibold mb-1">
                    보내시는 분 (이름 또는 직무)
                  </label>
                  <input
                    type="text"
                    placeholder="예: 예비 창업자 / 디자이너"
                    value={newVisitorName}
                    onChange={(e) => setNewVisitorName(e.target.value)}
                    className="w-full p-3 bg-[#FAF9F5] border border-[#DFDACF] rounded-xl text-xs text-[#1C1E22] focus:outline-hidden focus:border-[#B88E68]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#1C1E22] font-semibold mb-1">
                  어떤 방식으로 진행하고 싶으신가요? (고민 내용 및 질문) *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="막연하게 머릿속에만 있는 생각이나, 현재 부딪힌 한계점, 구체화하고 싶은 방향성을 자유롭게 적어주세요."
                  value={newFirstQuestion}
                  onChange={(e) => setNewFirstQuestion(e.target.value)}
                  className="w-full p-3 bg-[#FAF9F5] border border-[#DFDACF] rounded-xl text-xs text-[#1C1E22] focus:outline-hidden focus:border-[#B88E68] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2.5 text-xs text-[#5C5F66] hover:text-[#1C1E22]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1C1E22] hover:bg-[#34373E] rounded-xl shadow-md transition-all"
                >
                  질문 등록하고 1:1 대화 시작하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
