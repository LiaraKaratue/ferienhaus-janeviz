// WordPress Proxy Edge Function
// Proxies requests to WordPress REST API for CORS-free browser access

const WP_ORIGIN = 'https://ferienhaus-budbp7qz3v.live-website.com';
const HOP_BY_HOP = new Set(['connection', 'host', 'origin', 'content-length', 'transfer-encoding']);

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin') ?? '*';
  const cors = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Cart-Token, Nonce, Authorization',
    'Access-Control-Expose-Headers': 'Cart-Token, Nonce',
    'Vary': 'Origin',
  };

  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  const url = new URL(req.url);
  const wpJson = url.pathname.indexOf('/wp-json/');
  if (wpJson === -1) return new Response('Only /wp-json/* is proxied', { status: 404, headers: cors });

  const target = `${WP_ORIGIN}${url.pathname.slice(wpJson)}${url.search}`;
  const headers = new Headers(req.headers);
  for (const h of HOP_BY_HOP) headers.delete(h);

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: req.method,
      headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body,
      redirect: 'manual',
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    return new Response('Upstream timeout', { status: 504, headers: cors });
  }

  const out = new Headers(upstream.headers);
  for (const [k, v] of Object.entries(cors)) out.set(k, v);
  return new Response(upstream.body, { status: upstream.status, headers: out });
});
