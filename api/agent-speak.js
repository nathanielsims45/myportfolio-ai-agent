// Netlify serverless function: converts text to natural speech via ElevenLabs
// so the API key never reaches the browser. Returns raw audio/mpeg bytes.
//
// Env vars:
//   ELEVENLABS_API_KEY - required
//   ELEVENLABS_VOICE_ID - optional, defaults to a stock ElevenLabs voice ("Rachel")

const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // ElevenLabs stock voice "Rachel"

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ElevenLabs not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const text = typeof body?.text === 'string' ? body.text.trim() : '';
  if (!text || text.length > 2000) {
    return new Response(JSON.stringify({ error: 'text must be a non-empty string (max 2000 chars)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;

  const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_turbo_v2_5',
      voice_settings: { stability: 0.45, similarity_boost: 0.75 },
    }),
  });

  if (!upstream.ok) {
    const detail = await upstream.text();
    return new Response(JSON.stringify({ error: 'Upstream TTS error', detail }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store' },
  });
};

export const config = { runtime: 'edge' };
