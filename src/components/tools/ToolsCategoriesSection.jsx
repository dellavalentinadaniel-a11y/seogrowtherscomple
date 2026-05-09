
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Search, BarChart2, Zap, Megaphone, PenTool, Code, Globe, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap = {
  'Search': Search,
  'BarChart': BarChart2,
  'Zap': Zap,
  'Megaphone': Megaphone,
  'PenTool': PenTool,
  'Code': Code,
  'Globe': Globe,
  'default': Folder
};

const ToolsCategoriesSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await supabase.from('tool_categories').select('*');
      if (data) setCategories(data);
    };
    fetchCats();
  }, []);

  return (
    <section className="py-20 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Explora por Categoría</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || iconMap['default'];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl group hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className="mb-6 inline-block p-4 rounded-xl bg-slate-800 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                  <Icon size={40} />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                  <span className="text-sm bg-slate-800 text-gray-400 px-2 py-1 rounded-md">{cat.tool_count} herramientas</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 h-10 line-clamp-2">
                  {cat.description}
                </p>
                <Button variant="outline" className="w-full border-slate-700 hover:border-cyan-500 hover:text-cyan-400">
                  Explorar
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsCategoriesSection;
