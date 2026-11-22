import { createClient } from "npm:@supabase/supabase-js@2";
import { Resend } from "npm:resend@4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { answers } = await req.json();

    if (!answers || typeof answers !== "object") {
      return new Response(
        JSON.stringify({ error: "answers object is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: dbError } = await supabase
      .from("dental_onboarding_submissions")
      .insert({ answers });

    if (dbError) throw new Error(dbError.message);

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      const resend = new Resend(resendKey);

      const practiceName = (answers as Record<string, unknown>).practiceName as string | undefined;
      const subject = practiceName
        ? `New Dental Onboarding Submission: ${practiceName}`
        : "New Dental Onboarding Submission";

      const rows = Object.entries(answers as Record<string, unknown>)
        .map(([key, value]) => {
          const display = Array.isArray(value)
            ? value.join(", ")
            : typeof value === "object" && value !== null
              ? Object.entries(value as Record<string, unknown>)
                  .map(([k, v]) => `${k}: ${v ?? ""}`)
                  .join(" | ")
              : String(value ?? "");
          return `<tr><th>${escapeHtml(key)}</th><td>${escapeHtml(display)}</td></tr>`;
        })
        .join("");

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; margin: 0; padding: 20px; background-color: #f9fafb; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            .header { background-color: #0f1f38; padding: 24px; text-align: center; }
            .header h1 { color: #FFA800; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px; }
            .content { padding: 32px; }
            .lead-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            .lead-table th, .lead-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
            .lead-table th { background-color: #f8fafc; color: #475569; font-weight: 600; width: 35%; font-size: 14px; }
            .lead-table td { color: #1e293b; font-size: 15px; }
            .footer { background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Dental Onboarding Submission</h1>
            </div>
            <div class="content">
              <p>A dental practice has completed their onboarding form. The full submission is below.</p>
              <table class="lead-table">
                ${rows}
              </table>
            </div>
            <div class="footer">
              This submission was sent automatically from the AdminCaptainVA dental onboarding page.
            </div>
          </div>
        </body>
        </html>
      `;

      const { error: emailError } = await resend.emails.send({
        from: "AdminCaptainVA <contact@admincaptainva.com>",
        to: "contact@admincaptainva.com",
        subject,
        html: emailHtml,
      });

      if (emailError) {
        console.error("Onboarding email failed:", JSON.stringify(emailError));
      }
    } else {
      console.error("RESEND_API_KEY is not set — skipping email sending");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
