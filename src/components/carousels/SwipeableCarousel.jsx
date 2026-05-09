
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import TouchButton from '@/components/shared/TouchButton';

const SwipeableCarousel = ({ 
  children, 
  className, 
  autoPlayInterval = 5000,
  showControls = true,
  showDots = true 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const items = React.Children.toArray(children);
  const count = items.length;

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlayInterval) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [currentIndex, autoPlayInterval]);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) {
      handleNext();
    } else if (offset > 50 || velocity > 500) {
      handlePrev();
    } else {
      // Snap back
      animate(x, -currentIndex * width, { type: "spring", stiffness: 300, damping: 30 });
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % count;
    setCurrentIndex(nextIndex);
    animate(x, -nextIndex * width, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + count) % count;
    setCurrentIndex(prevIndex);
    animate(x, -prevIndex * width, { type: "spring", stiffness: 300, damping: 30 });
  };

  const jumpTo = (index) => {
    setCurrentIndex(index);
    animate(x, -index * width, { type: "spring", stiffness: 300, damping: 30 });
  };

  // Sync animation value when width or index changes without drag
  useEffect(() => {
     x.set(-currentIndex * width);
  }, [width, currentIndex, x]);

  return (
    <div className={cn("relative overflow-hidden group", className)} ref={containerRef}>
      <motion.div
        className="flex"
        style={{ x, width: width * count }}
        drag="x"
        dragConstraints={{ left: -((count - 1) * width), right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        {items.map((child, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-full px-1"
            style={{ width: width }}
          >
            {child}
          </div>
        ))}
      </motion.div>

      {/* Controls */}
      {showControls && (
        <>
          <div className="absolute top-1/2 left-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
            <TouchButton variant="secondary" onClick={handlePrev} aria-label="Anterior">
              <ChevronLeft className="w-5 h-5" />
            </TouchButton>
          </div>
          <div className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
            <TouchButton variant="secondary" onClick={handleNext} aria-label="Siguiente">
              <ChevronRight className="w-5 h-5" />
            </TouchButton>
          </div>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpTo(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                idx === currentIndex ? "bg-cyan-500 w-6" : "bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SwipeableCarousel;
