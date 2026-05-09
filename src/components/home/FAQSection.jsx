
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: "¿Cuánto cuesta una auditoría?",
    answer: "El costo de una auditoría varía según el tamaño y complejidad de su sitio web. Ofrecemos una auditoría preliminar gratuita, y planes detallados desde $500 USD."
  },
  {
    question: "¿Cuánto tiempo tarda ver resultados?",
    answer: "El SEO es una estrategia a largo plazo. Generalmente, los cambios técnicos muestran impacto en 2-4 semanas, mientras que las estrategias de contenido y autoridad toman de 3 a 6 meses para madurar."
  },
  {
    question: "¿Qué incluye el servicio?",
    answer: "Nuestros servicios incluyen análisis técnico, investigación de palabras clave, optimización on-page, estrategia de contenidos, link building y reportes mensuales detallados."
  },
  {
    question: "¿Cómo es el proceso?",
    answer: "Comenzamos con una reunión de descubrimiento, seguida de una auditoría profunda. Luego presentamos un plan de acción, ejecutamos las optimizaciones y realizamos seguimiento continuo."
  },
  {
    question: "¿Ofrecen soporte continuo?",
    answer: "Sí, todos nuestros planes incluyen soporte prioritario vía email y reuniones mensuales de seguimiento para revisar KPIs y ajustar estrategias."
  },
  {
    question: "¿Cuál es el ROI esperado?",
    answer: "Nuestros clientes suelen ver un ROI de entre 3x y 10x en su inversión durante el primer año, dependiendo de la industria y el estado inicial del proyecto."
  }
];

const FAQSection = () => {
  // Generate JSON-LD for FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-24 bg-[#0a0e27] border-t border-white/5">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Preguntas <span className="text-cyan-400">Frecuentes</span>
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-slate-800 rounded-xl px-6 bg-slate-900/30">
              <AccordionTrigger className="text-white hover:text-cyan-400 text-lg font-medium text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
