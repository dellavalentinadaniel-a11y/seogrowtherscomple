
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Share2, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InfoCard = ({ icon: Icon, title, content, cta, ctaLink, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 217, 255, 0.15)" }}
    className="bg-[#111827] p-6 rounded-2xl border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all duration-300 flex flex-col items-start h-full"
  >
    <div className="w-12 h-12 rounded-full bg-[#00d9ff]/10 flex items-center justify-center mb-4 text-[#00d9ff]">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <div className="flex-grow mb-6 text-[#a0aec0]">
      {content}
    </div>
    <Button 
      variant="outline" 
      className="border-[#00d9ff]/30 text-[#00d9ff] hover:bg-[#00d9ff]/10 hover:text-[#00d9ff] w-full"
      asChild
    >
      <a href={ctaLink} target={ctaLink.startsWith('http') ? "_blank" : "_self"} rel="noreferrer">
        {cta}
      </a>
    </Button>
  </motion.div>
);

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <InfoCard 
        icon={MapPin}
        title="Ubicación"
        content={
          <div className="space-y-2">
            <p>Calle Principal 123</p>
            <p>28001 Madrid, España</p>
            <div className="mt-2 rounded-lg overflow-hidden h-32 border border-slate-800">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.123456789!2d-3.703790!3d40.416775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sPuerta%20de%20el%20Sol%2C%20Madrid!5e0!3m2!1sen!2ses!4v1600000000000!5m2!1sen!2ses" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy"
                 title="Mapa"
               ></iframe>
            </div>
          </div>
        }
        cta="Ver en Google Maps"
        ctaLink="https://maps.google.com"
        delay={0.1}
      />

      <InfoCard 
        icon={Phone}
        title="Teléfono"
        content={
          <div className="space-y-2">
            <p className="text-lg font-semibold text-white">+34 123 456 789</p>
            <p className="text-sm">Lun-Vie 9:00 - 18:00</p>
            <p className="text-sm">Soporte 24/7 para emergencias</p>
          </div>
        }
        cta="Llamar ahora"
        ctaLink="tel:+34123456789"
        delay={0.2}
      />

      <InfoCard 
        icon={Mail}
        title="Email"
        content={
          <div className="space-y-2">
            <p className="text-lg font-semibold text-white">contacto@seogrowthers.com</p>
            <p className="text-sm">Respondemos en menos de 24 horas</p>
            <p className="text-sm">Soporte: soporte@seogrowthers.com</p>
          </div>
        }
        cta="Enviar email"
        ctaLink="mailto:contacto@seogrowthers.com"
        delay={0.3}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 217, 255, 0.15)" }}
        className="bg-[#111827] p-6 rounded-2xl border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all duration-300 flex flex-col items-start h-full"
      >
        <div className="w-12 h-12 rounded-full bg-[#00d9ff]/10 flex items-center justify-center mb-4 text-[#00d9ff]">
          <Share2 size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">Síguenos</h3>
        <div className="flex gap-4 mb-6">
          {[
            { Icon: Twitter, href: "https://x.com/SEOGrowthers" },
            { Icon: Linkedin, href: "https://www.linkedin.com/company/seogrowthers" },
            { Icon: Instagram, href: "https://www.instagram.com/seogrowthers/" },
            { Icon: Youtube, href: "https://www.youtube.com/@seogrowthers-s4r" }
          ].map(({ Icon, href }, i) => (
            <a 
              key={i} 
              href={href} 
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:text-[#00d9ff] hover:bg-[#00d9ff]/10 hover:shadow-[0_0_10px_#00d9ff] transition-all"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
        <div className="flex-grow"></div>
        <Button 
          variant="outline" 
          className="border-[#00d9ff]/30 text-[#00d9ff] hover:bg-[#00d9ff]/10 hover:text-[#00d9ff] w-full"
        >
          Ver Perfiles
        </Button>
      </motion.div>
    </div>
  );
};

export default ContactInfo;
