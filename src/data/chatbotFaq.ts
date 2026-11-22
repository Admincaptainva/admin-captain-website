export type Industry = 'dental' | 'property' | 'legal';

export type FaqAnswer = {
  all?: string;
  dental?: string;
  property?: string;
  legal?: string;
};

export type FaqQuestion = {
  id: string;
  topic: string;
  question: string;
  keywords: string;
  answer: FaqAnswer;
  action?: 'show_booking' | 'show_audit_form';
  industries?: Industry[];
};

export const TOPICS = [
  'About us',
  'Pricing',
  'Contracts and billing',
  'How it works',
  'Getting started',
  'Dental questions',
  'Property questions',
  'Legal questions',
] as const;

export const FAQ_QUESTIONS: FaqQuestion[] = [
  // ─── About us ──────────────────────────────────────────────────────
  {
    id: 'q1',
    topic: 'About us',
    question: 'What does AdminCaptainVA do?',
    keywords: 'what do you do, services, about, answering service',
    answer: {
      all: 'We answer your business calls so you don\'t lose patients, tenants or clients. Our AI receptionist, the Specialist, and our live receptionists answer calls, capture caller details, send urgent calls to your on-call contact, and book appointments on plans that include it.',
    },
  },
  {
    id: 'q2',
    topic: 'About us',
    question: 'Will callers talk to a real person or AI?',
    keywords: 'real person, human, AI, robot, live',
    answer: {
      all: 'Both, depending on your plan. The Specialist is our AI receptionist. Live receptionists work Monday through Friday on plans with live coverage. On weekends, federal holidays and whenever your office is closed, the Specialist answers.',
    },
  },
  {
    id: 'q3',
    topic: 'About us',
    question: 'What\'s a "Specialist"?',
    keywords: 'specialist, AI receptionist',
    answer: {
      all: 'The Specialist is our AI receptionist. It answers using a script you approve, captures the caller\'s name, number and reason for calling, and handles urgent calls the way your plan and script specify.',
    },
  },
  {
    id: 'q4',
    topic: 'About us',
    question: 'Do you only work with Minnesota businesses?',
    keywords: 'location, Minnesota, states, nationwide, where',
    answer: {
      all: 'No. We\'re based in Minneapolis, MN and serve businesses anywhere in the United States.',
    },
  },
  {
    id: 'q5',
    topic: 'About us',
    question: 'What industries do you work with?',
    keywords: 'industries, who do you serve',
    answer: {
      all: 'Dental practices (including specialty practices), property management companies and law firms.',
    },
  },
  {
    id: 'q6',
    topic: 'About us',
    question: 'How is this better than voicemail?',
    keywords: 'voicemail, answering machine, why',
    answer: {
      all: 'Many callers hang up on voicemail and call the next business on their list. We answer, capture what they need, handle urgent calls right away and send you a summary so you can follow up.',
    },
  },

  // ─── Pricing ───────────────────────────────────────────────────────
  {
    id: 'q7',
    topic: 'Pricing',
    question: 'How much does it cost?',
    keywords: 'price, cost, pricing, plans, how much',
    answer: {
      dental: 'Night Watch: $0/mo, 30 calls a month (extra calls $3.69). All Hands On Deck: $199/mo, 120 calls (extra $3.49). Captain Coverage: $849/mo, 190 calls (extra $1.99).\n\nPrices don\'t include sales tax where it applies.',
      property: 'Night Watch: $0/mo, 30 calls a month (extra calls $3.69). All Hands On Deck: $199/mo, 170 calls (extra $1.75). Captain Coverage: $2.20 per unit per month, 400-unit minimum ($880), unlimited calls under fair use.\n\nPrices don\'t include sales tax where it applies.',
      legal: 'Night Watch: free live trial, 30 calls total, one time. All Hands On Deck: $849/mo, 135 calls (extra $2.99). Captain Coverage: $1,899/mo, 325 calls (extra $1.99).\n\nPrices don\'t include sales tax where it applies.',
    },
  },
  {
    id: 'q8',
    topic: 'Pricing',
    question: 'Is Night Watch really free? What\'s the catch?',
    keywords: 'free, night watch, catch, trial',
    answer: {
      dental: 'Yes, Night Watch is $0 a month and includes 30 calls, which reset each month. Calls after that are $3.69 each. We need a billing contact and payment details before you go live, and you can end it anytime with written notice.',
      property: 'Yes, Night Watch is $0 a month and includes 30 calls, which reset each month. Calls after that are $3.69 each. We need a billing contact and payment details before you go live, and you can end it anytime with written notice.',
      legal: 'For law firms, Night Watch is a one-time live trial: 30 calls total, once per firm. We email you when you\'ve used 20. After 30 calls, choose a paid plan to keep service.',
    },
  },
  {
    id: 'q9',
    topic: 'Pricing',
    question: 'What happens if I go over my calls?',
    keywords: 'over, extra calls, overage, limit',
    answer: {
      all: 'Extra calls are billed at your plan\'s per-call rate on the next month\'s invoice. We email you when you reach 80% and 100% of your included calls.',
      property: 'Extra calls are billed at your plan\'s per-call rate on the next month\'s invoice. We email you when you reach 80% and 100% of your included calls.\n\nOn Captain Coverage, calls are unlimited under fair use, so there are no extra-call charges.',
      legal: 'The free trial has no extra calls. After 30 calls, choose a paid plan.\n\nExtra calls are billed at your plan\'s per-call rate on the next month\'s invoice. We email you when you reach 80% and 100% of your included calls.',
    },
  },
  {
    id: 'q10',
    topic: 'Pricing',
    question: 'What\'s the setup fee?',
    keywords: 'setup fee, onboarding fee, one-time',
    answer: {
      all: 'A one-time fee that covers building your custom script, call routing and onboarding. It\'s billed with your first invoice, paid before you go live, and not refundable once setup work begins. Switching between paid plans has no new setup fee.',
      dental: 'A one-time fee that covers building your custom script, call routing and onboarding. It\'s billed with your first invoice, paid before you go live, and not refundable once setup work begins. Switching between paid plans has no new setup fee.\n\nNight Watch: none. All Hands On Deck: $19.90. Captain Coverage: $84.90.',
      property: 'A one-time fee that covers building your custom script, call routing and onboarding. It\'s billed with your first invoice, paid before you go live, and not refundable once setup work begins. Switching between paid plans has no new setup fee.\n\nNight Watch: none. All Hands On Deck: $19.90. Captain Coverage: 10% of your first monthly fee.',
      legal: 'A one-time fee that covers building your custom script, call routing and onboarding. It\'s billed with your first invoice, paid before you go live, and not refundable once setup work begins. Switching between paid plans has no new setup fee.\n\nNight Watch trial: none. All Hands On Deck: $84.90. Captain Coverage: none.',
    },
  },
  {
    id: 'q11',
    topic: 'Pricing',
    question: 'What counts as a call?',
    keywords: 'count, counted, what is a call, spam',
    answer: {
      all: 'Any inbound call answered by the Specialist or a live receptionist. Calls under 15 seconds, wrong numbers, spam and robocalls don\'t count. Callbacks, follow-ups and reminder calls that are part of your plan don\'t count either.',
    },
  },
  {
    id: 'q12',
    topic: 'Pricing',
    question: 'Do unused calls roll over?',
    keywords: 'rollover, unused, carry over',
    answer: {
      all: 'No. Unused calls don\'t carry over to the next month. We\'ll email you at 80% and 100% of your included calls so you\'re never surprised.',
    },
  },

  // ─── Contracts and billing ─────────────────────────────────────────
  {
    id: 'q13',
    topic: 'Contracts and billing',
    question: 'Can I switch plans anytime?',
    keywords: 'upgrade, downgrade, change plan, switch',
    answer: {
      all: 'You can upgrade anytime, effective your next billing date. Downgrades take 30 days\' written notice and can\'t take effect during your first 2 months. Moving between paid plans has no new setup fee.',
    },
  },
  {
    id: 'q14',
    topic: 'Contracts and billing',
    question: 'Is there a contract?',
    keywords: 'contract, commitment, minimum, term, billing, payment, ACH',
    answer: {
      all: 'Paid plans have a 2-month minimum from your go-live date, so we have time to prove the value. You\'re billed one month at a time, in advance, by ACH bank transfer. After 2 months, it\'s month to month. Your price won\'t change during the first 2 months. Night Watch has no minimum.',
    },
  },
  {
    id: 'q15',
    topic: 'Contracts and billing',
    question: 'How do I cancel?',
    keywords: 'cancel, cancellation, stop, quit',
    answer: {
      all: 'After your first 2 months, cancel anytime with 30 days\' written notice by email. You can give notice during the first 2 months, but it takes effect at the end of that period. Night Watch can be ended anytime with written notice. On your last day, turn off call forwarding to us. Setup fees and prepaid days aren\'t refunded.',
    },
  },
  {
    id: 'q16',
    topic: 'Contracts and billing',
    question: 'Do you offer discounts for multiple locations?',
    keywords: 'discount, multiple locations, multi-location, deal',
    answer: {
      all: 'Yes, we offer multi-location discounts. We\'ll go over pricing for your locations on a quick call.',
    },
    action: 'show_booking',
  },

  // ─── How it works ──────────────────────────────────────────────────
  {
    id: 'q17',
    topic: 'How it works',
    question: 'How do my calls get to you?',
    keywords: 'forwarding, how does it work, routing, transfer',
    answer: {
      all: 'You set up call forwarding from your phone system to our number. Depending on your plan, we take after-hours calls, missed daytime calls or both. When your plan includes live coverage, calls in those hours go to a live receptionist. Otherwise the Specialist answers.',
    },
  },
  {
    id: 'q18',
    topic: 'How it works',
    question: 'Do I need a new phone number?',
    keywords: 'new number, keep my number, phone number',
    answer: {
      all: 'No. You keep your number and forward calls to us.',
    },
  },
  {
    id: 'q19',
    topic: 'How it works',
    question: 'What hours do you cover?',
    keywords: 'hours, when, 24/7, weekends, evenings, holidays',
    answer: {
      dental: 'Every plan: the Specialist answers after-hours calls, including weekends and holidays. All Hands On Deck and Captain Coverage: the Specialist also answers missed daytime calls. Captain Coverage adds a live receptionist Monday-Friday, 5-9 pm.',
      property: 'Every plan: the Specialist answers after-hours calls, including weekends and holidays. All Hands On Deck and Captain Coverage: the Specialist also answers missed daytime calls. Captain Coverage adds a live receptionist Monday-Friday, 5-9 pm.',
      legal: 'Every plan: a live receptionist Monday-Friday, 5-9 pm, and the Specialist overnight and on weekends. Night Watch and All Hands On Deck: the Specialist also answers missed daytime calls. Captain Coverage adds live daytime overflow Monday-Friday, 8 am-5 pm (your phone rings first, and calls reach us after 3-4 rings).',
    },
  },
  {
    id: 'q20',
    topic: 'How it works',
    question: 'What happens with urgent calls?',
    keywords: 'urgent, emergency, on-call, 911',
    answer: {
      dental: 'On Night Watch, the Specialist takes a message and tells callers with a life-threatening emergency to call 911. On All Hands On Deck and Captain Coverage, urgent calls go to your on-call doctor following your approved script. On every plan, callers with a life-threatening emergency are told to call 911.',
      property: 'On Night Watch, the Specialist takes a message and tells callers reporting fire, a gas smell or a life-threatening emergency to call 911. On All Hands On Deck and Captain Coverage, maintenance emergencies go to your on-call maintenance contact and your staff is notified. On every plan, callers reporting fire, a gas smell or a life-threatening emergency are told to leave and call 911.',
      legal: 'On every plan, urgent calls go to your on-call attorney following your approved script. Callers with a life-threatening emergency are told to call 911.',
    },
  },
  {
    id: 'q21',
    topic: 'How it works',
    question: 'How do I get my messages?',
    keywords: 'messages, summary, report, notes',
    answer: {
      dental: 'Night Watch: a weekly call summary. All Hands On Deck and Captain Coverage: a summary every morning.',
      property: 'Night Watch: a weekly call summary. All Hands On Deck and Captain Coverage: a summary every morning, and missed calls emailed to your property managers. Captain Coverage adds a weekly report.',
      legal: 'You get a summary of every call. All Hands On Deck and Captain Coverage add a weekly lead report. Captain Coverage adds a monthly results call.',
    },
  },
  {
    id: 'q22',
    topic: 'How it works',
    question: 'Can you book appointments for me?',
    keywords: 'book, appointments, schedule, calendar',
    answer: {
      dental: 'On Captain Coverage, we book new-patient and emergency appointments live.\n\nBooking requires access to your scheduling or management software. Without it, we take a message for your team to follow up.',
      property: 'On Captain Coverage, we handle leasing callbacks and book tours.\n\nBooking requires access to your scheduling or management software. Without it, we take a message for your team to follow up.',
      legal: 'Yes, we book consultations on every plan, including the trial.\n\nBooking requires access to your scheduling or management software. Without it, we take a message for your team to follow up.',
    },
  },
  {
    id: 'q23',
    topic: 'How it works',
    question: 'What software do you work with?',
    keywords: 'software, integration, integrate, system',
    answer: {
      dental: 'Dentrix, Eaglesoft, Open Dental and Curve Dental.\n\nUsing something else? Ask us on a call.',
      property: 'AppFolio, Yardi, Buildium and Rent Manager.\n\nUsing something else? Ask us on a call.',
      legal: 'Clio, MyCase, Lawmatics and PracticePanther.\n\nUsing something else? Ask us on a call.',
    },
  },
  {
    id: 'q24',
    topic: 'How it works',
    question: 'Can I customize the greeting and script?',
    keywords: 'script, greeting, customize, custom',
    answer: {
      all: 'Yes. Paid plans get a custom script, and Night Watch uses our standard script. You approve every script before launch and after any change.',
    },
  },
  {
    id: 'q25',
    topic: 'How it works',
    question: 'Do you answer in Spanish?',
    keywords: 'Spanish, espanol, bilingual, language',
    answer: {
      all: 'Yes, we offer Spanish support.',
    },
  },

  // ─── Getting started ───────────────────────────────────────────────
  {
    id: 'q26',
    topic: 'Getting started',
    question: 'How long does setup take?',
    keywords: 'how long, setup time, go live, start',
    answer: {
      all: 'Once you complete our onboarding questionnaire, approve your script and pay any setup fee, we go live. We\'ll give you a go-live date on your onboarding call.',
    },
  },
  {
    id: 'q27',
    topic: 'Getting started',
    question: 'What do you need from me?',
    keywords: 'need from me, requirements, onboarding',
    answer: {
      dental: 'Your office hours, on-call contacts and phone numbers (through our onboarding questionnaire), script approval within 5 business days, call forwarding set up to our number, access to your software if your plan includes booking or data entry, and payment details for ACH billing.\n\nWe also sign a Business Associate Agreement (BAA) before service begins.',
      property: 'Your office hours, on-call contacts and phone numbers (through our onboarding questionnaire), script approval within 5 business days, call forwarding set up to our number, access to your software if your plan includes booking or data entry, and payment details for ACH billing.',
      legal: 'Your office hours, on-call contacts and phone numbers (through our onboarding questionnaire), script approval within 5 business days, call forwarding set up to our number, access to your software if your plan includes booking or data entry, and payment details for ACH billing.',
    },
  },
  {
    id: 'q28',
    topic: 'Getting started',
    question: 'Can I try it before paying?',
    keywords: 'try, trial, test, demo',
    answer: {
      dental: 'Yes. Start on Night Watch at $0 a month. You can also get a free Missed-Call Audit.',
      property: 'Yes. Start on Night Watch at $0 a month. You can also get a free Missed-Call Audit.',
      legal: 'Yes. Night Watch is a free live trial with 30 calls. You can also get a free Missed-Call Audit.',
    },
  },
  {
    id: 'q29',
    topic: 'Getting started',
    question: 'What\'s the free Missed-Call Audit?',
    keywords: 'audit, missed call audit, free audit, test calls',
    answer: {
      all: 'We place a few test calls to your office at times like lunch and after hours, then show you how many went unanswered and what that may be costing you. It\'s free, with no obligation.',
    },
    action: 'show_audit_form',
  },

  // ─── Dental questions ──────────────────────────────────────────────
  {
    id: 'q30',
    topic: 'Dental questions',
    question: 'Are you HIPAA compliant? Will you sign a BAA?',
    keywords: 'HIPAA, BAA, PHI, compliance, privacy',
    answer: {
      all: 'Yes. We sign a Business Associate Agreement with every dental practice before service begins, and it governs all protected health information we handle. Please don\'t share patient information in this chat.',
    },
    industries: ['dental'],
  },
  {
    id: 'q31',
    topic: 'Dental questions',
    question: 'Can you book new patients?',
    keywords: 'new patients, book patients',
    answer: {
      all: 'On Captain Coverage, we book new-patient and emergency appointments live, with access to your scheduling software. On other plans, we capture the caller\'s details for your team to follow up.',
    },
    industries: ['dental'],
  },
  {
    id: 'q32',
    topic: 'Dental questions',
    question: 'How do you handle after-hours emergencies?',
    keywords: 'after hours, emergency, post-op, dental emergency',
    answer: {
      all: 'The Specialist answers after-hours calls on every plan. On Night Watch, the Specialist takes a message and tells callers with a life-threatening emergency to call 911. On All Hands On Deck and Captain Coverage, urgent calls go to your on-call doctor following your script. Life-threatening emergencies are told to call 911. We never give dental advice.',
    },
    industries: ['dental'],
  },
  {
    id: 'q33',
    topic: 'Dental questions',
    question: 'Do you work with Dentrix, Open Dental or Eaglesoft?',
    keywords: 'Dentrix, Open Dental, Eaglesoft, Curve',
    answer: {
      all: 'Yes. We work with Dentrix, Eaglesoft, Open Dental and Curve Dental.',
    },
    industries: ['dental'],
  },
  {
    id: 'q34',
    topic: 'Dental questions',
    question: 'Can you answer patients\' insurance questions?',
    keywords: 'insurance, coverage, in-network',
    answer: {
      all: 'We answer using only information in your approved script. If you include basics like the networks you accept, we can share them. Detailed coverage questions go to your team.',
    },
    industries: ['dental'],
  },
  {
    id: 'q35',
    topic: 'Dental questions',
    question: 'Do you cover multiple locations?',
    keywords: 'multiple locations, offices, DSO',
    answer: {
      all: 'Yes, and we offer multi-location discounts. Let\'s go over your locations on a quick call.',
    },
    action: 'show_booking',
    industries: ['dental'],
  },

  // ─── Property questions ────────────────────────────────────────────
  {
    id: 'q36',
    topic: 'Property questions',
    question: 'How do you handle a 2 a.m. maintenance emergency?',
    keywords: '2am, night, maintenance emergency, after hours',
    answer: {
      all: 'The Specialist answers after hours on every plan. On Night Watch, the Specialist takes a message and tells callers reporting fire or a gas smell to call 911. On All Hands On Deck and Captain Coverage, maintenance emergencies go to your on-call maintenance contact and your staff is notified. Captain Coverage adds live emergency handling and a follow-up call to the tenant. Callers reporting fire or a gas smell are told to leave and call 911.',
    },
    industries: ['property'],
  },
  {
    id: 'q37',
    topic: 'Property questions',
    question: 'How do you decide what\'s an emergency?',
    keywords: 'what is an emergency, emergency rules',
    answer: {
      all: 'You decide. Your approved script lists what counts as an emergency (for example, active leaks or no heat) and who gets called.',
    },
    industries: ['property'],
  },
  {
    id: 'q38',
    topic: 'Property questions',
    question: 'Can you enter work orders into AppFolio or Buildium?',
    keywords: 'work orders, AppFolio, Buildium, Yardi, Rent Manager',
    answer: {
      all: 'Yes, on Captain Coverage. We enter work orders in AppFolio, Yardi, Buildium or Rent Manager when you give us access.',
    },
    industries: ['property'],
  },
  {
    id: 'q39',
    topic: 'Property questions',
    question: 'Do you book showings and tours?',
    keywords: 'showings, tours, leasing, prospects',
    answer: {
      all: 'On Captain Coverage, we handle leasing callbacks and book tours. We share only the listing details and access info you give us. On other plans, we capture the caller\'s details for your team to follow up.',
    },
    industries: ['property'],
  },

  // ─── Legal questions ───────────────────────────────────────────────
  {
    id: 'q40',
    topic: 'Legal questions',
    question: 'How do you handle new-client calls?',
    keywords: 'new client, intake, consultation, lead',
    answer: {
      all: 'The Specialist or a live receptionist answers, captures the caller\'s name, number and reason for calling, and collects conflict-check details. On plans with live coverage, we book consultations and do same-evening lead callbacks so you don\'t lose potential clients.',
    },
    industries: ['legal'],
  },
  {
    id: 'q41',
    topic: 'Legal questions',
    question: 'Can you collect conflict-check information?',
    keywords: 'conflict check, conflict, intake',
    answer: {
      all: 'Yes. On every plan, we collect the caller\'s name and the matter details you need for a conflict check. We send those to you so you can clear conflicts before following up.',
    },
    industries: ['legal'],
  },
  {
    id: 'q42',
    topic: 'Legal questions',
    question: 'Do you work with Clio or MyCase?',
    keywords: 'Clio, MyCase, Lawmatics, PracticePanther',
    answer: {
      all: 'Yes. We work with Clio, MyCase, Lawmatics and PracticePanther.',
    },
    industries: ['legal'],
  },
  {
    id: 'q43',
    topic: 'Legal questions',
    question: 'Can you enter intake into my practice management software?',
    keywords: 'intake, enter, software, data entry',
    answer: {
      all: 'On Captain Coverage, we enter intake details into your software (Clio, MyCase, Lawmatics or PracticePanther) when you give us access. On other plans, we send you the details to enter yourself.',
    },
    industries: ['legal'],
  },
];

export const QUALIFYING_SIZES: Record<Industry, { label: string; value: string }[]> = {
  dental: [
    { label: '1 dentist', value: '1 dentist' },
    { label: '2-4 dentists', value: '2-4 dentists' },
    { label: '5+ dentists', value: '5+ dentists' },
    { label: 'Multiple locations', value: 'multiple locations' },
  ],
  property: [
    { label: 'Under 400 units', value: 'under 400 units' },
    { label: '400-1,000 units', value: '400-1000 units' },
    { label: '1,000+ units', value: '1000+ units' },
  ],
  legal: [
    { label: 'Solo attorney', value: 'solo' },
    { label: '2-5 attorneys', value: '2-5 attorneys' },
    { label: '6+ attorneys', value: '6+ attorneys' },
  ],
};

export const QUALIFYING_MISSED = [
  { label: 'Lunch', value: 'lunch' },
  { label: 'After hours', value: 'after hours' },
  { label: 'Weekends', value: 'weekends' },
  { label: 'All day', value: 'all day' },
];

export const QUALIFYING_TIMELINE = [
  { label: 'Now', value: 'now' },
  { label: 'Within 30 days', value: '30days' },
  { label: 'Just researching', value: 'researching' },
];

export function getAnswer(q: FaqQuestion, industry: Industry | null): string {
  if (!industry) return q.answer.all || q.answer.dental || q.answer.property || q.answer.legal || '';
  return q.answer[industry] || q.answer.all || '';
}

export function questionsForTopic(topic: string, industry: Industry | null): FaqQuestion[] {
  return FAQ_QUESTIONS.filter((q) => {
    if (q.topic !== topic) return false;
    if (q.industries && industry && !q.industries.includes(industry)) return false;
    if (q.industries && !industry) return false;
    return true;
  });
}

export function topicsForIndustry(industry: Industry | null): string[] {
  return TOPICS.filter((topic) => {
    if (topic === 'Dental questions' && industry !== 'dental') return false;
    if (topic === 'Property questions' && industry !== 'property') return false;
    if (topic === 'Legal questions' && industry !== 'legal') return false;
    return true;
  });
}
