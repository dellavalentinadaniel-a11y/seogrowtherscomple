import React from 'react';
import GenericList from '@/components/admin/GenericList';
import { format } from 'date-fns';

const CategoriesList = () => {
  const columns = [
    { header: 'Nombre', accessor: 'name' },
    { header: 'Slug', accessor: 'slug', render: (item) => <code className="text-xs bg-black/30 px-2 py-1 rounded text-cyan-500">{item.slug}</code> },
    { header: 'Tipo', accessor: 'type', render: (item) => <span className="capitalize">{item.type || 'General'}</span> },
    { header: 'Fecha', accessor: 'created_at', render: (item) => format(new Date(item.created_at), 'dd/MM/yyyy') }
  ];

  return (
    <GenericList 
      title="Categorías"
      description="Gestiona las categorías para organizar tu contenido."
      tableName="blog_categories"
      basePath="/admin/categories"
      columns={columns}
      createLabel="Nueva Categoría"
    />
  );
};

export default CategoriesList;