
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import SkeletonLoader from '@/components/shared/SkeletonLoader';

const AdContainer = ({ 
  width, 
  height, 
  className, 
  children,
  minHeight,
  minWidth
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Load before it comes into view
        threshold: 0
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Construct style for anti-CLS
  const style = {
    minHeight: minHeight || height || 'auto',
    minWidth: minWidth || width || 'auto',
    ...(width && { width }),
    ...(height && { height })
  };

  if (hasError) {
    // Fallback UI (optional: could be empty or a house ad)
    return null; 
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center bg-white/5 rounded-xl overflow-hidden transition-opacity duration-500",
        className
      )}
      style={style}
    >
      {!isVisible && (
        <div className="absolute inset-0 z-10">
          <SkeletonLoader className="w-full h-full rounded-xl opacity-20" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-gray-600 uppercase tracking-widest font-mono">
            Publicidad
          </span>
        </div>
      )}
      
      {isVisible && (
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default AdContainer;
