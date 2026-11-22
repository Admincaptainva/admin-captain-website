import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  MessageSquare,
  Mail,
  Phone,
  Flame,
  TrendingUp,
  Snowflake,
  X,
  BarChart3,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FAQ_QUESTIONS } from '../data/chatbotFaq';

type Lead = {
  id: string;
  session_id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  business: string | null;
  industry: string | null;
  answers: Record<string, string | null> | null;
  score: string | null;
  booked: boolean;
  question: string | null;
  page: string | null;
  created_at: string;
};

type TranscriptMessage = {
  id: string;
  role: string;
  content: string;
  created_at: string;
};

type EventCount = {
  question_id: string;
  count: number;
};

function scoreIcon(score: string | null) {
  if (score === 'hot') return <Flame className="h-4 w-4 text-red-400" />;
  if (score === 'warm') return <TrendingUp className="h-4 w-4 text-amber-400" />;
  if (score === 'cold') return <Snowflake className="h-4 w-4 text-sky-400" />;
  return null;
}

function scoreColor(score: string | null) {
  if (score === 'hot') return 'text-red-400 bg-red-400/10 border-red-400/20';
  if (score === 'warm') return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
  if (score === 'cold') return 'text-sky-400 bg-sky-400/10 border-sky-400/20';
  return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
}

function questionLabel(qid: string): string {
  const q = FAQ_QUESTIONS.find((fq) => fq.id === qid);
  return q ? q.question : qid;
}

export default function AdminChats() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [topQuestions, setTopQuestions] = useState<EventCount[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'questions'>('leads');

  useEffect(() => {
    document.title = 'Admin · Chat Leads | AdminCaptainVA';
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setAuthed(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const loadLeads = useCallback(async () => {
    setLoadingLeads(true);
    const { data, error } = await supabase
      .from('chat_leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Failed to load leads:', error);
    } else {
      setLeads(data as Lead[] || []);
    }
    setLoadingLeads(false);
  }, []);

  const loadTopQuestions = useCallback(async () => {
    const { data, error } = await supabase
      .from('chat_events')
      .select('question_id')
      .order('created_at', { ascending: false })
      .limit(500);
    if (error) {
      console.error('Failed to load events:', error);
      return;
    }
    const counts: Record<string, number> = {};
    for (const row of data || []) {
      const qid = (row as { question_id: string }).question_id;
      counts[qid] = (counts[qid] || 0) + 1;
    }
    const sorted = Object.entries(counts)
      .map(([question_id, count]) => ({ question_id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);
    setTopQuestions(sorted);
  }, []);

  useEffect(() => {
    if (authed) {
      loadLeads();
      loadTopQuestions();
    }
  }, [authed, loadLeads, loadTopQuestions]);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
    }
    setAuthLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  async function loadTranscript(lead: Lead) {
    setSelectedLead(lead);
    setTranscript([]);
    const { data } = await supabase
      .from('chat_messages')
      .select('id, role, content, created_at')
      .eq('session_id', lead.session_id)
      .order('created_at', { ascending: true });
    if (data) setTranscript(data as TranscriptMessage[]);
  }

  async function toggleBooked(lead: Lead) {
    const { error } = await supabase
      .from('chat_leads')
      .update({ booked: !lead.booked })
      .eq('id', lead.id);
    if (!error) {
      setLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? { ...l, booked: !l.booked } : l)),
      );
      if (selectedLead?.id === lead.id) {
        setSelectedLead({ ...lead, booked: !lead.booked });
      }
    }
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1829] px-5 py-16">
        <div className="w-full max-w-md rounded-2xl border border-[#1e3d6e] bg-[#0e2242] p-8 shadow-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFA800]/15">
              <MessageSquare className="h-5 w-5 text-[#FFA800]" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-white">Admin · Chat Leads</h1>
              <p className="text-xs text-[#99daff]/60">AdminCaptainVA</p>
            </div>
          </div>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#99daff]">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#1e3d6e] bg-[#0b1829] px-4 py-3 text-sm text-white outline-none focus:border-[#FFA800]"
                placeholder="you@admincaptainva.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#99daff]">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#1e3d6e] bg-[#0b1829] px-4 py-3 text-sm text-white outline-none focus:border-[#FFA800]"
              />
            </div>
            {authError && (
              <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
                {authError}
              </p>
            )}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full rounded-lg bg-[#FFA800] px-5 py-3 text-sm font-bold text-[#0b1829] transition-colors hover:bg-[#E09600] disabled:opacity-60"
            >
              {authLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <a
            href="/"
            className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[#99daff]/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to site
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b1829] text-white">
      <header className="sticky top-0 z-10 border-b border-[#1e3d6e] bg-[#0e2242]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-[#FFA800]" />
            <h1 className="font-display text-lg font-bold">Chat Dashboard</h1>
            <span className="rounded bg-[#FFA800]/20 px-2 py-0.5 text-xs font-bold text-[#FFA800]">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs text-[#99daff]/60 transition-colors hover:text-white">View site</a>
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-[#1e3d6e] px-3 py-1.5 text-xs font-semibold text-[#99daff] transition-colors hover:border-[#FFA800]/50 hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8">
        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab('leads')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'leads'
                ? 'bg-[#FFA800] text-[#0b1829]'
                : 'border border-[#1e3d6e] bg-[#0e2242] text-[#99daff] hover:border-[#FFA800]/50'
            }`}
          >
            <MessageSquare className="mr-1.5 inline h-4 w-4" />
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'questions'
                ? 'bg-[#FFA800] text-[#0b1829]'
                : 'border border-[#1e3d6e] bg-[#0e2242] text-[#99daff] hover:border-[#FFA800]/50'
            }`}
          >
            <BarChart3 className="mr-1.5 inline h-4 w-4" />
            Most-tapped questions
          </button>
        </div>

        {activeTab === 'leads' && (
          <>
            {loadingLeads ? (
              <p className="text-sm text-[#99daff]/50">Loading leads...</p>
            ) : leads.length === 0 ? (
              <div className="rounded-2xl border border-[#1e3d6e] bg-[#0e2242] p-12 text-center">
                <MessageSquare className="mx-auto h-10 w-10 text-[#99daff]/20" />
                <p className="mt-4 text-sm text-[#99daff]/50">No chat leads yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-[#1e3d6e]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#0e2242]">
                    <tr className="border-b border-[#1e3d6e]">
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#99daff]/50">Score</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#99daff]/50">Business</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#99daff]/50">Industry</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#99daff]/50">Contact</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#99daff]/50">Booked</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#99daff]/50">Date</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="cursor-pointer border-b border-[#1e3d6e]/50 transition-colors hover:bg-[#0e2242]/60"
                        onClick={() => loadTranscript(lead)}
                      >
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs font-bold ${scoreColor(lead.score)}`}>
                            {scoreIcon(lead.score)}
                            {lead.score ? lead.score.toUpperCase() : '—'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-white">{lead.business || lead.name || 'Unknown'}</td>
                        <td className="px-4 py-3 text-[#99daff]/70 capitalize">{lead.industry || '—'}</td>
                        <td className="px-4 py-3">
                          {lead.email ? (
                            <span className="flex items-center gap-1 text-xs text-[#99daff]/70">
                              <Mail className="h-3 w-3" />
                              {lead.email}
                            </span>
                          ) : lead.phone ? (
                            <span className="flex items-center gap-1 text-xs text-[#99daff]/70">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </span>
                          ) : (
                            <span className="text-xs text-[#99daff]/30">No contact</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleBooked(lead); }}
                            className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
                              lead.booked
                                ? 'bg-emerald-400/15 text-emerald-400'
                                : 'bg-slate-600/30 text-slate-400 hover:bg-slate-600/50'
                            }`}
                          >
                            {lead.booked ? 'Booked' : 'Not booked'}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-xs text-[#99daff]/50">
                          {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <MessageSquare className="h-4 w-4 text-[#99daff]/40" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {activeTab === 'questions' && (
          <div className="rounded-2xl border border-[#1e3d6e] bg-[#0e2242] p-6">
            <h2 className="mb-1 font-display text-base font-bold text-white">Most-tapped questions</h2>
            <p className="mb-6 text-xs text-[#99daff]/50">Based on the last 500 taps across all sessions.</p>
            {topQuestions.length === 0 ? (
              <p className="text-sm text-[#99daff]/50">No question taps recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {topQuestions.map((eq, i) => {
                  const maxCount = topQuestions[0].count;
                  const pct = Math.round((eq.count / maxCount) * 100);
                  return (
                    <div key={eq.question_id} className="flex items-center gap-3">
                      <span className="w-6 text-right text-xs font-bold text-[#99daff]/40">{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-200">{questionLabel(eq.question_id)}</span>
                          <span className="ml-2 text-xs font-bold text-[#FFA800]">{eq.count}</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#0b1829]">
                          <div
                            className="h-full rounded-full bg-[#FFA800] transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Transcript drawer */}
      {selectedLead && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setSelectedLead(null)}
          />
          <div className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-lg flex-col bg-[#0e2242] border-l border-[#1e3d6e] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1e3d6e] px-5 py-4">
              <div>
                <h2 className="font-display text-base font-bold text-white">
                  {selectedLead.business || selectedLead.name || 'Lead Transcript'}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-bold ${scoreColor(selectedLead.score)}`}>
                    {scoreIcon(selectedLead.score)}
                    {selectedLead.score ? selectedLead.score.toUpperCase() : '—'}
                  </span>
                  {selectedLead.industry && (
                    <span className="text-xs capitalize text-[#99daff]/50">{selectedLead.industry}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#99daff]/60 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b border-[#1e3d6e] px-5 py-4 space-y-2">
              {selectedLead.name && (
                <p className="text-xs text-[#99daff]/70"><span className="text-[#99daff]/40">Name:</span> {selectedLead.name}</p>
              )}
              {selectedLead.email && (
                <p className="text-xs text-[#99daff]/70"><span className="text-[#99daff]/40">Email:</span> {selectedLead.email}</p>
              )}
              {selectedLead.phone && (
                <p className="text-xs text-[#99daff]/70"><span className="text-[#99daff]/40">Phone:</span> {selectedLead.phone}</p>
              )}
              {selectedLead.business && (
                <p className="text-xs text-[#99daff]/70"><span className="text-[#99daff]/40">Business:</span> {selectedLead.business}</p>
              )}
              {selectedLead.question && (
                <p className="text-xs text-[#99daff]/70"><span className="text-[#99daff]/40">Question:</span> {selectedLead.question}</p>
              )}
              {selectedLead.page && (
                <p className="text-xs text-[#99daff]/70"><span className="text-[#99daff]/40">Page:</span> {selectedLead.page}</p>
              )}
              {selectedLead.answers && Object.entries(selectedLead.answers).map(([key, val]) => (
                val && (
                  <p key={key} className="text-xs text-[#99daff]/70">
                    <span className="text-[#99daff]/40">{key.replace(/_/g, ' ')}:</span> {val}
                  </p>
                )
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {transcript.length === 0 ? (
                <p className="text-xs text-[#99daff]/40">Loading transcript...</p>
              ) : (
                transcript.map((msg) => (
                  <div key={msg.id} className={msg.role === 'visitor' ? 'flex justify-end' : 'flex justify-start'}>
                    <div
                      className={
                        msg.role === 'visitor'
                          ? 'max-w-[85%] rounded-2xl rounded-br-md bg-[#FFA800] px-3.5 py-2.5 text-sm text-[#0b1829]'
                          : 'max-w-[88%] rounded-2xl rounded-bl-md bg-[#16213A] border border-[#1e3d6e] px-3.5 py-2.5 text-sm text-slate-200'
                      }
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
