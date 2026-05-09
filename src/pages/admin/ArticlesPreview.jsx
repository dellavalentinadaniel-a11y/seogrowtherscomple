import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ArticlesPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      // Use supabase directly to query 'articles' table
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, summary, content, content_html, featured_image, slug, category, created_at, status, author')
        .eq('id', id)
        .single();
        
      if (!error && data) {
        setArticle(data);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-white">Cargando vista previa...</div>;
  if (!article) return <div className="text-center py-20 text-white">Artículo no encontrado</div>;

  // 'articles' table uses content_html for the HTML body
  const sanitizedContent = DOMPurify.sanitize(article.content_html || '');

  return (
    <div className="bg-[#0C0D0D] min-h-screen text-white pb-20">
      {/* Admin Bar */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center px-8">
        <div className="flex items-center gap-4">
          <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm font-bold border border-yellow-500/30">
            Modo Vista Previa
          </span>
          <span className="text-gray-400 text-sm">Estado: {article.status === 'published' ? 'Publicado' : 'Borrador'}</span>
        </div>
        <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate('/admin/articles')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver a lista
            </Button>
            <Button onClick={() => navigate(`/admin/articles/${id}/edit`)} className="bg-cyan-600 hover:bg-cyan-700">
                <Edit className="mr-2 h-4 w-4" /> Editar Artículo
            </Button>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-10 text-center">
            <div className="flex justify-center gap-2 mb-6">
                <span className="text-cyan-400 text-sm font-bold tracking-wider uppercase">{article.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{article.title}</h1>
            <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
                <span>Por {article.author || 'Equipo Editorial'}</span>
                <span>•</span>
                <span>{format(new Date(article.created_at || new Date()), "d 'de' MMMM, yyyy", { locale: es })}</span>
            </div>
        </header>

        {article.featured_image && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/10">
                <img src={article.featured_image} alt={article.title} className="w-full h-auto object-cover max-h-[600px]" />
            </div>
        )}

        <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-cyan-400 prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </article>
    </div>
  );
};

export default ArticlesPreview;