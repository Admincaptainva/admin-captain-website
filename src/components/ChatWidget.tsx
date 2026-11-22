import { useState, useRef, useEffect, useCallback } from 'react';
import Fuse from 'fuse.js';
import {
  Sailboat,
  X,
  Send,
  Phone,
  Calendar,
  Sparkles,
  ShieldAlert,
  Mail,
  ChevronLeft,
} from 'lucide-react';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/config';
import { supabase } from '../lib/supabase';
import {
  FAQ_QUESTIONS,
  TOPICS,
  type Industry,
  type FaqQuestion,
  getAnswer,
  questionsForTopic,
  topicsForIndustry,
  QUALIFYING_SIZES,
  QUALIFYING_MISSED,
  QUALIFYING_TIMELINE,
} from '../data/chatbotFaq';

const PHONE = '(763) 496-6613';
const PHONE_HREF = 'tel:17634966613';
const CALENDLY_URL = 'https://calendly.com/contact-admincaptainva/15-minute-phone-audit';
const ADMIN_EMAIL = 'contact@admincaptainva.com';

type ChatRole = 'visitor' | 'assistant';
type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  action?: 'show_booking' | 'show_audit_form' | 'show_handoff' | 'show_calendly' | 'show_lead_form' | null;
  buttons?: ChatButton[] | null;
  timestamp: number;
};
type ChatButton = { label: string; value: string };

type View = 'topics' | 'questions' | 'answer' | 'qualify' | 'lead_form' | 'calendly';
type QualifyStep = 'industry' | 'size' | 'missed' | 'timeline';

const SESSION_KEY = 'chat_session_id_v3';
const INDUSTRY_KEY = 'chat_industry_v3';

function detectIndustry(): Industry | null {
  const hash = window.location.hash;
  if (hash.includes('/industries/dental')) return 'dental';
  if (hash.includes('/industries/property')) return 'property';
  if (hash.includes('/industries/legal')) return 'legal';
  return null;
}

function getGreeting(industry: Industry | null): string {
  if (industry === 'dental') return 'Missing patient calls at lunch or after hours? Pick a topic or type your question.';
  if (industry === 'property') return 'Losing leasing or maintenance calls after hours? Pick a topic or type your question.';
  if (industry === 'legal') return 'New-client calls going to voicemail while you\'re in court? Pick a topic or type your question.';
  return 'Hi! Which best describes you? Pick an option below or type your question.';
}

const fuseOptions: Fuse.IFuseOptions<FaqQuestion> = {
  keys: ['question', 'keywords'],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 3,
};

const fuse = new Fuse(FAQ_QUESTIONS, fuseOptions);

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [view, setView] = useState<View>('topics');
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [currentButtons, setCurrentButtons] = useState<ChatButton[] | null>(null);
  const [qualifyStep, setQualifyStep] = useState<QualifyStep | null>(null);
  const [qualifyAnswers, setQualifyAnswers] = useState<Record<string, string>>({});
  const [leadForm, setLeadForm] = useState({ name: '', business: '', email: '', phone: '', question: '' });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ─── Helpers ───────────────────────────────────────────────────────
  async function saveMessage(sid: string, role: string, content: string) {
    try { await supabase.from('chat_messages').insert({ session_id: sid, role, content }); } catch { /* noop */ }
  }

  async function logEvent(questionId: string, ind: Industry | null) {
    if (!sessionId) return;
    try {
      await supabase.from('chat_events').insert({
        session_id: sessionId,
        question_id: questionId,
        industry: ind,
        page: window.location.pathname + window.location.hash,
      });
    } catch { /* noop */ }
  }

  async function saveLead(score: string, action: string, question?: string) {
    if (!sessionId) return;
    try {
      await fetch(`${SUPABASE_URL}/functions/v1/chat-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({
          session_id: sessionId,
          lead: {
            industry: industry,
            size: qualifyAnswers.size || null,
            missed_when: qualifyAnswers.missed || null,
            current_solution: null,
            timeline: qualifyAnswers.timeline || null,
            role: null,
            name: leadForm.name || null,
            business: leadForm.business || null,
            email: leadForm.email || null,
            phone: leadForm.phone || null,
          },
          score,
          action,
          question: question || leadForm.question || null,
          page: window.location.pathname + window.location.hash,
        }),
      });
    } catch { /* noop */ }
  }

  function addAssistantMessage(content: string, action?: ChatMessage['action'], buttons?: ChatButton[] | null) {
    const msg: ChatMessage = {
      id: `ai-${Date.now()}`, role: 'assistant', content, action, buttons, timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    if (sessionId) saveMessage(sessionId, 'assistant', content);
    setCurrentButtons(buttons ?? null);
  }

  function addUserMessage(text: string) {
    const msg: ChatMessage = {
      id: `user-${Date.now()}`, role: 'visitor', content: text, timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    if (sessionId) saveMessage(sessionId, 'visitor', text);
  }

  // ─── Session init ──────────────────────────────────────────────────
  const initSession = useCallback(async () => {
    if (sessionId) return;
    const detected = detectIndustry();

    // Try restoring industry from localStorage
    let storedIndustry: Industry | null = detected;
    if (!storedIndustry) {
      try {
        const si = localStorage.getItem(INDUSTRY_KEY);
        if (si === 'dental' || si === 'property' || si === 'legal') storedIndustry = si as Industry;
      } catch { /* noop */ }
    }
    setIndustry(storedIndustry);

    let existingId: string | null = null;
    try { existingId = localStorage.getItem(SESSION_KEY); } catch { /* noop */ }

    if (existingId) {
      try {
        const { data: existingMessages } = await supabase
          .from('chat_messages')
          .select('id, role, content, created_at')
          .eq('session_id', existingId)
          .order('created_at', { ascending: true });

        if (existingMessages && existingMessages.length > 0) {
          setMessages(existingMessages.map((m: { id: string; role: string; content: string; created_at: string }) => ({
            id: m.id, role: m.role as ChatRole, content: m.content, timestamp: new Date(m.created_at).getTime(),
          })));
          setSessionId(existingId);
          setCurrentButtons(null);
          return;
        }
      } catch { /* fall through */ }
    }

    try {
      const { data, error } = await supabase.from('chat_sessions').insert({
        page: window.location.pathname + window.location.hash,
        industry: storedIndustry,
      }).select('id').single();

      if (error) throw error;

      if (data) {
        setSessionId(data.id);
        try { localStorage.setItem(SESSION_KEY, data.id); } catch { /* noop */ }

        const greeting = getGreeting(storedIndustry);
        await saveMessage(data.id, 'assistant', greeting);
        setMessages([{ id: 'greeting', role: 'assistant', content: greeting, timestamp: Date.now() }]);

        if (storedIndustry) {
          setView('topics');
          showTopicButtons(storedIndustry);
        } else {
          setView('topics');
          const buttons: ChatButton[] = [
            { label: 'Dental practice', value: 'set_industry:dental' },
            { label: 'Property management', value: 'set_industry:property' },
            { label: 'Law firm', value: 'set_industry:legal' },
            { label: 'See pricing', value: 'topic:Pricing' },
            { label: 'Talk to a person', value: 'talk_to_person' },
          ];
          setCurrentButtons(buttons);
        }
      }
    } catch {
      const greeting = getGreeting(storedIndustry);
      setMessages([{ id: 'greeting-fallback', role: 'assistant', content: greeting, timestamp: Date.now() }]);
    }
  }, [sessionId]);

  // ─── Topic & question navigation ───────────────────────────────────
  function showTopicButtons(ind: Industry | null) {
    const topics = topicsForIndustry(ind);
    const buttons: ChatButton[] = topics.map((t) => ({ label: t, value: `topic:${t}` }));
    buttons.push({ label: 'Talk to a person', value: 'talk_to_person' });
    setCurrentButtons(buttons);
    setView('topics');
  }

  function showQuestionsForTopic(topic: string, ind: Industry | null) {
    const qs = questionsForTopic(topic, ind);
    const buttons: ChatButton[] = qs.map((q) => ({ label: q.question, value: `answer:${q.id}` }));
    buttons.unshift({ label: 'Back to topics', value: 'back_to_topics' });
    setCurrentButtons(buttons);
    setView('questions');
  }

  function showAnswer(q: FaqQuestion, ind: Industry | null) {
    logEvent(q.id, ind);
    const answerText = getAnswer(q, ind);
    const buttons: ChatButton[] = [
      { label: 'Book a call', value: 'book_a_call' },
      { label: 'Get a free Missed-Call Audit', value: 'get_audit' },
      { label: 'Back to topics', value: 'back_to_topics' },
    ];
    addAssistantMessage(answerText, q.action ?? null, buttons);
    setView('answer');
  }

  // ─── Qualifying flow ───────────────────────────────────────────────
  function startQualifying() {
    if (!industry) {
      setQualifyStep('industry');
      const buttons: ChatButton[] = [
        { label: 'Dental practice', value: 'qual_industry:dental' },
        { label: 'Property management', value: 'qual_industry:property' },
        { label: 'Law firm', value: 'qual_industry:legal' },
      ];
      addAssistantMessage('Great! First, which best describes you?', null, buttons);
    } else {
      advanceQualifying('industry', industry, {});
    }
  }

  function advanceQualifying(step: QualifyStep, value: string, answers: Record<string, string>) {
    const newAnswers = { ...answers, [step]: value };
    setQualifyAnswers(newAnswers);

    if (step === 'industry' || step === 'size' || step === 'missed') {
      const nextStep: QualifyStep = step === 'industry' ? 'size' : step === 'size' ? 'missed' : 'timeline';
      showQualifyingStep(nextStep, newAnswers.industry as Industry || industry);
    } else if (step === 'timeline') {
      finishQualifying(newAnswers);
    }
  }

  function showQualifyingStep(step: QualifyStep, ind: Industry | null) {
    setQualifyStep(step);

    if (step === 'size') {
      if (!ind) { setQualifyStep('industry'); return; }
      const sizes = QUALIFYING_SIZES[ind];
      const buttons: ChatButton[] = sizes.map((s) => ({ label: s.label, value: `qual_size:${s.value}` }));
      addAssistantMessage('How big is your practice?', null, buttons);
    } else if (step === 'missed') {
      const buttons: ChatButton[] = QUALIFYING_MISSED.map((m) => ({ label: m.label, value: `qual_missed:${m.value}` }));
      addAssistantMessage('When do you miss calls the most?', null, buttons);
    } else if (step === 'timeline') {
      const buttons: ChatButton[] = QUALIFYING_TIMELINE.map((t) => ({ label: t.label, value: `qual_timeline:${t.value}` }));
      addAssistantMessage('When do you want to start?', null, buttons);
    }
  }

  function finishQualifying(answers: Record<string, string>) {
    setQualifyStep(null);
    const wantsNow = answers.timeline === 'now' || answers.timeline === '30days';
    const score = wantsNow ? 'hot' : 'warm';
    const action = wantsNow ? 'show_calendly' : 'show_audit_form';

    const summary = `Thanks! Based on what you told me, here's a quick summary:\n\nIndustry: ${answers.industry || industry}\nSize: ${answers.size}\nCalls missed: ${answers.missed}\nTimeline: ${answers.timeline}\n\n${wantsNow ? 'Let\'s get you booked for a call.' : 'I\'d recommend a free Missed-Call Audit to see what you\'re losing.'}`;

    if (wantsNow) {
      addAssistantMessage(summary, 'show_calendly', [
        { label: 'Back to topics', value: 'back_to_topics' },
      ]);
      setView('calendly');
    } else {
      addAssistantMessage(summary, 'show_audit_form', [
        { label: 'Back to topics', value: 'back_to_topics' },
      ]);
      setView('answer');
    }

    saveLead(score, action === 'show_calendly' ? 'show_booking' : 'show_audit_form');
  }

  // ─── Lead form ─────────────────────────────────────────────────────
  function showLeadForm(prefillQuestion?: string) {
    if (prefillQuestion) {
      setLeadForm((f) => ({ ...f, question: prefillQuestion }));
    }
    setView('lead_form');
    setLeadSubmitted(false);
    addAssistantMessage('Leave your question and contact info, and we\'ll get back to you.', 'show_lead_form', null);
  }

  async function submitLeadForm() {
    if (!leadForm.name.trim() || !leadForm.email.trim()) return;
    setLeadSubmitting(true);
    await saveLead('warm', 'show_lead_form', leadForm.question);
    setLeadSubmitting(false);
    setLeadSubmitted(true);
    addAssistantMessage(
      `Thanks, ${leadForm.name}! We\'ll reach out within one business day.`,
      null,
      [
        { label: 'Back to topics', value: 'back_to_topics' },
        { label: 'Talk to a person', value: 'talk_to_person' },
      ],
    );
  }

  // ─── Talk to a person ──────────────────────────────────────────────
  function showHandoff() {
    addAssistantMessage(
      `You can reach our team directly:`,
      'show_handoff',
      [
        { label: 'Back to topics', value: 'back_to_topics' },
      ],
    );
    setView('answer');
  }

  // ─── Search ────────────────────────────────────────────────────────
  function handleSearch(query: string) {
    const trimmed = query.trim();
    if (!trimmed) return;

    addUserMessage(trimmed);
    setInput('');

    const results = fuse.search(trimmed);

    if (results.length > 0 && results[0].score !== undefined && results[0].score! < 0.3) {
      const q = results[0].item;
      showAnswer(q, industry);
      return;
    }

    if (results.length > 0) {
      const top3 = results.slice(0, 3);
      const buttons: ChatButton[] = top3.map((r) => ({
        label: r.item.question,
        value: `answer:${r.item.id}`,
      }));
      buttons.push({ label: 'Didn\'t find it? Leave your question', value: 'leave_question' });
      addAssistantMessage('Here are the closest matches:', null, buttons);
      setView('questions');
    } else {
      addAssistantMessage(
        `I couldn't find a match for that. You can leave your question and we'll get back to you.`,
        'show_lead_form',
        [{ label: 'Back to topics', value: 'back_to_topics' }],
      );
      setView('lead_form');
    }
  }

  // ─── Main button handler ───────────────────────────────────────────
  function handleButton(button: ChatButton) {
    const { value } = button;

    if (value === 'back_to_topics') {
      showTopicButtons(industry);
      return;
    }

    if (value === 'talk_to_person') {
      showHandoff();
      return;
    }

    if (value === 'book_a_call') {
      startQualifying();
      return;
    }

    if (value === 'get_audit') {
      setOpen(false);
      window.setTimeout(() => {
        if (window.location.hash !== '') window.location.hash = '';
        window.setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }, 200);
      return;
    }

    if (value === 'leave_question') {
      showLeadForm();
      return;
    }

    if (value.startsWith('set_industry:')) {
      const ind = value.slice(14) as Industry;
      setIndustry(ind);
      try { localStorage.setItem(INDUSTRY_KEY, ind); } catch { /* noop */ }
      addAssistantMessage(`Great! Pick a topic or type your question.`, null, null);
      showTopicButtons(ind);
      return;
    }

    if (value.startsWith('topic:')) {
      const topic = value.slice(6);
      setCurrentTopic(topic);
      addUserMessage(topic);
      showQuestionsForTopic(topic, industry);
      return;
    }

    if (value.startsWith('answer:')) {
      const qid = value.slice(7);
      const q = FAQ_QUESTIONS.find((fq) => fq.id === qid);
      if (q) {
        addUserMessage(q.question);
        showAnswer(q, industry);
      }
      return;
    }

    if (value.startsWith('qual_industry:')) {
      const ind = value.slice(14) as Industry;
      setIndustry(ind);
      try { localStorage.setItem(INDUSTRY_KEY, ind); } catch { /* noop */ }
      advanceQualifying('industry', ind, {});
      return;
    }

    if (value.startsWith('qual_size:')) {
      advanceQualifying('size', value.slice(10), qualifyAnswers);
      return;
    }

    if (value.startsWith('qual_missed:')) {
      advanceQualifying('missed', value.slice(12), qualifyAnswers);
      return;
    }

    if (value.startsWith('qual_timeline:')) {
      advanceQualifying('timeline', value.slice(14), qualifyAnswers);
      return;
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    handleSearch(input);
  }

  // ─── Effects ───────────────────────────────────────────────────────
  useEffect(() => {
    if (open && !sessionId) initSession();
  }, [open, sessionId, initSession]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, currentButtons, view]);

  useEffect(() => {
    if (open && !loading && view !== 'lead_form') inputRef.current?.focus();
  }, [open, loading, view]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // ─── Render helpers ────────────────────────────────────────────────
  function renderAction(action: ChatMessage['action']) {
    if (action === 'show_booking' || action === 'show_calendly') {
      const calendlyLink = `${CALENDLY_URL}?name=${encodeURIComponent(leadForm.name || qualifyAnswers.name || '')}&email=${encodeURIComponent(leadForm.email || qualifyAnswers.email || '')}`;
      return (
        <div className="mt-3 space-y-2">
          <a href={calendlyLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#FFA800] px-4 py-2.5 text-sm font-bold text-[#0b1829] transition-colors hover:bg-[#E09600]">
            <Calendar className="h-4 w-4" /> Book a call
          </a>
          <a href={PHONE_HREF}
            className="flex items-center justify-center gap-2 rounded-lg border border-[#1e3d6e] bg-[#0e2242] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#FFA800]/50">
            <Phone className="h-4 w-4" /> Call or text {PHONE}
          </a>
        </div>
      );
    }
    if (action === 'show_handoff') {
      return (
        <div className="mt-3 flex flex-col gap-2">
          <a href={PHONE_HREF}
            className="flex items-center justify-center gap-2 rounded-lg border border-[#1e3d6e] bg-[#0e2242] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#FFA800]/50">
            <Phone className="h-4 w-4" /> Call or text {PHONE}
          </a>
          <a href={`mailto:${ADMIN_EMAIL}`}
            className="flex items-center justify-center gap-2 rounded-lg border border-[#1e3d6e] bg-[#0e2242] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#FFA800]/50">
            <Mail className="h-4 w-4" /> Email {ADMIN_EMAIL}
          </a>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#FFA800] px-4 py-2.5 text-sm font-bold text-[#0b1829] transition-colors hover:bg-[#E09600]">
            <Calendar className="h-4 w-4" /> Book a call
          </a>
        </div>
      );
    }
    if (action === 'show_audit_form') {
      return (
        <div className="mt-3">
          <button onClick={() => {
            setOpen(false);
            window.setTimeout(() => {
              if (window.location.hash !== '') window.location.hash = '';
              window.setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 120);
            }, 200);
          }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFA800] px-4 py-2.5 text-sm font-bold text-[#0b1829] transition-colors hover:bg-[#E09600]">
            <Sparkles className="h-4 w-4" /> Get my free Missed-Call Audit
          </button>
        </div>
      );
    }
    if (action === 'show_lead_form') {
      return null;
    }
    return null;
  }

  function renderLeadForm() {
    if (view !== 'lead_form') return null;
    if (leadSubmitted) return null;
    return (
      <div className="mt-3 rounded-xl border border-[#1e3d6e] bg-[#0e2242] p-4 space-y-3">
        <input
          type="text"
          placeholder="Your name *"
          value={leadForm.name}
          onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full rounded-lg border border-[#1e3d6e] bg-[#0b1829] px-3 py-2 text-sm text-white outline-none focus:border-[#FFA800] placeholder:text-[#5a7ba8]"
        />
        <input
          type="text"
          placeholder="Business name"
          value={leadForm.business}
          onChange={(e) => setLeadForm((f) => ({ ...f, business: e.target.value }))}
          className="w-full rounded-lg border border-[#1e3d6e] bg-[#0b1829] px-3 py-2 text-sm text-white outline-none focus:border-[#FFA800] placeholder:text-[#5a7ba8]"
        />
        <input
          type="email"
          placeholder="Email *"
          value={leadForm.email}
          onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full rounded-lg border border-[#1e3d6e] bg-[#0b1829] px-3 py-2 text-sm text-white outline-none focus:border-[#FFA800] placeholder:text-[#5a7ba8]"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={leadForm.phone}
          onChange={(e) => setLeadForm((f) => ({ ...f, phone: e.target.value }))}
          className="w-full rounded-lg border border-[#1e3d6e] bg-[#0b1829] px-3 py-2 text-sm text-white outline-none focus:border-[#FFA800] placeholder:text-[#5a7ba8]"
        />
        <textarea
          placeholder="Your question"
          value={leadForm.question}
          onChange={(e) => setLeadForm((f) => ({ ...f, question: e.target.value }))}
          rows={2}
          className="w-full rounded-lg border border-[#1e3d6e] bg-[#0b1829] px-3 py-2 text-sm text-white outline-none focus:border-[#FFA800] placeholder:text-[#5a7ba8] resize-none"
        />
        <button
          onClick={submitLeadForm}
          disabled={leadSubmitting || !leadForm.name.trim() || !leadForm.email.trim()}
          className="w-full rounded-lg bg-[#FFA800] px-4 py-2.5 text-sm font-bold text-[#0b1829] transition-colors hover:bg-[#E09600] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {leadSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    );
  }

  function renderCalendly() {
    if (view !== 'calendly') return null;
    const calendlyLink = `${CALENDLY_URL}?name=${encodeURIComponent(leadForm.name || '')}&email=${encodeURIComponent(leadForm.email || '')}`;
    return (
      <div className="mt-3 space-y-2">
        <a href={calendlyLink} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#FFA800] px-4 py-2.5 text-sm font-bold text-[#0b1829] transition-colors hover:bg-[#E09600]">
          <Calendar className="h-4 w-4" /> Book your 15-minute call
        </a>
        <a href={PHONE_HREF}
          className="flex items-center justify-center gap-2 rounded-lg border border-[#1e3d6e] bg-[#0e2242] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#FFA800]/50">
          <Phone className="h-4 w-4" /> Call or text {PHONE}
        </a>
      </div>
    );
  }

  // ─── Main render ───────────────────────────────────────────────────
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Chat with AdminCaptainVA Assistant'}
        className="fixed bottom-[68px] right-5 sm:bottom-[76px] sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0e2242] border border-[#1e3d6e] text-[#FFA800] shadow-lg shadow-black/30 transition-all duration-300 hover:scale-105 hover:border-[#FFA800]/50 active:scale-95"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <Sailboat className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFA800] opacity-60" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#FFA800]" />
            </span>
          </>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 sm:hidden" onClick={() => setOpen(false)} />

          <div className="fixed inset-0 z-50 flex flex-col bg-[#0b1829] sm:inset-auto sm:bottom-[136px] sm:right-6 sm:h-[560px] sm:w-[380px] sm:rounded-2xl sm:border sm:border-[#1e3d6e] sm:shadow-2xl sm:overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#1e3d6e] bg-gradient-to-r from-[#0e2242] to-[#13325f] px-4 py-4 sm:px-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFA800]/15 flex-shrink-0">
                <Sailboat className="h-5 w-5 text-[#FFA800]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-extrabold text-sm leading-tight">AdminCaptainVA Assistant</h3>
                <p className="text-[#99daff]/60 text-xs leading-snug mt-0.5">Automated assistant. A real person will follow up.</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#99daff]/60 transition-colors hover:bg-white/5 hover:text-white sm:hidden">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={msg.role === 'visitor' ? 'flex justify-end' : 'flex justify-start'}>
                  <div className={msg.role === 'visitor' ? 'max-w-[80%]' : 'max-w-[90%]'}>
                    <div className={
                      msg.role === 'visitor'
                        ? 'rounded-2xl rounded-br-md bg-[#FFA800] px-3.5 py-2.5 text-sm text-[#0b1829]'
                        : 'rounded-2xl rounded-bl-md bg-[#16213A] border border-[#1e3d6e] px-3.5 py-2.5 text-sm text-slate-200'
                    }>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                    {msg.action && renderAction(msg.action)}
                    {msg.id === messages[messages.length - 1]?.id && renderLeadForm()}
                    {msg.id === messages[messages.length - 1]?.id && renderCalendly()}
                  </div>
                </div>
              ))}

              {/* Buttons */}
              {currentButtons && currentButtons.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentButtons.map((btn) => {
                    const isBack = btn.value === 'back_to_topics';
                    return (
                      <button
                        key={btn.value}
                        onClick={() => handleButton(btn)}
                        className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                          isBack
                            ? 'border-[#1e3d6e] bg-transparent text-[#99daff]/60 hover:text-white hover:border-[#FFA800]/50'
                            : 'border-[#1e3d6e] bg-[#0e2242] text-[#99daff] hover:border-[#FFA800]/50 hover:text-white'
                        }`}
                      >
                        {isBack && <ChevronLeft className="mr-0.5 inline h-3 w-3" />}
                        {btn.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-[#1e3d6e] bg-[#0b1829] px-4 py-3 sm:px-5">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  placeholder="Type your question..."
                  className="flex-1 rounded-xl border border-[#1e3d6e] bg-[#0e2242] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-[#5a7ba8] focus:border-[#FFA800]"
                />
                <button type="submit" disabled={!input.trim()} aria-label="Search questions"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#FFA800] text-[#0b1829] transition-colors hover:bg-[#E09600] disabled:opacity-40 disabled:cursor-not-allowed">
                  <Send className="h-4 w-4" />
                </button>
              </form>
              {industry === 'dental' && (
                <p className="mt-2 flex items-center gap-1.5 text-[10px] text-[#99daff]/40">
                  <ShieldAlert className="h-3 w-3" />
                  Please don't share patient information in this chat.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
