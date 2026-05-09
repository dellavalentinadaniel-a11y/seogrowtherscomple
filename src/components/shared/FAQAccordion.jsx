import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({
  items = [
    {
      id: '1',
      question: '¿Cuál es el costo del servicio?',
      answer: 'El costo varía según el alcance del proyecto. Ofrecemos consultas gratuitas para determinar el mejor plan para tu negocio.'
    },
    {
      id: '2',
      question: '¿Cuánto tiempo toma ver resultados?',
      answer: 'Los resultados en SEO generalmente se ven entre 3-6 meses, dependiendo de la competencia de tu industria y el estado actual de tu sitio.'
    },
    {
      id: '3',
      question: '¿Qué incluye el servicio de auditoría SEO?',
      answer: 'Incluye análisis técnico, auditoría de palabras clave, análisis de competencia, y un reporte detallado con recomendaciones.'
    },
  ],
  className = '',
  variant = 'default'
}) => {
  const [expanded, setExpanded] = useState(null);

  const toggleItem = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const baseStyles = {
    default: {
      container: 'space-y-3',
      item: 'border border-outline-variant/20 rounded-xl overflow-hidden bg-surface-container-low hover:bg-surface-container-high transition-colors',
      button: 'w-full px-6 py-4 flex items-center justify-between text-left font-medium text-on-surface hover:text-primary transition-colors',
      chevron: 'w-5 h-5 transition-transform duration-300',
      answerContainer: 'overflow-hidden transition-all duration-300',
      answer: 'px-6 py-4 text-on-surface-variant leading-relaxed border-t border-outline-variant/10'
    },
    minimal: {
      container: 'space-y-2',
      item: 'border-b border-outline-variant/10 last:border-b-0',
      button: 'w-full px-0 py-3 flex items-center justify-between text-left font-medium text-on-surface hover:text-primary transition-colors',
      chevron: 'w-5 h-5 transition-transform duration-300',
      answerContainer: 'overflow-hidden transition-all duration-300',
      answer: 'px-0 py-3 text-on-surface-variant leading-relaxed'
    },
    bordered: {
      container: 'space-y-4',
      item: 'border-l-4 border-primary-container bg-primary-container/5 rounded-r-lg overflow-hidden',
      button: 'w-full px-6 py-5 flex items-center justify-between text-left font-medium text-on-surface hover:text-primary transition-colors',
      chevron: 'w-5 h-5 transition-transform duration-300 text-primary-container',
      answerContainer: 'overflow-hidden transition-all duration-300',
      answer: 'px-6 py-4 text-on-surface-variant leading-relaxed bg-white/2'
    }
  };

  const styles = baseStyles[variant] || baseStyles.default;

  return (
    <div className={`${styles.container} ${className}`}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <button
            onClick={() => toggleItem(item.id)}
            className={styles.button}
            aria-expanded={expanded === item.id}
            aria-controls={`faq-answer-${item.id}`}
          >
            <span className="flex-1 pr-4">{item.question}</span>
            <ChevronDown
              className={`${styles.chevron} ${
                expanded === item.id ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
          <div
            id={`faq-answer-${item.id}`}
            className={styles.answerContainer}
            style={{
              maxHeight: expanded === item.id ? '500px' : '0px',
            }}
          >
            <div className={styles.answer}>
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
