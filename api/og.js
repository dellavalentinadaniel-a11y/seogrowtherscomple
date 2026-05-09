/**
 * Vercel Serverless Function — Dynamic OG Image Generator
 *
 * Genera imágenes Open Graph dinámicas para cada página del sitio.
 * Uso: /api/og?title=Mi+Título&subtitle=Descripción&type=service
 *
 * Retorna un SVG convertido a PNG-like response que las plataformas sociales
 * (WhatsApp, LinkedIn, Twitter, Facebook) pueden renderizar.
 */

export default function handler(req, res) {
  const { title = 'SEO Growthers', subtitle = '', type = 'default' } = req.query;

  const decodedTitle = decodeURIComponent(title);
  const decodedSubtitle = decodeURIComponent(subtitle);

  // Truncate for display
  const displayTitle = decodedTitle.length > 60 ? decodedTitle.slice(0, 57) + '...' : decodedTitle;
  const displaySubtitle = decodedSubtitle.length > 100 ? decodedSubtitle.slice(0, 97) + '...' : decodedSubtitle;

  // Color themes by type
  const themes = {
    service: { accent: '#00E5FF', badge: 'SERVICIO' },
    case: { accent: '#76FF03', badge: 'CASO DE ÉXITO' },
    blog: { accent: '#FF9100', badge: 'BLOG' },
    tool: { accent: '#E040FB', badge: 'HERRAMIENTA' },
    default: { accent: '#00E5FF', badge: '' },
  };
  const theme = themes[type] || themes.default;

  // Word wrap helper for SVG (approximate)
  const wrapText = (text, maxChars) => {
    const words = text.split(' ');
    const lines = [];
    let current = '';
    for (const word of words) {
      if ((current + ' ' + word).trim().length > maxChars) {
        lines.push(current.trim());
        current = word;
      } else {
        current = current ? current + ' ' + word : word;
      }
    }
    if (current.trim()) lines.push(current.trim());
    return lines.slice(0, 3); // Max 3 lines
  };

  const titleLines = wrapText(displayTitle, 28);
  const titleSvg = titleLines
    .map((line, i) => `<text x="80" y="${220 + i * 72}" fill="white" font-family="system-ui,-apple-system,sans-serif" font-size="60" font-weight="bold" letter-spacing="-2">${escapeXml(line)}</text>`)
    .join('');

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0A0A"/>
      <stop offset="100%" style="stop-color:#111827"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.accent}"/>
      <stop offset="100%" style="stop-color:#7C4DFF"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="1100" cy="80" r="200" fill="${theme.accent}" opacity="0.03"/>
  <circle cx="1050" cy="550" r="300" fill="#7C4DFF" opacity="0.03"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="1200" height="4" fill="url(#accent)"/>

  <!-- Badge -->
  ${theme.badge ? `
  <rect x="80" y="80" width="${theme.badge.length * 13 + 32}" height="36" rx="8" fill="${theme.accent}" opacity="0.15"/>
  <text x="96" y="104" fill="${theme.accent}" font-family="system-ui,-apple-system,sans-serif" font-size="14" font-weight="bold" letter-spacing="3">${theme.badge}</text>
  ` : ''}

  <!-- Title -->
  ${titleSvg}

  <!-- Subtitle -->
  ${displaySubtitle ? `<text x="80" y="${220 + titleLines.length * 72 + 20}" fill="#9CA3AF" font-family="system-ui,-apple-system,sans-serif" font-size="24">${escapeXml(displaySubtitle)}</text>` : ''}

  <!-- Bottom bar -->
  <rect x="0" y="590" width="1200" height="40" fill="rgba(0,0,0,0.5)"/>

  <!-- Logo text -->
  <text x="80" y="618" fill="${theme.accent}" font-family="system-ui,-apple-system,sans-serif" font-size="20" font-weight="bold" letter-spacing="1">SEO GROWTHERS</text>

  <!-- Domain -->
  <text x="1120" y="618" fill="#6B7280" font-family="system-ui,-apple-system,sans-serif" font-size="16" text-anchor="end">seogrowthers.com</text>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
  res.status(200).send(svg);
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
