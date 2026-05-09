
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
    "logo": "https://horizons-cdn.hostinger.com/4ae51224-e377-439c-9315-7d2c7f7b11c2/85593acc17806560334f2d13123b28a9.png",
    "description": "Agencia líder en SEO Growthers, especializada en Web Development, SEO y Analytics.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+54 9 299 608-7387",
      "contactType": "customer service"
    }
  };

  return (
    <>
      <Helmet>
        <title>SEO Growthers - Web Development, SEO & Analytics</title>
        <meta name="description" content="Impulsa tu negocio con SEO Growthers. Expertos en Web Development, SEO y Analytics para maximizar tu crecimiento digital." />
        <meta property="og:title" content="SEO Growthers - Web Development, SEO & Analytics" />
        <meta property="og:description" content="Impulsa tu negocio con SEO Growthers. Expertos en Web Development, SEO y Analytics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seogrowthers.com/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
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
