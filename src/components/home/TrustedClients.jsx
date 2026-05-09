import React from 'react';
import { motion } from 'framer-motion';

const TrustedClients = () => {
  const clients = ['Google', 'Microsoft', 'Spotify', 'Amazon', 'Airbnb', 'Uber'];

  return (
    <section className="py-12 bg-black border-y border-white/5">
      <div className="container mx-auto px-6">
        <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-8">
          Clientes que confían en nosotros
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-60">
           {clients.map((client, index) => (
             <motion.span 
               key={index}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className="text-2xl font-bold text-gray-400 hover:text-white transition-colors cursor-default"
             >
               {client}
             </motion.span>
           ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedClients;