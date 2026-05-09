import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const ImageUploadModal = ({ isOpen, onClose, onImageSelected, requireAlt = false }) => {
  const [activeTab, setActiveTab] = useState('upload'); 
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [url, setUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({ title: 'Error', description: 'La imagen no debe superar los 5MB', variant: 'destructive' });
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      toast({ title: 'Error', description: 'Por favor selecciona un archivo de imagen válido', variant: 'destructive' });
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const handleUpload = async () => {
    if (!file) return;
    if (requireAlt && !altText) {
        toast({ title: "Falta Alt Text", description: "El texto alternativo es obligatorio.", variant: "destructive" });
        return;
    }
    setLoading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from('article-images').upload(fileName, file);

      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage.from('article-images').getPublicUrl(fileName);
      
      onImageSelected(publicUrl, altText);
      onClose();
      resetForm();
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Error al subir la imagen', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!url) return;
     if (requireAlt && !altText) {
        toast({ title: "Falta Alt Text", description: "El texto alternativo es obligatorio.", variant: "destructive" });
        return;
    }
    onImageSelected(url, altText);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFile(null);
    setPreview('');
    setUrl('');
    setAltText('');
    setActiveTab('upload');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Insertar Imagen</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 mb-4 border-b border-slate-800 pb-2">
          <button
            className={`text-sm pb-2 px-2 transition-colors ${activeTab === 'upload' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('upload')}
          >
            Subir Archivo
          </button>
          <button
            className={`text-sm pb-2 px-2 transition-colors ${activeTab === 'url' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('url')}
          >
            Desde URL
          </button>
        </div>

        {activeTab === 'upload' ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors cursor-pointer relative">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Upload size={32} />
                <span className="text-sm">Arrastra una imagen o haz clic para seleccionar</span>
                <span className="text-xs text-gray-500">Max 5MB (JPG, PNG, WEBP)</span>
              </div>
            </div>
            {preview && (
              <div className="relative rounded-lg overflow-hidden h-40 bg-black/50">
                <img src={preview} alt="Preview" className="w-full h-full object-contain" />
              </div>
            )}
            
            {requireAlt && (
                <div>
                    <Label htmlFor="altText">Texto Alternativo (Obligatorio)</Label>
                    <Input 
                        id="altText"
                        value={altText}
                        onChange={(e) => setAltText(e.target.value)}
                        placeholder="Descripción de la imagen"
                        className="bg-slate-800 border-slate-700 mt-1"
                    />
                </div>
            )}

            <Button onClick={handleUpload} disabled={!file || loading} className="w-full bg-cyan-600 hover:bg-cyan-700">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subiendo...</> : 'Insertar Imagen'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL de la imagen</Label>
              <Input
                id="imageUrl"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            {requireAlt && (
                <div>
                    <Label htmlFor="urlAltText">Texto Alternativo (Obligatorio)</Label>
                    <Input 
                        id="urlAltText"
                        value={altText}
                        onChange={(e) => setAltText(e.target.value)}
                        placeholder="Descripción de la imagen"
                        className="bg-slate-800 border-slate-700 mt-1"
                    />
                </div>
            )}
            <Button onClick={handleUrlSubmit} disabled={!url} className="w-full bg-cyan-600 hover:bg-cyan-700">
              Insertar URL
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;