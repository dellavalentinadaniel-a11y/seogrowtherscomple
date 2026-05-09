import React from 'react';
import GenericList from '@/components/admin/GenericList';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ArticlesList = () => {
  const columns = [
    { header: 'Título', accessor: 'title', render: (item) => (
      <div>
        <p className="font-medium text-white">{item.title}</p>
        <p className="text-xs text-gray-500">/{item.slug}</p>
      </div>
    )},
    { header: 'Estado', accessor: 'status', render: (item) => (
      <span className={`px-2 py-1 rounded text-xs ${item.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
        {item.status === 'published' ? 'Publicado' : 'Borrador'}
      </span>
    )},
    { header: 'Fecha', accessor: 'created_at', render: (item) => (item.published_at || item.created_at) ? format(new Date(item.published_at || item.created_at), 'd MMM yyyy', { locale: es }) : '-' }
  ];

  const publishCluster = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Error", description: "Debes estar logueado para publicar.", variant: "destructive" });
      return;
    }

    const cluster = [
      {
        title: 'Crianza Neural: El manual de supervivencia para padres 2026',
        slug: 'crianza-era-digital-2026',
        content: '<h2>Introducción</h2><p>Estamos en una encrucijada biológica. Por primera vez en la historia, la evolución del cerebro infantil compite directamente con ingenieros de Silicon Valley diseñando interfaces para retener la atención. No es una batalla justa, pero es una que podemos ganar.</p><h3>Los 3 Pilares de la Crianza Neural</h3><ol><li><strong>Entendimiento Neurobiológico:</strong> El cerebro de tu hijo no está "adicto", sino "biológicamente secuestrado".</li><li><strong>Disciplina sin Conflicto:</strong> Establecer límites no significa declarar la guerra.</li><li><strong>Alternativas de Valor:</strong> El cerebro odia el vacío.</li></ol>',
        status: 'published',
        author_id: user.id,
        created_at: new Date().toISOString()
      },
      {
        title: 'El Circuito de la Recompensa: Dopamina en el Cerebro Infantil',
        slug: 'dopamina-cerebro-infantil',
        content: '<p>¿Por qué tu hijo se transforma cuando le pides que apague la tablet? La respuesta no está en su "mala conducta", sino en el pico y caída de la dopamina.</p>',
        status: 'published',
        author_id: user.id,
        created_at: new Date().toISOString()
      },
      {
        title: 'Límites sin Gritos: Disciplina Positiva para el Consumo Tecnológico',
        slug: 'disciplina-digital-positiva',
        content: '<p>La disciplina positiva propone la "anticipación" y el "contrato digital". No se trata de prohibir, sino de jerarquizar el tiempo.</p>',
        status: 'published',
        author_id: user.id,
        created_at: new Date().toISOString()
      },
      {
        title: '67 Formas de Desconectar: El Manual de Supervivencia Analógica',
        slug: 'actividades-desconexion-digital',
        content: '<p>¿Qué hacer cuando el aburrimiento ataca? Presentamos una lista curada de actividades que van desde el Geocaching urbano hasta la arquitectura con cajas de cartón.</p>',
        status: 'published',
        author_id: user.id,
        created_at: new Date().toISOString()
      }
    ];

    try {
      const { error } = await supabase.from('articles').insert(cluster);
      if (error) throw error;
      toast({ title: "¡Éxito!", description: "Cluster de Crianza Neural publicado correctamente." });
      window.location.reload();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end pr-4">
        <Button 
          variant="outline" 
          onClick={publishCluster}
          className="bg-purple-600/20 border-purple-500/50 text-purple-300 hover:bg-purple-600 hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        >
          ✨ Publicación Mágica: Cluster Crianza
        </Button>
      </div>
      <GenericList 
        title="Artículos del Blog"
        description="Gestiona los artículos de contenido principal."
        tableName="articles"
        basePath="/admin/articles"
        columns={columns}
        createLabel="Nuevo Artículo"
      />
    </div>
  );
};

export default ArticlesList;