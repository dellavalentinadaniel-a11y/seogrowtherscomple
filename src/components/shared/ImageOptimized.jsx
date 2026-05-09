
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { generateSrcSet, getBlurPlaceholder } from '@/lib/imageOptimization';

const ImageOptimized = ({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  priority = false,
  fetchPriority = "auto",
  aspectRatio,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [priority]);

  const srcSet = generateSrcSet(src);

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden bg-slate-900/20", className)}
      style={{ aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : 'auto') }}
    >
      {(!isLoaded || !isInView) && (
        <div 
          className="absolute inset-0 bg-cover bg-center blur-lg scale-110 transition-opacity duration-500"
          style={{ backgroundImage: `url(${getBlurPlaceholder()})` }}
        />
      )}
      
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt || ''}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={fetchPriority}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
};

export default ImageOptimized;
