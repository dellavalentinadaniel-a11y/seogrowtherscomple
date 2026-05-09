import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { slugify } from '@/lib/utils';

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    type: 'article'
  });

  useEffect(() => {
    if (isEditing) {
      fetchCategory();
    }
  }, [id]);

  const fetchCategory = async () => {
    try {
      const { data, error } = await supabase.from('blog_categories').select('*').eq('id', id).single();
      if (error) throw error;
      setFormData(data);
    } catch (error) {
      toast({ title: "Error", description: "No se encontró la categoría.", variant: "destructive" });
      navigate('/admin/categories');
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    if (!isEditing) {
      setFormData(prev => ({ ...prev, name, slug: slugify(name) }));
    } else {
      setFormData(prev => ({ ...prev, name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check slug uniqueness if new or changed
      if (!isEditing) {
        const { data } = await supabase.from('blog_categories').select('id').eq('slug', formData.slug).single();
        if (data) throw new Error('El slug ya existe. Por favor elige otro.');
      }

      const payload = { ...formData, updated_at: new Date().toISOString() };
      
      let error;
      if (isEditing) {
        const { error: updateError } = await supabase.from('blog_categories').update(payload).eq('id', id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase.from('blog_categories').insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      toast({ title: "Éxito", description: `Categoría ${isEditing ? 'actualizada' : 'creada'} correctamente.` });
      navigate('/admin/categories');
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/categories')} className="text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <h1 className="text-2xl font-bold text-white">{isEditing ? 'Editar Categoría' : 'Nueva Categoría'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 space-y-6">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input 
            id="name"
            value={formData.name}
            onChange={handleNameChange}
            required
            className="bg-slate-800 border-slate-700 text-white mt-1"
            placeholder="Ej: Desarrollo Web"
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input 
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: slugify(e.target.value)})}
            required
            className="bg-slate-800 border-slate-700 text-gray-300 mt-1 font-mono text-sm"
          />
        </div>

        <div>
          <Label htmlFor="type">Tipo de Contenido</Label>
          <Select 
            value={formData.type} 
            onValueChange={(val) => setFormData({...formData, type: val})}
          >
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-white border-slate-700">
              <SelectItem value="article">Artículos</SelectItem>
              <SelectItem value="news">Noticias</SelectItem>
              <SelectItem value="tool">Herramientas</SelectItem>
              <SelectItem value="resource">Recursos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Descripción (Opcional)</Label>
          <Textarea 
            id="description"
            value={formData.description || ''}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="bg-slate-800 border-slate-700 text-white mt-1 h-32"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-700">
          {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 h-4 w-4" />}
          Guardar Categoría
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;