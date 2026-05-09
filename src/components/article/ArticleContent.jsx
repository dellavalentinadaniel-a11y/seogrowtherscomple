
import React from 'react';
import { motion } from 'framer-motion';
import MarkdownRenderer from '../shared/MarkdownRenderer';

const ArticleContent = ({ htmlContent }) => {
  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <MarkdownRenderer content={htmlContent} />
    </motion.article>
  );
};

export default ArticleContent;
