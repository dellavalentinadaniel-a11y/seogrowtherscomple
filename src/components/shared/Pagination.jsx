
import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pagination = ({ 
  currentPage, 
  totalItems, 
  pageSize, 
  onPageChange,
  className = "" 
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;

    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      if (start > 2) pages.push('ellipsis-start');
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (end < totalPages - 1) pages.push('ellipsis-end');
      
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className={`flex items-center justify-center gap-2 py-8 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-slate-800 bg-slate-900/50 text-white hover:bg-cyan-500/10 hover:text-cyan-400 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <ChevronLeft size={18} />
      </Button>

      <div className="flex items-center gap-1.5 mx-2">
        {pages.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <span key={`ellipsis-${index}`} className="flex items-center justify-center w-10 h-10 text-slate-600">
                <MoreHorizontal size={16} />
              </span>
            );
          }

          const isActive = currentPage === page;

          return (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-xl font-bold transition-all duration-300 ${
                isActive 
                  ? 'bg-cyan-500 text-[#0C0D0D] shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                  : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 border-none'
              }`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-slate-800 bg-slate-900/50 text-white hover:bg-cyan-500/10 hover:text-cyan-400 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <ChevronRight size={18} />
      </Button>
    </nav>
  );
};

export default Pagination;
