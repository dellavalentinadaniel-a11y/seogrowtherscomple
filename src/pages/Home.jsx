
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import HomeHero from '@/components/home/HomeHero';
import SectionAnimator from '@/components/home/SectionAnimator';

// Below-fold sections: lazy-loaded after scroll to reduce initial JS parse cost
const UnifiedCarousel = lazy(() => import('@/components/home/UnifiedCarousel'));
const AluvalleShowcase = lazy(() => import('@/components/home/AluvalleShowcase'));
const ServicesSection = lazy(() => import('@/components/home/ServicesSection'));
const StatsSection = lazy(() => import('@/components/home/StatsSection'));
const TestimonialsCarousel = lazy(() => import('@/components/home/TestimonialsCarousel'));
const ToolsSection = lazy(() => import('@/components/home/ToolsSection'));
const CTA = lazy(() => import('@/components/home/CTA'));
const FAQSection = lazy(() => import('@/components/home/FAQSection'));

const Home = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [hasScrolled, setHasScrolled] = useState(false);
  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SEO Growthers",
    "url": "https://seogrowthers.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://seogrowthers.com/api/og?title=SEO+Growthers&subtitle=SEO%2C+Desarrollo+Web+y+Automatizaci%C3%B3n+con+IA",
      "width": 600,
      "height": 60
    },
    "description": "Agencia de SEO, Desarrollo Web y Analytics en Neuquén, Argentina. Estrategias basadas en datos para crecimiento digital sostenible.",
    "sameAs": [
      "https://x.com/SEOGrowthers",
      "https://www.instagram.com/seogrowthers/",
      "https://www.linkedin.com/company/seogrowthers",
      "https://www.youtube.com/@seogrowthers-s4r"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+54 9 2995504783",
      "contactType": "customer service",
      "areaServed": "AR",
      "availableLanguage": "es"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "SEO Growthers",
    "url": "https://seogrowthers.com",
    "logo": "https://seogrowthers.com/api/og?title=SEO+Growthers&subtitle=SEO%2C+Desarrollo+Web+y+Automatizaci%C3%B3n+con+IA",
    "description": "Agencia de SEO, Desarrollo Web y Analytics en Neuquén, Argentina.",
    "telephone": "+54 9 2995504783",
    "email": "seogrowthers@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Neuquén",
      "addressRegion": "Neuquén",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -38.9516,
      "longitude": -68.0591
    },
    "areaServed": [
      { "@type": "Country", "name": "Argentina" },
      { "@type": "AdministrativeArea", "name": "Neuquén" }
    ],
    "sameAs": [
      "https://x.com/SEOGrowthers",
      "https://www.instagram.com/seogrowthers/",
      "https://www.linkedin.com/company/seogrowthers",
      "https://www.youtube.com/@seogrowthers-s4r"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SEO Growthers",
    "url": "https://seogrowthers.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://seogrowthers.com/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Helmet>
        <title>SEO Growthers - Web Development, SEO & Analytics</title>
        <meta name="description" content="SEO Growthers: agencia experta en Web Development, SEO y Analytics. Potencia tu crecimiento digital con estrategias basadas en datos reales y resultados medibles." />
        <link rel="canonical" href="https://seogrowthers.com/" />
        <meta property="og:title" content="SEO Growthers - Web Development, SEO & Analytics" />
        <meta property="og:description" content="Impulsa tu negocio con SEO Growthers. Expertos en Web Development, SEO y Analytics para maximizar tu crecimiento digital." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seogrowthers.com/" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=SEO+Growthers&subtitle=SEO%2C+Desarrollo+Web+y+Automatizaci%C3%B3n+con+IA" />
        <meta property="og:locale" content="es_AR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SEOGrowthers" />
        <meta name="twitter:title" content="SEO Growthers - Web Development, SEO & Analytics" />
        <meta name="twitter:description" content="Agencia experta en Web Development, SEO y Analytics para potenciar tu crecimiento digital." />
        <meta name="twitter:image" content="https://seogrowthers.com/api/og?title=SEO+Growthers&subtitle=SEO%2C+Desarrollo+Web+y+Automatizaci%C3%B3n+con+IA" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen">
        <HomeHero />

        <Suspense fallback={null}>
          <SectionAnimator>
            <UnifiedCarousel />
          </SectionAnimator>

          <SectionAnimator>
            <AluvalleShowcase />
          </SectionAnimator>

          <SectionAnimator>
            <ServicesSection />
          </SectionAnimator>

          <SectionAnimator>
            <StatsSection />
          </SectionAnimator>

          {(hasScrolled || footerInView) && (
            <>
              <SectionAnimator>
                <TestimonialsCarousel />
              </SectionAnimator>

              <SectionAnimator>
                <ToolsSection />
              </SectionAnimator>

              <SectionAnimator>
                <CTA />
              </SectionAnimator>

              <div ref={footerRef}>
                <SectionAnimator>
                  <FAQSection />
                </SectionAnimator>
              </div>
            </>
          )}
        </Suspense>
      </main>
    </>
  );
};

export default Home;
