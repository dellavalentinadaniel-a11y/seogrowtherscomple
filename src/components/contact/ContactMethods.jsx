
import React from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MethodCard = ({ icon: Icon, title, description, time, cta, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 217, 255, 0.2)" }}
    className="bg-gradient-to-br from-[#111827] to-[#0a0e27] p-6 rounded-xl border border-slate-800 hover:border-[#00d9ff]/50 transition-all duration-300 flex flex-col items-center text-center"
  >
    <div className="w-14 h-14 rounded-full bg-[#00d9ff]/10 flex items-center justify-center mb-4 text-[#00d9ff]">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-4 h-10">{description}</p>
    <div className="text-xs font-semibold text-[#00d9ff] mb-6 px-3 py-1 rounded-full bg-[#00d9ff]/10">
      Respuesta: {time}
    </div>
    <Button 
      variant="ghost" 
      className="text-white hover:text-[#00d9ff] hover:bg-[#00d9ff]/10"
    >
      {cta}
    </Button>
  </motion.div>
);

const ContactMethods = () => {
  const methods = [
    { icon: Send, title: "Formulario Web", desc: "Envía tu mensaje directamente desde esta página", time: "24 horas", cta: "Ir al formulario" },
    { icon: Phone, title: "Llamada Directa", desc: "Habla con nuestro equipo de expertos ahora", time: "Inmediato", cta: "Llamar ahora" },
    { icon: Mail, title: "Email", desc: "Envía tu consulta detallada por correo", time: "24 horas", cta: "Enviar email" },
    { icon: MessageSquare, title: "Chat en Vivo", desc: "Soporte instantáneo para dudas rápidas", time: "Inmediato", cta: "Iniciar chat" },
  ];

  return (
    <section className="py-20 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Formas de contactar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {methods.map((method, index) => (
            <MethodCard 
              key={index}
              icon={method.icon}
              title={method.title}
              description={method.desc}
              time={method.time}
              cta={method.cta}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
