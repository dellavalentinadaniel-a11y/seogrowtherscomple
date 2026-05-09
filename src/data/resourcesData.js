import { Book, FileText, Layout, Package, Terminal, Code2, Database, Globe, Cpu, Server, Shield, Cloud } from 'lucide-react';

export const resourcesData = [
  {
    id: 1,
    title: "React Patterns",
    description: "Una colección completa de patrones de diseño y mejores prácticas para el desarrollo con React. Incluye ejemplos de Hooks, Context y gestión de estado.",
    category: "Guías y tutoriales",
    link: "https://reactpatterns.com/",
    icon: Code2,
    updateDate: "2024-03-15",
    featured: true
  },
  {
    id: 2,
    title: "MDN Web Docs",
    description: "La referencia definitiva para HTML, CSS y JavaScript. Documentación mantenida por Mozilla y la comunidad de desarrolladores.",
    category: "Documentación",
    link: "https://developer.mozilla.org/",
    icon: FileText,
    updateDate: "2024-03-20",
    featured: true
  },
  {
    id: 3,
    title: "Tailwind UI Components",
    description: "Colección gratuita de componentes y plantillas construidas con Tailwind CSS, listas para copiar y pegar en tus proyectos.",
    category: "Plantillas y snippets",
    link: "https://tailwindui.com/",
    icon: Layout,
    updateDate: "2024-02-28",
    featured: false
  },
  {
    id: 4,
    title: "TanStack Query",
    description: "Potente gestión de estado asíncrono para TS/JS, React, Solid, Vue y Svelte. Maneja caching, sincronización y actualizaciones de servidor.",
    category: "Librerías y frameworks",
    link: "https://tanstack.com/query/latest",
    icon: Package,
    updateDate: "2024-03-10",
    featured: true
  },
  {
    id: 5,
    title: "Docker para Desarrolladores",
    description: "Guía esencial para entender contenedores, orquestación y despliegue de aplicaciones modernas usando Docker.",
    category: "Herramientas de desarrollo",
    link: "https://docs.docker.com/",
    icon: Server,
    updateDate: "2024-01-15",
    featured: false
  },
  {
    id: 6,
    title: "Next.js Learn",
    description: "Curso interactivo oficial para aprender Next.js 14, App Router y Server Actions paso a paso construyendo una aplicación real.",
    category: "Guías y tutoriales",
    link: "https://nextjs.org/learn",
    icon: Book,
    updateDate: "2024-03-01",
    featured: true
  },
  {
    id: 7,
    title: "Zod Schema Validation",
    description: "Librería de declaración y validación de esquemas TypeScript-first. Define tus datos una vez y obtén inferencia de tipos estática gratis.",
    category: "Librerías y frameworks",
    link: "https://zod.dev/",
    icon: Shield,
    updateDate: "2024-02-10",
    featured: false
  },
  {
    id: 8,
    title: "PostgreSQL Tutorial",
    description: "Aprende SQL y PostgreSQL desde cero. Conceptos fundamentales de bases de datos relacionales y optimización de consultas.",
    category: "Guías y tutoriales",
    link: "https://www.postgresqltutorial.com/",
    icon: Database,
    updateDate: "2023-12-05",
    featured: false
  },
  {
    id: 9,
    title: "Shadcn/ui",
    description: "Componentes reutilizables bellamente diseñados construidos con Radix UI y Tailwind CSS. No es una librería de componentes, es una colección.",
    category: "Plantillas y snippets",
    link: "https://ui.shadcn.com/",
    icon: Layout,
    updateDate: "2024-03-18",
    featured: true
  },
  {
    id: 10,
    title: "Git Documentation",
    description: "Documentación oficial del sistema de control de versiones más utilizado. Incluye libro Pro Git y referencia de comandos.",
    category: "Documentación",
    link: "https://git-scm.com/doc",
    icon: Terminal,
    updateDate: "2024-01-20",
    featured: false
  },
  {
    id: 11,
    title: "Framer Motion",
    description: "Librería de animación lista para producción para React. Gestos, drag and drop, animaciones de layout y scroll.",
    category: "Librerías y frameworks",
    link: "https://www.framer.com/motion/",
    icon: Package,
    updateDate: "2024-02-15",
    featured: false
  },
  {
    id: 12,
    title: "Vercel SDK AI",
    description: "Librería para construir aplicaciones de IA en streaming con JavaScript y TypeScript. Compatible con OpenAI, LangChain y Hugging Face.",
    category: "Librerías y frameworks",
    link: "https://sdk.vercel.ai/docs",
    icon: Cpu,
    updateDate: "2024-03-12",
    featured: true
  },
  {
    id: 13,
    title: "Supabase Docs",
    description: "Guía completa para usar Supabase: Auth, Database, Storage y Realtime. La alternativa Open Source a Firebase.",
    category: "Documentación",
    link: "https://supabase.com/docs",
    icon: Cloud,
    updateDate: "2024-03-05",
    featured: false
  },
  {
    id: 14,
    title: "Clean Code JavaScript",
    description: "Adaptación de los principios de Clean Code para JavaScript. Guía para escribir código legible, reutilizable y refactorizable.",
    category: "Guías y tutoriales",
    link: "https://github.com/ryanmcdermott/clean-code-javascript",
    icon: Code2,
    updateDate: "2023-11-30",
    featured: false
  },
  {
    id: 15,
    title: "CSS Grid Garden",
    description: "Juego interactivo para aprender CSS Grid Layout. Una forma divertida y práctica de dominar layouts modernos.",
    category: "Guías y tutoriales",
    link: "https://cssgridgarden.com/",
    icon: Layout,
    updateDate: "2023-10-15",
    featured: false
  },
  {
    id: 16,
    title: "TypeScript Cheat Sheets",
    description: "Hojas de trucos para desarrolladores React que están aprendiendo TypeScript. Tipos comunes, Props, Hooks y más.",
    category: "Plantillas y snippets",
    link: "https://react-typescript-cheatsheet.netlify.app/",
    icon: FileText,
    updateDate: "2024-01-10",
    featured: false
  }
];

export const resourceCategories = [
  "Todos",
  "Guías y tutoriales",
  "Documentación",
  "Plantillas y snippets",
  "Librerías y frameworks",
  "Herramientas de desarrollo"
];