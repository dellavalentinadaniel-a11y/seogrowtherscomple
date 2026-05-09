
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { CheckCircle, Trophy, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const CompleteGuideButton = ({ guideId }) => {
    const [status, setStatus] = useState('idle'); // idle, loading, completed
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkStatus();
    }, [guideId]);

    const checkStatus = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setUser(user);

        const { data } = await supabase
            .from('user_guides_progress')
            .select('id')
            .eq('user_id', user.id)
            .eq('guide_id', guideId)
            .maybeSingle();
        
        if (data) setStatus('completed');
    };

    const handleComplete = async () => {
        if (!user) {
            toast({
                title: "Inicia sesión",
                description: "Debes estar logueado para registrar tu progreso y ganar XP.",
                variant: "destructive"
            });
            return;
        }

        setStatus('loading');
        try {
            const { error } = await supabase
                .from('user_guides_progress')
                .insert([{ user_id: user.id, guide_id: guideId }]);
            
            if (error) throw error;
            
            setStatus('completed');
            toast({
                title: "¡Guía Completada!",
                description: "Has ganado 100 XP para tu perfil Neural.",
            });
        } catch (error) {
            console.error(error);
            setStatus('idle');
            toast({
                title: "Error",
                description: "No se pudo registrar tu progreso.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="mt-20 py-12 px-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            <AnimatePresence mode="wait">
                {status === 'completed' ? (
                    <motion.div 
                        key="completed"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">¡Misión Cumplida!</h3>
                        <p className="text-slate-400">Has dominado este recurso. Tu conocimiento en la red Neural ha aumentado.</p>
                        <div className="mt-4 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            +100 XP Adquiridos
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="idle"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2">
                            <Trophy size={32} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">¿Has terminado el despliegue?</h3>
                            <p className="text-slate-400">Marca esta guía como completada para registrar tu progreso y subir de rango.</p>
                        </div>
                        <Button 
                            size="lg"
                            onClick={handleComplete}
                            disabled={status === 'loading'}
                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl px-10 h-14 text-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all flex items-center gap-3"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    Finalizar Misión
                                    <Trophy size={20} />
                                </>
                            )}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CompleteGuideButton;
