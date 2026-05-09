
/* global process */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser to avoid adding 'dotenv' dependency
const loadEnv = () => {
  try {
    const envPath = path.resolve(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      const envConfig = fs.readFileSync(envPath, 'utf8');
      envConfig.split('\n').forEach((line) => {
        const [key, value] = line.split('=');
        if (key && value) {
          process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
        }
      });
    }
  } catch (error) {
    console.warn('Could not load .env file, relying on system environment variables.');
  }
};

loadEnv();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const BASE_URL = 'https://seogrowthers.com';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const staticRoutes = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/blog', priority: 0.9, changefreq: 'daily' },
  { path: '/news', priority: 0.9, changefreq: 'daily' },
  { path: '/services', priority: 0.8, changefreq: 'weekly' },
  { path: '/resources', priority: 0.8, changefreq: 'weekly' },
  { path: '/tools', priority: 0.8, changefreq: 'weekly' },
  { path: '/contact', priority: 0.5, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
];

const generateSitemap = async () => {
  console.log('Generating sitemap...');

  try {
    // Fetch dynamic routes from Supabase
    // 1. Blog Articles (from 'articles' table)
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('slug, updated_at, category, status')
      .eq('status', 'published');

    // 2. News (from 'blog_news' table)
    const { data: news, error: newsError } = await supabase
      .from('blog_news')
      .select('slug, updated_at, status')
      .eq('status', 'published');

    // 3. Resources
    const { data: resources, error: resourcesError } = await supabase
      .from('resources')
      .select('slug, updated_at');

    // 4. Tools
    const { data: tools, error: toolsError } = await supabase
      .from('tools')
      .select('slug, updated_at');

    if (articlesError) console.warn('Articles error:', articlesError);
    if (newsError) console.warn('News error:', newsError);
    if (resourcesError) console.warn('Resources error:', resourcesError);
    if (toolsError) console.warn('Tools error:', toolsError);

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static routes
    staticRoutes.forEach(route => {
      sitemap += `
  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    });

    const addRoutes = (data, prefix, priority = '0.6') => {
      if (data) {
        data.forEach(item => {
          const lastMod = item.updated_at ? new Date(item.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
          
          // Build URL based on prefix
          let urlPath = `/${prefix}/${item.slug}`;
          
          if (prefix === 'blog' && item.category) {
            // Normalizar categoría a slug (minúsculas y guiones) para SEO
            const categorySlug = item.category.toLowerCase().replace(/\s+/g, '-');
            urlPath = `/blog/${categorySlug}/${item.slug}`;
          }

          sitemap += `
  <url>
    <loc>${BASE_URL}${urlPath}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
        });
      }
    };

    addRoutes(articles, 'blog');
    addRoutes(news, 'news');
    addRoutes(resources, 'resources');
    addRoutes(tools, 'tools');

    sitemap += `
</urlset>`;

    // Ensure public directory exists
    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // Write file
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log(`Sitemap generated successfully at ${path.join(publicDir, 'sitemap.xml')}`);
    console.log(`Total URLs: ${staticRoutes.length + (articles?.length || 0) + (news?.length || 0) + (resources?.length || 0) + (tools?.length || 0)}`);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
};

generateSitemap();
