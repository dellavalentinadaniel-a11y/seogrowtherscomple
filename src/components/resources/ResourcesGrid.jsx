
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import ResourceCard from './ResourceCard';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';

const PAGE_SIZE = 12;

const ResourcesGrid = ({ category, searchTerm }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const { ref, inView } = useInView();

  // Reset and fetch when filters change
  useEffect(() => {
    setResources([]);
    setPage(0);
    setHasMore(true);
    fetchResources(0, true);
  }, [category, searchTerm]);

  // Load more when scrolling
  useEffect(() => {
    if (inView && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchResources(nextPage, false);
    }
  }, [inView, hasMore, loading]);

  const fetchResources = async (pageIndex, isReset) => {
    setLoading(true);
    try {
      let query = supabase
        .from('resources')
        .select('id, title, description, image, category, link, featured, status, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .range(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE - 1);

      if (category && category !== 'TODO') {
        query = query.eq('category', category);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;

      if (isReset) {
        setResources(data || []);
      } else {
        setResources(prev => [...prev, ...(data || [])]);
      }

      if ((data || []).length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {resources.map((res) => (
          <ResourceCard key={res.id} resource={res} />
        ))}
        
        {loading && [1, 2, 3].map(i => (
          <div key={i} className="bg-slate-900/40 rounded-xl overflow-hidden border border-slate-800 h-[400px]">
            <SkeletonLoader className="w-full aspect-[4/3]" />
            <div className="p-6 space-y-4">
              <SkeletonLoader className="h-6 w-3/4" />
              <SkeletonLoader className="h-4 w-full" />
              <SkeletonLoader className="h-10 w-full rounded-md mt-6" />
            </div>
          </div>
        ))}
      </div>

      {!loading && resources.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No se encontraron recursos que coincidan con tu búsqueda.
        </div>
      )}

      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          {loading && <Loader2 className="animate-spin text-cyan-400" />}
        </div>
      )}
    </div>
  );
};

export default ResourcesGrid;
