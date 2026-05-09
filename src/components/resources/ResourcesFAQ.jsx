
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "¿Son gratuitos los recursos?", a: "Sí, la mayoría de nuestras guías y plantillas son completamente gratuitas. Algunas herramientas premium pueden requerir una suscripción." },
  { q: "¿Cómo descargo los archivos?", a: "Simplemente haz clic en el botón 'Descargar' en la tarjeta del recurso. Si es un archivo protegido, te pediremos tu email." },
  { q: "¿Puedo usar las plantillas para mis clientes?", a: "Absolutamente. Todas nuestras plantillas tienen licencia comercial para uso en proyectos propios y de clientes." },
  { q: "¿Con qué frecuencia publican nuevos recursos?", a: "Publicamos nuevas guías y herramientas semanalmente. Suscríbete a nuestro newsletter para no perderte nada." },
  { q: "¿Ofrecen soporte para las herramientas?", a: "Sí, ofrecemos soporte básico por email para todas nuestras herramientas gratuitas y soporte prioritario para las premium." },
  { q: "¿Puedo sugerir un tema para un webinar?", a: "¡Por supuesto! Nos encanta escuchar a nuestra comunidad. Envíanos tus sugerencias a través del formulario de contacto." }
];

const ResourcesFAQ = () => {
  return (
    <section className="py-20 bg-[#0a0e27]">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Preguntas Frecuentes sobre Recursos</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border border-slate-800 rounded-xl px-6 bg-slate-900/50">
              <AccordionTrigger className="text-white hover:text-cyan-400 text-lg font-medium text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ResourcesFAQ;
