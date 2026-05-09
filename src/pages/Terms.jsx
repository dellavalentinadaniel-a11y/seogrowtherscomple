import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Scale, AlertCircle, Copyright, UserCheck, HelpCircle } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const Section = ({ icon: Icon, title, children }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
    <div className="text-gray-400 leading-relaxed space-y-4 pl-12 border-l border-slate-800 ml-4">
      {children}
    </div>
  </div>
);

const Terms = () => {
  return (
    <motion.div 
      initial="initial" 
      animate="in" 
      exit="out" 
      variants={pageVariants}
      className="min-h-screen pt-32 pb-20"
    >
      <Helmet>
        <title>Términos de Servicio - AGENCY</title>
        <meta name="description" content="Términos y condiciones de uso de los servicios de AGENCY." />
      </Helmet>

      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Términos de <span className="text-cyan-400">Servicio</span>
          </h1>
          <p className="text-xl text-gray-400">
            Por favor, lee estos términos cuidadosamente antes de usar nuestro sitio.
          </p>
        </header>

        <Section icon={Scale} title="Condiciones de Uso">
          <p>
            Al acceder a este sitio web, aceptas estar vinculado por estos términos de servicio, todas las leyes y regulaciones aplicables, 
            y aceptas que eres responsable del cumplimiento de las leyes locales aplicables.
          </p>
          <p>
            Si no estás de acuerdo con alguno de estos términos, tienes prohibido usar o acceder a este sitio.
          </p>
        </Section>

        <Section icon={Copyright} title="Propiedad Intelectual">
          <p>
            Los materiales contenidos en este sitio web están protegidos por las leyes de derechos de autor y marcas comerciales aplicables. 
            Todo el contenido, incluyendo texto, gráficos, logotipos, imágenes y software, es propiedad de AGENCY o de sus proveedores de contenido.
          </p>
          <p>
            Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de AGENCY 
            solo para visualización transitoria personal y no comercial.
          </p>
        </Section>

        <Section icon={AlertCircle} title="Limitaciones de Responsabilidad">
          <p>
            En ningún caso AGENCY o sus proveedores serán responsables de ningún daño (incluyendo, sin limitación, daños por pérdida de datos o beneficios, 
            o debido a la interrupción del negocio) que surjan del uso o la incapacidad de usar los materiales en el sitio web de AGENCY.
          </p>
          <p>
            Los materiales que aparecen en el sitio web de AGENCY podrían incluir errores técnicos, tipográficos o fotográficos. 
            AGENCY no garantiza que ninguno de los materiales en su sitio web sea preciso, completo o actual.
          </p>
        </Section>

        <Section icon={UserCheck} title="Conducta del Usuario">
          <p>
            Te comprometes a utilizar nuestro sitio web solo para fines legales y de una manera que no infrinja los derechos de, 
            o restrinja o inhiba el uso y disfrute del sitio web por parte de cualquier tercero.
          </p>
          <p>
            Está prohibido cualquier comportamiento que pueda dañar, deshabilitar, sobrecargar o deteriorar el sitio web o interferir 
            con el uso y disfrute del sitio web por parte de cualquier otra parte.
          </p>
        </Section>

        <Section icon={HelpCircle} title="Modificaciones">
          <p>
            AGENCY puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. 
            Al utilizar este sitio web, aceptas estar vinculado por la versión actual de estos términos de servicio.
          </p>
        </Section>

        <div className="mt-16 p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Contacto Legal</h3>
          <p className="text-gray-400 mb-6">
            Para asuntos legales o preguntas sobre estos términos, contáctanos.
          </p>
          <a href="mailto:legal@agency.com" className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg">
            legal@agency.com
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Terms;