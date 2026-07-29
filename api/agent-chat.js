// Netlify serverless function: proxies chat requests to an OpenAI-compatible
// endpoint (Groq, then OpenRouter as fallback) so API keys never reach the browser.
//
// Env vars (set in Netlify dashboard, never committed):
//   AGENT_API_KEY        - comma-separated list of Groq keys, tried in order
//   AGENT_API_BASE        - https://api.groq.com/openai/v1
//   AGENT_MODEL            - e.g. llama-3.3-70b-versatile
//   AGENT_FALLBACK_API_KEY - comma-separated list of OpenRouter keys (optional)
//   AGENT_FALLBACK_API_BASE - https://openrouter.ai/api/v1
//   AGENT_FALLBACK_MODEL    - e.g. openrouter/auto

const SYSTEM_PROMPT = `You are Nate, the AI intake assistant embedded in Nathaniel Sims's portfolio website.
Nathaniel is an AI Agent & Full Stack Developer (Azure, Healthcare, FinTech), $70/hr, 20+ years experience.
Stack: AI Agent Development, C#, ASP.NET, Microsoft Azure, Python, Next.js, Microsoft Power BI, Supabase, React, Automation, PostgreSQL, LangChain, Stripe.
Experience: Cloud AI Solutions Architect at DXC Technology (2018-present), Senior Full Stack Developer at Presbyterian Healthcare Services (2012-2018), Software Developer at Sandia National Laboratories (2005-2012).
Your job: greet visitors, answer questions about Nathaniel's background/skills/projects, help scope what a visitor needs built, and capture their contact info and project summary if they want to be followed up with.
Keep replies short (2-4 sentences), friendly, and direct. Never invent projects or clients beyond what's on the site. If asked something you don't know, say so and offer to have Nathaniel follow up directly.`;

function parseKeys(value) {
  return (value ?? '')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);
}

/** Try each key in order against one provider; returns the first successful response. */
async function tryProvider(apiBase, model, keys, payload) {
  let lastError = null;
  for (const key of keys) {
    const res = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ ...payload, model }),
    });
    if (res.ok) return res;
    // Rate-limited or unauthorized: try the next key. Any other failure, bail immediately.
    if (res.status === 429 || res.status === 401 || res.status === 403) {
      lastError = res;
      continue;
    }
    return res;
  }
  return lastError;
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const primaryKeys = parseKeys(process.env.AGENT_API_KEY);
  const primaryBase = process.env.AGENT_API_BASE;
  const primaryModel = process.env.AGENT_MODEL;

  const fallbackKeys = parseKeys(process.env.AGENT_FALLBACK_API_KEY);
  const fallbackBase = process.env.AGENT_FALLBACK_API_BASE;
  const fallbackModel = process.env.AGENT_FALLBACK_MODEL;

  if (primaryKeys.length === 0 || !primaryBase || !primaryModel) {
    return new Response(
      JSON.stringify({ error: 'Agent not configured. Set AGENT_API_KEY, AGENT_API_BASE, AGENT_MODEL.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
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

  const messages = Array.isArray(body?.messages) ? body.messages : [];
  if (messages.length === 0 || messages.length > 40) {
    return new Response(JSON.stringify({ error: 'messages must be a non-empty array (max 40)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const payload = {
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    max_tokens: 400,
    temperature: 0.6,
  };

  let upstream = await tryProvider(primaryBase, primaryModel, primaryKeys, payload);

  if ((!upstream || !upstream.ok) && fallbackKeys.length > 0 && fallbackBase && fallbackModel) {
    upstream = await tryProvider(fallbackBase, fallbackModel, fallbackKeys, payload);
  }

  if (!upstream) {
    return new Response(JSON.stringify({ error: 'No upstream provider configured or reachable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!upstream.ok) {
    const text = await upstream.text();
    return new Response(JSON.stringify({ error: 'Upstream error', detail: text }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await upstream.json();
  const reply = data?.choices?.[0]?.message?.content ?? '';

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config = { runtime: 'edge' };
