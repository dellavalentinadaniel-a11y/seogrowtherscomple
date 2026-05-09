import React from 'react';
import GenericList from '@/components/admin/GenericList';

const ResourcesList = () => {
  const columns = [
    { header: 'Recurso', accessor: 'title', render: (item) => <span className="font-medium text-white">{item.title}</span> },
    { header: 'Estado', accessor: 'status', render: (item) => (
      <span className={`px-2 py-1 rounded text-xs ${item.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
        {item.status === 'published' ? 'Publicado' : 'Borrador'}
      </span>
    )}
  ];

  return (
    <GenericList 
      title="Recursos"
      description="Biblioteca de recursos descargables o externos."
      tableName="blog_resources"
      basePath="/admin/resources"
      columns={columns}
      createLabel="Nuevo Recurso"
    />
  );
};

export default ResourcesList;