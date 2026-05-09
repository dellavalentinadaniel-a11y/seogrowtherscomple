
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResourcesCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/40 to-purple-900/40"></div>
      <div className="absolute inset-0 bg-[#0C0D0D]/50 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block p-3 rounded-full bg-white/5 border border-white/10 mb-6 animate-bounce">
           <MessageSquare className="text-cyan-400" size={32} />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Necesitas ayuda personalizada?</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Nuestros expertos están listos para asesorarte y ayudarte a implementar estas herramientas en tu negocio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-6 rounded-full text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all">
              Agendar Consulta
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="border-white/20 bg-white/5 text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-full text-lg">
              Contactar Soporte <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesCTA;
