
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import HomeHero from '@/components/home/HomeHero';
import ServicesSection from '@/components/home/ServicesSection';
import UnifiedCarousel from '@/components/home/UnifiedCarousel';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import ToolsSection from '@/components/home/ToolsSection';
import CTA from '@/components/home/CTA';
import FAQSection from '@/components/home/FAQSection';
import SectionAnimator from '@/components/home/SectionAnimator';
import AluvalleShowcase from '@/components/home/AluvalleShowcase';

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
    "logo": "https://seogrowthers.com/logo.webp",
    "description": "Agencia de SEO, Desarrollo Web y Analytics en Neuquén, Argentina. Estrategias basadas en datos para crecimiento digital sostenible.",
    "sameAs": [
      "https://www.instagram.com/seogrowthers",
      "https://www.linkedin.com/company/seogrowthers",
      "https://github.com/dellavalentinadaniel-a11y"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+54 9 2995504783",
      "contactType": "customer service",
      "areaServed": "AR",
      "availableLanguage": "es"
    }
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
        <meta property="og:image" content="https://seogrowthers.com/logo.webp" />
        <meta property="og:locale" content="es_AR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SEO Growthers - Web Development, SEO & Analytics" />
        <meta name="twitter:description" content="Agencia experta en Web Development, SEO y Analytics para potenciar tu crecimiento digital." />
        <meta name="twitter:image" content="https://seogrowthers.com/logo.webp" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen">
        <HomeHero />

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
      </main>
    </>
  );
};

export default Home;
