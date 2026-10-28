import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronRight, ClipboardList, Save, ShieldCheck } from 'lucide-react';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/config';

type Answer = string | string[] | Record<string, string>;
type Answers = Record<string, Answer>;
type QuestionType = 'short' | 'long' | 'single' | 'multiple' | 'time' | 'date' | 'url' | 'contact';
type Question = {
  id: string;
  number: number;
  prompt: string;
  help?: string;
  type: QuestionType;
  options?: string[];
  optional?: boolean;
  condition?: (answers: Answers) => boolean;
  defaultValue?: string;
  statement?: string;
  otherOption?: string;
  placeholder?: string;
};
type Section = { id: string; title: string; questions: Question[] };

const sections: Section[] = [
  {
    id: 'practice',
    title: 'Practice Information',
    questions: [
      { id: 'practiceName', number: 1, prompt: 'What is your practice called?', help: 'This is the name callers should hear.', type: 'short', placeholder: 'e.g. Lakeside Oral & Facial Surgery' },
      { id: 'generalContact', number: 2, prompt: 'Who will we contact generally throughout the process?', help: 'Please give their full name, phone number, and email address. This is the general contact for setup and for the process as a whole.', type: 'contact' },
      { id: 'practiceAddress', number: 3, prompt: 'What is your practice address?', help: 'If you have more than one location, please list each address. Example: 123 Main St, Edina, MN 55424', type: 'long', placeholder: 'e.g. 123 Main St, Edina, MN 55424' },
      { id: 'treatments', number: 4, prompt: 'What treatments do you offer?', help: 'Please include your specialty. Example: Oral surgery: implants, wisdom teeth, bone grafts', type: 'long', placeholder: 'e.g. Oral surgery: implants, wisdom teeth, bone grafts' },
      { id: 'doctors', number: 5, prompt: 'Who are the doctors at your practice?', help: 'Please include how to pronounce any names that are hard to pronounce. Example: Dr. Nguyen, pronounced "win"', type: 'long', placeholder: 'e.g. Dr. Nguyen, pronounced "win"' },
      { id: 'officeHours', number: 6, prompt: 'What are your office hours?', help: 'Please include lunch closures and any days with different hours. Example: Mon–Thu 8 am–5 pm, closed 12–1 pm; Fri 8 am–12 pm', type: 'long', placeholder: 'e.g. Mon–Thu 8 am–5 pm, closed 12–1 pm; Fri 8 am–12 pm' },
      { id: 'holidayNotice', number: 7, prompt: 'Will you email us in advance about holidays and other closures?', help: 'We will need at least 2 weeks\' advance notice.', type: 'single', options: ['Yes, we will email you at least 2 weeks in advance.', 'No, we will not email you at least 2 weeks in advance.', "Let's discuss this on our call."] },
    ],
  },
  {
    id: 'phone',
    title: 'Phone System Configuration',
    questions: [
      { id: 'answerTimes', number: 8, prompt: 'When should Admin Captain VA answer your calls?', help: 'Tick all that apply.', type: 'multiple', options: ['After business hours only', 'During lunch closures', 'On weekends', 'On holidays and office closures', 'When your lines are busy'], otherOption: 'Other' },
      { id: 'forwardingNumbers', number: 9, prompt: 'Which and how many phone number(s) should we forward to Admin Captain VA?', help: 'Please list each number to forward, and tell us how many numbers there are in total. Example: 2 numbers — 612-555-0100 and 612-555-0101', type: 'long', placeholder: 'e.g. 2 numbers — 612-555-0100 and 612-555-0101' },
      { id: 'forwardingHours', number: 10, prompt: 'During which hours should those numbers forward to us?', type: 'long', placeholder: 'e.g. Mon–Fri after 5 pm; all day Sat–Sun' },
      { id: 'phoneProvider', number: 11, prompt: 'Who provides your office phone service?', type: 'single', options: ['Comcast Business', 'Spectrum', 'AT&T', 'Weave', 'RingCentral', 'Mango Voice'], otherOption: 'Another company' },
    ],
  },
  {
    id: 'greeting',
    title: 'Call Greeting and Language Preferences',
    questions: [
      { id: 'greetingChoice', number: 12, prompt: 'What greeting should callers hear?', type: 'single', options: ['Please use the default greeting: "Thank you for calling [Practice Name], how can I help?"', 'Please use a custom greeting.'] },
      { id: 'customGreeting', number: 13, prompt: 'What custom greeting should callers hear?', type: 'short', condition: (answers) => answers.greetingChoice === 'Please use a custom greeting.', placeholder: 'e.g. Thank you for calling Lakeside Oral, how can I help?' },
      { id: 'otherLanguage', number: 14, prompt: 'Do you need the service in a language besides English?', help: 'If so, which language? Leave this blank if English only is fine.', type: 'short', optional: true, placeholder: 'e.g. Spanish', statement: 'Please note: The AI voice service will not diagnose a problem, give medical advice, quote an exact fee, or check insurance unless your practice gives us that information in writing. If you would like to change this, please tell us on our call.' },
    ],
  },
  {
    id: 'urgent',
    title: 'Urgent and Emergency Call Handling',
    questions: [
      { id: 'onCallContact', number: 15, prompt: 'Who is your after-hours on-call contact, if you have one?', help: 'Please give their full name and phone number. If you do not have an on-call contact, please write: no on-call contact — please direct emergency callers to call 911 or go to an emergency center. Some practices direct emergency and after-hours callers to 911 or an emergency center instead of to an on-call doctor. If that is your practice, please say so here. Example: Dr. Nguyen, 612-555-0100', type: 'contact' },
      { id: 'urgentTransfer', number: 16, prompt: 'Do you approve us transferring urgent calls directly to your on-call contact?', help: 'If you do not have an on-call contact, our AI system will direct callers to call 911 or go to an emergency center (ER).', type: 'single', options: ['Yes, please transfer urgent calls to this contact.', 'Yes, we have no on-call contact — please direct callers to call 911 or go to an emergency center.', 'No, please do not transfer urgent calls.', "Let's discuss this on our call."] },
      { id: 'nonLifeThreatening', number: 17, prompt: 'If a caller has an urgent dental problem that is NOT life-threatening — for example severe pain, swelling, a broken tooth, or a lost crown — what should we do?', type: 'single', options: ['Please transfer the caller to the on-call contact.', 'Please take an urgent message for the team to follow up first thing.', 'Please book the next available emergency appointment.', 'Please direct the caller to call 911 or go to an emergency center.'], otherOption: 'Something else' },
      { id: 'lifeThreatening', number: 18, prompt: 'If a caller has a life-threatening emergency, such as difficulty breathing or uncontrolled bleeding, do you approve us telling them to hang up and call 911?', type: 'single', options: ['Yes, please tell them to hang up and call 911.', 'No, please do not use that message.', "Let's discuss this on our call."], defaultValue: 'Yes, please tell them to hang up and call 911.' },
    ],
  },
  {
    id: 'appointments',
    title: 'Appointment Management',
    questions: [
      { id: 'appointmentRequests', number: 19, prompt: 'How should we handle appointment requests?', type: 'single', options: ['Please book appointments directly in our system (Recommended)', 'Please take a message for our team to schedule'], otherOption: 'Something else' },
      { id: 'cancellations', number: 20, prompt: 'How should we handle cancellations and reschedules?', type: 'single', options: ['Please take a message for our team', 'Please cancel or reschedule directly in our system'], otherOption: 'Something else' },
      { id: 'practiceSoftware', number: 21, prompt: 'What software do you use to schedule appointments and manage patient records?', type: 'single', options: ['Dentrix', 'Dentrix Ascend', 'Eaglesoft', 'Open Dental', 'Curve Dental', 'Denticon', 'Not sure'], otherOption: 'Another system' },
      { id: 'scheduleAccess', number: 22, prompt: 'Who will give us access and approve schedule changes?', help: 'Please give their name and role.', type: 'short', condition: (answers) => String(answers.appointmentRequests ?? '').includes('directly in our system') || String(answers.cancellations ?? '').includes('directly in our system'), placeholder: 'e.g. Sarah Johnson, Office Manager' },
      { id: 'bookingLink', number: 23, prompt: 'Do you have an online booking link we can share with callers?', help: 'Leave this blank if you do not have one. Example: lakesideoral.com/book', type: 'url', optional: true, placeholder: 'e.g. lakesideoral.com/book' },
      { id: 'feesInsurance', number: 24, prompt: 'If a caller asks about fees, insurance, or financing, what should we say?', type: 'single', options: ['Please take a message for our team to follow up (Recommended)', 'Please share the basic information we give you, then take a message.', 'Please ask the caller to contact our office during business hours.'], defaultValue: 'Please take a message for our team to follow up (Recommended)' },
    ],
  },
  {
    id: 'messages',
    title: 'Message Delivery and Morning Summary',
    questions: [
      { id: 'messageDelivery', number: 25, prompt: 'How should messages be delivered?', help: 'Tick all that apply.', type: 'multiple', options: ['By email summary', 'By text alert for urgent calls only'], otherOption: 'Another way' },
      { id: 'morningSummary', number: 26, prompt: 'Should the morning summary go to your general contact in Q2?', help: 'All summaries will go to the general contact in Q2 unless you tell us otherwise here.', type: 'single', options: ['Yes, please send all summaries to the general contact in Q2.', 'No, please send summaries to someone else:'] },
      { id: 'summaryRecipient', number: 26, prompt: 'Who should receive the morning summary?', help: 'Please give their name and email address.', type: 'contact', condition: (answers) => String(answers.morningSummary ?? '').startsWith('No,') },
      { id: 'summaryTime', number: 27, prompt: 'By what time should the general contact receive the morning summary?', type: 'time' },
    ],
  },
  {
    id: 'launch',
    title: 'Privacy, Compliance, and Launch Readiness',
    questions: [
      { id: 'baaSigner', number: 28, prompt: 'Who will sign the BAA for your practice?', help: 'What is their name and job title? If this is the same person as your general contact in Q2, you can write: same as Q2. Example: Dr. Nguyen, Owner', type: 'short', placeholder: 'e.g. Dr. Nguyen, Owner', statement: 'Before launch, we will send our Business Associate Agreement (BAA) for signature, as required by HIPAA.' },
      { id: 'transcriptProcess', number: 28, prompt: 'Confirmation before sending', help: 'The exact transcript process will be confirmed with your team before launch.', type: 'single', options: ['I understand that the exact transcript process will be confirmed before launch.'], statement: '[CONFIRM BEFORE SENDING — exact transcript process to be inserted here. The original draft said names and phone numbers are removed from stored transcripts and appear only in the morning summary. Replace this sentence with the exact process used, so it is not contradictory.]' },
      { id: 'recordings', number: 29, prompt: 'Do you approve us keeping call recordings for 30 days and then permanently deleting them?', type: 'single', options: ['Yes, we approve keeping recordings for 30 days and then deleting them.', 'No, we do not approve this.', "Let's discuss this on our call."], defaultValue: 'Yes, we approve keeping recordings for 30 days and then deleting them.' },
      { id: 'goLiveDate', number: 30, prompt: 'When is your preferred go-live date?', type: 'date' },
    ],
  },
];

const draftKey = 'admincaptainva-dental-onboarding-draft';
const initialAnswers: Answers = {
  lifeThreatening: 'Yes, please tell them to hang up and call 911.',
  feesInsurance: 'Please take a message for our team to follow up (Recommended)',
  recordings: 'Yes, we approve keeping recordings for 30 days and then deleting them.',
};

function isAnswerComplete(question: Question, answers: Answers): boolean {
  if (question.optional) return true;
  const value = answers[question.id];
  if (value === undefined || value === null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') {
    const contact = value as Record<string, string>;
    if (question.type === 'contact') return Boolean(contact.name?.trim() && contact.phone?.trim() && contact.email?.trim());
    return Object.values(contact).some((v) => v?.trim());
  }
  return String(value).trim().length > 0;
}

function getValue(answers: Answers, id: string): string {
  const value = answers[id];
  return typeof value === 'string' ? value : '';
}

function OnboardingField({ question, answers, onChange }: { question: Question; answers: Answers; onChange: (value: Answer) => void }) {
  const value = answers[question.id];
  const inputClass = 'w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-amber-400';
  const selected = Array.isArray(value) ? value : [];

  if (question.type === 'contact') {
    const contact = typeof value === 'object' && !Array.isArray(value) ? value : {};
    const update = (key: string, next: string) => onChange({ ...contact, [key]: next });
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-400">Full name <span className="text-amber-400">*</span></label>
          <input className={inputClass} placeholder="e.g. Sarah Johnson" value={contact.name ?? ''} onChange={(event) => update('name', event.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-400">Phone number <span className="text-amber-400">*</span></label>
          <input className={inputClass} type="tel" placeholder="e.g. (612) 555-0100" value={contact.phone ?? ''} onChange={(event) => update('phone', event.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-400">Email address <span className="text-amber-400">*</span></label>
          <input className={inputClass} type="email" placeholder="e.g. sarah@lakesideoral.com" value={contact.email ?? ''} onChange={(event) => update('email', event.target.value)} />
        </div>
      </div>
    );
  }

  if (question.type === 'single') {
    return (
      <div className="space-y-3">
        {question.options?.map((option) => (
          <label key={option} className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${value === option ? 'border-amber-400/70 bg-amber-400/10' : 'border-slate-700 bg-slate-900/40 hover:border-slate-500'}`}>
            <input className="mt-1 accent-amber-400" type="radio" name={question.id} checked={value === option} onChange={() => onChange(option)} />
            <span className="text-sm leading-relaxed text-slate-200">{option}</span>
          </label>
        ))}
        {question.otherOption && (
          <label className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${String(value).startsWith(`${question.otherOption}:`) ? 'border-amber-400/70 bg-amber-400/10' : 'border-slate-700 bg-slate-900/40 hover:border-slate-500'}`}>
            <input className="accent-amber-400" type="radio" name={question.id} checked={String(value).startsWith(`${question.otherOption}:`)} onChange={() => onChange(`${question.otherOption}: `)} />
            <span className="shrink-0 text-sm text-slate-200">{question.otherOption}:</span>
            <input className="min-w-0 flex-1 border-b border-slate-600 bg-transparent px-1 py-1 text-sm text-white outline-none focus:border-amber-400" value={String(value).startsWith(`${question.otherOption}:`) ? String(value).slice(question.otherOption.length + 1).trimStart() : ''} onChange={(event) => onChange(`${question.otherOption}: ${event.target.value}`)} />
          </label>
        )}
      </div>
    );
  }

  if (question.type === 'multiple') {
    const toggle = (option: string) => onChange(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]);
    return (
      <div className="space-y-3">
        {question.options?.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 hover:border-slate-500">
            <input className="h-4 w-4 accent-amber-400" type="checkbox" checked={selected.includes(option)} onChange={() => toggle(option)} />
            <span className="text-sm text-slate-200">{option}</span>
          </label>
        ))}
        {question.otherOption && <input className={inputClass} placeholder={`${question.otherOption}:`} value={selected.find((item) => item.startsWith(`${question.otherOption}:`))?.slice(question.otherOption.length + 1).trimStart() ?? ''} onChange={(event) => onChange([...selected.filter((item) => !item.startsWith(`${question.otherOption}:`)), `${question.otherOption}: ${event.target.value}`])} />}
      </div>
    );
  }

  const common = { className: inputClass, value: getValue(answers, question.id), onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value) };
  if (question.type === 'long') return <textarea {...common} rows={6} placeholder={question.placeholder ?? 'Type your answer here'} />;
  return <input {...common} type={question.type === 'short' ? 'text' : question.type} placeholder={question.placeholder ?? (question.type === 'url' ? 'https://example.com/book' : undefined)} />;
}

export default function DentalOnboarding() {
  const [answers, setAnswers] = useState<Answers>(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      return saved ? { ...initialAnswers, ...JSON.parse(saved) as Answers } : initialAnswers;
    } catch {
      return initialAnswers;
    }
  });
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [status, setStatus] = useState<'draft' | 'submitting' | 'success' | 'error'>('draft');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    document.title = 'Dental Onboarding | AdminCaptainVA';
    const robots = document.querySelector('meta[name="robots"]') ?? document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'noindex, nofollow, noarchive');
    document.head.appendChild(robots);
    return () => {
      document.title = 'AdminCaptainVA | Professional Answering Services for Growing Teams';
      robots.remove();
    };
  }, []);

  const visibleQuestions = useMemo(() => sections.flatMap((section) => section.questions.filter((question) => !question.condition || question.condition(answers))), [answers]);
  const currentSection = sections[sectionIndex];
  const currentQuestions = currentSection.questions.filter((question) => !question.condition || question.condition(answers));
  const currentQuestion = currentQuestions[questionIndex];
  const currentFlatIndex = visibleQuestions.findIndex((question) => question.id === currentQuestion.id);
  const isLast = currentFlatIndex === visibleQuestions.length - 1;
  const currentQuestionComplete = isAnswerComplete(currentQuestion, answers);
  const canProceed = currentQuestion.optional || currentQuestionComplete;

  function updateAnswer(value: Answer) {
    setAnswers((previous) => ({ ...previous, [currentQuestion.id]: value }));
    if (validationError) setValidationError('');
  }

  function saveDraft() {
    localStorage.setItem(draftKey, JSON.stringify(answers));
    setStatus('draft');
  }

  function goNext() {
    if (!canProceed) {
      setValidationError('Please answer this question before continuing.');
      return;
    }
    setValidationError('');
    saveDraft();
    if (questionIndex < currentQuestions.length - 1) {
      setQuestionIndex((index) => index + 1);
      return;
    }
    if (sectionIndex < sections.length - 1) {
      setSectionIndex((index) => index + 1);
      setQuestionIndex(0);
    }
  }

  function goBack() {
    if (questionIndex > 0) {
      setQuestionIndex((index) => index - 1);
      return;
    }
    if (sectionIndex > 0) {
      const previousSectionIndex = sectionIndex - 1;
      const previousQuestions = sections[previousSectionIndex].questions.filter((question) => !question.condition || question.condition(answers));
      setSectionIndex(previousSectionIndex);
      setQuestionIndex(previousQuestions.length - 1);
    }
  }

  async function submit() {
    if (!canProceed) {
      setValidationError('Please answer this question before submitting.');
      return;
    }
    setValidationError('');
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/notify-onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      localStorage.removeItem(draftKey);
      setStatus('success');
    } catch {
      setStatus('error');
      setError('We could not send your setup details. Please try again, or contact your Admin Captain VA representative.');
    }
  }

  useEffect(() => {
    if (status !== 'success') return;
    const timer = window.setTimeout(() => {
      window.location.href = '/';
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [status]);

  if (status === 'success') {
    return <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-16 text-white"><div className="w-full max-w-xl rounded-3xl border border-amber-400/20 bg-slate-900/80 p-8 text-center shadow-2xl sm:p-12"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10"><Check className="h-8 w-8 text-emerald-400" /></div><h1 className="font-display text-3xl font-bold">Thank you</h1><p className="mt-4 leading-relaxed text-slate-300">Thank you — we&apos;ve received your setup details. Next, we will arrange a test call before launch, and check in during the first two weeks to review calls and adjust the setup.</p><p className="mt-6 text-sm text-slate-500">You will be redirected to our website in a moment…</p></div></main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 border-b border-slate-800 pb-8 sm:mb-12">
          <div className="mb-6 flex items-center gap-3 text-amber-400"><ClipboardList className="h-6 w-6" /><span className="text-sm font-bold uppercase tracking-[0.2em]">AdminCaptainVA</span></div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Dental Onboarding</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">Welcome. This form collects the setup details we need to configure your after-hours answering service. It takes about 10 minutes. Answer only what you know — for anything else, choose &apos;Let&apos;s discuss this on our call&apos; and we will cover it together.</p>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" /><span>Do not enter passwords, login details, or patient health information in this form.</span></div>
        </header>

        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-400">Section {sectionIndex + 1} of {sections.length}</p><p className="mt-1 font-display font-semibold text-white">{currentSection.title}</p></div><span className="text-sm text-slate-400">{currentFlatIndex + 1} of {visibleQuestions.length}</span></div>
          <div className="mt-4 flex gap-1.5">{sections.map((section, index) => <div key={section.id} className={`h-1.5 flex-1 rounded-full ${index <= sectionIndex ? 'bg-amber-400' : 'bg-slate-700'}`} />)}</div>
        </div>

        <section className="rounded-3xl border border-amber-400/20 bg-slate-900/75 p-6 shadow-2xl shadow-black/20 sm:p-10">
          {currentQuestion.statement && <div className="mb-6 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-100">{currentQuestion.statement}</div>}
          <p className="text-sm font-bold uppercase tracking-widest text-amber-400">Question {currentQuestion.number}</p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl">{currentQuestion.prompt}{!currentQuestion.optional && <span className="ml-1 text-amber-400">*</span>}</h2>
          {currentQuestion.help && <p className="mt-4 max-w-3xl leading-relaxed text-slate-400">{currentQuestion.help}</p>}
          <div className="mt-8"><OnboardingField question={currentQuestion} answers={answers} onChange={updateAnswer} /></div>
          {validationError && <p className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{validationError}</p>}
          {status === 'error' && <p className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={goBack} disabled={currentFlatIndex === 0} className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ArrowLeft className="h-4 w-4" />Back</button>
            <div className="flex flex-col gap-3 sm:flex-row"><button type="button" onClick={saveDraft} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-amber-400/50 hover:text-white"><Save className="h-4 w-4" />Save and resume later</button>{isLast ? <button type="button" onClick={submit} disabled={status === 'submitting'} className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-wait disabled:opacity-60">{status === 'submitting' ? 'Sending…' : 'Submit setup details'}<Check className="h-4 w-4" /></button> : <button type="button" onClick={goNext} disabled={!canProceed} className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50">Next<ArrowRight className="h-4 w-4" /></button>}</div>
          </div>
        </section>
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-500"><ChevronRight className="h-3 w-3" />Your draft stays in this browser until you submit.</p>
      </div>
    </main>
  );
}
