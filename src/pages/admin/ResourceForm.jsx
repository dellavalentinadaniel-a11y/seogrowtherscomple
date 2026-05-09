import React from 'react';
import GenericForm from '@/components/admin/GenericForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ResourceForm = () => {
  const ResourceFields = (formData, setFormData) => (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
      <h3 className="font-semibold text-white border-b border-slate-700 pb-2">Detalles del Recurso</h3>
      <div>
        <Label>URL de Descarga / Acceso</Label>
        <Input 
          value={formData.download_url || ''}
          onChange={(e) => setFormData({...formData, download_url: e.target.value})}
          className="bg-slate-800 border-slate-700 text-white mt-1"
          placeholder="https://..."
        />
      </div>
    </div>
  );

  return (
    <GenericForm 
      title="Recurso"
      tableName="blog_resources"
      basePath="/admin/resources"
      categoryType="resource"
      additionalFields={ResourceFields}
    />
  );
};

export default ResourceForm;