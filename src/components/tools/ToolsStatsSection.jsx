
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Database, Users, MousePointerClick, Star } from 'lucide-react';

const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = value / steps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(value % 1 === 0 ? Math.floor(start) : parseFloat(start.toFixed(1)));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const stats = [
  { icon: Database, value: 200, suffix: "+", label: "Herramientas disponibles" },
  { icon: Users, value: 50, suffix: "K", label: "Usuarios activos" },
  { icon: MousePointerClick, value: 1, suffix: "M", label: "Accesos mensuales" },
  { icon: Star, value: 4.8, suffix: "", label: "Calificación promedio" },
];

const ToolsStatsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0a0e27] to-[#111827]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm"
              >
                <div className="mb-4 p-4 rounded-full bg-cyan-500/10 text-cyan-400">
                  <Icon size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsStatsSection;
