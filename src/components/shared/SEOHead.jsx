
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { generateMetaTags, generateJsonLd } from '@/lib/seoHelpers';

const SEOHead = ({ 
  title, 
  description, 
  image, 
  type = 'website', 
  datePublished, 
  dateModified, 
  authorName,
  jsonLdType,
  jsonLdData = {}
}) => {
  const location = useLocation();
  const domain = 'https://seogrowthers.com';
  const fullUrl = `${domain}${location.pathname}`;
  const defaultImage = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c';

  const metaTags = generateMetaTags({
    title,
    description,
    image: image || defaultImage,
    url: fullUrl,
    type
  });

  const structuredData = jsonLdType ? generateJsonLd(jsonLdType, {
    title,
    description,
    image: image || defaultImage,
    url: fullUrl,
    datePublished,
    dateModified,
    authorName,
    ...jsonLdData
  }) : null;

  return (
    <Helmet>
      <title>{title ? `${title} | SEO Growthers` : 'SEO Growthers - Web Development, SEO & Analytics'}</title>
      <link rel="canonical" href={fullUrl} />
      
      {metaTags.map((tag, index) => (
        tag.name 
          ? <meta key={`name-${index}`} name={tag.name} content={tag.content} />
          : <meta key={`prop-${index}`} property={tag.property} content={tag.content} />
      ))}

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
