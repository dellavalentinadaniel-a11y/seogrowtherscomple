
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import NovelEditor from '@/components/shared/NovelEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Save, ArrowLeft, Layout } from 'lucide-react';
import {
  generateSlug,
  validateSeoTitle,
  validateSeoDescription,
  validateImageAlt
} from '@/lib/seoHelpers';

const ArticleForm = ({ initialData, isEditing = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Initialize form data with safe defaults or mapped initialData
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    seo_title: '',
    seo_description: '',
    keywords: [],
    canonical_url: '',
    featured_image_alt: '',
    published: false,
    featured_image: '',
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [validations, setValidations] = useState({});

  useEffect(() => {
    if (initialData) {
      // Map 'articles' table schema to form state
      // 'articles' table stores HTML in content_html and metadata in content (jsonb)
      const meta = initialData.content || {}; // Metadata stored in jsonb column
      
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        content: initialData.content_html || '', // Editor expects HTML string
        seo_title: meta.seo_title || initialData.title || '',
        seo_description: initialData.summary || '', // summary column maps to description
        keywords: meta.keywords || [],
        canonical_url: meta.canonical_url || '',
        featured_image_alt: meta.featured_image_alt || '',
        published: initialData.status === 'published',
        featured_image: initialData.featured_image || '',
      });
      
      // Run validations on loaded data
      runValidations({
        seo_title: meta.seo_title || initialData.title || '',
        seo_description: initialData.summary || '',
        content: initialData.content_html || ''
      });
    }
  }, [initialData]);

  const runValidations = (data) => {
    const titleVal = validateSeoTitle(data.seo_title);
    const descVal = validateSeoDescription(data.seo_description);
    const imgVal = validateImageAlt(data.content);

    setValidations({
      seoTitle: titleVal,
      seoDesc: descVal,
      images: imgVal
    });
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: !isEditing ? generateSlug(title) : prev.slug
    }));
  };

  const handleInputChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    runValidations(newData);
  };

  const handleKeywordAdd = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = keywordInput.trim();
      if (val && formData.keywords.length < 5 && !formData.keywords.includes(val)) {
        setFormData(prev => ({ ...prev, keywords: [...prev.keywords, val] }));
        setKeywordInput('');
      } else if (formData.keywords.length >= 5) {
        toast({ title: "Límite alcanzado", description: "Máximo 5 palabras clave." });
      }
    }
  };

  const removeKeyword = (kw) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== kw)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { seoTitle, seoDesc } = validations;
      if (seoTitle?.isValid === false || seoDesc?.isValid === false) {
        toast({
          title: "Errores de SEO",
          description: "Por favor corrige los campos marcados antes de guardar.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Prepare payload for 'articles' table
      const payload = {
        title: formData.title,
        slug: formData.slug,
        content_html: formData.content, // Store HTML content
        summary: formData.seo_description, // Store description in summary
        status: formData.published ? 'published' : 'draft',
        featured_image: formData.featured_image,
        updated_at: new Date().toISOString(),
        // Store extra metadata in the jsonb 'content' column
        content: {
          seo_title: formData.seo_title || formData.title,
          keywords: formData.keywords,
          canonical_url: formData.canonical_url,
          featured_image_alt: formData.featured_image_alt
        }
      };

      if (isEditing) {
        const { error } = await supabase
          .from('articles') // Using 'articles' table (bigint id)
          .update(payload)
          .eq('id', initialData.id);
        if (error) throw error;
        toast({ title: "Artículo actualizado", description: "Los cambios se guardaron correctamente." });
      } else {
        const { error } = await supabase
          .from('articles') // Using 'articles' table
          .insert([payload]);
        if (error) throw error;
        toast({ title: "Artículo creado", description: "El nuevo artículo está listo." });
      }
      
      navigate('/admin/articles');
    } catch (error) {
      console.error(error);
      toast({ 
        title: "Error al guardar", 
        description: error.message || "Ocurrió un error inesperado.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto pb-20 space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/articles')}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-3xl font-bold text-white">
            {isEditing ? 'Editar Artículo' : 'Nuevo Artículo'}
          </h1>
        </div>
        <Button type="submit" disabled={loading} className="bg-cyan-600 hover:bg-cyan-700">
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Guardando...' : 'Guardar Artículo'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div>
              <Label className="text-white">Título del Artículo</Label>
              <Input 
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Escribe un título atractivo..."
                className="bg-slate-800 border-slate-700 text-lg font-semibold text-white mt-1"
                required
              />
            </div>
            
            <div>
              <Label className="text-white mb-2 block">Contenido</Label>
              <NovelEditor 
                content={formData.content} 
                onChange={(html) => handleInputChange('content', html)} 
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="bg-purple-500/10 p-2 rounded text-purple-400"><Layout size={20} /></div>
              Optimización SEO
            </h2>

            <div className="grid gap-6">
              <div>
                <div className="flex justify-between">
                  <Label className="text-white">Título SEO (Title Tag)</Label>
                  <span className={`text-xs ${formData.seo_title.length > 60 ? 'text-red-400' : 'text-gray-400'}`}>
                    {formData.seo_title.length}/60
                  </span>
                </div>
                <Input 
                  value={formData.seo_title}
                  onChange={(e) => handleInputChange('seo_title', e.target.value)}
                  className={`bg-slate-800 mt-1 ${
                    validations.seoTitle && !validations.seoTitle.isValid ? 'border-red-500' : 'border-slate-700'
                  } text-white`}
                  placeholder="Título optimizado para buscadores"
                />
                {validations.seoTitle?.warnings?.map((w, i) => (
                   <p key={i} className="text-xs text-yellow-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {w}</p>
                ))}
              </div>

              <div>
                <div className="flex justify-between">
                  <Label className="text-white">Meta Descripción</Label>
                  <span className={`text-xs ${formData.seo_description.length > 160 ? 'text-red-400' : 'text-gray-400'}`}>
                    {formData.seo_description.length}/160
                  </span>
                </div>
                <Textarea 
                  value={formData.seo_description}
                  onChange={(e) => handleInputChange('seo_description', e.target.value)}
                  className={`bg-slate-800 mt-1 ${
                    validations.seoDesc && !validations.seoDesc.isValid ? 'border-red-500' : 'border-slate-700'
                  } text-white h-24`}
                  placeholder="Resumen atractivo del contenido..."
                />
                {validations.seoDesc?.warnings?.map((w, i) => (
                   <p key={i} className="text-xs text-yellow-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {w}</p>
                ))}
              </div>

              <div>
                <Label className="text-white">Slug (URL)</Label>
                <div className="flex items-center mt-1">
                  <span className="bg-slate-800 border border-r-0 border-slate-700 px-3 py-2 text-gray-500 text-sm rounded-l-md">
                    /news/
                  </span>
                  <Input 
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white rounded-l-none"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">URL Canónica (Opcional)</Label>
                <Input 
                  value={formData.canonical_url}
                  onChange={(e) => handleInputChange('canonical_url', e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Publicación</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Estado</span>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={formData.published}
                  onCheckedChange={(checked) => handleInputChange('published', checked)}
                />
                <span className={formData.published ? 'text-green-400' : 'text-yellow-400'}>
                  {formData.published ? 'Publicado' : 'Borrador'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Palabras Clave</h3>
            <Input 
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordAdd}
              placeholder="Escribe y presiona Enter..."
              className="bg-slate-800 border-slate-700 text-white mb-3"
            />
            <div className="flex flex-wrap gap-2">
              {formData.keywords.map((kw, i) => (
                <span key={i} className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-sm flex items-center gap-1 border border-cyan-500/20">
                  {kw}
                  <button type="button" onClick={() => removeKeyword(kw)} className="hover:text-cyan-200">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

           <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Imagen Destacada</h3>
             <Input 
                value={formData.featured_image}
                onChange={(e) => handleInputChange('featured_image', e.target.value)}
                placeholder="URL de imagen..."
                className="bg-slate-800 border-slate-700 text-white mb-4"
              />
            <div>
              <Label className="text-white">Texto Alternativo (Alt Text)</Label>
              <Input 
                value={formData.featured_image_alt}
                onChange={(e) => handleInputChange('featured_image_alt', e.target.value)}
                className="bg-slate-800 border-slate-700 text-white mt-1"
                placeholder="Descripción de la imagen destacada"
                required={!!formData.featured_image} 
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ArticleForm;
