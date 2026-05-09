/**
 * SEO Growthers — GA4 Analytics Helper
 * Centraliza todos los eventos custom para tracking de conversiones.
 * GA4 Measurement ID: G-LVS1N7VC7G (cargado en index.html)
 */

const isGtagReady = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

// ─── Eventos de Conversión ────────────────────────────────────
export const trackFormSubmit = (formName, formData = {}) => {
  if (!isGtagReady()) return;
  window.gtag('event', 'generate_lead', {
    event_category: 'conversion',
    event_label: formName,
    form_name: formName,
    ...formData,
  });
};

export const trackAuditRequest = (url) => {
  if (!isGtagReady()) return;
  window.gtag('event', 'audit_request', {
    event_category: 'conversion',
    event_label: 'auditoria_seo_gratis',
    audit_url: url,
  });
};

// ─── Eventos de Engagement ────────────────────────────────────
export const trackWhatsAppClick = (source) => {
  if (!isGtagReady()) return;
  window.gtag('event', 'whatsapp_click', {
    event_category: 'engagement',
    event_label: source,
    link_url: 'https://wa.me/5492995504783',
  });
};

export const trackCTAClick = (ctaName, destination) => {
  if (!isGtagReady()) return;
  window.gtag('event', 'cta_click', {
    event_category: 'engagement',
    event_label: ctaName,
    link_url: destination,
  });
};

export const trackEmailClick = (email) => {
  if (!isGtagReady()) return;
  window.gtag('event', 'email_click', {
    event_category: 'engagement',
    event_label: email,
  });
};

// ─── Eventos de Contenido ─────────────────────────────────────
export const trackArticleView = (article) => {
  if (!isGtagReady()) return;
  window.gtag('event', 'view_item', {
    event_category: 'content',
    event_label: article.title,
    content_type: 'article',
    item_id: article.slug,
    item_category: article.category,
  });
};

export const trackResourceDownload = (resource) => {
  if (!isGtagReady()) return;
  window.gtag('event', 'file_download', {
    event_category: 'content',
    event_label: resource.title,
    file_name: resource.title,
    link_url: resource.link,
  });
};

export const trackScrollDepth = (percentage, pagePath) => {
  if (!isGtagReady()) return;
  window.gtag('event', 'scroll_depth', {
    event_category: 'engagement',
    event_label: pagePath,
    percent_scrolled: percentage,
  });
};

// ─── Scroll Depth Observer ────────────────────────────────────
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const thresholds = [25, 50, 75, 100];
  const tracked = new Set();

  const handler = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const percent = Math.round((scrollTop / docHeight) * 100);

    thresholds.forEach((t) => {
      if (percent >= t && !tracked.has(t)) {
        tracked.add(t);
        trackScrollDepth(t, window.location.pathname);
      }
    });
  };

  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
};

// ─── Core Web Vitals Reporter ─────────────────────────────────
export const reportWebVitals = async () => {
  if (!isGtagReady()) return;
  try {
    const { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } = await import('web-vitals');

    const sendToGA = ({ name, delta, id }) => {
      window.gtag('event', name, {
        event_category: 'Web Vitals',
        event_label: id,
        value: Math.round(name === 'CLS' ? delta * 1000 : delta),
        non_interaction: true,
      });
    };

    onCLS(sendToGA);
    onLCP(sendToGA);
    onFCP(sendToGA);
    onTTFB(sendToGA);
    // onFID is deprecated in favor of INP, but track both for transition
    if (onFID) onFID(sendToGA);
    if (onINP) onINP(sendToGA);
  } catch {
    // web-vitals not installed — silent fail
  }
};
