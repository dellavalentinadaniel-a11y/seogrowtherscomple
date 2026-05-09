
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, RefreshCcw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkeletonLoader from '@/components/shared/SkeletonLoader';

const TeamMemberCard = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="group bg-[#111827] rounded-xl overflow-hidden border border-slate-800 hover:border-[#00d9ff]/50 transition-all duration-300"
  >
    <div className="relative overflow-hidden aspect-[4/3]">
      <img 
        src={member.avatar_url || `https://ui-avatars.com/api/?name=${member.name}&background=0D8ABC&color=fff`} 
        alt={member.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent opacity-80"></div>
    </div>
    
    <div className="p-6 relative">
      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
      <p className="text-[#00d9ff] text-sm font-medium mb-4">{member.role}</p>
      <p className="text-gray-400 text-sm mb-6 line-clamp-3">{member.bio}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {member.linkedin_url && (
            <a href={member.linkedin_url} className="text-gray-400 hover:text-[#00d9ff] transition-colors"><Linkedin size={18} /></a>
          )}
          {member.twitter_url && (
            <a href={member.twitter_url} className="text-gray-400 hover:text-[#00d9ff] transition-colors"><Twitter size={18} /></a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-[#00d9ff] transition-colors"><Mail size={18} /></a>
          )}
        </div>
        <Button size="sm" variant="outline" className="border-[#00d9ff]/30 text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black">
          Conectar
        </Button>
      </div>
    </div>
  </motion.div>
);

const TeamSection = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTeam = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
         // Use dummy data if no DB data
         setTeam([
          { id: 1, name: "Ana García", role: "CEO & Fundadora", bio: "Experta en estrategia digital con 10 años liderando equipos.", avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2", linkedin_url: "#", twitter_url: "#" },
          { id: 2, name: "Carlos Ruiz", role: "Director de Tecnología", bio: "Arquitecto de software apasionado por la escalabilidad.", avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a", linkedin_url: "#", email: "carlos@example.com" },
          { id: 3, name: "Laura Méndez", role: "Head of Marketing", bio: "Especialista en Growth Hacking y SEO.", avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956", linkedin_url: "#", twitter_url: "#" }
         ]);
      } else {
         setTeam(data);
      }
    } catch (err) {
      console.error("Error fetching team:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <section className="py-20 bg-[#0a0e27]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Conoce a nuestro equipo</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Personas apasionadas detrás de cada proyecto exitoso.</p>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center p-8 bg-red-500/10 rounded-xl border border-red-500/30 max-w-lg mx-auto">
             <AlertTriangle className="text-red-500 mb-4 h-12 w-12" />
             <p className="text-red-400 mb-4 text-center">Hubo un problema al cargar los miembros del equipo. Por favor, intenta de nuevo.</p>
             <Button onClick={fetchTeam} variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
               <RefreshCcw className="mr-2 h-4 w-4" /> Reintentar
             </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-[#111827] rounded-xl overflow-hidden h-96 border border-slate-800">
                  <SkeletonLoader className="w-full h-48" />
                  <div className="p-6 space-y-4">
                    <SkeletonLoader className="w-3/4 h-6" />
                    <SkeletonLoader className="w-1/2 h-4" />
                    <SkeletonLoader className="w-full h-16" />
                  </div>
                </div>
              ))
            ) : (
              team.map(member => (
                <TeamMemberCard key={member.id} member={member} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
