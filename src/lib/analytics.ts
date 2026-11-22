// Minimal analytics shim. Call track() anywhere; wire it to your
// analytics provider (GA, Plausible, PostHog, etc.) by replacing
// the body of this function.
type AnalyticsEvent =
  | { event: 'calculator_input_changed'; industry: string; field: string; value: number | string }
  | { event: 'calculator_cta_clicked'; industry: string; cta: 'audit' | 'email_breakdown' }
  | { event: 'calculator_email_saved'; industry: string };

export function track(payload: AnalyticsEvent): void {
  // TODO: connect to your analytics provider.
  // e.g. window.gtag?.('event', payload.event, payload);
  if (typeof window !== 'undefined') {
    const w = window as unknown as Record<string, unknown>;
    if (w.dataLayer && Array.isArray(w.dataLayer)) {
      (w.dataLayer as unknown[]).push(payload);
    }
  }
  if (import.meta.env.DEV) {
    console.debug('[analytics]', payload);
  }
}
