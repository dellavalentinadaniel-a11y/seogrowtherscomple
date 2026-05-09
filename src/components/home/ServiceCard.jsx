
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { generateJsonLd } from '@/lib/seoHelpers';
import { Helmet } from 'react-helmet-async';

const ServiceCard = ({ service, index = 0 }) => {
  const navigate = useNavigate();
  const Icon = service.icon;

  const handleContact = () => {
    navigate('/contact');
  };

  const handleLearnMore = () => {
    if (service.slug) {
        navigate(`/services/${service.slug}`);
    } else {
        toast({
            title: "Próximamente 🚧",
            description: "Las páginas detalladas de servicios están en desarrollo.",
        });
    }
  };

  const jsonLd = generateJsonLd('Service', {
    title: service.title,
    description: service.description,
    providerName: 'SEO Growthers',
    offers: service.benefits.map(b => ({ '@type': 'Offer', name: b }))
  });

  return (
    <>
      <Helmet>
         <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
         </script>
      </Helmet>
      
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group h-full"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500 blur-xl`}></div>
        
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 h-full flex flex-col">
          <header className="mb-6">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                <Icon size={32} className="text-white" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {service.title}
            </h3>
          </header>

          <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
            {service.description}
          </p>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-cyan-400 mb-4 uppercase tracking-wider">
              Beneficios incluidos
            </h4>
            <ul className="space-y-3">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                  <Check size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <footer className="border-t border-slate-700 pt-6 mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-white">{service.priceText}</p>
                <p className="text-xs text-gray-500">{service.consultationText}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleContact}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
              >
                <MessageCircle size={16} className="mr-2" />
                Contactar
              </Button>
              <Button 
                onClick={handleLearnMore}
                variant="outline"
                className="flex-1 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
              >
                Más info
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </footer>
        </div>
      </motion.article>
    </>
  );
};

export default ServiceCard;
