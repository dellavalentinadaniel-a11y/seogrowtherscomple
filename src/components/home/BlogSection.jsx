
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArticleCard from '@/components/article/ArticleCard';
import { supabase } from '@/lib/customSupabaseClient';

const BlogSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, summary, featured_image, slug, category, created_at, status')
          .eq('status', 'published')
          .neq('category', 'news')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        console.error('Error fetching latest articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-cyan-500" />
      </div>
    );
  }

  if (articles.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0C0D0D]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-cyan-500"></span>
              <span className="text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase">Knowledge Base</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Insights del <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ecosistema Digital</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Explora los últimos contenidos sobre optimización SEO, desarrollo de interfaces y estrategias de crecimiento.
            </p>
          </div>
          <Link to="/blog">
            <Button variant="outline" className="border-slate-800 text-white hover:bg-white/5 gap-2 px-6">
              Ver todo el blog
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={itemVariants}>
              <ArticleCard article={{
                ...article,
                excerpt: article.summary // Map summary to excerpt as expected by ArticleCard
              }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
