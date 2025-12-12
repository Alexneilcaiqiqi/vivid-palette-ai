import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CheckUserRequest {
  type: 'phone' | 'email';
  value: string;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, value }: CheckUserRequest = await req.json();

    if (!type || !value) {
      return new Response(
        JSON.stringify({ error: "Missing type or value" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    let exists = false;

    if (type === 'phone') {
      // Check if phone exists in profiles table
      const { data: profileData } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('phone', value)
        .maybeSingle();

      if (profileData) {
        exists = true;
      } else {
        // Also check auth.users for phone
        const { data: userData } = await supabaseAdmin.auth.admin.listUsers();
        if (userData?.users) {
          exists = userData.users.some(user => user.phone === value);
        }
      }
    } else if (type === 'email') {
      // Check auth.users for email
      const { data: userData } = await supabaseAdmin.auth.admin.listUsers();
      if (userData?.users) {
        exists = userData.users.some(user => user.email === value.toLowerCase());
      }
    }

    return new Response(
      JSON.stringify({ exists }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error checking user:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
