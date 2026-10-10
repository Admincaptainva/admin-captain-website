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
    const { name, practice_name, email, phone, specialty, voicemail_count } = await req.json();

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
      practice_name: practice_name || null,
      email,
      phone: phone || null,
      specialty: specialty || null,
      voicemail_count: voicemail_count || null,
    });

    if (dbError) throw new Error(dbError.message);

    // Notify Zapier (Slack + HubSpot). Non-blocking: a Zapier failure
    // should never break the lead save or the emails.
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/28493492/4tk6zhw/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          practice_name: practice_name || "",
          email,
          phone: phone || "",
          specialty: specialty || "",
          voicemail_count: voicemail_count || "",
        }),
      });
    } catch (zapErr) {
      console.error("Zapier webhook failed:", zapErr);
    }

    // Send emails via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      const resend = new Resend(resendKey);

      const specialtyLabel = specialty || "Not specified";
      const practiceLabel = practice_name || "Not provided";
      const phoneLabel = phone || "Not provided";
      const voicemailLabel = voicemail_count || "Not provided";

      // 1. Admin notification email
      await resend.emails.send({
        from: "Abe Ige <abe@useadmincaptainva.com>",
        to: "contact@admincaptainva.com",
        replyTo: email,
        subject: `New Free Plan Sign-Up: ${name} — ${practiceLabel}`,
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
                <h1>New Free Plan Sign-Up</h1>
              </div>
              <div class="content">
                <table class="lead-table">
                  <tr>
                    <th>Name</th>
                    <td>${name}</td>
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
                    <th>Specialty</th>
                    <td><span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: 500;">${specialtyLabel}</span></td>
                  </tr>
                  <tr>
                    <th>After-hours voicemail/week</th>
                    <td>${voicemailLabel}</td>
                  </tr>
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

      // 2. Client auto-reply email
      await resend.emails.send({
        from: "Abe Ige <abe@useadmincaptainva.com>",
        to: email,
        subject: "Welcome — your free plan is being activated",
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
              .content { padding: 32px; line-height: 1.6; color: #334155; font-size: 15px; }
              .highlight { background-color: #fef3c7; border-left: 4px solid #FFA800; padding: 16px; margin: 20px 0; border-radius: 0 4px 4px 0; }
              .cta { display: inline-block; background-color: #FFA800; color: #0b1829; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 20px 0; }
              .footer { background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>You're in, ${name}!</h1>
              </div>
              <div class="content">
                <p>Thanks for signing up for your free plan. Your first 30 AI-answered after-hours calls every month are on us — no contract, no card required.</p>
                <div class="highlight">
                  <strong>What happens next:</strong> One of our team members will contact you within 1 business day to get your account set up and your AI receptionist trained on your practice's scripts.
                </div>
                <p>Phone: (763) 496-6613 · Email: Contact@admincaptainva.com</p>
                <p>Want to speed things up? Grab a time that works for you:</p>
                <p><a href="https://calendly.com/contact-admincaptainva/15-minute-phone-audit" class="cta">Book your 15-minute setup call</a></p>
                <p>— Abe, AdminCaptainVA</p>
              </div>
              <div class="footer">
                AdminCaptainVA · Dental Call Answering Service
              </div>
            </div>
          </body>
          </html>
        `,
        text: `Thanks for signing up for your free plan, ${name}! Your first 30 AI-answered after-hours calls every month are on us — no contract, no card required.

One of our team members will contact you within 1 business day to get your account set up.

Want to speed things up? Book a 15-minute setup call:
https://calendly.com/contact-admincaptainva/15-minute-phone-audit

— Abe, AdminCaptainVA
Phone: (763) 496-6613 · Email: Contact@admincaptainva.com`,
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
