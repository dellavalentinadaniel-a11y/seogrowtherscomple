
import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AVAILABLE_SKILLS = [
    'SEO Estratégico',
    'Prompt Engineering',
    'Copywriting IA',
    'Growth Hacking',
    'Análisis de Datos',
    'Desarrollo Full-Stack',
    'Marketing Digital',
    'Estrategia de Contenido',
    'Automatización',
    'E-commerce'
];

const SkillsPicker = ({ selectedSkills, onToggle, onSave, isSaving }) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                {AVAILABLE_SKILLS.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                        <motion.button
                            key={skill}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onToggle(skill)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border flex items-center gap-2 ${
                                isSelected
                                ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                            }`}
                        >
                            {isSelected ? <Check size={14} strokeWidth={3} /> : <Tag size={14} />}
                            {skill}
                        </motion.button>
                    );
                })}
            </div>

            <p className="text-[10px] text-slate-500 italic">
                * Selecciona las habilidades que mejor describen tu perfil en el ecosistema Neural.
            </p>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button 
                    onClick={onSave} 
                    disabled={isSaving}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl w-full sm:w-auto"
                >
                    {isSaving ? 'Guardando...' : 'Actualizar Habilidades'}
                </Button>
            </div>
        </div>
    );
};

export default SkillsPicker;
