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
    const { name, email, phone, trade, message } = await req.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "name and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Save lead to database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: dbError } = await supabase.from("contact_leads").insert({
      name,
      email,
      phone: phone || null,
      trade: trade || null,
      message: message || null,
    });

    if (dbError) throw new Error(dbError.message);

    // Send emails via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      const resend = new Resend(resendKey);

      const tradeLabel = trade || "Not specified";
      const phoneLabel = phone || "Not provided";
      const messageLabel = message || "None";

      // 1. Admin notification email
      await resend.emails.send({
        from: "Abe Ige <abe@useadmincaptainva.com>",
        to: "contact@admincaptainva.com",
        replyTo: email,
        subject: `New Lead: ${name} — ${tradeLabel}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; margin: 0; padding: 20px; background-color: #f9fafb; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
              .header { background-color: #1e3a8a; padding: 24px; text-align: center; }
              .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px; }
              .content { padding: 32px; }
              .lead-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
              .lead-table th, .lead-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #f3f4f6; }
              .lead-table th { background-color: #f8fafc; color: #475569; font-weight: 600; width: 30%; font-size: 14px; }
              .lead-table td { color: #1e293b; font-size: 15px; }
              .message-box { background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin-top: 8px; border-radius: 0 4px 4px 0; font-style: italic; color: #334155; line-height: 1.5; }
              .footer { background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Lead Notification</h1>
              </div>
              <div class="content">
                <table class="lead-table">
                  <tr>
                    <th>Name</th>
                    <td>${name}</td>
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
                    <th>Trade</th>
                    <td><span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: 500;">${tradeLabel}</span></td>
                  </tr>
                </table>

                <h3 style="color: #475569; font-size: 14px; font-weight: 600; margin-top: 24px; margin-bottom: 8px;">Message / Inquiry Details:</h3>
                <div class="message-box">
                  "${messageLabel}"
                </div>
              </div>
              <div class="footer">
                <strong>Reply directly to this email</strong> to reach the lead.
              </div>
            </div>
          </body>
          </html>
        `,
      });

      // 2. Client auto-reply email
      await resend.emails.send({
        from: "Abe Ige <abe@useadmincaptainva.com>",
        to: email,
        subject: "Got your message — let's find a time",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; margin: 0; padding: 20px; background-color: #f9fafb; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
              .header { background-color: #1e3a8a; padding: 24px; text-align: center; }
              .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px; }
              .content { padding: 32px; line-height: 1.6; color: #334155; font-size: 15px; }
              .cta { display: inline-block; background-color: #eeba2b; color: #0b1829; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 20px 0; }
              .footer { background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thanks for reaching out, ${name}!</h1>
              </div>
              <div class="content">
                <p>Thanks for reaching out to AdminCaptainVA. I've got your info and will personally follow up within one business day.</p>
                <p>If you'd rather skip the back-and-forth, grab a time that works for you here and we'll talk about what's eating up your admin hours:</p>
                <p><a href="https://calendly.com/contact-admincaptainva/15-minute-phone-audit" class="cta">Book your 15-minute phone audit</a></p>
                <p>— Abe, AdminCaptainVA</p>
              </div>
              <div class="footer">
                AdminCaptainVA · Virtual Assistants for Trade Businesses · Minneapolis, MN
              </div>
            </div>
          </body>
          </html>
        `,
        text: `Thanks for reaching out to AdminCaptainVA. I've got your info and will personally follow up within one business day.

If you'd rather skip the back-and-forth, grab a time that works for you here and we'll talk about what's eating up your admin hours:
https://calendly.com/contact-admincaptainva/15-minute-phone-audit

— Abe, AdminCaptainVA
AdminCaptainVA · Virtual Assistants for Trade Businesses · Minneapolis, MN`,
      });
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
