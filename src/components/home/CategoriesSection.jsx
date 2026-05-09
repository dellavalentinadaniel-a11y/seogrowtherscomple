
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Folder, BookOpen, Layout, Wrench, Video, FileText, Library } from 'lucide-react';

const iconMap = {
  'BookOpen': BookOpen,
  'Layout': Layout,
  'Wrench': Wrench,
  'Video': Video,
  'FileText': FileText,
  'Library': Library,
  'default': Folder
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await supabase.from('resource_categories').select('id, name, description, icon, count').order('name');
      if (data) setCategories(data);
    };
    fetchCats();
  }, []);

  return (
    <section className="py-20 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Explora por Categoría</h2>
          <p className="text-gray-400">Encuentra exactamente lo que necesitas para tu próximo proyecto.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || iconMap['default'];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, borderColor: 'rgba(6,182,212,0.5)' }}
                transition={{ delay: idx * 0.05 }}
                className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl group transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="mb-6 inline-block p-4 rounded-xl bg-slate-800 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                  <Icon size={32} />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                  <span className="text-sm bg-slate-800 text-gray-400 px-2 py-1 rounded-md">{cat.count} recursos</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 h-10 line-clamp-2">
                  {cat.description}
                </p>
                <Button variant="ghost" className="p-0 text-cyan-400 hover:text-cyan-300 hover:bg-transparent flex items-center gap-2 group/btn">
                  Explorar <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
