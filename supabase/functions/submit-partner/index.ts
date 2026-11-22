import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

function text(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function response(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });
  if (req.method !== "POST") return response({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json();
    const type = text(body?.type, 30);
    const data = body?.data;

    if (!data || (type !== "application" && type !== "audit")) {
      return response({ error: "Please complete the form and try again." }, 400);
    }

    if (type === "application") {
      const fullName = text(data.full_name, 120);
      const company = text(data.company, 160);
      const email = text(data.email, 254).toLowerCase();
      const phone = text(data.phone, 40);
      const partnerType = text(data.partner_type, 30);
      const clientCount = text(data.client_count, 80);
      const heardAbout = text(data.heard_about, 160);
      const industries = Array.isArray(data.industries)
        ? data.industries.filter((item: unknown): item is string => typeof item === "string").slice(0, 10).map((item: string) => item.slice(0, 60))
        : [];

      if (!fullName || !company || !validEmail(email) || !phone || !clientCount || !heardAbout || !industries.length || !["referral_partner", "agency"].includes(partnerType)) {
        return response({ error: "Please complete all required fields and try again." }, 400);
      }

      const { error } = await supabase.from("partner_applications").insert({
        full_name: fullName,
        company,
        email,
        phone,
        partner_type: partnerType,
        industries,
        client_count: clientCount,
        heard_about: heardAbout,
      });

      if (error) throw error;
      return response({ success: true });
    }

    const partnerSlug = text(data.partner_slug, 80).toLowerCase().replace(/[^a-z0-9-]/g, "");
    const businessName = text(data.business_name, 160);
    const contactName = text(data.contact_name, 120);
    const email = text(data.email, 254).toLowerCase();
    const phone = text(data.phone, 40);
    const officePhone = text(data.office_phone, 40);
    const industry = text(data.industry, 60);
    const businessHours = text(data.business_hours, 300);

    if (!partnerSlug || !businessName || !contactName || !validEmail(email) || !phone || !officePhone || !industry || !businessHours || data.test_call_consent !== true) {
      return response({ error: "Please complete all required fields and accept the test-call permission." }, 400);
    }

    const { error } = await supabase.from("audit_requests").insert({
      partner_slug: partnerSlug,
      business_name: businessName,
      contact_name: contactName,
      email,
      phone,
      office_phone: officePhone,
      industry,
      business_hours: businessHours,
      test_call_consent: true,
    });

    if (error) throw error;
    return response({ success: true });
  } catch (error) {
    console.error("Partner submission failed", error);
    return response({ error: "We couldn't submit that form. Please try again." }, 500);
  }
});
