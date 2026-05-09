import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';

const features = [
  { icon: 'shopping_cart', title: 'Carrito Pro', desc: 'Sistema de carrito inteligente con recuperación de ventas abandonadas.' },
  { icon: 'credit_card', title: 'Pagos Online', desc: 'Integración nativa con Mercado Pago, tarjetas y transferencias.' },
  { icon: 'inventory_2', title: 'Gestión Stock', desc: 'Control de inventario en tiempo real con alertas de falta de stock.' },
  { icon: 'local_shipping', title: 'Logística', desc: 'Cálculo automático de costos de envío según zona y peso.' },
  { icon: 'bar_chart', title: 'Reportes', desc: 'Análisis detallado de ventas, productos más vendidos y ROI.' },
  { icon: 'lock', title: 'Seguridad', desc: 'Protocolos de seguridad bancaria para transacciones protegidas.' },
  { icon: 'filter_list', title: 'Filtros Pro', desc: 'Buscador y filtros avanzados para una navegación rápida.' },
  { icon: 'chat', title: 'Chat Soporte', desc: 'Integración con WhatsApp Business para atención al cliente.' },
];

const faqs = [
  { q: '¿Qué plataformas de pago se integran?', a: 'Integramos Mercado Pago, tarjetas de crédito/débito, transferencia bancaria y otros medios de pago. También podemos integrar criptomonedas y PayPal para ventas internacionales.' },
  { q: '¿Cómo funciona la gestión de stock?', a: 'El sistema sincroniza automáticamente el inventario en tiempo real. Cuando un producto se vende, se actualiza el stock. Podés configurar alertas para reposición y manejar variantes (talle, color, etc.).' },
  { q: '¿Puedo vender a todo el país?', a: 'Sí, integramos servicios de envío como Correo Argentino, OCA, Andreani y otros. El sistema calcula automáticamente el costo de envío según la ubicación del comprador.' },
  { q: '¿La tienda se adapta a celulares?', a: 'Sí, todas nuestras tiendas online son 100% responsive y mobile-first. Más del 70% de las compras online se realizan desde celulares, por lo que priorizamos la experiencia móvil.' },
  { q: '¿Incluye panel de administración?', a: 'Sí, incluye un panel intuitivo donde podés gestionar productos, pedidos, clientes, promociones, cupones de descuento y generar reportes de venta sin conocimientos técnicos.' },
];

const EcommercePage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Desarrollo de Tiendas Online",
    "provider": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    },
    "description": "Desarrollo de tiendas online y e-commerce en Argentina. Carrito de compras, pagos integrados, gestión de stock y envíos automáticos.",
    "areaServed": { "@type": "Country", "name": "Argentina" },
    "offers": {
      "@type": "Offer",
      "price": "2500",
      "priceCurrency": "USD",
      "description": "Tienda online completa con gestión de stock, pagos y envíos"
    },
    "serviceType": "E-Commerce Development"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <div className="text-on-surface font-body min-h-screen">
      <Helmet>
        <title>Tienda Online E-Commerce | Desarrollo Web - SEO Growthers</title>
        <meta name="description" content="Desarrollo de tiendas online en Argentina. E-commerce con Mercado Pago, gestión de stock, envíos automáticos y diseño responsive. Desde $2,500 USD." />
        <link rel="canonical" href="https://seogrowthers.com/services/ecommerce" />
        <meta property="og:title" content="Tienda Online E-Commerce | SEO Growthers" />
        <meta property="og:description" content="Tiendas online listas para vender en todo el país. Carrito, pagos, stock y logística sincronizados." />
        <meta property="og:url" content="https://seogrowthers.com/services/ecommerce" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=E-Commerce&subtitle=Tienda+online+desde+%242500+USD&type=service" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />

        {/* Hero */}
        <section className="mb-20">
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">E-Commerce</span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6">
            Tienda Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">Automatizada</span>
          </h1>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed mb-10">
            Vendé tus productos a todo el país las 24 horas del día. Gestión de stock, pagos y logística sincronizados en un solo lugar.
          </p>

          <div className="space-y-4 mb-10">
            {["Catálogo ilimitado de productos", "Integración con Mercado Pago / Tarjetas", "Gestión de stock e inventario en tiempo real", "Integración con métodos de envío (Correo Argentino, OCA)"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-base font-bold text-on-surface">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <span className="text-on-surface-variant block mb-1 text-sm">Inversión desde:</span>
            <span className="text-4xl font-bold text-on-surface">$2,500 <span className="text-lg text-on-surface-variant">USD</span></span>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20crear%20mi%20tienda%20online"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { trackWhatsAppClick('ecommerce_page'); trackCTAClick('ecommerce_hero_cta'); }}
              className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
            >
              Abrir Mi Tienda
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <Link to="/services" className="border border-outline-variant text-on-surface px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:border-primary hover:text-primary transition-all">
              Ver todos los servicios
            </Link>
          </div>
        </section>

        {/* About */}
        <section className="mb-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-6">Escalá tus ventas sin límites físicos</h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Convertí tu negocio en una máquina de vender. Optimizamos el proceso de compra para que sea rápido, seguro y fluido.
            </p>
            <div className="space-y-6">
              {[
                { title: "Experiencia de compra fluida", desc: "Checkouts rápidos que reducen el abandono de carrito y aumentan tu ticket promedio." },
                { title: "Control total del negocio", desc: "Panel administrativo intuitivo para gestionar pedidos, clientes y promociones de forma centralizada." },
                { title: "Automatización de pagos y envíos", desc: "Sincronización automática con plataformas de pago y logística. Vos solo despachás." },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="font-bold text-on-surface text-lg mb-1">{item.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
            <div className="aspect-square bg-gradient-to-br from-primary-container/20 to-secondary-container/20 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-8xl">storefront</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-3">E-Commerce de alto rendimiento</h2>
          <p className="text-on-surface-variant mb-12">Todo lo que necesitás para liderar las ventas online en tu rubro.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/20 transition-all group">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block group-hover:scale-110 transition-transform">{item.icon}</span>
                <h3 className="font-bold text-on-surface text-lg mb-2">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-4 max-w-3xl">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-12 md:p-20 rounded-3xl border border-primary-container/10 relative overflow-hidden mb-12" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(156,240,255,0.03))' }}>
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4 relative z-10">
            Empezá a vender <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">en todo el país</span>
          </h2>
          <p className="text-on-surface-variant text-lg mb-8 relative z-10">Tu tienda online profesional, lista para facturar desde el primer día.</p>
          <a
            href="https://wa.me/5492995504783?text=Hola%2C%20necesito%20una%20tienda%20online"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('ecommerce_cta')}
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all relative z-10"
          >
            Crear Mi Tienda <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>
        </section>

        <InternalLinkingCTA variant="services" />
      </main>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-low overflow-hidden transition-all">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left group">
        <h3 className="font-headline text-base md:text-lg font-bold text-on-surface group-hover:text-primary transition-colors pr-4">{question}</h3>
        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="px-6 text-on-surface-variant leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default EcommercePage;
