import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

const MarkdownRenderer = ({ content }) => {
  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  return (
    <div className="prose prose-invert prose-lg max-w-none 
      prose-headings:text-white prose-headings:font-bold prose-headings:scroll-mt-24
      prose-p:text-gray-300 prose-p:leading-8 
      prose-a:text-[#00d9ff] prose-a:no-underline hover:prose-a:underline 
      prose-strong:text-white prose-strong:font-bold
      prose-blockquote:border-l-4 prose-blockquote:border-[#00d9ff] prose-blockquote:bg-slate-900/50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:text-cyan-100
      prose-img:rounded-xl prose-img:shadow-2xl prose-img:border prose-img:border-slate-800
      prose-li:text-gray-300
      prose-code:text-[#00d9ff] prose-code:bg-slate-900 prose-code:px-2 prose-code:py-1 prose-code:rounded
      prose-table:border prose-table:border-slate-800 prose-th:bg-slate-900 prose-th:p-4 prose-td:p-4 prose-tr:border-b prose-tr:border-slate-800"
    >
      {isHtml ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSlug]}
        >
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default MarkdownRenderer;
