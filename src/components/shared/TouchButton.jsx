
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const TouchButton = ({ 
  children, 
  onClick, 
  className, 
  variant = 'primary', 
  loading = false,
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseStyles = "relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none touch-manipulation";
  
  const variants = {
    primary: "bg-cyan-500 text-black hover:bg-cyan-400 active:bg-cyan-600 shadow-lg shadow-cyan-500/20",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-600 border border-slate-700",
    ghost: "bg-transparent text-gray-300 hover:bg-white/10 active:bg-white/20 hover:text-white",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/50"
  };

  return (
    <motion.button
      type={type}
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        children
      )}
    </motion.button>
  );
};

export default TouchButton;
