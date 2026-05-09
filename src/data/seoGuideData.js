export const seoGuideData = [
  {
    id: 'core-web-vitals',
    title: 'Core Web Vitals & Rendimiento',
    icon: 'Activity',
    estimatedTime: '8 min',
    content: `
Los **Core Web Vitals** son un conjunto de métricas establecidas por Google enfocadas en ofrecer una carga rápida, dar prioridad a los dispositivos móviles (mobile-first) y garantizar la mejor experiencia. Si la página es pesada, la experiencia se deteriora y el SEO sufre.

### Métricas Principales (El Triángulo de Oro)
1. **LCP (Largest Contentful Paint)**: Mide el tiempo de carga del elemento visible más grande. 
2. **INP (Interaction to Next Paint)**: Mide la latencia de todas las interacciones del usuario. Sustituyó a FID en 2024.
3. **CLS (Cumulative Layout Shift)**: Mide cuánto se mueven los elementos de la página de forma inesperada mientras carga.

### Herramientas Oficiales
Google utiliza **Google Search Console** para evaluar la visibilidad y **PageSpeed Insights** para velocidad técnica pura. También se estila utilizar **GTmetrix** para diagnósticos en cascada (waterfall).
    `,
    goodPractices: [
      "Optimizar imágenes en formatos modernos (WebP, AVIF).",
      "Definir siempre ancho (width) y alto (height) en los tags <img> para prevenir el CLS.",
      "Alojarse en un CDN para acelerar la latencia (LCP).",
      "Retrasar (Defer) la carga de scripts no críticos (reduce el INP)."
    ],
    badPractices: [
      "No comprimir recursos pesados o usar JPG gigantes.",
      "Bloquear renderizado con JavaScript excesivo en el <head>.",
      "Inyectar banners sin espacio pre-reservado (dispara el CLS)."
    ],
    quiz: {
      question: "¿Qué métrica oficial reemplazó a FID para medir la interactividad visual en la web?",
      options: ["LCP (Largest Contentful Paint)", "CLS (Cumulative Layout Shift)", "INP (Interaction to Next Paint)", "TTFB (Time to First Byte)"],
      correctAnswer: 2,
      explanation: "A partir de marzo de 2024, Google implementó INP (Interaction to Next Paint) para reemplazar a FID, ofreciendo una métrica de respuesta más rigurosa a las latencias complejas de JavaScript."
    },
    infographic: {
      title: "Optimización del LCP y CLS",
      steps: [
        { icon: "Zap", label: "Carga de Hero Image Prioritaria" },
        { icon: "Maximize2", label: "Dimensiones Explícitas en Medios" },
        { icon: "Activity", label: "Minimizar JavaScript de Bloqueo" }
      ]
    }
  },
  {
    id: 'enlazado-interno',
    title: 'Arquitectura de Enlazado Interno',
    icon: 'Network',
    estimatedTime: '6 min',
    content: `
El enlazado interno es el pilar fundamental que permite que rastreadores como **Googlebot** descubran y procesen las URLs de tu sitio. Google literalmente utiliza el *texto de los enlaces internos (anchor text)* para determinar de qué trata la página destino.

### Estrategia de Topic Clusters
No publiques piezas sueltas de contenido. Estructúralas lógicamente en clústeres:
- **Página Pilar:** Una guía extensa o un "Hub" central.
- **Páginas Satélite:** Artículos más específicos que exploran detalles profundos, y que siempre enlazan de vuelta a la pilar.

### Flujo de Autoridad (PageRank)
Planifica los enlaces para que las páginas con mayor autoridad en tu web (ej. la Home) apunten directamente a tu contenido transaccional o más relevante. El contenido más crítico del negocio no debería estar a más de **3 clics de profundidad**.
    `,
    goodPractices: [
      "Usar Anchor Texts puramente descriptivos y naturales (ej. 'Guía avanzada de SEO local' en vez de 'Haz clic aquí').",
      "Asegurarse de enlazar usando la etiqueta HTML estándar <a> para que Google la rastree sin problemas.",
      "Realizar auditorías periódicas para identificar vínculos rotos (Error 404)."
    ],
    badPractices: [
      "Canibalización: Saturar la misma palabra clave en enlaces hacia URLs diferentes.",
      "Cargar excesivamente una página con cientos de enlaces innecesarios, diluyendo la autoridad."
    ],
    quiz: {
      question: "¿Acerca del atributo ALT en imágenes con enlaces internos, cómo reacciona Google?",
      options: ["Lo ignora por ser puramente decorativo", "Lo procesa como si fuera el texto ancla (anchor text)", "Lo usa únicamente para Google Imágenes", "Penaliza a la web debido a problemas de accesibilidad"],
      correctAnswer: 1,
      explanation: "Google lee directamente el atributo de texto alternativo (ALT) de la imagen y lo procesa de manera idéntica al texto ancla (anchor text) convencional de los enlaces de texto."
    },
    infographic: {
      title: "Flujo de Autoridad (Topic Clusters)",
      steps: [
        { icon: "Maximize2", label: "Página Pilar (Hub Central)" },
        { icon: "ChevronRight", label: "Páginas Satélite Especializadas" },
        { icon: "Network", label: "Retroalimentación de Enlaces" }
      ]
    }
  },
  {
    id: 'indexacion',
    title: 'Indexación y Crawl Budget',
    icon: 'Search',
    estimatedTime: '5 min',
    content: `
Si Google no puede rastrear o comprender lo que hay en tus páginas, da igual el diseño web o qué tan rápido carguen; **tu web no existirá en los resultados orgánicos**.

### Crawl Budget (Presupuesto de Rastreo)
El *Crawl Budget* es la cantidad limitada de URLs que los robots de Google están dispuestos y pueden permitirse rastrear de tu web en un corto periodo. 
- En arquitecturas web complejas o sitios extremadamente masivos, cuidar cada URL es de suma prioridad para evitar quemar recursos.

### Errores Comunes de GSC (Google Search Console)
- **Discovered / Crawled - currently not indexed:** Suelen apuntar a problemas de calidad de contenido (thin-content) o sobrecarga del presupuesto de rastreo.
- **Errores 404:** Páginas o recursos ausentes que destrozan brutalmente el **E-E-A-T** y la credibilidad operativa del sitio a ojos de Google.
    `,
    goodPractices: [
      "Subir o vincular Sitemaps directamente en Search Console.",
      "Definir etiquetas canónicas (<link rel='canonical'>) para gestionar URLs duplicadas y no desperdiciar Crawl Budget.",
      "Tener un archivo robots.txt totalmente limpio y auditable sin bloquear CSS o JS esenciales."
    ],
    badPractices: [
      "Bloquear la renderización en el archivo robots.txt creyendo que así se ahorra Crawl Budget ciegamente.",
      "Permitir la proliferación de rutas y parámetros duplicados sin control de index/noindex."
    ],
    quiz: {
      question: "¿Cuál es el propósito principal de enviar un Sitemap a Search Console?",
      options: ["Garantizar ranking número 1 en Google", "Forzar indexaciones diarias", "Proveer a Google una lista de qué URLs y activos deben priorizarse", "Evitar penalizaciones de Black-Hat SEO"],
      correctAnswer: 2,
      explanation: "Proveer un sitemap indica a Google (mediante jerarquía o prioridades) de forma ordenada las páginas, ayudando a eficientizar enormemente el presupuesto de rastreo."
    },
    infographic: {
      title: "Ciclo de Indexación Exitosa",
      steps: [
        { icon: "Search", label: "Rastreo (Googlebot)" },
        { icon: "Database", label: "Renderizado y Análisis" },
        { icon: "CheckCircle", label: "Indexación en el SERP" }
      ]
    }
  }
];

export const seoFaqs = [
  {
    question: "¿Cuánto tarda Google en indexar un cambio?",
    answer: "Depende de la frecuencia de rastreo del sitio. Puede ir desde unas pocas horas para sitios con alta autoridad hasta semanas para webs nuevas. Usar el botón 'Solicitar indexación' en GSC acelera este proceso."
  },
  {
    question: "¿Es malo tener demasiados enlaces internos?",
    answer: "Google recomienda un número razonable (generalmente menos de un par de cientos por página). Lo más importante es que sean útiles para el usuario y no parezcan spam."
  },
  {
    question: "¿Los Core Web Vitals afectan directamente el ranking?",
    answer: "Sí, Google los utiliza como un factor de ranking oficial (Page Experience Update), aunque el contenido de alta calidad y relevancia sigue siendo el factor número uno."
  },
  {
    question: "¿Qué pasa si bloqueo el JavaScript en robots.txt?",
    answer: "Es una práctica peligrosa. Google necesita procesar el JS para ver tu contenido tal como lo hace un usuario. Bloquearlo puede resultar en una indexación incompleta o nula."
  }
];
