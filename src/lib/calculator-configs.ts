import type { CalculatorConfig } from './calculator-types';

export const dentalConfig: CalculatorConfig = {
  industry: 'dental',
  label: 'Dental Calculator',
  headline: 'What are missed calls costing your practice?',
  subhead: 'Plug in your numbers. It takes 30 seconds.',
  nounPlural: 'patients',
  inputs: [
    { key: 'callsPerWeek', label: 'Calls per week', min: 10, max: 500, default: 100 },
    {
      key: 'missedPercent',
      label: 'Percent of calls you miss',
      min: 0,
      max: 60,
      default: 20,
      suffix: '%',
      helper: 'Lunch, after hours, busy times.',
    },
    {
      key: 'newPatientPercent',
      label: 'Percent of callers who are new patients',
      min: 0,
      max: 60,
      default: 20,
      suffix: '%',
    },
    {
      key: 'patientValue',
      label: 'Value of one new patient',
      min: 100,
      max: 5000,
      default: 800,
      step: 50,
      prefix: '$',
      helper: 'What a new patient is worth to your practice in their first year.',
    },
  ],
  assumptions: [
    {
      key: 'goElsewhere',
      label: 'Percent of missed callers who go to another practice',
      min: 0,
      max: 100,
      default: 50,
      suffix: '%',
    },
    {
      key: 'wouldBook',
      label: 'Percent who would have booked',
      min: 0,
      max: 100,
      default: 60,
      suffix: '%',
    },
  ],
  plans: [
    { name: 'All Hands On Deck', monthlyPrice: 349 },
    { name: 'Captain Coverage', monthlyPrice: 1500 },
  ],
  calculate: (v) => {
    const callsPerWeek = v.callsPerWeek ?? 0;
    const missedPercent = v.missedPercent ?? 0;
    const newPatientPercent = v.newPatientPercent ?? 0;
    const patientValue = v.patientValue ?? 0;
    const goElsewhere = v.goElsewhere ?? 50;
    const wouldBook = v.wouldBook ?? 60;

    const lostPerMonth =
      callsPerWeek * 4.33 * (missedPercent / 100) * (newPatientPercent / 100) *
      (goElsewhere / 100) * (wouldBook / 100);

    const monthlyLoss = lostPerMonth * patientValue;
    const yearlyLoss = monthlyLoss * 12;

    const planBreakEven = [
      { name: 'All Hands On Deck', monthlyPrice: 349, breakEven: Math.ceil((349 * 12) / patientValue) },
      { name: 'Captain Coverage', monthlyPrice: 1500, breakEven: Math.ceil((1500 * 12) / patientValue) },
    ];

    return { lostPerMonth, monthlyLoss, yearlyLoss, planBreakEven };
  },
  explainCalculation: (v, r) => [
    `1. Calls per week (${v.callsPerWeek}) × 4.33 weeks = ${Math.round((v.callsPerWeek ?? 0) * 4.33)} calls/month`,
    `2. × ${v.missedPercent}% missed × ${v.newPatientPercent}% new patients = ${((v.callsPerWeek ?? 0) * 4.33 * ((v.missedPercent ?? 0) / 100) * ((v.newPatientPercent ?? 0) / 100)).toFixed(1)} missed new patients/month`,
    `3. × ${v.goElsewhere}% who go elsewhere × ${v.wouldBook}% who would have booked = ${r.lostPerMonth.toFixed(1)} lost patients/month`,
    `4. × $${Math.round(v.patientValue ?? 0).toLocaleString('en-US')} per patient = $${Math.round(r.monthlyLoss).toLocaleString('en-US')}/month`,
  ],
};

export const propertyConfig: CalculatorConfig = {
  industry: 'Property management',
  label: 'Property Calculator',
  headline: 'What are missed calls costing your properties?',
  subhead: 'Every missed leasing call is a unit that sits empty longer. Plug in your numbers.',
  nounPlural: 'leases',
  inputs: [
    { key: 'callsPerWeek', label: 'Leasing or prospect calls per week', min: 5, max: 300, default: 40 },
    {
      key: 'missedPercent',
      label: 'Percent of calls you miss',
      min: 0,
      max: 60,
      default: 25,
      suffix: '%',
    },
    {
      key: 'wouldSignPercent',
      label: "Percent of prospects who would sign a lease",
      min: 0,
      max: 50,
      default: 10,
      suffix: '%',
    },
    {
      key: 'leaseValue',
      label: 'Value of one signed lease',
      min: 200,
      max: 5000,
      default: 1500,
      step: 50,
      prefix: '$',
      helper: "Your leasing fee, or one month's rent if you're not sure.",
    },
    {
      key: 'units',
      label: 'Units you manage',
      min: 50,
      max: 5000,
      default: 400,
      helper: 'Used to price Captain Coverage.',
    },
  ],
  assumptions: [
    {
      key: 'goElsewhere',
      label: 'Percent of missed callers who go to another property',
      min: 0,
      max: 100,
      default: 50,
      suffix: '%',
    },
  ],
  plans: [
    { name: 'All Hands On Deck', monthlyPrice: 199 },
    {
      name: 'Captain Coverage',
      monthlyPrice: (v) => Math.max(v.units ?? 400, 400) * 2.2,
      priceSuffix: (v) => `${Math.max(v.units ?? 400, 400)} units`,
    },
  ],
  footnote:
    "Does not include after-hours emergencies, tenant complaints, or owner turnover from slow response.",
  calculate: (v) => {
    const callsPerWeek = v.callsPerWeek ?? 0;
    const missedPercent = v.missedPercent ?? 0;
    const wouldSignPercent = v.wouldSignPercent ?? 0;
    const leaseValue = v.leaseValue ?? 0;
    const goElsewhere = v.goElsewhere ?? 50;
    const units = v.units ?? 400;

    const lostPerMonth =
      callsPerWeek * 4.33 * (missedPercent / 100) *
      (goElsewhere / 100) * (wouldSignPercent / 100);

    const monthlyLoss = lostPerMonth * leaseValue;
    const yearlyLoss = monthlyLoss * 12;

    const captainPrice = Math.max(units, 400) * 2.2;

    const planBreakEven = [
      { name: 'All Hands On Deck', monthlyPrice: 199, breakEven: Math.ceil((199 * 12) / leaseValue) },
      {
        name: 'Captain Coverage',
        monthlyPrice: Math.round(captainPrice),
        priceSuffix: `${Math.max(units, 400)} units`,
        breakEven: Math.ceil((captainPrice * 12) / leaseValue),
      },
    ];

    return { lostPerMonth, monthlyLoss, yearlyLoss, planBreakEven };
  },
  explainCalculation: (v, r) => {
    const units = v.units ?? 400;
    const captainPrice = Math.max(units, 400) * 2.2;
    return [
      `1. Leasing calls per week (${v.callsPerWeek}) × 4.33 weeks = ${Math.round((v.callsPerWeek ?? 0) * 4.33)} calls/month`,
      `2. × ${v.missedPercent}% missed × ${v.goElsewhere}% who go elsewhere = ${((v.callsPerWeek ?? 0) * 4.33 * ((v.missedPercent ?? 0) / 100) * ((v.goElsewhere ?? 0) / 100)).toFixed(1)} missed prospects/month`,
      `3. × ${v.wouldSignPercent}% who would sign = ${r.lostPerMonth.toFixed(1)} lost leases/month`,
      `4. × $${Math.round(v.leaseValue ?? 0).toLocaleString('en-US')} per lease = $${Math.round(r.monthlyLoss).toLocaleString('en-US')}/month`,
      `5. Captain Coverage: ${Math.max(units, 400)} units × $2.20 = $${Math.round(captainPrice).toLocaleString('en-US')}/mo`,
    ];
  },
};

export const legalConfig: CalculatorConfig = {
  industry: 'Legal',
  label: 'Legal Calculator',
  headline: 'What are missed calls costing your firm?',
  subhead: "People who reach voicemail often call the next firm on the list. Plug in your numbers.",
  nounPlural: 'cases',
  lostLineNoun: 'new cases',
  inputs: [
    { key: 'callsPerWeek', label: 'New-client calls per week', min: 2, max: 200, default: 20 },
    {
      key: 'missedPercent',
      label: 'Percent of calls you miss',
      min: 0,
      max: 60,
      default: 25,
      suffix: '%',
      helper: 'Court, meetings, after hours.',
    },
    {
      key: 'consultToClientPercent',
      label: 'Percent of consultations that become clients',
      min: 0,
      max: 80,
      default: 30,
      suffix: '%',
    },
    {
      key: 'averageFee',
      label: 'Average fee per case',
      min: 500,
      max: 50000,
      default: 3500,
      step: 100,
      prefix: '$',
      helper: 'What a typical new case is worth to your firm in fees.',
    },
  ],
  assumptions: [
    {
      key: 'goElsewhere',
      label: 'Percent of missed callers who call another firm',
      min: 0,
      max: 100,
      default: 50,
      suffix: '%',
    },
    {
      key: 'wouldBook',
      label: 'Percent who would have booked a consultation',
      min: 0,
      max: 100,
      default: 60,
      suffix: '%',
    },
  ],
  plans: [
    { name: 'All Hands On Deck', monthlyPrice: 849 },
    { name: 'Captain Coverage', monthlyPrice: 1899 },
  ],
  footnote: "Does not include referrals or repeat work from those clients.",
  secondaryCta: { label: 'Start your free trial (30 calls)' },
  calculate: (v) => {
    const callsPerWeek = v.callsPerWeek ?? 0;
    const missedPercent = v.missedPercent ?? 0;
    const consultToClientPercent = v.consultToClientPercent ?? 0;
    const averageFee = v.averageFee ?? 0;
    const goElsewhere = v.goElsewhere ?? 50;
    const wouldBook = v.wouldBook ?? 60;

    const lostPerMonth =
      callsPerWeek * 4.33 * (missedPercent / 100) *
      (goElsewhere / 100) * (wouldBook / 100) * (consultToClientPercent / 100);

    const monthlyLoss = lostPerMonth * averageFee;
    const yearlyLoss = monthlyLoss * 12;

    const planBreakEven = [
      { name: 'All Hands On Deck', monthlyPrice: 849, breakEven: Math.ceil((849 * 12) / averageFee) },
      { name: 'Captain Coverage', monthlyPrice: 1899, breakEven: Math.ceil((1899 * 12) / averageFee) },
    ];

    return { lostPerMonth, monthlyLoss, yearlyLoss, planBreakEven };
  },
  explainCalculation: (v, r) => [
    `1. New-client calls per week (${v.callsPerWeek}) × 4.33 weeks = ${Math.round((v.callsPerWeek ?? 0) * 4.33)} calls/month`,
    `2. × ${v.missedPercent}% missed × ${v.goElsewhere}% who call another firm × ${v.wouldBook}% who would have booked = ${((v.callsPerWeek ?? 0) * 4.33 * ((v.missedPercent ?? 0) / 100) * ((v.goElsewhere ?? 0) / 100) * ((v.wouldBook ?? 0) / 100)).toFixed(1)} missed consultations/month`,
    `3. × ${v.consultToClientPercent}% who become clients = ${r.lostPerMonth.toFixed(1)} lost cases/month`,
    `4. × $${Math.round(v.averageFee ?? 0).toLocaleString('en-US')} per case = $${Math.round(r.monthlyLoss).toLocaleString('en-US')}/month`,
  ],
};
