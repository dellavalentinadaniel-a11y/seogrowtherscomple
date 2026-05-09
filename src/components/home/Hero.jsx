import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0C0D0D] pt-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm"
          >
            <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">
              Innovación Digital & Consultoría
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            Transformamos Ideas en <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Experiencias Digitales
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ayudamos a marcas ambiciosas a definir su futuro con estrategias digitales de vanguardia, 
            desarrollo web de alto rendimiento y soluciones de IA.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => navigate('/contact')}
              className="bg-cyan-500 text-black hover:bg-cyan-600 font-bold px-8 py-6 rounded-full text-lg w-full sm:w-auto shadow-lg shadow-cyan-500/25"
            >
              Iniciar Proyecto <ArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate('/portfolio')} // Assuming portfolio route or just anchor
              className="border-slate-700 text-white hover:bg-slate-800 hover:text-cyan-400 font-semibold px-8 py-6 rounded-full text-lg w-full sm:w-auto"
            >
              <Play size={18} className="mr-2 fill-current" /> Ver Demo Reel
            </Button>
          </div>
        </motion.div>

        {/* Floating Elements / Tech Stack Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 border-t border-white/5 pt-12"
        >
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest">Tecnologías que dominamos</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Simple text placeholders for logos for now, or could use icons */}
             {['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind', 'AWS'].map((tech) => (
               <span key={tech} className="text-xl font-bold text-gray-400 hover:text-white transition-colors cursor-default">{tech}</span>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;