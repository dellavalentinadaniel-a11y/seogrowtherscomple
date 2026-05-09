
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Check, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ToolComparator = () => {
  const [availableTools, setAvailableTools] = useState([]);
  const [selectedTools, setSelectedTools] = useState([null, null, null]);

  useEffect(() => {
    const fetchTools = async () => {
      const { data } = await supabase.from('tools').select('*').eq('status', 'published');
      if (data) {
        setAvailableTools(data);
        // Pre-select first 3 if available
        if (data.length >= 3) {
           setSelectedTools([data[0], data[1], data[2]]);
        } else {
           setSelectedTools([data[0] || null, data[1] || null, data[2] || null]);
        }
      }
    };
    fetchTools();
  }, []);

  const handleSelect = (index, toolId) => {
    const tool = availableTools.find(t => t.id === toolId);
    const newSelection = [...selectedTools];
    newSelection[index] = tool;
    setSelectedTools(newSelection);
  };

  return (
    <section className="py-20 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Comparador de Herramientas</h2>
        
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[800px] grid grid-cols-4 gap-4">
            {/* Headers / Selectors */}
            <div className="p-4 flex items-center justify-center font-bold text-gray-400">
              Características
            </div>
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 rounded-t-xl border-t border-x border-slate-800">
                <Select 
                  value={selectedTools[idx]?.id} 
                  onValueChange={(val) => handleSelect(idx, val)}
                >
                  <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {availableTools.map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedTools[idx] && (
                  <div className="mt-4 text-center">
                    <img src={selectedTools[idx].image} alt="" className="w-full h-24 object-cover rounded-lg mb-2 opacity-80" />
                    <h3 className="font-bold text-white text-lg">{selectedTools[idx].name}</h3>
                  </div>
                )}
              </div>
            ))}

            {/* Price */}
            <div className="p-4 text-gray-300 font-medium border-b border-slate-800 bg-slate-900/30">Precio</div>
            {[0, 1, 2].map(idx => (
              <div key={`price-${idx}`} className="p-4 text-center text-white border-b border-x border-slate-800 bg-slate-900/20">
                {selectedTools[idx]?.price || '-'}
              </div>
            ))}

            {/* Rating */}
            <div className="p-4 text-gray-300 font-medium border-b border-slate-800 bg-slate-900/30">Calificación</div>
            {[0, 1, 2].map(idx => (
              <div key={`rating-${idx}`} className="p-4 text-center text-yellow-500 border-b border-x border-slate-800 bg-slate-900/20 font-bold">
                {selectedTools[idx]?.rating || '-'}
              </div>
            ))}

            {/* Users */}
            <div className="p-4 text-gray-300 font-medium border-b border-slate-800 bg-slate-900/30">Usuarios</div>
            {[0, 1, 2].map(idx => (
              <div key={`users-${idx}`} className="p-4 text-center text-cyan-400 border-b border-x border-slate-800 bg-slate-900/20">
                {selectedTools[idx]?.users_count?.toLocaleString() || '-'}
              </div>
            ))}

            {/* Features Comparison - simplified for example */}
            <div className="p-4 text-gray-300 font-medium border-b border-slate-800 bg-slate-900/30">Funcionalidades</div>
            {[0, 1, 2].map(idx => (
               <div key={`feat-${idx}`} className="p-4 text-center border-b border-x border-slate-800 bg-slate-900/20">
                  {selectedTools[idx]?.features ? (
                    <ul className="text-xs text-gray-400 text-left list-disc pl-4 space-y-1">
                      {JSON.parse(JSON.stringify(selectedTools[idx].features)).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  ) : '-'}
               </div>
            ))}

            {/* CTA */}
            <div className="p-4"></div>
            {[0, 1, 2].map(idx => (
               <div key={`cta-${idx}`} className="p-4 text-center border-x border-b border-slate-800 rounded-b-xl bg-slate-900/50">
                 {selectedTools[idx] && (
                   <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold">Acceder</Button>
                 )}
               </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolComparator;
