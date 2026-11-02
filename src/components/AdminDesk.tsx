import React, { useState } from 'react';
import { 
  IdeaSession, 
  Message 
} from '../types/dialogue';
import { 
  ShieldCheck, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Plus, 
  Send, 
  Mail, 
  Eye, 
  Sparkles, 
  ChevronRight, 
  RotateCcw,
  X,
  Compass,
  Layers,
  Filter
} from 'lucide-react';

interface AdminDeskProps {
  sessions: IdeaSession[];
  onUpdateSessions: (sessions: IdeaSession[]) => void;
  onExitAdmin: () => void;
  onSwitchToUserView: () => void;
  isLiveConnected?: boolean;
}

export const AdminDesk: React.FC<AdminDeskProps> = ({
  sessions,
  onUpdateSessions,
  onExitAdmin,
  onSwitchToUserView,
  isLiveConnected = true,
}) => {
  const verifiedEmail = 'csy50533394@gmail.com';
  const [selectedId, setSelectedId] = useState<string>(sessions[0]?.id || '');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'answered'>('all');
  
  // Admin response state for selected session
  const [replyText, setReplyText] = useState('');
  const [newInsightTag, setNewInsightTag] = useState('');
  const [insightTags, setInsightTags] = useState<string[]>([]);

  const selectedSession = sessions.find((s) => s.id === selectedId) || sessions[0];

  const pendingCount = sessions.filter((s) => s.status === '새 질문' || s.status === '진행 중').length;
  const answeredCount = sessions.filter((s) => s.status === '답변 완료').length;

  const filteredSessions = sessions.filter((s) => {
    if (filterStatus === 'new') return s.status === '새 질문' || s.status === '진행 중';
    if (filterStatus === 'answered') return s.status === '답변 완료';
    return true;
  });

  const handleAddTag = () => {
    if (newInsightTag.trim() && !insightTags.includes(newInsightTag.trim())) {
      setInsightTags([...insightTags, newInsightTag.trim()]);
      setNewInsightTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setInsightTags(insightTags.filter((t) => t !== tagToRemove));
  };

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedSession) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newAnswerMsg: Message = {
      id: `ans-${Date.now()}`,
      sender: 'planner',
      senderName: '기획자 (본인)',
      timestamp: timeStr,
      content: replyText.trim(),
      keyInsights: insightTags.length > 0 ? insightTags : undefined,
    };

    const updated = sessions.map((s) => {
      if (s.id === selectedSession.id) {
        return {
          ...s,
          status: '답변 완료' as const,
          messages: [...s.messages, newAnswerMsg],
        };
      }
      return s;
    });

    onUpdateSessions(updated);
    setReplyText('');
    setInsightTags([]);
  };

  const handleDeleteSession = (idToDelete: string) => {
    if (window.confirm('이 질문 세션을 영구 삭제하시겠습니까?')) {
      const updated = sessions.filter((s) => s.id !== idToDelete);
      onUpdateSessions(updated);
      if (selectedId === idToDelete && updated.length > 0) {
        setSelectedId(updated[0].id);
      }
    }
  };

  const handleChangeStatus = (newStatus: '새 질문' | '진행 중' | '답변 완료') => {
    if (!selectedSession) return;
    const updated = sessions.map((s) => {
      if (s.id === selectedSession.id) {
        return { ...s, status: newStatus };
      }
      return s;
    });
    onUpdateSessions(updated);
  };

  const handleOpenEmailToVisitor = () => {
    if (!selectedSession) return;
    const subject = encodeURIComponent(`[기획자 답변] ${selectedSession.title}`);
    const lastAnswer = selectedSession.messages.filter((m) => m.sender === 'planner').pop();
    const body = encodeURIComponent(
      `안녕하세요, ${selectedSession.visitorName}님.\n\n남겨주신 질문 '${selectedSession.title}'에 대한 기획 방향성 및 구체적인 시작점 답변을 전달드립니다.\n\n${
        lastAnswer ? `[기획자 제안 내용]\n${lastAnswer.content}\n\n` : ''
      }추가로 나누고 싶으신 점이 있다면 편하게 본 메일로 회신 주세요.\n\n감사합니다.\n기획자 드림.`
    );
    window.location.href = `mailto:${verifiedEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-[#2A2215] text-[#F8F6F0] min-h-[85vh] py-10 px-4 sm:px-8 border-b border-[#725C3A]/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-8 border-b border-[#725C3A]/30">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B3B792] uppercase mb-1">
              <ShieldCheck className="w-4 h-4 stroke-[2] text-[#809671]" />
              <span>IDEARIC ADMIN DESK · 기획자 전용 관리 화면</span>
            </div>
            <h1 className="font-condensed text-3xl sm:text-4xl font-bold tracking-wide text-[#F8F6F0] uppercase">
              아이디어 질문 & 기획 피드백 관리 데스크
            </h1>
            <p className="text-xs font-mono text-[#E5D2B8] mt-1">
              방문자들이 남긴 1:1 고민과 질문을 검토하고, 기획자의 철학과 도면적 시작점을 직접 답변으로 발행합니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSwitchToUserView}
              className="px-4 py-2.5 text-xs font-mono font-medium text-[#F8F6F0] bg-white/10 hover:bg-white/15 border border-[#725C3A]/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#B3B792]" />
              <span>사용자 화면으로 보기</span>
            </button>
            <button
              onClick={onExitAdmin}
              className="px-4 py-2.5 text-xs font-mono font-medium text-[#E5D2B8] hover:text-white bg-[#725C3A]/40 hover:bg-[#725C3A]/60 border border-[#725C3A] transition-all cursor-pointer"
            >
              관리자 모드 로그아웃
            </button>
          </div>
        </div>

        {/* Overview Stats KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1F1910] border border-[#725C3A]/40 p-4">
            <span className="text-[11px] font-mono text-[#B3B792] block mb-1">총 접수 질문</span>
            <span className="font-syne text-2xl sm:text-3xl font-bold text-white">{sessions.length}건</span>
          </div>
          <div className="bg-[#1F1910] border border-[#725C3A]/40 p-4">
            <span className="text-[11px] font-mono text-[#D2AB80] block mb-1">답변 대기 중</span>
            <span className="font-syne text-2xl sm:text-3xl font-bold text-[#D2AB80]">{pendingCount}건</span>
          </div>
          <div className="bg-[#1F1910] border border-[#725C3A]/40 p-4">
            <span className="text-[11px] font-mono text-[#809671] block mb-1">답변 완료</span>
            <span className="font-syne text-2xl sm:text-3xl font-bold text-[#809671]">{answeredCount}건</span>
          </div>
          <div className="bg-[#1F1910] border border-[#725C3A]/40 p-4">
            <span className="text-[11px] font-mono text-[#E5D2B8] block mb-1">인증 & 실시간 연동</span>
            <div className="flex flex-col gap-1 mt-1">
              <span className="font-mono text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#809671] animate-pulse"></span>
                인증됨 (비번 01280128)
              </span>
              <span className="font-mono text-[10px] text-[#B3B792] flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isLiveConnected ? 'bg-[#809671]' : 'bg-[#D2AB80]'}`}></span>
                {isLiveConnected ? '방문자 화면 즉시 동기화 중' : '동기화 대기 중'}
              </span>
            </div>
          </div>
        </div>

        {/* Master-Detail Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Filterable Question List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#1F1910] border border-[#725C3A]/40 text-xs font-mono">
              <button
                onClick={() => setFilterStatus('all')}
                className={`flex-1 py-1.5 transition-colors cursor-pointer ${
                  filterStatus === 'all' ? 'bg-[#809671] text-white font-semibold' : 'text-[#E5D2B8] hover:text-white'
                }`}
              >
                전체 ({sessions.length})
              </button>
              <button
                onClick={() => setFilterStatus('new')}
                className={`flex-1 py-1.5 transition-colors cursor-pointer ${
                  filterStatus === 'new' ? 'bg-[#D2AB80] text-[#2A2215] font-bold' : 'text-[#E5D2B8] hover:text-white'
                }`}
              >
                대기 중 ({pendingCount})
              </button>
              <button
                onClick={() => setFilterStatus('answered')}
                className={`flex-1 py-1.5 transition-colors cursor-pointer ${
                  filterStatus === 'answered' ? 'bg-[#809671] text-white font-semibold' : 'text-[#E5D2B8] hover:text-white'
                }`}
              >
                답변 완료 ({answeredCount})
              </button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-1">
              {filteredSessions.map((session) => {
                const isSelected = session.id === selectedSession?.id;
                return (
                  <div
                    key={session.id}
                    onClick={() => {
                      setSelectedId(session.id);
                      setReplyText('');
                      setInsightTags([]);
                    }}
                    className={`p-4 border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#362C1E] border-[#D2AB80] shadow-md ring-1 ring-[#D2AB80]'
                        : 'bg-[#1F1910] hover:bg-[#251E14] border-[#725C3A]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 ${
                        session.status === '답변 완료'
                          ? 'bg-[#809671]/20 text-[#809671] border border-[#809671]/40'
                          : 'bg-[#D2AB80]/20 text-[#D2AB80] border border-[#D2AB80]/40 font-semibold'
                      }`}>
                        {session.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#B3B792]">
                        {session.createdAt}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white line-clamp-1 mb-1">
                      {session.title}
                    </h4>

                    <p className="text-[11px] font-mono text-[#E5D2B8] line-clamp-1 mb-2">
                      {session.stage}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#B3B792] pt-2 border-t border-[#725C3A]/30">
                      <span>의뢰자: {session.visitorName}</span>
                      <span className="flex items-center gap-1 text-[#D2AB80]">
                        메시지 {session.messages.length}개
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredSessions.length === 0 && (
                <div className="p-8 text-center text-xs font-mono text-neutral-400 border border-dashed border-white/10 rounded-2xl">
                  해당 필터에 속한 질문이 없습니다.
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Detailed Inspector & Response Console (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {selectedSession ? (
              <div className="bg-[#1F1910] border border-[#725C3A]/40 overflow-hidden">
                
                {/* Header */}
                <div className="p-6 bg-[#251E14] border-b border-[#725C3A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-xs font-mono">
                      <span className="text-[#D2AB80] font-semibold">{selectedSession.stage}</span>
                      <span className="text-[#725C3A]">·</span>
                      <span className="text-[#B3B792]">의뢰자: {selectedSession.visitorName}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {selectedSession.title}
                    </h3>
                  </div>

                  {/* Status Switcher & Delete */}
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedSession.status}
                      onChange={(e) => handleChangeStatus(e.target.value as any)}
                      className="bg-[#151009] border border-[#725C3A]/60 text-xs font-mono text-[#E5E0D8] px-3 py-1.5 focus:outline-hidden cursor-pointer"
                    >
                      <option value="새 질문">상태: 새 질문</option>
                      <option value="진행 중">상태: 진행 중</option>
                      <option value="답변 완료">상태: 답변 완료</option>
                    </select>

                    <button
                      onClick={() => handleDeleteSession(selectedSession.id)}
                      className="p-2 text-[#B3B792] hover:text-red-400 hover:bg-[#725C3A]/30 transition-colors cursor-pointer"
                      title="질문 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Conversation History */}
                <div className="p-6 space-y-4 max-h-[340px] overflow-y-auto bg-[#18120A]/70">
                  {selectedSession.messages.map((m) => {
                    const isPlanner = m.sender === 'planner';
                    return (
                      <div
                        key={m.id}
                        className={`p-4 border ${
                          isPlanner
                            ? 'bg-[#362C1E]/80 border-[#809671]/40 text-[#F8F6F0]'
                            : 'bg-[#251E14] border-[#725C3A]/30 text-[#E5E0D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-2">
                          <span className={`font-semibold ${isPlanner ? 'text-[#809671]' : 'text-[#D2AB80]'}`}>
                            {m.senderName} {isPlanner ? '(관리자/기획자 본인)' : '(방문자)'}
                          </span>
                          <span className="text-[10px] text-[#B3B792]">{m.timestamp}</span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-[#E5E0D8]">
                          {m.content}
                        </p>

                        {m.keyInsights && m.keyInsights.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-[#725C3A]/30 flex flex-wrap gap-1.5">
                            {m.keyInsights.map((tag, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-mono bg-[#809671]/20 text-[#809671] px-2 py-0.5 border border-[#809671]/40"
                              >
                                ✓ {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Response Creation Area */}
                <form onSubmit={handlePostAnswer} className="p-6 bg-[#251E14] border-t border-[#725C3A]/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#D2AB80] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#809671]" />
                      <span>기획자 공식 답변 작성 (Official Response)</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleOpenEmailToVisitor}
                      className="text-[11px] font-mono text-[#B3B792] hover:text-white flex items-center gap-1 underline underline-offset-2"
                    >
                      <Mail className="w-3 h-3 text-[#D2AB80]" />
                      <span>이메일로도 전달하기</span>
                    </button>
                  </div>

                  <textarea
                    rows={4}
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="이 질문에 대해 기획자 관점에서 제안하는 철학적 개념, 리서치 근거, 구체적인 도면/공간적 시작점을 자세히 작성해 주세요..."
                    className="w-full p-3 bg-[#18120A] border border-[#725C3A]/50 text-xs sm:text-sm text-[#F8F6F0] focus:outline-hidden focus:border-[#809671] resize-none placeholder:text-[#725C3A]"
                  />

                  {/* Add Key Foundations (Insight Tags) */}
                  <div>
                    <label className="block text-[11px] font-mono text-[#B3B792] mb-1.5">
                      핵심 시작점 키워드 태그 추가 (Key Foundations)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newInsightTag}
                        onChange={(e) => setNewInsightTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        placeholder="예: 대지 절토 최소화, 상부 지붕-테라스 일체화"
                        className="flex-1 p-2.5 bg-[#18120A] border border-[#725C3A]/50 text-xs text-[#F8F6F0] focus:outline-hidden focus:border-[#809671] placeholder:text-[#725C3A]"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-[#725C3A]/40 hover:bg-[#725C3A]/60 text-xs font-mono text-[#E5D2B8] border border-[#725C3A] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#809671]" />
                        <span>태그 추가</span>
                      </button>
                    </div>

                    {insightTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {insightTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs font-mono bg-[#809671]/20 text-[#809671] border border-[#809671]/40 px-2.5 py-1"
                          >
                            <span>✓ {tag}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:text-white ml-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="px-6 py-2.5 bg-[#809671] hover:bg-[#6E8360] disabled:opacity-40 disabled:hover:bg-[#809671] text-xs font-mono font-bold text-white shadow-md transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>답변 등록 및 완료 처리</span>
                    </button>
                  </div>
                </form>

              </div>
            ) : (
              <div className="p-12 text-center text-xs font-mono text-[#B3B792] bg-[#1F1910] border border-[#725C3A]/40">
                선택된 질문 세션이 없습니다.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
