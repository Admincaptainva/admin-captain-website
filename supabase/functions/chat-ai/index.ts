import { createClient } from "npm:@supabase/supabase-js@2";
import { Resend } from "npm:resend@4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ADMIN_EMAIL = "contact@admincaptainva.com";
const PHONE = "(763) 496-6613";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface LeadPayload {
  industry: string | null;
  size: string | null;
  missed_when: string | null;
  current_solution: string | null;
  timeline: string | null;
  role: string | null;
  name: string | null;
  business: string | null;
  email: string | null;
  phone: string | null;
}

interface ChatRequest {
  session_id: string;
  lead: LeadPayload;
  score: string;
  action: string;
  question?: string | null;
  page?: string | null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { session_id, lead, score, action, question, page } = await req.json() as ChatRequest;

    if (!session_id || !lead) {
      return new Response(
        JSON.stringify({ error: "session_id and lead are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const answers: Record<string, string | null> = {
      size: lead.size ?? null,
      missed_when: lead.missed_when ?? null,
      current_solution: lead.current_solution ?? null,
      timeline: lead.timeline ?? null,
      role: lead.role ?? null,
    };

    const hasLeadInfo = lead.name || lead.email || lead.phone || lead.business ||
      lead.industry || lead.size || lead.missed_when ||
      lead.current_solution || lead.timeline || lead.role;

    if (score) {
      await supabase
        .from("chat_sessions")
        .update({ lead_score: score })
        .eq("id", session_id);
    }

    const { data: existingLead } = await supabase
      .from("chat_leads")
      .select("*")
      .eq("session_id", session_id)
      .maybeSingle();

    if (existingLead) {
      const updates: Record<string, unknown> = {};
      if (lead.name) updates.name = lead.name;
      if (lead.email) updates.email = lead.email;
      if (lead.phone) updates.phone = lead.phone;
      if (lead.business) updates.business = lead.business;
      if (lead.industry) updates.industry = lead.industry;
      if (score) updates.score = score;
      if (hasLeadInfo) updates.answers = answers;
      if (question) updates.question = question;
      if (page) updates.page = page;

      if (Object.keys(updates).length > 0) {
        await supabase.from("chat_leads").update(updates).eq("id", existingLead.id);
      }
    } else {
      await supabase.from("chat_leads").insert({
        session_id,
        name: lead.name ?? null,
        email: lead.email ?? null,
        phone: lead.phone ?? null,
        business: lead.business ?? null,
        industry: lead.industry ?? null,
        answers: hasLeadInfo ? answers : null,
        score: score ?? null,
        booked: false,
        question: question ?? null,
        page: page ?? null,
      });
    }

    const shouldNotify = score === "hot" || action === "show_booking" || action === "show_audit_form" || action === "show_lead_form";

    if (shouldNotify) {
      const resendKey = Deno.env.get("RESEND_API_KEY");
      if (resendKey) {
        try {
          const resend = new Resend(resendKey);

          const { data: transcript } = await supabase
            .from("chat_messages")
            .select("role, content, created_at")
            .eq("session_id", session_id)
            .order("created_at", { ascending: true });

          const transcriptHtml = (transcript || [])
            .map((m: { role: string; content: string; created_at: string }) =>
              `<tr><td style="font-weight:600;width:80px;vertical-align:top;">${escapeHtml(m.role)}</td><td style="white-space:pre-wrap;">${escapeHtml(m.content)}</td></tr>`
            )
            .join("");

          const scoreLabel = score ? score.toUpperCase() : "N/A";

          await resend.emails.send({
            from: "AdminCaptainVA Chat <contact@admincaptainva.com>",
            to: ADMIN_EMAIL,
            subject: `Chat Lead (${scoreLabel}): ${lead.business || lead.name || "New lead"}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head><meta charset="utf-8"><style>
                body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #333; margin: 0; padding: 20px; background: #f9fafb; }
                .container { max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
                .header { background: #0f1f38; padding: 24px; }
                .header h1 { color: #FFA800; margin: 0; font-size: 20px; }
                .content { padding: 32px; }
                .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .info-table th { background: #f8fafc; padding: 10px 16px; text-align: left; font-size: 13px; color: #475569; width: 35%; }
                .info-table td { padding: 10px 16px; font-size: 14px; color: #1e293b; }
                .transcript { width: 100%; border-collapse: collapse; margin-top: 10px; }
                .transcript td { padding: 8px 12px; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #374151; }
              </style></head>
              <body>
                <div class="container">
                  <div class="header"><h1>New Chat Lead — ${escapeHtml(scoreLabel)}</h1></div>
                  <div class="content">
                    <table class="info-table">
                      <tr><th>Score</th><td>${escapeHtml(scoreLabel)}</td></tr>
                      <tr><th>Action</th><td>${escapeHtml(action || "none")}</td></tr>
                      <tr><th>Name</th><td>${escapeHtml(lead.name || "Not provided")}</td></tr>
                      <tr><th>Business</th><td>${escapeHtml(lead.business || "Not provided")}</td></tr>
                      <tr><th>Email</th><td>${escapeHtml(lead.email || "Not provided")}</td></tr>
                      <tr><th>Phone</th><td>${escapeHtml(lead.phone || "Not provided")}</td></tr>
                      <tr><th>Industry</th><td>${escapeHtml(lead.industry || "Not provided")}</td></tr>
                      <tr><th>Timeline</th><td>${escapeHtml(lead.timeline || "Not provided")}</td></tr>
                      ${question ? `<tr><th>Question</th><td>${escapeHtml(question)}</td></tr>` : ""}
                      ${page ? `<tr><th>Page</th><td>${escapeHtml(page)}</td></tr>` : ""}
                    </table>
                    <h3 style="font-size:16px;margin-bottom:8px;">Full Transcript</h3>
                    <table class="transcript">${transcriptHtml}</table>
                  </div>
                </div>
              </body>
              </html>
            `,
          });
        } catch (emailErr) {
          console.error("Email notification failed:", emailErr);
        }
      } else {
        console.error("RESEND_API_KEY is not set — skipping lead notification email");
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Chat lead function error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to save lead" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
