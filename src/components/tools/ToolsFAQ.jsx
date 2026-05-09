
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ToolsFAQ = () => {
  return (
    <section className="py-20 bg-[#0a0e27]">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Preguntas Frecuentes</h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border border-slate-800 rounded-xl px-6 bg-slate-900/50">
            <AccordionTrigger className="text-white hover:text-cyan-400 text-lg font-medium text-left">
              ¿Son gratuitas estas herramientas?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 text-base pb-4">
              Nuestra lista incluye herramientas gratuitas, de pago y modelos freemium. Indicamos el precio en cada tarjeta.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border border-slate-800 rounded-xl px-6 bg-slate-900/50">
            <AccordionTrigger className="text-white hover:text-cyan-400 text-lg font-medium text-left">
              ¿Cómo seleccionan las herramientas destacadas?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 text-base pb-4">
              Basamos nuestra selección en popularidad, reseñas de usuarios y pruebas internas de nuestro equipo.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border border-slate-800 rounded-xl px-6 bg-slate-900/50">
            <AccordionTrigger className="text-white hover:text-cyan-400 text-lg font-medium text-left">
              ¿Puedo sugerir una herramienta?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 text-base pb-4">
              ¡Sí! Nos encanta descubrir nuevas herramientas. Contáctanos a través del formulario para enviar tu sugerencia.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default ToolsFAQ;
