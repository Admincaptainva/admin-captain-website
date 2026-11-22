import { ArrowRight, HeartHandshake, Lightbulb, MapPin, MessageCircle, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const values = [
  {
    icon: HeartHandshake,
    title: 'Own the outcome',
    description: 'We take responsibility for the experience we create for every caller, client, and teammate.',
  },
  {
    icon: MessageCircle,
    title: 'Communicate clearly',
    description: 'We make the next step obvious, share context early, and treat every conversation with respect.',
  },
  {
    icon: Lightbulb,
    title: 'Improve the playbook',
    description: 'We stay curious, learn from real calls, and make thoughtful changes that help teams work better.',
  },
];

const roles = [
  {
    title: 'Virtual Receptionist',
    type: 'Part-time · Remote',
    description: 'Become the calm, capable first voice for dental specialty practices, law firms, and property management companies across the United States.',
    skills: ['Clear communication', 'Reliable follow-through', 'Comfort with technology'],
    details: {
      responsibilities: [
        'Work 100% remotely from home.',
        'Answer calls for U.S. businesses using approved scripts.',
        'Take messages, screen new callers, and book appointments.',
        'Route urgent calls to the right on-call person.',
        'Log every call clearly and accurately.',
        'Follow up with callers and leads when needed.',
        'Be part of a small, supportive team.',
      ],
      fit: [
        'Speak English clearly and confidently.',
        'Type at least 40 words per minute.',
        'Stay calm with upset or worried callers.',
        'Follow instructions and scripts carefully.',
        'Keep private information private, always.',
        'Feel comfortable learning new software.',
        'Be reliable and on time for every shift.',
      ],
      requirements: [
        'Your own password-protected desktop or laptop with Google Chrome and at least 8 GB RAM.',
        'A headset with a noise-canceling microphone and a quiet, private room for calls.',
        'Reliable home internet with under 50 ms ping, over 10 Mbps download, and over 3 Mbps upload.',
        'A backup internet option, such as a mobile hotspot, and a backup power source.',
        'The ability to pass a background check and a bank account for receiving payments.',
      ],
    },
  },
  {
    title: 'Operations Coordinator',
    type: 'Full-time · Remote',
    description: 'Keep people, processes, and call flows aligned as AdminCaptainVA grows across new industries.',
    skills: ['Organization', 'Process improvement', 'Cross-team collaboration'],
    details: {
      responsibilities: [
        'Work 100% remotely from home.',
        'Coordinate daily operations across receptionist shifts and client accounts.',
        'Monitor call quality, responsiveness, and service level commitments.',
        'Build and refine standard operating procedures, scripts, and playbooks.',
        'Onboard new clients and team members with clear documentation.',
        'Track performance metrics and flag issues before they escalate.',
        'Partner with leadership on hiring, scheduling, and capacity planning.',
      ],
      fit: [
        'Communicate clearly and professionally in English, in writing and on calls.',
        'Stay organized across many moving parts without dropping details.',
        'Think in systems and enjoy improving how work gets done.',
        'Remain calm and decisive when something goes off script.',
        'Take ownership of follow-through and hold yourself accountable.',
        'Collaborate well with a small, remote-first team.',
        'Be reliable and on time for every shift.',
      ],
      requirements: [
        'Your own password-protected desktop or laptop with Google Chrome and at least 8 GB RAM.',
        'A headset with a noise-canceling microphone and a quiet, private room for calls.',
        'Reliable home internet with under 50 ms ping, over 10 Mbps download, and over 3 Mbps upload.',
        'A backup internet option, such as a mobile hotspot, and a backup power source.',
        'The ability to pass a background check and a bank account for receiving payments.',
      ],
    },
  },
];

export default function Careers() {
  const { ref, visible } = useReveal();

  function handleScrollToRoles(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink-950 pt-28 pb-24">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-48 right-0 h-[620px] w-[620px] rounded-full bg-gold-400/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 -left-48 h-[520px] w-[520px] rounded-full bg-sky-400/8 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <section ref={ref} className={`reveal ${visible ? 'is-visible' : ''} grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24`}>
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gold-400">
              <span className="h-px w-8 bg-gold-400/50" />
              Careers at AdminCaptainVA
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Do work that makes every conversation count.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-sky-200/75 sm:text-xl">
              We are building a thoughtful team for the businesses and people who depend on a better answer. If you care about service, ownership, and making work feel more human, we would like to meet you.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="mailto:Contact@admincaptainva.com?subject=Careers%20at%20AdminCaptainVA" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-7 py-4 text-sm font-bold text-ink-900 shadow-lg shadow-gold-400/20 transition-all hover:-translate-y-0.5 hover:bg-gold-500 hover:shadow-gold-400/30">
                Start a conversation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#open-roles" onClick={handleScrollToRoles} className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-500/60 bg-ink-800/40 px-7 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-gold-400/40 hover:bg-ink-800/70">
                View open roles
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-sky-300/65">
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-400" />Remote-first team</span>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-gold-400" />Small team, real impact</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] border border-gold-400/10 bg-gold-400/5 blur-sm" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-ink-500/40 bg-gradient-to-br from-ink-800 to-ink-900 p-7 shadow-2xl shadow-black/30 sm:p-9">
              <div className="mb-12 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-400/25 bg-gold-400/10">
                  <Sparkles className="h-6 w-6 text-gold-400" />
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">We are growing</span>
              </div>
              <p className="font-display text-3xl font-extrabold leading-tight text-white">Bring your best thinking to a team that listens.</p>
              <div className="mt-8 space-y-3">
                {['Work with purpose', 'Learn across industries', 'Help shape how we grow'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-ink-500/30 bg-ink-700/35 px-4 py-3 text-sm text-sky-200/80">
                    <span className="h-2 w-2 rounded-full bg-gold-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-ink-500/30 py-20 sm:py-28" aria-labelledby="values-heading">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">How we work</p>
            <h2 id="values-heading" className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">A high standard, without the ego.</h2>
            <p className="mt-4 text-base leading-relaxed text-sky-300/70">The best service teams are built on trust. We give people room to think, clear expectations, and the support to follow through.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="rounded-2xl border border-ink-500/30 bg-ink-800/45 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/35 hover:bg-ink-800/70">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/10">
                  <value.icon className="h-6 w-6 text-gold-400" />
                </div>
                <h3 className="mt-5 font-display text-xl font-extrabold text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sky-300/70">{value.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="open-roles" className="scroll-mt-24 border-t border-ink-500/30 py-20 sm:py-28" aria-labelledby="roles-heading">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">Open roles</p>
              <h2 id="roles-heading" className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Find your place on the team.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-sky-300/65 sm:text-right">Do not see the perfect role? We still want to hear from thoughtful people who care about great service.</p>
          </div>
          <div className="mt-10 space-y-4">
            {roles.map((role) => (
              <article key={role.title} className="group rounded-2xl border border-ink-500/30 bg-ink-800/40 p-6 transition-all duration-300 hover:border-gold-400/35 hover:bg-ink-800/65 sm:p-7">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-extrabold text-white sm:text-2xl">{role.title}</h3>
                      <span className="rounded-full border border-sky-400/20 bg-sky-400/8 px-3 py-1 text-xs font-semibold text-sky-300/80">{role.type}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-sky-300/70 sm:text-base">{role.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {role.skills.map((skill) => <span key={skill} className="rounded-lg bg-ink-700/70 px-3 py-1.5 text-xs text-sky-200/70">{skill}</span>)}
                    </div>
                  </div>
                  <a href={`mailto:Contact@admincaptainva.com?subject=Application%3A%20${encodeURIComponent(role.title)}`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-gold-400/35 px-5 py-3 text-sm font-bold text-gold-400 transition-all hover:bg-gold-400 hover:text-ink-900">
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                {role.details && (
                  <details className="mt-7 border-t border-ink-500/30 pt-5">
                    <summary className="cursor-pointer list-none text-sm font-bold text-gold-400 transition-colors hover:text-gold-300">Read the full role description</summary>
                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                      <div className="flex flex-col rounded-xl border border-ink-500/30 bg-ink-900/40 p-5">
                        <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-white">What you&apos;ll do</h4>
                        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-sky-300/70">
                          {role.details.responsibilities.map((item) => <li key={item} className="flex gap-2.5"><span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" /><span>{item}</span></li>)}
                        </ul>
                      </div>
                      <div className="flex flex-col rounded-xl border border-ink-500/30 bg-ink-900/40 p-5">
                        <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-white">You&apos;ll be a great fit if you</h4>
                        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-sky-300/70">
                          {role.details.fit.map((item) => <li key={item} className="flex gap-2.5"><span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" /><span>{item}</span></li>)}
                        </ul>
                      </div>
                      <div className="flex flex-col rounded-xl border border-ink-500/30 bg-ink-900/40 p-5">
                        <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-white">Before you apply</h4>
                        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-sky-300/70">
                          {role.details.requirements.map((item) => <li key={item} className="flex gap-2.5"><span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" /><span>{item}</span></li>)}
                        </ul>
                      </div>
                    </div>
                  </details>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gold-400/25 bg-gradient-to-r from-gold-400/10 via-ink-800/70 to-sky-400/10 px-6 py-12 text-center sm:px-10">
          <ShieldCheck className="mx-auto h-8 w-8 text-gold-400" />
          <h2 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">Ready to make an impact?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sky-300/75">Send us a short note about what you do well and the kind of work you want to grow into.</p>
          <a href="mailto:Contact@admincaptainva.com?subject=Careers%20at%20AdminCaptainVA" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gold-400 px-6 py-3.5 text-sm font-bold text-ink-900 transition-all hover:-translate-y-0.5 hover:bg-gold-500">
            Contact our team
            <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </div>
    </main>
  );
}
