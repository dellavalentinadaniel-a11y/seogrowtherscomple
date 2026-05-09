import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { number: "150+", label: "Proyectos Completados" },
    { number: "98%", label: "Clientes Satisfechos" },
    { number: "50+", label: "Expertos en el Equipo" },
    { number: "10+", label: "Años de Experiencia" }
  ];

  return (
    <section className="py-20 bg-cyan-900/10 border-y border-cyan-500/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</h3>
              <p className="text-cyan-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;