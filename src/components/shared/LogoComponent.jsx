
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const LogoComponent = ({ className, size = 'md', isLink = true }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    large: 'h-16',
    xl: 'h-20',
  };

  const Content = (
    <div className="flex items-center gap-3">
      <img 
        src="/images/iconos/logo3sinfondo.webp" 
        alt="SEO Growthers Icon" 
        className={cn(sizeClasses[size] || sizeClasses.md, "w-auto object-contain")}
      />
      <img 
        src="/images/iconos/logoletrassinfondo.webp" 
        alt="SEO Growthers Name" 
        className={cn(sizeClasses[size] || sizeClasses.md, "w-auto object-contain hidden xs:block")}
      />
    </div>
  );

  if (isLink) {
    return <Link to="/">{Content}</Link>;
  }

  return Content;
};

export default LogoComponent;
