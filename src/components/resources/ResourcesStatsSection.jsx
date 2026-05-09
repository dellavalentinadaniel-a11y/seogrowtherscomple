
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Database, DownloadCloud, Sparkles, ThumbsUp } from 'lucide-react';

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
          setDisplayValue(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const stats = [
  { icon: Database, value: 500, suffix: "+", label: "Recursos disponibles", color: "text-cyan-400" },
  { icon: DownloadCloud, value: 100, suffix: "K", label: "Descargas mensuales", color: "text-blue-400" },
  { icon: Sparkles, value: 50, suffix: "+", label: "Nuevos recursos/mes", color: "text-purple-400" },
  { icon: ThumbsUp, value: 95, suffix: "%", label: "Satisfacción", color: "text-green-400" },
];

const ResourcesStatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#0a0e27] to-[#111827] border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className={`mb-4 p-4 rounded-full bg-slate-900/50 border border-slate-700 ${stat.color}`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
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

export default ResourcesStatsSection;
