
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OfficesCarousel = () => {
  const dummyOffices = [
    {
      id: 1,
      city: "Madrid",
      address: "Paseo de la Castellana 100, 28046 Madrid",
      phone: "+34 91 123 45 67",
      email: "madrid@seogrowthers.com",
      hours: "Lun-Vie 9:00-19:00",
      image: "https://images.unsplash.com/photo-1678458536113-839133647b4a",
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.4542364639904!2d-3.692383684602517!3d40.46529397935936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4229065670838b%3A0x62957778216789!2sP.%C2%BA%20de%20la%20Castellana%2C%20100%2C%2028046%20Madrid!5e0!3m2!1sen!2ses!4v1652345678901!5m2!1sen!2ses"
    },
    {
      id: 2,
      city: "Barcelona",
      address: "Avinguda Diagonal 400, 08037 Barcelona",
      phone: "+34 93 987 65 43",
      email: "bcn@seogrowthers.com",
      hours: "Lun-Vie 9:00-18:00",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.4542364639904!2d2.152383684602517!3d41.39529397935936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f477755555%3A0x1234567890abcdef!2sAvinguda%20Diagonal%2C%20400%2C%2008037%20Barcelona!5e0!3m2!1sen!2ses!4v1652345678902!5m2!1sen!2ses"
    }
  ];

  const [offices] = useState(dummyOffices);
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex(prev => (prev + 1) % offices.length);
  const prevSlide = () => setIndex(prev => (prev - 1 + offices.length) % offices.length);

  useEffect(() => {
    if (offices.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [offices.length]);

  if (!offices.length) return null;

  const current = offices[index];

  return (
    <section className="py-20 bg-[#0C0D0D] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
           <h2 className="text-3xl font-bold text-white">Nuestras Oficinas</h2>
           <div className="flex gap-2">
              <button onClick={prevSlide} className="p-2 rounded-full border border-slate-700 text-white hover:bg-white/10 transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={nextSlide} className="p-2 rounded-full border border-slate-700 text-white hover:bg-white/10 transition-colors"><ChevronRight size={20} /></button>
           </div>
        </div>

        <div className="relative bg-[#111827] rounded-2xl overflow-hidden border border-slate-800">
           <AnimatePresence mode="wait">
             <motion.div
               key={current.id}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -50 }}
               transition={{ duration: 0.5 }}
               className="flex flex-col lg:flex-row min-h-[500px]"
             >
                {/* Image Section */}
                <div className="lg:w-1/3 relative h-64 lg:h-auto">
                   <img src={current.image} alt={current.city} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent lg:bg-gradient-to-r"></div>
                   <div className="absolute bottom-6 left-6">
                      <h3 className="text-3xl font-bold text-white">{current.city}</h3>
                   </div>
                </div>

                {/* Info Section */}
                <div className="lg:w-1/3 p-8 flex flex-col justify-center space-y-6 border-r border-slate-800">
                   <div className="space-y-4">
                      <div className="flex items-start gap-3">
                         <MapPin className="text-[#00d9ff] mt-1 shrink-0" size={20} />
                         <div>
                            <p className="text-gray-400 text-sm">Dirección</p>
                            <p className="text-white font-medium">{current.address}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <Phone className="text-[#00d9ff] mt-1 shrink-0" size={20} />
                         <div>
                            <p className="text-gray-400 text-sm">Teléfono</p>
                            <p className="text-white font-medium">{current.phone}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <Mail className="text-[#00d9ff] mt-1 shrink-0" size={20} />
                         <div>
                            <p className="text-gray-400 text-sm">Email</p>
                            <p className="text-white font-medium">{current.email}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <Clock className="text-[#00d9ff] mt-1 shrink-0" size={20} />
                         <div>
                            <p className="text-gray-400 text-sm">Horario</p>
                            <p className="text-white font-medium">{current.hours}</p>
                         </div>
                      </div>
                   </div>
                   <Button className="w-full bg-[#00d9ff] hover:bg-[#00c2e6] text-black font-bold">
                      Contactar Oficina
                   </Button>
                </div>

                {/* Map Section */}
                <div className="lg:w-1/3 h-64 lg:h-auto bg-slate-800">
                   <iframe 
                      src={current.map_url} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy"
                      className="opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale invert hover:grayscale-0 hover:invert-0"
                   ></iframe>
                </div>
             </motion.div>
           </AnimatePresence>

           {/* Indicators */}
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
             {offices.map((_, i) => (
               <button 
                 key={i}
                 onClick={() => setIndex(i)}
                 className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-[#00d9ff]' : 'w-2 bg-gray-600'}`}
               />
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default OfficesCarousel;
