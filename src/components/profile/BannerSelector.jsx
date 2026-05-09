
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const banners = [
    { id: 1, url: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1920&auto=format&fit=crop', label: 'Neural Mesh' },
    { id: 2, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920&auto=format&fit=crop', label: 'Tech Hardware' },
    { id: 3, url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1920&auto=format&fit=crop', label: 'Abstract Flow' },
    { id: 4, url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1920&auto=format&fit=crop', label: 'Cyber Gradient' },
    { id: 5, url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop', label: 'Deep Space' },
    { id: 6, url: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1920&auto=format&fit=crop', label: 'Code Matrix' },
];

const BannerSelector = ({ currentBanner, onSelect, onSave, isSaving }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {banners.map((banner) => (
                    <motion.button
                        key={banner.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(banner.url)}
                        className={`relative rounded-xl overflow-hidden aspect-[3/1] border-2 transition-all ${
                            currentBanner === banner.url 
                            ? 'border-cyan-500 ring-2 ring-cyan-500/20' 
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                    >
                        <img 
                            src={banner.url} 
                            alt={banner.label} 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute bottom-2 left-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                                {banner.label}
                            </span>
                        </div>
                        {currentBanner === banner.url && (
                            <div className="absolute inset-0 bg-cyan-500/10 flex items-center justify-center">
                                <div className="bg-cyan-500 text-slate-950 p-1.5 rounded-full shadow-lg">
                                    <Check size={20} strokeWidth={3} />
                                </div>
                            </div>
                        )}
                    </motion.button>
                ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button 
                    onClick={onSave} 
                    disabled={isSaving}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl w-full sm:w-auto"
                >
                    {isSaving ? 'Guardando...' : 'Establecer Cabecera'}
                </Button>
            </div>
        </div>
    );
};

export default BannerSelector;
