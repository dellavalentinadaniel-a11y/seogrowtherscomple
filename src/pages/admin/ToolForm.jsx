import React from 'react';
import GenericForm from '@/components/admin/GenericForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ToolForm = () => {
  const ToolFields = (formData, setFormData) => (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
      <h3 className="font-semibold text-white border-b border-slate-700 pb-2">Detalles de la Herramienta</h3>
      <div>
        <Label>URL de la Herramienta</Label>
        <Input 
          value={formData.url || ''}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          className="bg-slate-800 border-slate-700 text-white mt-1"
          placeholder="https://..."
        />
      </div>
      <div>
        <Label>Modelo de Precio</Label>
        <Select 
            value={formData.price_model || ''} 
            onValueChange={(val) => setFormData({...formData, price_model: val})}
        >
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                <SelectValue placeholder="Selecciona modelo" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-white border-slate-700">
                <SelectItem value="free">Gratis</SelectItem>
                <SelectItem value="freemium">Freemium</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
            </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <GenericForm 
      title="Herramienta"
      tableName="blog_tools"
      basePath="/admin/tools"
      categoryType="tool"
      additionalFields={ToolFields}
    />
  );
};

export default ToolForm;