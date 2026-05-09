import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const BASE_URL = 'https://seogrowthers.com';

const STATIC_PAGES = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/blog', changefreq: 'daily', priority: '0.9' },
  { loc: '/services', changefreq: 'weekly', priority: '0.8' },
  { loc: '/resources', changefreq: 'weekly', priority: '0.8' },
  { loc: '/tools', changefreq: 'weekly', priority: '0.8' },
  { loc: '/about', changefreq: 'monthly', priority: '0.7' },
  { loc: '/auditoria-seo-gratis', changefreq: 'monthly', priority: '0.9' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.5' },
  { loc: '/services/seo-neuquen', changefreq: 'monthly', priority: '0.9' },
  { loc: '/services/desarrollo-web-argentina', changefreq: 'monthly', priority: '0.9' },
  { loc: '/services/automatizacion-ia', changefreq: 'monthly', priority: '0.9' },
  { loc: '/services/success-cases/aluvalle-transformacion-digital', changefreq: 'monthly', priority: '0.7' },
  { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
];

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { data: articles } = await supabase
    .from('articles')
    .select('slug, category, updated_at, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  const today = new Date().toISOString().split('T')[0];

  const staticEntries = STATIC_PAGES.map(({ loc, changefreq, priority }) => `
  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

  const articleEntries = (articles || []).map(({ slug, category, updated_at, created_at }) => {
    const lastmod = (updated_at || created_at || today).split('T')[0];
    const catPath = category ? category.toLowerCase().replace(/\s+/g, '-') : 'blog';
    return `
  <url>
    <loc>${BASE_URL}/blog/${catPath}/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${articleEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
});
