import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/lib/db';
import ArticleForm from '@/components/admin/ArticleForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ArticlesNew = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: newArticle, error } = await db.articles.create(data);
      if (error) throw new Error(error);
      
      toast({
        title: "Artículo creado",
        description: "El artículo se ha guardado correctamente.",
      });
      navigate(`/admin/articles/${newArticle.id}/edit`);
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo crear el artículo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/articles')} className="text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <h1 className="text-2xl font-bold text-white">Crear Nuevo Artículo</h1>
      </div>

      <ArticleForm 
        onSubmit={handleSubmit} 
        isLoading={loading} 
      />
    </div>
  );
};

export default ArticlesNew;