
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-r from-[#00d9ff] to-[#7c3aed]">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          ¿Listo para comenzar?
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 font-medium">
          Contáctanos hoy y descubre cómo podemos ayudarte a escalar tu negocio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-6 rounded-full text-lg shadow-xl animate-pulse"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Enviar Mensaje <ArrowRight className="ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white/10 font-bold px-8 py-6 rounded-full text-lg"
          >
            <Phone className="mr-2 h-5 w-5" /> Agendar Llamada
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
