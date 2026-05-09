import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const projects = [
    {
      title: "FinTech Dashboard",
      category: "Desarrollo Web",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "E-Commerce AI",
      category: "Inteligencia Artificial",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Travel App",
      category: "Diseño UX/UI",
      image: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-24 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
             <h2 className="text-4xl font-bold text-white mb-4">Proyectos <span className="text-cyan-400">Destacados</span></h2>
             <p className="text-gray-400 max-w-lg">Explora cómo hemos ayudado a empresas líderes a alcanzar sus objetivos digitales.</p>
          </div>
          <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black mt-6 md:mt-0">
            Ver Portafolio Completo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="text-cyan-400 text-sm font-semibold mb-2 block">{project.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                    Ver Proyecto <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;