import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { slugify } from '@/lib/utils';
import NovelEditor from '@/components/shared/NovelEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const GenericForm = ({ 
  tableName, 
  basePath, 
  title, 
  categoryType = 'article', 
  additionalFields = null // Component to render extra fields
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    featured_image: '',
    featured_image_alt: '',
    category_id: null,
    published_at: new Date().toISOString(),
  });

  // Fetch initial data
  useEffect(() => {
    const init = async () => {
      // Fetch categories
      const { data: catData } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('type', categoryType);
      setCategories(catData || []);

      if (isEditing) {
        const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single();
        if (error) {
          toast({ title: "Error", description: "Elemento no encontrado", variant: "destructive" });
          navigate(basePath);
          return;
        }
        setFormData(data);
      }
    };
    init();
  }, [id, tableName, categoryType, isEditing, basePath, navigate]);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (!isEditing) {
      setFormData(prev => ({ ...prev, title: val, slug: slugify(val) }));
    } else {
      setFormData(prev => ({ ...prev, title: val }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Unique slug check for new items
      if (!isEditing) {
        const { data } = await supabase.from(tableName).select('id').eq('slug', formData.slug).single();
        if (data) throw new Error('El slug ya existe. Elige otro título o modifica el slug.');
      }

      const { data: { user } } = await supabase.auth.getUser();
      const payload = { ...formData, updated_at: new Date().toISOString() };
      
      let error;
      if (isEditing) {
        const { error: updateError } = await supabase.from(tableName).update(payload).eq('id', id);
        error = updateError;
      } else {
        // Add author_id for new records
        if (user) payload.author_id = user.id;
        const { error: insertError } = await supabase.from(tableName).insert([payload]);
        error = insertError;
      }

      if (error) throw error;
      toast({ title: "Éxito", description: "Guardado correctamente." });
      navigate(basePath);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
       <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(basePath)} className="text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <h1 className="text-2xl font-bold text-white">{isEditing ? `Editar ${title}` : `Crear ${title}`}</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
            <div>
              <Label htmlFor="title">Título Principal</Label>
              <Input 
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="bg-slate-800 border-slate-700 text-white mt-1 text-lg font-semibold"
                placeholder="Escribe un título atractivo..."
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug URL</Label>
              <Input 
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: slugify(e.target.value)})}
                required
                className="bg-slate-800 border-slate-700 text-gray-300 mt-1 font-mono text-sm"
              />
            </div>

            <div>
              <Label className="mb-2 block">Contenido</Label>
              <NovelEditor 
                content={formData.content} 
                onChange={(html) => setFormData({...formData, content: html})}
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Extracto / Resumen</Label>
              <Input 
                 id="excerpt"
                 value={formData.excerpt || ''}
                 onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                 className="bg-slate-800 border-slate-700 text-white mt-1"
                 placeholder="Breve descripción para listas y SEO..."
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
           {/* Publication Status */}
           <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
             <h3 className="font-semibold text-white border-b border-slate-700 pb-2">Publicación</h3>
             
             <div className="flex items-center justify-between">
               <Label>Estado</Label>
               <div className="flex items-center gap-2">
                 <Switch 
                    checked={formData.status === 'published'}
                    onCheckedChange={(checked) => setFormData({...formData, status: checked ? 'published' : 'draft'})}
                 />
                 <span className={formData.status === 'published' ? "text-green-400 text-sm" : "text-gray-400 text-sm"}>
                   {formData.status === 'published' ? 'Publicado' : 'Borrador'}
                 </span>
               </div>
             </div>

             <div className="space-y-2">
               <Label>Fecha de Publicación</Label>
               <Popover>
                 <PopoverTrigger asChild>
                   <Button variant="outline" className="w-full justify-start text-left font-normal bg-slate-800 border-slate-700 text-white">
                     <CalendarIcon className="mr-2 h-4 w-4" />
                     {formData.published_at ? format(new Date(formData.published_at), 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                   </Button>
                 </PopoverTrigger>
                 <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                   <Calendar
                     mode="single"
                     selected={new Date(formData.published_at)}
                     onSelect={(date) => date && setFormData({...formData, published_at: date.toISOString()})}
                     initialFocus
                   />
                 </PopoverContent>
               </Popover>
             </div>
           </div>

           {/* Taxonomy */}
           <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
             <h3 className="font-semibold text-white border-b border-slate-700 pb-2">Organización</h3>
             <div>
               <Label>Categoría</Label>
               <Select 
                 value={formData.category_id || ''} 
                 onValueChange={(val) => setFormData({...formData, category_id: val})}
               >
                 <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                   <SelectValue placeholder="Selecciona categoría" />
                 </SelectTrigger>
                 <SelectContent className="bg-slate-800 text-white border-slate-700">
                   {categories.map(cat => (
                     <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
           </div>

           {/* Featured Image */}
           <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
             <ImageUpload 
               value={formData.featured_image} 
               onChange={(url) => setFormData({...formData, featured_image: url})}
               altValue={formData.featured_image_alt}
               onAltChange={(alt) => setFormData({...formData, featured_image_alt: alt})}
             />
           </div>

           {/* Custom Fields Injection */}
           {additionalFields && additionalFields(formData, setFormData)}

           <Button type="submit" disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-700 h-12 text-lg">
             {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
             Guardar
           </Button>
        </div>
      </form>
    </div>
  );
};

export default GenericForm;