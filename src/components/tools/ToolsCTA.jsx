
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ToolsCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-r from-cyan-900/20 to-purple-900/20">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿No encuentras lo que buscas?</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Nuestro equipo puede ayudarte a encontrar la herramienta perfecta para tus necesidades específicas.
        </p>

        <Link to="/contact">
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-6 rounded-full text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
            Contactar Soporte <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ToolsCTA;
