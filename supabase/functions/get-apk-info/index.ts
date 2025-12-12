import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PlatformInfo {
  version?: string;
  size?: string;
  downloadUrl?: string;
  changelog?: string;
}

interface VersionJson {
  [platform: string]: PlatformInfo;
}

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
    let versionInfo: VersionJson = {};
    try {
      const versionResponse = await fetch(versionJsonUrl);
      if (versionResponse.ok) {
        versionInfo = await versionResponse.json();
        console.log('Version info found:', versionInfo);
      } else {
        console.log('version.json not found, status:', versionResponse.status);
        return new Response(
          JSON.stringify({ error: 'version.json not found', status: versionResponse.status }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } catch (e) {
      console.error('Failed to fetch version.json:', e.message);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch version.json', message: e.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 获取每个有downloadUrl的平台的文件大小
    const result: VersionJson = {};
    
    for (const [platform, info] of Object.entries(versionInfo)) {
      result[platform] = { ...info };
      
      // 如果有下载链接且没有size，尝试获取文件大小
      if (info.downloadUrl && !info.size) {
        try {
          console.log(`Fetching file size for ${platform}:`, info.downloadUrl);
          const headResponse = await fetch(info.downloadUrl, { method: 'HEAD' });
          if (headResponse.ok) {
            const contentLength = headResponse.headers.get('content-length');
            if (contentLength) {
              const fileSize = parseInt(contentLength, 10);
              if (fileSize >= 1024 * 1024) {
                result[platform].size = (fileSize / (1024 * 1024)).toFixed(1) + ' MB';
              } else if (fileSize >= 1024) {
                result[platform].size = (fileSize / 1024).toFixed(1) + ' KB';
              } else {
                result[platform].size = fileSize + ' B';
              }
              console.log(`File size for ${platform}:`, result[platform].size);
            }
          }
        } catch (e) {
          console.log(`Failed to get file size for ${platform}:`, e.message);
        }
      }
    }

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
