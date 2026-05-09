
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import ToolCard from './ToolCard';
import SkeletonLoader from '@/components/shared/SkeletonLoader';

const FeaturedTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await supabase
          .from('tools')
          .select('id, name, slug, description, image, category, price, rating, users_count, link, features, featured')
          .eq('featured', true)
          .eq('status', 'published')
          .limit(3);
        
        if (data) setTools(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-16 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-8 w-1 bg-cyan-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-white">Herramientas Destacadas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-[450px] rounded-xl overflow-hidden bg-slate-900/40 border border-slate-800">
                <SkeletonLoader className="w-full aspect-[4/3]" />
                <div className="p-6 space-y-4">
                  <SkeletonLoader className="h-6 w-3/4" />
                  <SkeletonLoader className="h-4 w-full" />
                  <SkeletonLoader className="h-4 w-2/3" />
                  <SkeletonLoader className="h-10 w-full rounded-md mt-6" />
                </div>
              </div>
            ))
          ) : (
            tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
