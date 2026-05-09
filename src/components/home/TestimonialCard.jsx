
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { generateJsonLd } from '@/lib/seoHelpers';
import { Helmet } from 'react-helmet-async';
import ImageOptimized from '@/components/shared/ImageOptimized';

const TestimonialCard = ({ testimonial }) => {
  const jsonLd = generateJsonLd('Review', {
    author: testimonial.author,
    rating: testimonial.rating,
    text: testimonial.text
  });

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      
      <blockquote className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 relative hover:border-cyan-500/30 transition-colors">
        <Quote className="absolute top-6 right-6 text-slate-800 h-12 w-12 transform rotate-12" />
        
        <div className="flex gap-1 text-yellow-500 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill={i < testimonial.rating ? "currentColor" : "none"} className={i >= testimonial.rating ? "text-slate-700" : ""} />
          ))}
        </div>
        
        <p className="text-gray-300 text-lg italic mb-8 relative z-10 leading-relaxed">
          "{testimonial.text}"
        </p>
        
        <footer className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-slate-700">
             <ImageOptimized 
                src={testimonial.image || `https://ui-avatars.com/api/?name=${testimonial.author}&background=0D8ABC&color=fff`}
                alt={testimonial.author}
                width={48}
                height={48}
             />
          </div>
          <div>
            <cite className="not-italic font-bold text-white block">{testimonial.author}</cite>
            <span className="text-sm text-cyan-400">{testimonial.role}</span>
          </div>
        </footer>
      </blockquote>
    </>
  );
};

export default TestimonialCard;
