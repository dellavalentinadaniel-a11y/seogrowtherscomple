
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const avatars = [
    { id: 1, url: '/images/Diseño sin título (2)/1.webp' },
    { id: 2, url: '/images/Diseño sin título (2)/2.webp' },
    { id: 3, url: '/images/Diseño sin título (2)/3.webp' },
    { id: 4, url: '/images/Diseño sin título (2)/4.webp' },
    { id: 5, url: '/images/Diseño sin título (2)/5.webp' },
    { id: 6, url: '/images/Diseño sin título (2)/6.webp' },
    { id: 7, url: '/images/Diseño sin título (2)/7.webp' },
    { id: 8, url: '/images/Diseño sin título (2)/8.webp' },
    { id: 9, url: '/images/Diseño sin título (2)/9.webp' },
    { id: 10, url: '/images/Diseño sin título (2)/10.webp' },
    { id: 11, url: '/images/Diseño sin título (2)/11.webp' },
    { id: 12, url: '/images/Diseño sin título (2)/12.webp' },
    { id: 13, url: '/images/Diseño sin título (2)/13.webp' },
];

const AvatarSelector = ({ currentAvatar, onSelect, onSave, isSaving }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {avatars.map((avatar) => (
                    <motion.button
                        key={avatar.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(avatar.url)}
                        className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all ${
                            currentAvatar === avatar.url 
                            ? 'border-cyan-500 ring-2 ring-cyan-500/20' 
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                    >
                        <img 
                            src={avatar.url} 
                            alt={`Avatar ${avatar.id}`} 
                            className="w-full h-full object-cover scale-[1.35]"
                        />
                        {currentAvatar === avatar.url && (
                            <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                                <div className="bg-cyan-500 text-slate-950 p-1 rounded-full">
                                    <Check size={16} strokeWidth={3} />
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
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl"
                >
                    {isSaving ? 'Guardando...' : 'Confirmar Avatar'}
                </Button>
            </div>
        </div>
    );
};

export default AvatarSelector;
