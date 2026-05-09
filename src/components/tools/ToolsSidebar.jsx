
import React, { useState, useEffect } from 'react';
import { Search, Mail, Heart, Star, BarChart2, Zap, Megaphone, PenTool, Code, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const ToolsSidebar = ({ onSearch, onCategorySelect }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [topTools, setTopTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchTop = async () => {
      const { data } = await supabase
        .from('tools')
        .select('id, name, users_count, rating')
        .eq('status', 'published')
        .order('users_count', { ascending: false })
        .limit(5);
      if (data) setTopTools(data);
    };
    fetchTop();
  }, []);

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

    // Mock subscription since table might handle duplicate emails
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert([{ email, status: 'active' }]);
      if (error && error.code !== '23505') throw error; // Ignore duplicate key error
      
      toast({
        title: "¡Suscripción exitosa!",
        description: "Recibirás nuevas herramientas cada semana.",
        className: "bg-cyan-500 text-black border-none"
      });
      setEmail('');
    } catch (err) {
      toast({
        title: "Error",
        description: "Inténtalo de nuevo más tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'SEO', icon: Search, color: 'text-cyan-400' },
    { name: 'Análisis', icon: BarChart2, color: 'text-orange-400' },
    { name: 'Productividad', icon: Zap, color: 'text-purple-400' },
    { name: 'Marketing', icon: Megaphone, color: 'text-pink-400' },
    { name: 'Diseño', icon: PenTool, color: 'text-emerald-400' },
    { name: 'Desarrollo', icon: Code, color: 'text-amber-400' },
    { name: 'Integraciones', icon: Globe, color: 'text-cyan-500' },
  ];

  return (
    <aside className="w-full space-y-8">
      {/* Search */}
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <h3 className="font-bold text-white mb-4">Buscar Herramientas</h3>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-500" size={16} />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Escribe el nombre..." 
            className="pl-10 bg-black/40 border-slate-700 focus:border-cyan-500 text-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <h3 className="font-bold text-white mb-4">Categorías</h3>
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

      {/* Top Tools */}
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
          <Heart size={18} className="text-red-500 fill-red-500" />
          Top 5 Populares
        </h3>
        <div className="space-y-6">
          {topTools.map((tool, i) => (
            <div key={tool.id} className="flex gap-4 group cursor-pointer items-center">
              <span className="text-xl font-bold text-slate-700 group-hover:text-cyan-500/50 transition-colors w-6">{i + 1}</span>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-200 group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {tool.name}
                </h4>
                <div className="flex items-center justify-between mt-1">
                   <span className="text-xs text-gray-500">{tool.users_count?.toLocaleString()} usuarios</span>
                   <div className="flex items-center gap-0.5">
                     <Star size={10} className="text-yellow-500 fill-yellow-500" />
                     <span className="text-xs text-gray-400">{tool.rating}</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-6 rounded-2xl border border-purple-500/20 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
        <h3 className="font-bold text-white mb-2 relative z-10 flex items-center gap-2">
          <Mail size={18} className="text-purple-400" />
          Nuevas Herramientas
        </h3>
        <p className="text-sm text-gray-400 mb-4 relative z-10">
          Recibe las mejores herramientas cada semana.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3 relative z-10">
          <Input 
            type="email" 
            placeholder="tu@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-black/40 border-purple-500/30 focus:border-purple-500 text-white placeholder:text-gray-500"
          />
          <Button type="submit" disabled={loading} className="w-full bg-purple-500 hover:bg-purple-400 text-white font-bold">
            {loading ? 'Suscribiendo...' : 'Suscribirme'}
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default ToolsSidebar;
