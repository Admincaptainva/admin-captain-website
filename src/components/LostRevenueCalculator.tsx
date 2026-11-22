import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Mail,
  Settings2,
  TrendingDown,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { supabase } from '../lib/supabase';
import { track } from '../lib/analytics';
import type { CalculatorConfig, CalculatorInput, CalculatorAssumption } from '../lib/calculator-types';

// ─── Helpers ─────────────────────────────────────────────────────────

function formatMoney(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function formatCount(n: number): string {
  if (n === 0) return '0.0';
  return n.toFixed(1);
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

// ─── Slider + number input pair ──────────────────────────────────────

type SliderInputProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  helper?: string;
  field: string;
  industry: string;
  onChange: (v: number) => void;
};

function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  prefix,
  helper,
  field,
  industry,
  onChange,
}: SliderInputProps) {
  function update(v: number) {
    const clamped = clamp(v, min, max);
    onChange(clamped);
    track({ event: 'calculator_input_changed', industry, field, value: clamped });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold text-white">{label}</label>
        <div className="flex items-center gap-1 rounded-lg border border-ink-500 bg-ink-700 px-3 py-1.5">
          {prefix && <span className="text-xs text-sky-400/60">{prefix}</span>}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => update(Number(e.target.value) || 0)}
            className="w-16 bg-transparent text-right text-sm font-bold text-gold-400 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {suffix && <span className="text-xs text-sky-400/60">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => update(Number(e.target.value))}
        className="mt-3 w-full accent-gold-400"
        style={{ accentColor: '#FFA800' }}
      />
      {helper && <p className="mt-1.5 text-xs leading-relaxed text-sky-400/45">{helper}</p>}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────

export default function LostRevenueCalculator({ config }: { config: CalculatorConfig }) {
  const { ref, visible } = useReveal();

  // Initialize all input values from config defaults
  const initialValues = useMemo(() => {
    const vals: Record<string, number> = {};
    for (const input of config.inputs) vals[input.key] = input.default;
    for (const assumption of config.assumptions) vals[assumption.key] = assumption.default;
    return vals;
  }, [config]);

  const [values, setValues] = useState<Record<string, number>>(initialValues);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function updateValue(key: string, v: number) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  // ─── Calculation ───────────────────────────────────────────────────
  const results = useMemo(() => config.calculate(values), [config, values]);
  const explanation = useMemo(
    () => config.explainCalculation(values, results),
    [config, values, results],
  );

  // ─── CTA: go to audit form with pre-filled values ──────────────────
  function goToAuditForm() {
    track({ event: 'calculator_cta_clicked', industry: config.industry, cta: 'audit' });

    const calcData = {
      ...values,
      monthlyLoss: Math.round(results.monthlyLoss),
      industry: config.industry,
    };
    try {
      sessionStorage.setItem('calculator_data', JSON.stringify(calcData));
    } catch {
      // sessionStorage may be unavailable; proceed without it.
    }

    window.location.hash = '';
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  }

  // ─── CTA: email me this breakdown ──────────────────────────────────
  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    track({ event: 'calculator_cta_clicked', industry: config.industry, cta: 'email_breakdown' });

    if (!emailValue.trim()) return;

    setEmailStatus('loading');
    try {
      const { error } = await supabase.from('calculator_leads').insert({
        industry: config.industry,
        email: emailValue.trim(),
        inputs: values,
        monthly_loss: Math.round(results.monthlyLoss),
      });

      if (error) throw error;

      setEmailStatus('success');
      track({ event: 'calculator_email_saved', industry: config.industry });
    } catch {
      setEmailStatus('success');
    }
  }

  // ─── Render ────────────────────────────────────────────────────────
  return (
    <section className="mt-16" aria-labelledby="calc-heading">
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
            {config.label}
          </p>
          <h2
            id="calc-heading"
            className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl"
          >
            {config.headline}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-sky-400/60">{config.subhead}</p>
        </div>
      </div>

      <div
        ref={ref}
        className={`reveal ${visible ? 'is-visible' : ''} grid gap-6 lg:grid-cols-[1fr_1fr]`}
      >
        {/* ─── Left: Inputs ─── */}
        <div className="rounded-2xl border border-ink-500/40 bg-ink-900/80 p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="space-y-6">
            {config.inputs.map((input: CalculatorInput) => (
              <SliderInput
                key={input.key}
                label={input.label}
                value={values[input.key]}
                min={input.min}
                max={input.max}
                step={input.step}
                suffix={input.suffix}
                prefix={input.prefix}
                helper={input.helper}
                field={input.key}
                industry={config.industry}
                onChange={(v) => updateValue(input.key, v)}
              />
            ))}
          </div>

          <p className="mt-6 text-xs text-sky-400/40">
            Example numbers. Replace them with yours.
          </p>

          {config.assumptions.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setShowAssumptions((s) => !s)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
              >
                <Settings2 className="h-4 w-4" />
                Change assumptions
                {showAssumptions ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {showAssumptions && (
                <div className="mt-5 space-y-6 rounded-xl border border-ink-500/30 bg-ink-800/50 p-5">
                  {config.assumptions.map((assumption: CalculatorAssumption) => (
                    <SliderInput
                      key={assumption.key}
                      label={assumption.label}
                      value={values[assumption.key]}
                      min={assumption.min}
                      max={assumption.max}
                      suffix={assumption.suffix}
                      field={assumption.key}
                      industry={config.industry}
                      onChange={(v) => updateValue(assumption.key, v)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ─── Right: Results ─── */}
        <div className="rounded-2xl border border-ink-500/40 bg-ink-900/80 p-6 shadow-2xl shadow-black/20 sm:p-8">
          {/* Two large stat cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-300/70">
                <TrendingDown className="h-4 w-4" />
                Lost per month
              </div>
              <p className="mt-3 font-display text-3xl font-extrabold text-red-300 sm:text-4xl">
                {formatMoney(results.monthlyLoss)}
              </p>
            </div>
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-300/70">
                <TrendingDown className="h-4 w-4" />
                Lost per year
              </div>
              <p className="mt-3 font-display text-3xl font-extrabold text-red-300 sm:text-4xl">
                {formatMoney(results.yearlyLoss)}
              </p>
            </div>
          </div>

          {/* Lost line */}
          <p className="mt-5 text-center text-sm leading-relaxed text-sky-300/70">
            About{' '}
            <span className="font-bold text-gold-400">
              {formatCount(results.lostPerMonth)}
            </span>{' '}
            {config.lostLineNoun ?? config.nounPlural} lost each month.
          </p>

          {/* Plan comparison */}
          <div className="mt-6 space-y-3">
            {results.planBreakEven.map((plan) => (
              <div
                key={plan.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-ink-500/30 bg-ink-800/40 px-4 py-3.5"
              >
                <div>
                  <p className="text-sm font-bold text-white">{plan.name}</p>
                  <p className="text-xs text-sky-400/50">
                    {formatMoney(plan.monthlyPrice)}/mo
                    {plan.priceSuffix ? ` for ${plan.priceSuffix}` : ''}
                  </p>
                </div>
                <p className="text-right text-sm leading-snug text-sky-200/80">
                  Pays for itself with{' '}
                  <span className="font-bold text-gold-400">{plan.breakEven}</span>{' '}
                  saved {config.nounPlural} a year.
                </p>
              </div>
            ))}
          </div>

          {/* Footnote */}
          {config.footnote && (
            <p className="mt-4 text-xs leading-relaxed text-sky-400/40">{config.footnote}</p>
          )}

          {/* How we calculated this */}
          <button
            type="button"
            onClick={() => setShowCalculation((s) => !s)}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400/50 transition-colors hover:text-sky-300"
          >
            How we calculated this
            {showCalculation ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
          {showCalculation && (
            <div className="mt-3 rounded-xl border border-ink-500/30 bg-ink-800/40 p-4 text-xs leading-relaxed text-sky-300/60">
              <p className="font-semibold text-sky-200/80">The math:</p>
              <ol className="mt-2 space-y-1.5">
                {explanation.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ol>
            </div>
          )}

          {/* CTAs */}
          <div className="mt-7 space-y-3">
            <button
              type="button"
              onClick={goToAuditForm}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-400 px-6 py-3.5 text-sm font-bold text-ink-900 shadow-lg shadow-gold-400/20 transition-all hover:-translate-y-0.5 hover:bg-gold-500"
            >
              Get my free Missed-Call Audit
              <ArrowRight className="h-4 w-4" />
            </button>

            {config.secondaryCta && (
              <button
                type="button"
                onClick={goToAuditForm}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gold-400/40 bg-gold-400/10 px-5 py-3 text-sm font-semibold text-gold-400 transition-all hover:bg-gold-400/20"
              >
                {config.secondaryCta.label}
              </button>
            )}

            {!showEmailField ? (
              <button
                type="button"
                onClick={() => setShowEmailField(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink-500 bg-ink-700/60 px-5 py-3 text-sm font-semibold text-sky-200/80 transition-all hover:border-gold-400/40 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                Email me this breakdown
              </button>
            ) : emailStatus === 'success' ? (
              <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3.5 text-center text-sm text-emerald-300">
                We will email you this breakdown shortly.
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="you@yourcompany.com"
                  className="w-full rounded-xl border border-ink-500 bg-ink-700 px-4 py-3 text-sm text-white outline-none focus:border-gold-400 placeholder:text-sky-400/40"
                />
                {emailStatus === 'error' && (
                  <p className="text-xs text-red-300">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={emailStatus === 'loading'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink-500 bg-ink-700/60 px-5 py-3 text-sm font-semibold text-sky-200/80 transition-all hover:border-gold-400/40 hover:text-white disabled:opacity-60"
                >
                  {emailStatus === 'loading' ? 'Sending...' : 'Send me the breakdown'}
                  <Mail className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Transition line into pricing */}
      <div className="mt-10 flex flex-col items-center gap-2 text-center">
        <p className="text-lg leading-relaxed text-sky-300/80">
          Here is what it costs to stop the leak.
        </p>
        <button
          type="button"
          onClick={() =>
            document.getElementById('bundle-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          className="inline-flex items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 p-2 text-gold-400 transition-all hover:bg-gold-400/20"
          aria-label="Scroll to pricing"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
