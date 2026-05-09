
import React, { useState, useEffect } from 'react';
import { Search, Mail, Download, CheckCircle2, FileText, Layout, Wrench, Video, BookOpen, Library } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const ResourcesSidebar = ({ onSearch, onCategorySelect }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [topDownloads, setTopDownloads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchTop = async () => {
      const { data } = await supabase
        .from('resources')
        .select('*')
        .eq('status', 'published')
        .order('downloads', { ascending: false })
        .limit(5);
      if (data) setTopDownloads(data);
    };
    fetchTop();
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);

    try {
      const { error } = await supabase.from('newsletter_subscribers').insert([{ email, status: 'active' }]);
      if (error && error.code !== '23505') throw error;
      
      toast({
        title: "¡Suscripción exitosa!",
        description: "Recibirás nuestros nuevos recursos semanalmente.",
        className: "bg-cyan-500 text-black border-none"
      });
      setEmail('');
    } catch (err) {
      toast({
        title: "Error",
        description: "No pudimos procesar tu solicitud. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Guías', icon: BookOpen, color: 'text-cyan-400' },
    { name: 'Plantillas', icon: Layout, color: 'text-orange-400' },
    { name: 'Herramientas', icon: Wrench, color: 'text-purple-400' },
    { name: 'Casos de Estudio', icon: FileText, color: 'text-pink-400' },
    { name: 'Webinars', icon: Video, color: 'text-green-400' },
    { name: 'Ebooks', icon: Library, color: 'text-amber-400' },
  ];

  return (
    <aside className="w-full space-y-8">
      {/* Search */}
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <h3 className="font-bold text-white mb-4">Buscar Recursos</h3>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-500" size={16} />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Palabras clave..." 
            className="pl-10 bg-black/40 border-slate-700 focus:border-cyan-500 text-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <h3 className="font-bold text-white mb-4">Explorar por Tipo</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onCategorySelect(cat.name.toUpperCase())}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 transition-colors group"
            >
              <div className="flex items-center gap-3 text-gray-400 group-hover:text-white">
                <cat.icon size={18} className={cat.color} />
                <span>{cat.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Top Downloads */}
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
          <Download size={18} className="text-cyan-400" />
          Top 5 Descargados
        </h3>
        <div className="space-y-6">
          {topDownloads.map((item, i) => (
            <div key={item.id} className="flex gap-4 group cursor-pointer">
              <span className="text-2xl font-bold text-slate-700 group-hover:text-cyan-500/50 transition-colors">0{i + 1}</span>
              <div>
                <h4 className="text-sm font-medium text-gray-200 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Download size={10} /> {item.downloads} descargas
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-cyan-950/30 to-blue-900/30 p-6 rounded-2xl border border-cyan-500/20 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <h3 className="font-bold text-white mb-2 relative z-10 flex items-center gap-2">
          <Mail size={18} className="text-cyan-400" />
          Nuevos Recursos
        </h3>
        <p className="text-sm text-gray-400 mb-4 relative z-10">
          Recibe nuevas plantillas y guías cada semana directamente en tu inbox.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3 relative z-10">
          <Input 
            type="email" 
            placeholder="tu@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-black/40 border-cyan-500/30 focus:border-cyan-500 text-white placeholder:text-gray-500"
          />
          <Button type="submit" disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
            {loading ? 'Suscribiendo...' : 'Suscribirme Gratis'}
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default ResourcesSidebar;
