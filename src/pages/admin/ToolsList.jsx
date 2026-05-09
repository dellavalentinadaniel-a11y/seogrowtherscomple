import React from 'react';
import GenericList from '@/components/admin/GenericList';

const ToolsList = () => {
  const columns = [
    { header: 'Herramienta', accessor: 'title', render: (item) => <span className="font-medium text-white">{item.title}</span> },
    { header: 'Modelo', accessor: 'price_model', render: (item) => <span className="uppercase text-xs text-gray-500">{item.price_model || '-'}</span> },
    { header: 'Estado', accessor: 'status', render: (item) => (
      <span className={`px-2 py-1 rounded text-xs ${item.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
        {item.status === 'published' ? 'Publicado' : 'Borrador'}
      </span>
    )}
  ];

  return (
    <GenericList 
      title="Herramientas"
      description="Directorio de herramientas recomendadas."
      tableName="blog_tools"
      basePath="/admin/tools"
      columns={columns}
      createLabel="Nueva Herramienta"
    />
  );
};

export default ToolsList;