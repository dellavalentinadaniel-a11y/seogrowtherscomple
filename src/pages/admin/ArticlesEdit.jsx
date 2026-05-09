import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import ArticleForm from '@/components/admin/ArticleForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ArticlesEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArticle = async () => {
      // Use supabase directly to query 'articles' table
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error(error);
        toast({ title: "Error", description: "Artículo no encontrado", variant: "destructive" });
        navigate('/admin/articles');
        return;
      }
      setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [id, navigate, toast]);

  // ArticleForm handles the update logic internally via supabase, 
  // so we don't need a handleSubmit here unless we want to override it.
  // The current ArticleForm implementation handles submission itself.

  if (loading) return <div className="text-center py-20 text-gray-500">Cargando editor...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/articles')} className="text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <h1 className="text-2xl font-bold text-white">Editar Artículo</h1>
      </div>

      <ArticleForm 
        initialData={article} 
        isEditing={true}
      />
    </div>
  );
};

export default ArticlesEdit;