import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { versionJsonUrl } = await req.json();
    
    if (!versionJsonUrl) {
      console.error('No versionJsonUrl provided');
      return new Response(
        JSON.stringify({ error: 'versionJsonUrl is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching version info from:', versionJsonUrl);

    // 获取version.json
    const versionResponse = await fetch(versionJsonUrl);
    
    if (!versionResponse.ok) {
      console.log('version.json not found, status:', versionResponse.status);
      return new Response(
        JSON.stringify({ error: 'version.json not found', status: versionResponse.status }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const versionInfo = await versionResponse.json();
    console.log('Version info found:', versionInfo);

    return new Response(
      JSON.stringify(versionInfo),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-apk-info:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
