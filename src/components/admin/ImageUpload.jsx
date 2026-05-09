import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const ImageUpload = ({ value, altValue, onChange, onAltChange, className, bucket = 'article-images' }) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;
    
    // Validations
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Error", description: "El archivo excede los 5MB.", variant: "destructive" });
      return;
    }
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      toast({ title: "Error", description: "Formato no soportado. Usa JPG, PNG o WEBP.", variant: "destructive" });
      return;
    }

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(publicUrl);
      toast({ title: "Éxito", description: "Imagen subida correctamente." });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({ title: "Error", description: "No se pudo subir la imagen.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (onAltChange) onAltChange('');
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Label className="text-white">Imagen Destacada</Label>
      
      {!value ? (
        <div 
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors relative cursor-pointer",
            dragActive ? "border-cyan-500 bg-cyan-500/10" : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept="image/jpeg,image/png,image/webp"
            disabled={uploading}
          />
          <div className="flex flex-col items-center gap-2 text-gray-400">
            {uploading ? (
              <Loader2 className="animate-spin h-10 w-10 text-cyan-500" />
            ) : (
              <Upload className="h-10 w-10" />
            )}
            <p className="text-sm font-medium">
              {uploading ? "Subiendo..." : "Arrastra una imagen o haz clic para subir"}
            </p>
            <p className="text-xs text-gray-500">JPG, PNG, WEBP (Max 5MB)</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border border-slate-700 group bg-black/40">
            <img src={value} alt="Preview" className="w-full h-48 object-contain" />
            <div className="absolute top-2 right-2">
              <Button 
                type="button" 
                variant="destructive" 
                size="icon" 
                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemove}
              >
                <X size={14} />
              </Button>
            </div>
          </div>
          
          {onAltChange && (
            <div>
              <Label htmlFor="alt-text" className="text-xs text-gray-400 mb-1 block">Texto Alternativo (SEO)</Label>
              <Input 
                id="alt-text"
                value={altValue || ''} 
                onChange={(e) => onAltChange(e.target.value)} 
                placeholder="Describe la imagen para accesibilidad..."
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;