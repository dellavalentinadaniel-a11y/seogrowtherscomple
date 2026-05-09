import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Database } from 'lucide-react';

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

const Privacy = () => {
  return (
    <motion.div 
      initial="initial" 
      animate="in" 
      exit="out" 
      variants={pageVariants}
      className="min-h-screen pt-32 pb-20"
    >
      <Helmet>
        <title>Política de Privacidad - AGENCY</title>
        <meta name="description" content="Política de privacidad y protección de datos de AGENCY." />
      </Helmet>

      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Política de <span className="text-cyan-400">Privacidad</span>
          </h1>
          <p className="text-xl text-gray-400">
            Última actualización: {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </p>
        </header>

        <Section icon={Shield} title="Introducción">
          <p>
            En AGENCY, nos tomamos muy en serio la privacidad de tus datos. Esta política describe cómo recopilamos, 
            usamos y protegemos tu información personal cuando visitas nuestro sitio web o utilizas nuestros servicios.
          </p>
          <p>
            Al utilizar nuestro sitio web, aceptas las prácticas descritas en esta política. Si no estás de acuerdo 
            con alguna parte de esta política, te recomendamos que no utilices nuestros servicios.
          </p>
        </Section>

        <Section icon={Database} title="Recopilación de Datos">
          <p>
            Podemos recopilar información personal que nos proporcionas voluntariamente, como tu nombre, dirección 
            de correo electrónico y número de teléfono cuando te pones en contacto con nosotros o te suscribes a nuestro boletín.
          </p>
          <p>
            También recopilamos información técnica automáticamente cuando visitas nuestro sitio, incluyendo tu dirección IP, 
            tipo de navegador, páginas visitadas y tiempo de permanencia.
          </p>
        </Section>

        <Section icon={Eye} title="Uso de Cookies">
          <p>
            Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación, analizar el tráfico 
            del sitio y personalizar el contenido.
          </p>
          <p>
            Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envía una cookie. 
            Sin embargo, si no aceptas cookies, es posible que no puedas utilizar algunas partes de nuestro sitio.
          </p>
        </Section>

        <Section icon={Lock} title="Seguridad de los Datos">
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra 
            el acceso no autorizado, la alteración, la divulgación o la destrucción.
          </p>
          <p>
            Sin embargo, ten en cuenta que ninguna transmisión por Internet o método de almacenamiento electrónico 
            es 100% seguro.
          </p>
        </Section>

        <Section icon={FileText} title="Tus Derechos">
          <p>
            Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. También 
            tienes derecho a oponerte al procesamiento de tus datos o solicitar la limitación del mismo.
          </p>
          <p>
            Para ejercer estos derechos, por favor contáctanos a través de la información proporcionada a continuación.
          </p>
        </Section>

        <div className="mt-16 p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">¿Tienes preguntas?</h3>
          <p className="text-gray-400 mb-6">
            Si tienes alguna duda sobre nuestra política de privacidad, no dudes en contactarnos.
          </p>
          <a href="mailto:privacidad@agency.com" className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg">
            privacidad@agency.com
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;