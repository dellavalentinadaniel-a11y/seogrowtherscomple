import React from 'react';
import GenericForm from '@/components/admin/GenericForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ArticleForm = () => {
  const SEOCustomFields = (formData, setFormData) => (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
      <h3 className="font-semibold text-white border-b border-slate-700 pb-2">SEO Avanzado</h3>
      <div>
        <Label>SEO Title</Label>
        <Input 
          value={formData.seo_title || ''}
          onChange={(e) => setFormData({...formData, seo_title: e.target.value})}
          className="bg-slate-800 border-slate-700 text-white mt-1"
          placeholder="Título para buscadores"
        />
      </div>
      <div>
        <Label>Meta Description</Label>
        <Input 
          value={formData.seo_description || ''}
          onChange={(e) => setFormData({...formData, seo_description: e.target.value})}
          className="bg-slate-800 border-slate-700 text-white mt-1"
          placeholder="Resumen para SERPs"
        />
      </div>
       <div>
        <Label>Keywords (separadas por comas)</Label>
        <Input 
          value={formData.keywords ? formData.keywords.join(', ') : ''}
          onChange={(e) => setFormData({...formData, keywords: e.target.value.split(',').map(k => k.trim())})}
          className="bg-slate-800 border-slate-700 text-white mt-1"
          placeholder="ia, tecnologia, web"
        />
      </div>
    </div>
  );

  return (
    <GenericForm 
      title="Artículo"
      tableName="articles"
      basePath="/admin/articles"
      categoryType="article"
      additionalFields={SEOCustomFields}
    />
  );
};

export default ArticleForm;