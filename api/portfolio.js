// Vercel serverless function. Keep the Are.na token in hosting environment variables.
const cache = new Map();
let cacheToken;
const CACHE_TTL = 60_000;

module.exports = async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.ARENA_ACCESS_TOKEN;
  if (!token) return response.status(503).json({ error: 'Portfolio is not configured' });

  const page = Number(request.query.page || 1);
  if (!Number.isSafeInteger(page) || page < 1) {
    return response.status(400).json({ error: 'Invalid page' });
  }

  // Cache only in server memory; never persist private channel data in the browser.
  if (cacheToken !== token) {
    cache.clear();
    cacheToken = token;
  }
  response.setHeader('Cache-Control', 'no-store');
  const cached = cache.get(page);
  if (cached && cached.expires > Date.now()) {
    return response.status(200).json(cached.body);
  }

  try {
    const upstream = await fetch(
      `https://api.are.na/v3/channels/portfolio-_lvhxatzlmi/contents?per=100&page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(10000),
      }
    );
    if (!upstream.ok) return response.status(502).json({ error: 'Portfolio is unavailable' });

    const result = await upstream.json();
    if (!Array.isArray(result.data)) throw new Error('Invalid channel response');
    // Publish only the fields used by the gallery, never account or channel metadata.
    const data = result.data
      .filter(block => (block.type === 'Image' && block.image?.src) || (block.type === 'Attachment' && block.attachment?.content_type?.startsWith('video/') && block.attachment.url))
      .map(block => block.type === 'Attachment' ? {
        type: 'Video',
        title: block.title,
        description: { plain: block.description?.plain || '' },
        video: {
          kind: 'video',
          src: block.attachment.url,
          poster: block.image?.small?.src || block.image?.src || '',
          width: block.image?.width,
          height: block.image?.height,
        },
      } : ({
        type: 'Image',
        title: block.title,
        description: { plain: block.description?.plain || '' },
        image: {
          src: block.image.small?.src || block.image.src,
          srcset: block.image.small?.src && block.image.small?.src_2x && block.image.small?.width
            ? `${block.image.small.src} ${block.image.small.width}w, ${block.image.small.src_2x} ${Math.min(block.image.small.width * 2, block.image.width || Infinity)}w`
            : null,
          full: block.image.large?.src || block.image.src,
          alt_text: block.image.alt_text,
          width: block.image.width,
          height: block.image.height,
        },
      }));
    const body = { data, meta: { next_page: result.meta?.next_page ?? null } };
    if (cache.size >= 32) cache.delete(cache.keys().next().value);
    cache.set(page, { body, expires: Date.now() + CACHE_TTL });
    return response.status(200).json(body);
  } catch {
    return response.status(502).json({ error: 'Portfolio is unavailable' });
  }
};
