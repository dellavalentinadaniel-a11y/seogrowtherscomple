
import { slugify } from '@/lib/utils';

// --- Helper Functions ---

export const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-');     // Replace multiple - with single -
};

export const validateSeoTitle = (title) => {
  const length = title ? title.length : 0;
  const isValid = length >= 30 && length <= 60;
  const warnings = [];
  if (length < 30) warnings.push('El título es muy corto (mínimo 30 caracteres).');
  if (length > 60) warnings.push('El título es muy largo (máximo 60 caracteres).');
  return { isValid, length, warnings };
};

export const validateSeoDescription = (description) => {
  const length = description ? description.length : 0;
  const isValid = length >= 120 && length <= 160;
  const warnings = [];
  if (length < 120) warnings.push('La descripción es demasiado corta (mínimo 120 caracteres).');
  if (length > 160) warnings.push('La descripción es demasiado larga (máximo 160 caracteres).');
  return { isValid, length, warnings };
};

export const validateImageAlt = (htmlContent) => {
  if (!htmlContent) return { isValid: true, warnings: [] };
  const imgTags = htmlContent.match(/<img[^>]+>/g) || [];
  const missingAlt = imgTags.filter(img => !img.includes('alt=') || img.includes('alt=""') || img.includes("alt=''"));
  const isValid = missingAlt.length === 0;
  const warnings = [];
  if (!isValid) {
    warnings.push(`${missingAlt.length} imágenes no tienen texto alternativo.`);
  }
  return { isValid, warnings };
};

export const extractHeadings = (htmlContent) => {
  if (!htmlContent) return [];
  const headings = [];
  const regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, '');
    const id = generateSlug(text);
    headings.push({ id, text, level });
  }
  return headings;
};

export const injectHeadingIds = (htmlContent) => {
  if (!htmlContent) return '';
  return htmlContent.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/g, (match, level, attrs, content) => {
    const text = content.replace(/<[^>]*>/g, '');
    const id = generateSlug(text);
    // Check if id already exists in attrs to avoid double id
    if (attrs.includes('id=')) return match;
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
  });
};

// Returns density % for each keyword in the plain text content.
export const calculateKeywordDensity = (htmlContent, keywords = []) => {
  if (!htmlContent || keywords.length === 0) return [];
  const text = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const total = words.length;
  if (total === 0) return [];
  return keywords.map((kw) => {
    const kwLower = kw.toLowerCase();
    const regex = new RegExp(`\\b${kwLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    const matches = (text.match(regex) || []).length;
    const density = total > 0 ? (matches / total) * 100 : 0;
    return {
      keyword: kw,
      count: matches,
      density: parseFloat(density.toFixed(2)),
      status: density === 0 ? 'missing' : density < 0.5 ? 'low' : density <= 2.5 ? 'good' : 'high'
    };
  });
};

// Flesch Reading Ease adapted for Spanish text (approximate).
// Returns score 0-100 and a label.
export const calculateReadability = (htmlContent) => {
  if (!htmlContent) return { score: 0, label: 'Sin contenido', grade: 'F' };
  const text = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return { score: 0, label: 'Sin contenido', grade: 'F' };

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(Boolean);
  // Count syllables: vowel groups as approximation for Spanish
  const countSyllables = (word) => {
    const vowels = word.toLowerCase().match(/[aeiouáéíóúü]/g);
    return vowels ? vowels.length : 1;
  };
  const totalSyllables = words.reduce((acc, w) => acc + countSyllables(w), 0);
  const numSentences = Math.max(1, sentences.length);
  const numWords = Math.max(1, words.length);

  // Flesch formula (Spanish adjustment: slightly lower constant)
  const score = Math.min(100, Math.max(0,
    206.835 - 1.015 * (numWords / numSentences) - 84.6 * (totalSyllables / numWords)
  ));

  let label, grade;
  if (score >= 70) { label = 'Muy fácil de leer'; grade = 'A'; }
  else if (score >= 60) { label = 'Fácil de leer'; grade = 'B'; }
  else if (score >= 50) { label = 'Moderado'; grade = 'C'; }
  else if (score >= 30) { label = 'Difícil'; grade = 'D'; }
  else { label = 'Muy difícil'; grade = 'F'; }

  return { score: Math.round(score), label, grade };
};

// Returns array of img tags missing alt text from HTML content.
export const getMissingAltImages = (htmlContent) => {
  if (!htmlContent) return [];
  const imgTags = htmlContent.match(/<img[^>]+>/g) || [];
  return imgTags.filter(img => !img.includes('alt=') || /alt=["']\s*["']/.test(img));
};

export const calculateSeoScore = (article) => {
  let score = 100;
  const breakdown = [];
  
  const titleVal = validateSeoTitle(article.seo_title || article.title);
  if (!titleVal.isValid) {
    score -= 10;
    breakdown.push({ label: 'Longitud del título SEO', passed: false });
  } else {
    breakdown.push({ label: 'Longitud del título SEO', passed: true });
  }
  
  const descVal = validateSeoDescription(article.seo_description || article.summary);
  if (!descVal.isValid) {
    score -= 10;
    breakdown.push({ label: 'Longitud de meta descripción', passed: false });
  } else {
    breakdown.push({ label: 'Longitud de meta descripción', passed: true });
  }
  
  if (!article.keywords || article.keywords.length === 0) {
    score -= 10;
    breakdown.push({ label: 'Palabras clave definidas', passed: false });
  } else {
    breakdown.push({ label: 'Palabras clave definidas', passed: true });
  }
  
  const wordCount = article.content ? article.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
  if (wordCount < 300) {
    score -= 20;
    breakdown.push({ label: 'Contenido suficiente (>300 palabras)', passed: false });
  } else {
    breakdown.push({ label: 'Contenido suficiente (>300 palabras)', passed: true });
  }
  
  const imgVal = validateImageAlt(article.content);
  if (!imgVal.isValid) {
    score -= 10;
    breakdown.push({ label: 'Imágenes con texto alternativo', passed: false });
  } else {
    breakdown.push({ label: 'Imágenes con texto alternativo', passed: true });
  }

  if (!article.slug) {
    score -= 10;
    breakdown.push({ label: 'Slug URL amigable', passed: false });
  } else {
    breakdown.push({ label: 'Slug URL amigable', passed: true });
  }

  // Keyword density: at least one keyword with good density
  if (article.keywords && article.keywords.length > 0 && article.content) {
    const densities = calculateKeywordDensity(article.content, article.keywords);
    const hasGoodDensity = densities.some(d => d.status === 'good');
    if (!hasGoodDensity) {
      score -= 10;
      breakdown.push({ label: 'Densidad de palabras clave (0.5–2.5%)', passed: false });
    } else {
      breakdown.push({ label: 'Densidad de palabras clave (0.5–2.5%)', passed: true });
    }
  }

  // Readability
  if (article.content) {
    const readability = calculateReadability(article.content);
    if (readability.score < 50) {
      score -= 10;
      breakdown.push({ label: `Legibilidad: ${readability.label}`, passed: false });
    } else {
      breakdown.push({ label: `Legibilidad: ${readability.label}`, passed: true });
    }
  }

  return { score: Math.max(0, Math.min(100, score)), breakdown };
};

// --- Existing Exports ---

export const generateMetaTags = ({ title, description, image, url, type = 'website', locale = 'es_ES', siteName = 'SEO Growthers' }) => {
  return [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: siteName },
    { property: 'og:locale', content: locale },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'robots', content: 'index, follow' }
  ];
};

export const generateJsonLd = (type, data) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseData,
        name: data.name,
        url: data.url,
        logo: data.logo,
        sameAs: data.socialProfiles,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: data.phone,
          contactType: 'customer service'
        }
      };
    
    case 'BlogPosting':
    case 'NewsArticle':
      return {
        ...baseData,
        headline: data.title,
        image: data.image ? [data.image] : [],
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        author: {
          '@type': 'Person',
          name: data.authorName || 'Redacción'
        },
        publisher: {
          '@type': 'Organization',
          name: data.publisherName || 'SEO Growthers',
          logo: {
            '@type': 'ImageObject',
            url: data.publisherLogo
          }
        },
        description: data.description,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        }
      };

    case 'Service':
      return {
        ...baseData,
        name: data.title,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: data.providerName
        },
        areaServed: {
          '@type': 'Country',
          name: data.areaServed || 'Spain'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios',
          itemListElement: data.offers
        }
      };

    case 'BreadcrumbList':
      return {
        ...baseData,
        itemListElement: data.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };

    case 'Review':
      return {
        ...baseData,
        author: {
          '@type': 'Person',
          name: data.author
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: data.rating,
          bestRating: "5"
        },
        reviewBody: data.text
      };

    default:
      return baseData;
  }
};

const breadcrumbNames = {
  'blog': 'Blog',
  'services': 'Servicios',
  'resources': 'Recursos',
  'recursos': 'Recursos',
  'tools': 'Herramientas',
  'contact': 'Contacto',
  'about': 'Nosotros',
  'auditoria-seo-gratis': 'Auditoría SEO Gratis',
  'forum': 'Foro',
  'privacy-policy': 'Política de Privacidad',
  'terms-of-service': 'Términos de Servicio',
  'login': 'Iniciar Sesión',
  'register': 'Registro',
  'profile': 'Perfil',
  'seo-neuquen': 'SEO en Neuquén',
  'desarrollo-web-argentina': 'Desarrollo Web',
  'automatizacion-ia': 'Automatización con IA',
  'success-cases': 'Casos de Éxito',
  'project': 'Proyecto',
  'create': 'Crear',
  'edit': 'Editar',
};

export const generateBreadcrumbs = (pathname) => {
  const paths = pathname.split('/').filter(x => x);
  let currentPath = '';

  const items = [
    { name: 'Inicio', url: 'https://seogrowthers.com/' }
  ];

  paths.forEach((path) => {
    currentPath += `/${path}`;
    const name = breadcrumbNames[path] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    items.push({ name, url: `https://seogrowthers.com${currentPath}` });
  });

  return items;
};

export const optimizeImage = (url, width = 800, format = 'webp') => {
  if (!url) return '';
  if (url.includes('supabase.co')) {
    return url; 
  }
  return url;
};

// Extracts FAQ pairs from HTML content generated by the NovelEditor FAQ block.
// Looks for data-faq-block containers with data-faq-question / data-faq-answer attributes.
export const extractFAQSchema = (htmlContent) => {
  if (!htmlContent || typeof document === 'undefined') return null;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const questions = Array.from(doc.querySelectorAll('[data-faq-idx]'));
    if (questions.length === 0) return null;

    const pairs = [];
    questions.forEach((q) => {
      const idx = q.getAttribute('data-faq-idx');
      const answerEl = doc.querySelector(`[data-faq-answer="${idx}"]`);
      if (!answerEl) return;
      const questionText = q.textContent.trim();
      const answerText = answerEl.textContent.trim();
      if (questionText && answerText) {
        pairs.push({ question: questionText, answer: answerText });
      }
    });

    if (pairs.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": pairs.map(({ question, answer }) => ({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": { "@type": "Answer", "text": answer }
      }))
    };
  } catch {
    return null;
  }
};

export const generateSitemap = (routes, baseUrl) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes.map(route => `
        <url>
          <loc>${baseUrl}${route.path}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${route.changefreq || 'weekly'}</changefreq>
          <priority>${route.priority || 0.5}</priority>
        </url>
      `).join('')}
    </urlset>`;
  return xml.trim();
};
