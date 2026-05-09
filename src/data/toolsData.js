import { PenTool, Code, Zap, BarChart, TestTube, Figma, Terminal, Smartphone, Search, Database, Layout, Mail, Globe, Shield, Activity, Image } from 'lucide-react';

export const toolsData = [
  {
    id: 1,
    name: "Figma",
    description: "La herramienta colaborativa líder para diseño de interfaces. Permite prototipado, sistemas de diseño y handoff a desarrollo.",
    features: ["Colaboración en tiempo real", "Prototipado interactivo", "Dev Mode", "Plugins infinitos"],
    category: "Herramientas de diseño",
    pricing: "Freemium",
    rating: 5,
    link: "https://www.figma.com/",
    icon: Figma,
    featured: true
  },
  {
    id: 2,
    name: "VS Code",
    description: "Editor de código fuente redefinido. Ligero pero potente, con soporte nativo para TypeScript, depuración y control de versiones.",
    features: ["IntelliSense inteligente", "Depuración integrada", "Extensiones", "Terminal integrado"],
    category: "Herramientas de desarrollo",
    pricing: "Free",
    rating: 5,
    link: "https://code.visualstudio.com/",
    icon: Code,
    featured: true
  },
  {
    id: 3,
    name: "Notion",
    description: "Espacio de trabajo todo en uno para notas, gestión de proyectos y bases de conocimiento. El cerebro digital de tu equipo.",
    features: ["Wikis y Documentos", "Gestión de Proyectos", "Bases de datos relacionales", "Notion AI"],
    category: "Herramientas de productividad",
    pricing: "Freemium",
    rating: 4.8,
    link: "https://www.notion.so/",
    icon: Database,
    featured: true
  },
  {
    id: 4,
    name: "Ahrefs",
    description: "Suite SEO todo en uno para auditar sitios, analizar competidores, explorar palabras clave y rastrear ranking.",
    features: ["Site Audit", "Site Explorer", "Keywords Explorer", "Rank Tracker"],
    category: "Herramientas de SEO y marketing",
    pricing: "Paid",
    rating: 4.9,
    link: "https://ahrefs.com/",
    icon: Search,
    featured: true
  },
  {
    id: 5,
    name: "Postman",
    description: "Plataforma API para construir y usar APIs. Simplifica cada paso del ciclo de vida de una API y agiliza la colaboración.",
    features: ["Cliente API", "Pruebas automatizadas", "Documentación", "Mock servers"],
    category: "Herramientas de testing",
    pricing: "Freemium",
    rating: 4.7,
    link: "https://www.postman.com/",
    icon: Globe,
    featured: false
  },
  {
    id: 6,
    name: "Linear",
    description: "Herramienta de gestión de proyectos diseñada para equipos de software modernos. Rápida, intuitiva y hermosa.",
    features: ["Sincronización en tiempo real", "Atajos de teclado", "Ciclos y Roadmaps", "Integración con GitHub"],
    category: "Herramientas de productividad",
    pricing: "Freemium",
    rating: 4.9,
    link: "https://linear.app/",
    icon: Zap,
    featured: true
  },
  {
    id: 7,
    name: "Canva",
    description: "Herramienta de diseño gráfico simplificada para crear contenido de redes sociales, presentaciones y más.",
    features: ["Plantillas profesionales", "Editor drag-and-drop", "Magic Studio AI", "Kit de marca"],
    category: "Herramientas de diseño",
    pricing: "Freemium",
    rating: 4.6,
    link: "https://www.canva.com/",
    icon: PenTool,
    featured: false
  },
  {
    id: 8,
    name: "Screaming Frog",
    description: "Rastreador de sitios web líder en la industria para auditorías técnicas de SEO. Analiza resultados en tiempo real.",
    features: ["Detección de enlaces rotos", "Análisis de Page Titles", "Generación de XML Sitemaps", "Auditoría de redirecciones"],
    category: "Herramientas de SEO y marketing",
    pricing: "Freemium",
    rating: 4.8,
    link: "https://www.screamingfrog.co.uk/",
    icon: Activity,
    featured: false
  },
  {
    id: 9,
    name: "Cypress",
    description: "Herramienta de testing frontend de próxima generación construida para la web moderna. Tests rápidos, fáciles y confiables.",
    features: ["Time Travel", "Depurabilidad", "Recargas en tiempo real", "Espera automática"],
    category: "Herramientas de testing",
    pricing: "Free",
    rating: 4.7,
    link: "https://www.cypress.io/",
    icon: TestTube,
    featured: false
  },
  {
    id: 10,
    name: "Midjourney",
    description: "Generador de arte IA independiente que crea imágenes a partir de descripciones textuales con calidad artística excepcional.",
    features: ["Generación de imágenes", "Variaciones", "Upscaling", "Comunidad en Discord"],
    category: "Herramientas de diseño",
    pricing: "Paid",
    rating: 4.9,
    link: "https://www.midjourney.com/",
    icon: Image,
    featured: false
  },
  {
    id: 11,
    name: "Warp",
    description: "La terminal para el siglo XXI. Construida con Rust, rápida, colaborativa y asistida por IA.",
    features: ["Bloques de comandos", "Warp AI", "Entrada estilo editor de texto", "Flujos de trabajo compartidos"],
    category: "Herramientas de desarrollo",
    pricing: "Freemium",
    rating: 4.8,
    link: "https://www.warp.dev/",
    icon: Terminal,
    featured: false
  },
  {
    id: 12,
    name: "Resend",
    description: "API de correo electrónico para desarrolladores. Diseñada para ser fácil de usar, escalable y con excelente entregabilidad.",
    features: ["API moderna", "Plantillas React Email", "Analíticas detalladas", "Logs en tiempo real"],
    category: "Herramientas de productividad",
    pricing: "Freemium",
    rating: 4.9,
    link: "https://resend.com/",
    icon: Mail,
    featured: false
  },
  {
    id: 13,
    name: "Google Analytics 4",
    description: "Plataforma de análisis web que te da información esencial sobre tus visitantes y el rendimiento de tu sitio.",
    features: ["Event-based tracking", "Exploraciones personalizadas", "Integración con Google Ads", "Multi-plataforma"],
    category: "Herramientas de SEO y marketing",
    pricing: "Free",
    rating: 4.5,
    link: "https://analytics.google.com/",
    icon: BarChart,
    featured: false
  },
  {
    id: 14,
    name: "Jest",
    description: "Framework de testing de JavaScript con un enfoque en la simplicidad. Funciona con proyectos usando Babel, TS, Node, React, etc.",
    features: ["Zero config", "Snapshots", "Aislado", "Gran API"],
    category: "Herramientas de testing",
    pricing: "Free",
    rating: 4.8,
    link: "https://jestjs.io/",
    icon: TestTube,
    featured: false
  },
  {
    id: 15,
    name: "Excalidraw",
    description: "Pizarra virtual para dibujar diagramas a mano alzada. Excelente para entrevistas técnicas y diagramas de arquitectura.",
    features: ["Estilo dibujado a mano", "Librerías de formas", "Colaboración en vivo", "End-to-end encryption"],
    category: "Herramientas de diseño",
    pricing: "Freemium",
    rating: 4.9,
    link: "https://excalidraw.com/",
    icon: PenTool,
    featured: false
  }
];

export const toolCategories = [
  "Todos",
  "Herramientas de diseño",
  "Herramientas de desarrollo",
  "Herramientas de productividad",
  "Herramientas de SEO y marketing",
  "Herramientas de testing"
];