
import React from 'react';
import ToolCard from '@/components/tools/ToolCard';
import { toolsData } from '@/data/toolsData';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ToolsSection = () => {
  // Take first 4 tools
  const featuredTools = toolsData.slice(0, 4);

  return (
    <section className="py-24 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Herramientas y <span className="text-cyan-400">Recursos</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Acceso a herramientas premium para acelerar tu crecimiento digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/tools">
            <Button size="lg" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-6 rounded-full text-base">
              Explorar todas las herramientas <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
