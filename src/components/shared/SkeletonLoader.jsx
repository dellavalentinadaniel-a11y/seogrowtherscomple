
import React from 'react';
import { cn } from '@/lib/utils';

const SkeletonLoader = ({ className, variant = "default", width, height }) => {
  const baseClasses = "relative overflow-hidden bg-slate-800/50 rounded-lg";
  const shimmer = "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-slate-700/30 after:to-transparent after:-translate-x-full after:animate-[shimmer_1.5s_infinite]";

  const variants = {
    default: "",
    circle: "rounded-full",
    card: "h-64 w-full",
    text: "h-4 w-full",
    title: "h-8 w-3/4",
    avatar: "h-12 w-12 rounded-full",
    button: "h-11 w-32"
  };

  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div 
      className={cn(baseClasses, shimmer, variants[variant], className)}
      style={style}
      aria-hidden="true"
    />
  );
};

export default SkeletonLoader;
