import { Code, Search, Bot, Wrench } from 'lucide-react';

export const servicesData = [
  {
    id: 1,
    title: "Desarrollo de sitios y aplicaciones web",
    description: "Creamos experiencias web modernas y escalables utilizando las últimas tecnologías: React, Next.js, TypeScript y arquitecturas edge-first que garantizan rendimiento excepcional.",
    benefits: [
      "Aplicaciones web progressivas (PWA) con funcionalidad offline",
      "Arquitectura serverless y edge computing para latencia ultra-baja",
      "Diseño responsive y mobile-first con Tailwind CSS",
      "Integración de APIs y servicios de terceros",
      "Optimización de performance con Core Web Vitals perfectos",
      "Testing automatizado y CI/CD pipelines"
    ],
    priceText: "Desde $5,000 USD",
    consultationText: "Consulta gratuita de 30 minutos",
    icon: Code,
    featured: true,
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 2,
    title: "Consultoría en estrategia digital y SEO",
    description: "Potenciamos tu presencia online con estrategias SEO data-driven, optimización técnica avanzada y content marketing que convierte visitantes en clientes.",
    benefits: [
      "Auditoría SEO técnica completa (Core Web Vitals, indexación, arquitectura)",
      "Estrategia de contenido basada en intent mapping y keyword research",
      "Link building white-hat y outreach estratégico",
      "Optimización on-page y marcado de datos estructurados (Schema.org)",
      "Análisis de competencia y gap analysis",
      "Reportes mensuales con métricas accionables (tráfico orgánico, conversiones, ROI)"
    ],
    priceText: "Desde $2,500 USD/mes",
    consultationText: "Auditoría inicial gratuita",
    icon: Search,
    featured: true,
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: 3,
    title: "Implementación de soluciones con IA",
    description: "Integramos inteligencia artificial de última generación en tus procesos: desde chatbots conversacionales hasta análisis predictivo y automatización cognitiva.",
    benefits: [
      "Chatbots inteligentes con modelos LLM (GPT-4, Claude, Llama) fine-tuned",
      "Sistemas de recomendación personalizados con ML",
      "Automatización de workflows con agentes autónomos",
      "Análisis de sentimiento y procesamiento de lenguaje natural (NLP)",
      "Computer vision para clasificación y detección de objetos",
      "Integración de APIs de OpenAI, Anthropic, Cohere y Azure AI"
    ],
    priceText: "Desde $8,000 USD",
    consultationText: "Workshop de descubrimiento incluido",
    icon: Bot,
    featured: false,
    gradient: "from-green-500 to-teal-600"
  },
  {
    id: 4,
    title: "Mantenimiento y optimización de proyectos web",
    description: "Garantizamos que tu plataforma opere al máximo rendimiento: monitoreo 24/7, actualizaciones de seguridad, optimización continua y soporte técnico dedicado.",
    benefits: [
      "Monitoreo proactivo con alertas en tiempo real (uptime, performance, errores)",
      "Actualizaciones de seguridad y parches de vulnerabilidades",
      "Optimización de base de datos y queries (caching, indexación)",
      "Gestión de backups automáticos y disaster recovery",
      "Performance tuning continuo (CDN, lazy loading, code splitting)",
      "Soporte técnico prioritario con SLA garantizado"
    ],
    priceText: "Desde $1,200 USD/mes",
    consultationText: "Primer mes con descuento del 20%",
    icon: Wrench,
    featured: false,
    gradient: "from-orange-500 to-red-600"
  }
];

export const getFeaturedServices = () => {
  return servicesData.filter(service => service.featured);
};