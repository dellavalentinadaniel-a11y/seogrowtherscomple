
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "¿Cuál es el tiempo de respuesta?", a: "Nuestro equipo se compromete a responder a todas las consultas en un plazo máximo de 24 horas laborales." },
  { q: "¿Ofrecen consulta gratuita?", a: "Sí, ofrecemos una consulta inicial gratuita de 30 minutos para evaluar tus necesidades y ver cómo podemos ayudarte." },
  { q: "¿Cuál es el horario de atención?", a: "Nuestro horario de atención al cliente es de lunes a viernes de 9:00 a 18:00 (hora local)." },
  { q: "¿Puedo agendar una llamada?", a: "Por supuesto. Puedes utilizar nuestro calendario online o llamarnos directamente para agendar una reunión." },
  { q: "¿Qué información debo proporcionar?", a: "Para acelerar el proceso, indícanos tu nombre, empresa y una breve descripción de tu proyecto o consulta." },
  { q: "¿Cómo se protegen mis datos?", a: "Tomamos la seguridad muy en serio. Todos tus datos se almacenan de forma segura y cumplimos con el RGPD." },
  { q: "¿Ofrecen soporte después de contratar?", a: "Sí, ofrecemos diferentes planes de soporte y mantenimiento post-lanzamiento para asegurar el éxito continuo." },
  { q: "¿Cuáles son los métodos de pago?", a: "Aceptamos transferencias bancarias, tarjetas de crédito y plataformas como Stripe o PayPal según el proyecto." }
];

const ContactFAQ = () => {
  return (
    <section className="py-20 bg-[#0a0e27]">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Preguntas Frecuentes</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border border-slate-800 rounded-xl px-6 bg-slate-900/50">
              <AccordionTrigger className="text-white hover:text-[#00d9ff] text-lg font-medium text-left">
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

export default ContactFAQ;
