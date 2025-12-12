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
    const { url } = await req.json();
    
    if (!url) {
      console.error('No URL provided');
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching APK info for:', url);

    // 尝试获取version.json
    const versionJsonUrl = url.replace(/\/[^\/]+\.apk$/i, '/version.json');
    console.log('Trying to fetch version.json from:', versionJsonUrl);
    
    let versionInfo = null;
    try {
      const versionResponse = await fetch(versionJsonUrl);
      if (versionResponse.ok) {
        versionInfo = await versionResponse.json();
        console.log('Version info found:', versionInfo);
      } else {
        console.log('version.json not found, status:', versionResponse.status);
      }
    } catch (e) {
      console.log('Failed to fetch version.json:', e.message);
    }

    // 获取文件大小
    let fileSize = null;
    try {
      const headResponse = await fetch(url, { method: 'HEAD' });
      if (headResponse.ok) {
        const contentLength = headResponse.headers.get('content-length');
        if (contentLength) {
          fileSize = parseInt(contentLength, 10);
          console.log('File size:', fileSize);
        }
      } else {
        console.log('HEAD request failed, status:', headResponse.status);
      }
    } catch (e) {
      console.log('Failed to get file size:', e.message);
    }

    // 格式化文件大小
    let formattedSize = null;
    if (fileSize) {
      if (fileSize >= 1024 * 1024) {
        formattedSize = (fileSize / (1024 * 1024)).toFixed(1) + ' MB';
      } else if (fileSize >= 1024) {
        formattedSize = (fileSize / 1024).toFixed(1) + ' KB';
      } else {
        formattedSize = fileSize + ' B';
      }
    }

    const result = {
      version: versionInfo?.version || null,
      size: formattedSize,
      sizeBytes: fileSize,
      ...versionInfo
    };

    console.log('Returning result:', result);

    return new Response(
      JSON.stringify(result),
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
