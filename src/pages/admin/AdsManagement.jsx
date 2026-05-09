import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Plus, Trash2, Edit2, Save, Layout, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const POSITIONS = [
  { value: 'top', label: 'Arriba del artículo' },
  { value: 'middle', label: 'Dentro del contenido' },
  { value: 'bottom', label: 'Al final del artículo' },
  { value: 'sidebar', label: 'Sidebar (Barra lateral)' },
];

const AdsManagement = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      // ad_settings table uses UUID for id
      const { data, error } = await supabase
        .from('ad_settings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error('Error fetching ads:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los anuncios.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este bloque de anuncios?')) return;

    try {
      // Ensure ID is treated as string (UUID)
      const { error } = await supabase.from('ad_settings').delete().eq('id', String(id));
      if (error) throw error;
      
      setAds(ads.filter(ad => ad.id !== id));
      toast({ title: 'Éxito', description: 'Anuncio eliminado correctamente.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Error al eliminar el anuncio.', variant: 'destructive' });
    }
  };

  const AdForm = ({ ad, onClose }) => {
    const [formData, setFormData] = useState({
      block_name: ad?.block_name || '',
      position: ad?.position || 'top',
      ad_code: ad?.ad_code || '',
      is_active: ad?.is_active ?? true,
      description: ad?.description || ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (ad?.id) {
          const { error } = await supabase
            .from('ad_settings')
            .update(formData)
            .eq('id', String(ad.id)); // Ensure UUID is string
          if (error) throw error;
          toast({ title: 'Actualizado', description: 'El bloque de anuncios ha sido actualizado.' });
        } else {
          const { error } = await supabase
            .from('ad_settings')
            .insert([formData]);
          if (error) throw error;
          toast({ title: 'Creado', description: 'Nuevo bloque de anuncios creado.' });
        }
        fetchAds();
        onClose();
      } catch (error) {
        console.error(error);
        toast({ title: 'Error', description: 'No se pudo guardar el anuncio.', variant: 'destructive' });
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="block_name">Nombre del Bloque</Label>
          <Input 
            id="block_name" 
            value={formData.block_name} 
            onChange={e => setFormData({...formData, block_name: e.target.value})}
            placeholder="Ej: Banner Principal Home"
            required
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="position">Posición</Label>
          <Select 
            value={formData.position} 
            onValueChange={val => setFormData({...formData, position: val})}
          >
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Selecciona posición" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-white border-slate-700">
              {POSITIONS.map(pos => (
                <SelectItem key={pos.value} value={pos.value}>{pos.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="ad_code">Código del Anuncio (HTML/JS)</Label>
          <Textarea 
            id="ad_code" 
            value={formData.ad_code} 
            onChange={e => setFormData({...formData, ad_code: e.target.value})}
            placeholder="<script>...</script>"
            className="font-mono text-xs h-32 bg-slate-800 border-slate-700 text-gray-300"
          />
        </div>

        <div>
          <Label htmlFor="description">Descripción Interna</Label>
          <Input 
            id="description" 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})}
            placeholder="Notas sobre este anuncio..."
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
          <Label htmlFor="is_active" className="cursor-pointer">Activar Anuncio</Label>
          <Switch 
            id="is_active" 
            checked={formData.is_active} 
            onCheckedChange={checked => setFormData({...formData, is_active: checked})}
          />
        </div>

        <div className="mt-4 p-4 border border-slate-700 rounded-lg bg-slate-900">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Vista Previa (Renderizado)</p>
          <div className="bg-white/5 p-4 rounded min-h-[100px] flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-600">
            {formData.ad_code ? (
              <div dangerouslySetInnerHTML={{ __html: formData.ad_code }} />
            ) : (
              <span>El anuncio aparecerá aquí</span>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
          <Save className="mr-2 h-4 w-4" /> Guardar Anuncio
        </Button>
      </form>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Anuncios</h1>
          <p className="text-gray-400">Configura los bloques de publicidad global del sitio.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setCurrentAd(null)} className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Bloque
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{currentAd ? 'Editar Bloque' : 'Nuevo Bloque de Anuncio'}</DialogTitle>
            </DialogHeader>
            <AdForm ad={currentAd} onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-colors">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${ad.is_active ? 'bg-cyan-500/10 text-cyan-400' : 'bg-gray-800 text-gray-500'}`}>
                    <Layout size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{ad.block_name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Monitor size={10} /> 
                      {POSITIONS.find(p => p.value === ad.position)?.label || ad.position}
                    </p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${ad.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
              </div>

              <div className="bg-black/30 p-3 rounded-lg mb-4 h-24 overflow-hidden relative">
                <code className="text-xs text-gray-500 break-all font-mono">
                  {ad.ad_code || '// Sin código'}
                </code>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
              </div>

              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-slate-700 text-gray-300 hover:text-white hover:bg-slate-800"
                  onClick={() => {
                    setCurrentAd(ad);
                    setIsDialogOpen(true);
                  }}
                >
                  <Edit2 size={14} className="mr-2" /> Editar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-400 hover:text-red-300 hover:bg-red-950/30 px-3"
                  onClick={() => handleDelete(ad.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {ads.length === 0 && !loading && (
          <div className="col-span-full py-12 text-center border border-dashed border-slate-800 rounded-xl">
            <p className="text-gray-500">No hay bloques de anuncios configurados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdsManagement;