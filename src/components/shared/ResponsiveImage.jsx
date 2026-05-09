
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import SkeletonLoader from '@/components/shared/SkeletonLoader';

const ResponsiveImage = ({ 
  src, 
  alt, 
  className, 
  aspectRatio = "16/9", 
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Calculate padding bottom for aspect ratio trick
  const getPaddingBottom = () => {
    const [width, height] = aspectRatio.split('/').map(Number);
    if (!width || !height) return '56.25%'; // Default 16:9
    return `${(height / width) * 100}%`;
  };

  return (
    <div 
      className={cn("relative w-full overflow-hidden bg-slate-900 rounded-lg", className)}
      style={{ paddingBottom: getPaddingBottom() }}
    >
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <SkeletonLoader className="w-full h-full rounded-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
      
      {error && (
         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-500 text-sm">
           Error al cargar imagen
         </div>
      )}
    </div>
  );
};

export default ResponsiveImage;
