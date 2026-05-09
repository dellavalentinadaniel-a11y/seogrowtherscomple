import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Network, Search, CheckCircle, XCircle, BookOpen, Clock, ChevronRight, Award, Zap, Code, Shield, Cloud, Server, Database, X, Maximize2 } from 'lucide-react';
import FAQSection from '@/components/shared/FAQSection';

// Mapeo dinamico de iconos ampliado para soportar más temáticas
const iconsMap = {
  Activity: Activity,
  Network: Network,
  Search: Search,
  Zap: Zap,
  Code: Code,
  Shield: Shield,
  Cloud: Cloud,
  Server: Server,
  Database: Database,
  BookOpen: BookOpen
};

const InteractiveGuide = ({ guideData, title, subtitle, faqs }) => {
  const [activeTab, setActiveTab] = useState(guideData[0].id);
  const [completedQuizzes, setCompletedQuizzes] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [zoomedImage, setZoomedImage] = useState(null);

  const activeContent = guideData.find(item => item.id === activeTab);
  const ActiveIcon = iconsMap[activeContent.icon] || BookOpen;

  const handleQuizAnswer = (sectionId, index) => {
    setQuizAnswers({ ...quizAnswers, [sectionId]: index });
    if (index === activeContent.quiz.correctAnswer) {
        setCompletedQuizzes({ ...completedQuizzes, [sectionId]: true });
    }
  };

  const parseContent = (text) => {
    // 1. Reemplazamos los **bold** para resaltarlos dramáticamente
    let parsedText = text.replace(
      /\*\*(.*?)\*\*/g, 
      '<strong class="text-emerald-400 font-extrabold bg-emerald-500/10 px-[6px] py-[2px] mx-[2px] rounded border border-emerald-500/20 shadow-sm">$1</strong>'
    );
    // 2. Dividimos en párrafos y añadimos las clases para la primera letra (Drop cap moderno)
    const paragraphs = parsedText.split('\n\n').filter(p => p.trim() !== '');
    return paragraphs.map(p => 
      `<p class="mb-6 leading-relaxed text-gray-300 md:text-lg first-letter:text-5xl first-letter:font-black first-letter:text-cyan-400 first-letter:mr-2 first-letter:float-left first-letter:mt-1.5 first-letter:drop-shadow-md">${p}</p>`
    ).join('');
  };

  return (
    <div className="w-full flex flex-col gap-16">
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto w-full">
        {/* Sidebar de Navegación */}
      <nav aria-label="Índice de navegación de la guía" className="w-full md:w-1/3 flex flex-col gap-3">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="text-cyan-400" /> Índice de Capítulos
        </h3>
        {guideData.map((item, index) => {
          const Icon = iconsMap[item.icon] || BookOpen;
          const isActive = activeTab === item.id;
          const isCompleted = completedQuizzes[item.id];

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-start text-left p-4 rounded-xl border transition-all duration-300 ${
                isActive 
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' 
                  : 'bg-slate-900/50 border-slate-800 text-gray-400 hover:bg-slate-800 hover:text-gray-200'
              }`}
            >
              <div className={`p-2 rounded-lg mr-4 ${isActive ? 'bg-cyan-500/20' : 'bg-slate-800'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider mb-1 block">Capítulo {index + 1}</span>
                    {isCompleted && <Award className="w-4 h-4 text-yellow-500" />}
                </div>
                <h4 className={`font-bold ${isActive ? 'text-white' : 'text-gray-300'}`}>{item.title}</h4>
                <div className="flex items-center gap-1 mt-2 opacity-70">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{item.estimatedTime} de lectura</span>
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* Progreso Total */}
        <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm text-gray-400 font-bold mb-3 uppercase tracking-wider">Tu progreso</h4>
            <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(Object.keys(completedQuizzes).length / guideData.length) * 100}%` }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                />
            </div>
            <p className="text-xs text-right text-gray-500 font-medium">
                {Object.keys(completedQuizzes).length} de {guideData.length} Módulos Dominados
            </p>
        </div>
      </nav>

      {/* Contenido Principal */}
      <article className="w-full md:w-2/3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Header del Capítulo */}
            <header className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
              <div>
                  <h1 className="text-3xl font-extrabold text-white mb-2">{activeContent.title}</h1>
                  <p className="text-cyan-400 font-medium text-sm">{subtitle || title}</p>
              </div>
              <div className="hidden sm:flex relative -mt-6">
                  <img 
                    src="/images/iconos/guiaspersonaje.webp" 
                    alt="Personaje Guía" 
                    className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-[0_10px_25px_rgba(34,211,238,0.4)] transition-transform duration-500 hover:scale-110 hover:rotate-3 hover:drop-shadow-[0_15px_35px_rgba(34,211,238,0.6)]" 
                  />
              </div>
            </header>

            {/* Contenido Principal HTML */}
            <div 
                className="prose prose-invert prose-cyan max-w-none mb-12 prose-headings:font-bold prose-headings:text-white prose-li:text-gray-300 prose-a:text-cyan-400"
                dangerouslySetInnerHTML={{ __html: parseContent(activeContent.content) }}
            />

            {/* Buenas y Malas Prácticas */}
            <section aria-labelledby="best-practices-title" className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-5">
                    <h4 className="text-emerald-400 font-bold flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5" /> Buenas Prácticas
                    </h4>
                    <ul className="space-y-3">
                        {activeContent.goodPractices.map((practice, i) => (
                            <li key={i} className="text-sm text-emerald-200/80 flex items-start gap-2">
                                <span className="text-emerald-500 mt-1">●</span> {practice}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-rose-950/20 border border-rose-900/50 rounded-xl p-5">
                    <h4 className="text-rose-400 font-bold flex items-center gap-2 mb-4">
                        <XCircle className="w-5 h-5" /> Evitar Completamente
                    </h4>
                    <ul className="space-y-3">
                        {activeContent.badPractices.map((practice, i) => (
                            <li key={i} className="text-sm text-rose-200/80 flex items-start gap-2">
                                <span className="text-rose-500 mt-1">●</span> {practice}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Infografía Dinámica (si existe) */}
            {activeContent.infographic && (
              <figure className="mb-12 bg-slate-900 border border-slate-700/60 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-lg mt-12 block">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Activity className="w-64 h-64 text-cyan-400" />
                </div>
                
                <figcaption className="flex items-center gap-3 mb-8 justify-center relative z-10">
                    <h3 className="text-xl md:text-2xl font-extrabold text-white text-center cursor-default" title={activeContent.infographic.title}>
                      {activeContent.infographic.title}
                    </h3>
                </figcaption>
                
                {activeContent.infographic.imageUrl ? (
                  <div 
                    className="relative z-10 rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl bg-black/50 group cursor-zoom-in"
                    onClick={() => setZoomedImage(activeContent.infographic.imageUrl)}
                  >
                    <img 
                      src={activeContent.infographic.imageUrl} 
                      alt={activeContent.infographic.alt || activeContent.infographic.title} 
                      title={activeContent.infographic.title}
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]" 
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay para indicar ampliación (Solo Desktop) */}
                    <div className="hidden md:flex absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center pointer-events-none">
                       <div className="bg-cyan-500/90 text-black px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 drop-shadow-xl">
                           <Maximize2 className="w-5 h-5" /> Expandir Visualización
                       </div>
                    </div>
                    {/* Botón flotante permanente para Móviles */}
                    <div className="md:hidden absolute bottom-3 right-3 bg-black/50 backdrop-blur-md p-2.5 rounded-full border border-slate-600/50 text-cyan-400 shadow-[0_4px_15px_rgba(0,0,0,0.5)] pointer-events-none flex items-center gap-2">
                       <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
                    {activeContent.infographic.steps.map((step, index) => {
                      const StepIcon = iconsMap[step.icon] || CheckCircle;
                      return (
                        <React.Fragment key={index}>
                          <div className="flex flex-col items-center flex-1 w-full md:w-auto">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)] backdrop-blur-sm">
                              <StepIcon className="w-8 h-8 md:w-10 md:h-10" />
                            </div>
                            <p className="text-sm md:text-base font-bold text-gray-200 text-center px-4 leading-tight">{step.label}</p>
                          </div>
                          
                          {/* Flecha direccional (solo si no es el último) */}
                          {index < activeContent.infographic.steps.length - 1 && (
                            <div className="hidden md:flex text-slate-600 mx-2 flex-shrink-0">
                              <ChevronRight className="w-8 h-8" />
                            </div>
                          )}
                          {/* Flecha direccional versión móvil */}
                          {index < activeContent.infographic.steps.length - 1 && (
                            <div className="flex md:hidden text-slate-600 my-4">
                              <ChevronRight className="w-8 h-8 rotate-90" />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}
              </figure>
            )}

            {/* Test interactivo */}
            <section aria-labelledby="quiz-title" className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 md:p-8 border border-slate-700 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 text-cyan-500/10 scale-150 rotate-12">
                    <BookOpen className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <h3 id="quiz-title" className="text-xl font-bold text-white mb-6">Comprueba tus conocimientos</h3>
                    <p className="text-gray-300 mb-6">{activeContent.quiz.question}</p>
                    
                    <div className="space-y-3 mb-6">
                        {activeContent.quiz.options.map((option, index) => {
                            const isSelected = quizAnswers[activeContent.id] === index;
                            const isCorrect = activeContent.quiz.correctAnswer === index;
                            const hasAnswered = quizAnswers[activeContent.id] !== undefined;

                            let btnClass = "bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:border-slate-500 text-gray-300";
                            
                            if (hasAnswered) {
                                if (isCorrect) {
                                    btnClass = "bg-emerald-900/40 border-emerald-500 text-emerald-300"; // Correcta
                                } else if (isSelected) {
                                    btnClass = "bg-rose-900/40 border-rose-500 text-rose-300"; // Incoorecta
                                } else {
                                    btnClass = "bg-slate-800/20 border-slate-800 text-gray-500 opacity-50 cursor-not-allowed";
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    disabled={hasAnswered}
                                    onClick={() => handleQuizAnswer(activeContent.id, index)}
                                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-start sm:items-center gap-4 ${btnClass}`}
                                >
                                    <span className="flex-1 mt-0.5 sm:mt-0">{option}</span>
                                    {hasAnswered && isCorrect && <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />}
                                    {hasAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />}
                                </button>
                            );
                        })}
                    </div>

                    {quizAnswers[activeContent.id] !== undefined && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-cyan-950/30 border border-cyan-900/50 p-4 rounded-lg mt-4 overflow-hidden"
                        >
                            <h5 className="font-bold text-cyan-400 mb-2">Explicación Oficial:</h5>
                            <p className="text-sm text-cyan-100">{activeContent.quiz.explanation}</p>
                        </motion.div>
                    )}
                </div>
            </section>

          </motion.div>
        </AnimatePresence>
      </article>
      </div>
      
      
      {/* Sección compartida de FAQs (si aplica a esta guía) */}
      <div className="max-w-7xl mx-auto w-full">
        {faqs && faqs.length > 0 && <FAQSection faqs={faqs} />}
      </div>

      {/* Lightbox / Zoomed Image Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
          >
            <button 
                onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
                className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full transition-colors z-[160]"
                title="Cerrar (O presiona tecla Esc)"
            >
                <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <motion.img
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={zoomedImage}
                alt="Imagen Ampliada"
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_80px_rgba(34,211,238,0.2)] cursor-default border border-slate-700/50"
                onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveGuide;
