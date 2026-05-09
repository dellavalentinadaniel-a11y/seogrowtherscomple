import React from 'react';
import GenericList from '@/components/admin/GenericList';
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

  return (
    <GenericList
      title="Artículos del Blog"
      description="Gestiona los artículos de contenido principal."
      tableName="articles"
      basePath="/admin/articles"
      columns={columns}
      createLabel="Nuevo Artículo"
    />
  );
};

export default ArticlesList;