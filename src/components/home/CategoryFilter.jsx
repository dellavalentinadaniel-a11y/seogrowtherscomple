import React from 'react';
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/50 scale-105'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white border border-slate-700 hover:border-cyan-500/30'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;