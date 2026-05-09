
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import ResourceCard from './ResourceCard';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeatured = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('featured', true)
        .eq('status', 'published')
        .limit(3);
      
      if (error) throw error;
      setResources(data || []);
    } catch (err) {
      console.error(err);
      setError('Error al cargar recursos destacados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12 text-center bg-red-900/20 rounded-xl border border-red-500/30">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={32} />
        <p className="text-red-300 mb-4">{error}</p>
        <Button onClick={fetchFeatured} variant="outline" className="border-red-500 text-red-400 hover:bg-red-950">
          <RefreshCw size={16} className="mr-2" /> Reintentar
        </Button>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-8 w-1 bg-cyan-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-white">Recursos Destacados</h2>
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
            resources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;
