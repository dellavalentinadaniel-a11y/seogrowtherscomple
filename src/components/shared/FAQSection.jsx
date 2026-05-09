import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQSection = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

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
    <>
      {/* Marcado Schema.org enriquecido para Resultados de Búsqueda de Google */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />

      <section aria-labelledby="faq-title" className="w-full mt-16 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-xl relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <HelpCircle className="w-64 h-64 text-cyan-400" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 id="faq-title" className="text-2xl md:text-3xl font-extrabold text-white">Preguntas Frecuentes</h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-xl transition-colors duration-300 ${isOpen ? 'border-cyan-500/50 bg-slate-800/50' : 'border-slate-800 bg-slate-900 hover:bg-slate-800/50'}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex justify-between items-center p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl"
                >
                  <h3 className={`font-bold pr-8 transition-colors text-base md:text-lg m-0 ${isOpen ? 'text-cyan-400' : 'text-gray-200'}`}>
                    {faq.question}
                  </h3>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-gray-500'}`}>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-gray-400 leading-relaxed text-sm md:text-base border-t border-slate-800/50 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
};

export default FAQSection;
