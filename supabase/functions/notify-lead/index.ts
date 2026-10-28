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
    const { name, practice_name, email, phone, specialty, voicemail_count, message, preferred_call_time } = await req.json();

    if (!email || !phone) {
      return new Response(
        JSON.stringify({ error: "email and phone are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Save lead to database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: dbError } = await supabase.from("contact_leads").insert({
      name: name || null,
      practice_name: practice_name || null,
      email,
      phone: phone || null,
      specialty: specialty || null,
      voicemail_count: voicemail_count || null,
      message: message || null,
      preferred_call_time: preferred_call_time || null,
    });

    if (dbError) throw new Error(dbError.message);

    // Notify Zapier (Slack + HubSpot). Non-blocking: a Zapier failure
    // should never break the lead save or the emails.
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/28493492/4tk6zhw/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name || "",
          practice_name: practice_name || "",
          email,
          phone: phone || "",
          specialty: specialty || "",
          voicemail_count: voicemail_count || "",
          preferred_call_time: preferred_call_time || "",
        }),
      });
    } catch (zapErr) {
      console.error("Zapier webhook failed:", zapErr);
    }

    // Send emails via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    let adminEmail: { data?: { id?: string }; error?: unknown } | null = null;
    if (resendKey) {
      const resend = new Resend(resendKey);

      const nameLabel = name || "Not provided";
      const practiceLabel = practice_name || "Not provided";
      const phoneLabel = phone || "Not provided";
      const specialtyLabel = specialty || "Not specified";
      const voicemailLabel = voicemail_count || "Not provided";
      const messageLabel = message || null;
      const preferredTimeLabel = preferred_call_time || "Not specified";

      // 1. Admin notification email
      adminEmail = await resend.emails.send({
        from: "AdminCaptainVA <contact@admincaptainva.com>",
        to: "contact@admincaptainva.com",
        replyTo: email,
        subject: `New Coverage Review Request: ${practiceLabel}`,
        html: `
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
              .lead-table th, .lead-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #f3f4f6; }
              .lead-table th { background-color: #f8fafc; color: #475569; font-weight: 600; width: 35%; font-size: 14px; }
              .lead-table td { color: #1e293b; font-size: 15px; }
              .footer { background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Coverage Review Request</h1>
              </div>
              <div class="content">
                <table class="lead-table">
                  <tr>
                    <th>Name</th>
                    <td>${nameLabel}</td>
                  </tr>
                  <tr>
                    <th>Practice</th>
                    <td>${practiceLabel}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>${phoneLabel}</td>
                  </tr>
                  <tr>
                    <th>Best Time to Chat</th>
                    <td>${preferredTimeLabel}</td>
                  </tr>
                  <tr>
                    <th>Industry</th>
                    <td><span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: 500;">${specialtyLabel}</span></td>
                  </tr>
                  <tr>
                    <th>After-hours voicemail/week</th>
                    <td>${voicemailLabel}</td>
                  </tr>
                  ${messageLabel ? `<tr><th>Message</th><td>${messageLabel}</td></tr>` : ""}
                </table>
              </div>
              <div class="footer">
                <strong>Reply directly to this email</strong> to reach the lead.
              </div>
            </div>
          </body>
          </html>
        `,
      });

      if (adminEmail?.error) {
        console.error("Admin email failed:", JSON.stringify(adminEmail.error));
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
