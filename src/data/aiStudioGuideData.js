export const aiStudioGuideData = [
  {
    id: "paradigma-agentes",
    title: "Ingeniería de Software en 2026",
    icon: "Activity",
    estimatedTime: "5 min",
    content: "La ingeniería de software ha evolucionado exponencialmente. Aquí tienes todo lo más relevante que hemos trabajado sobre esta evolución tecnológica y el paradigma de Vibe Coding, organizado para que puedas repasarlo fácilmente:\n\n**1. Contexto de la evolución**\n- Antes: los programadores trabajaban en **IDE** (entornos de desarrollo) escribiendo código manualmente.\n- Ahora: se usan **plataformas de inteligencia artificial autónoma** como **Google AI Studio**, que permiten crear aplicaciones describiendo ideas en lenguaje natural.\n\n**2. El nuevo paradigma: Vibe Coding**\n- El código manual pasa a segundo plano.\n- Los desarrolladores se enfocan en:\n1. **Reglas de negocio** (qué debe hacer la aplicación).\n2. **Experiencia de usuario** (cómo se ve y se siente).\n- La IA traduce esas ideas en software funcional.\n\n**3. Herramientas clave**\n- **Google AI Studio**: plataforma central para crear, configurar y desplegar aplicaciones.\n- **Antigravity**: motor avanzado que mantiene todo conectado y permite modificar simultáneamente: Interfaz de usuario (frontend), Conexiones internas (APIs) y Configuración en la nube.\n- **Firebase Studio**: precursor experimental que será cerrado en 2027 para centralizar todo en AI Studio y Antigravity.\n\n**4. Ejemplo cotidiano**\nUn dueño de tienda de ropa puede pedirle a la IA:\n- “Quiero una página web moderna para mostrar productos, permitir compras con tarjeta y funcionar en celulares.”\nLa IA construye la página automáticamente y agrega funciones adicionales (mapa, contacto, promociones) según las instrucciones.\n\n**5. Guion paso a paso para pedir una web**\n*(Te enseñaremos el prompting avanzado de despliegue en los próximos módulos del curso)*\n\n**6. Ideas clave para repasar**\n- **Rol del desarrollador**: pasa de escribir código a ser arquitecto de ideas.\n- **IA como asistente**: convierte instrucciones en aplicaciones completas.\n- **Centralización**: todo se integra en un mismo entorno, evitando saltar entre plataformas.\n- **Impacto real**: más tiempo para la creatividad y la estrategia, menos en tareas técnicas repetitivas.",
    goodPractices: [
      "Utilizar lenguaje natural descriptivo sobre las reglas de negocio y no instrucciones rígidas a nivel de código línea por línea.",
      "Emplear Google AI Studio para desarrollos rápidos desde el prompt hacia producción.",
      "Utilizar Node.js (v20 o superior) y el agente Antigravity de forma local si el desarrollo prioriza programación tradicional combinada."
    ],
    badPractices: [
      "Tratar el agente como un autocompletador de código tradicional; se pierde el valor de su contexto global.",
      "Intentar crear nuevos espacios de trabajo en Firebase Studio (obsoleto)."
    ],
    infographic: {
      title: "Flujo del Paradigma 2026",
      imageUrl: "/images/guia/1.webp",
      alt: "Esquema visual mostrando el paso de IDEs tradicionales con cierre de Firebase Studio en 2027 hacia el ecosistema centralizado de Google AI Studio, empleando Vibe Coding y el motor Antigravity."
    },
    quiz: {
      question: "¿Cuál es el núcleo de la metodología 'vibe coding' en plataformas autónomas de 2026?",
      options: [
        "Escribir todo el código manualmente y usar IA solo para revisiones de sintaxis.",
        "Mover la escritura sintáctica a un segundo plano para centrarse en describir semánticamente las reglas del negocio y la UX.",
        "Automatizar tests unitarios pero restringir la creación de APIs al desarrollador humano."
      ],
      correctAnswer: 1,
      explanation: "El vibe coding prioriza la definición arquitectónica y semántica de los requerimientos en lenguaje natural, delegando la construcción, integración y codificación simultánea en las inteligencias de los agentes."
    }
  },
  {
    id: "ideacion-stitch",
    title: "Diseño Generativo con Google Stitch",
    icon: "Code",
    estimatedTime: "7 min",
    content: "El flujo moderno de desarrollo no arranca con código puro, sino con la conceptualización de interfaces con **Google Stitch**. Stitch es una herramienta de diseño generativa que no solo dibuja Mockups como IA de imágenes, sino que *entiende orgánicamente* la jerarquía del DOM y las interacciones entre los componentes.\n\nAl ingresar instrucciones de texto o vía el *Voice Picker*, Stitch puede generar variaciones A/B y maquetas completas con paletas coherentes.\n\nUna vez la maqueta está lista, se invoca el protocolo MCP y la opción *Build in AI Studio*. El agente transcompila de inmediato todo el entorno gráfico a código React altamente modular, inyectando jerarquías Tailwind CSS. El trayecto que solía demorar días se condensa rutinalmente entre 20 a 45 minutos gracias a esta transición visual-a-semántica.",
    goodPractices: [
      "Ser específico con la jerarquía en los dictados de Voice Picker para generar layouts más precisos de grid o flexbox.",
      "Aprovechar los mapas térmicos (heat maps) predictivos de Stitch para balancear el UI antes de pasarlo al código."
    ],
    badPractices: [
      "Omitir el paso por Stitch y tratar de ajustar CSS complejos mediante cientos de comandos de texto en AI Studio directamente."
    ],
    infographic: {
      title: "Pipeline de Generación Stitch",
      imageUrl: "/images/guia/2.webp",
      alt: "Infografía del diseño generativo con Google Stitch y agentes de IA: Evolución desde el conceptualizado con Voice Picker hasta transcompilación automática hacia despliegues modulares en React/Tailwind."
    },
    quiz: {
      question: "¿Qué ventaja vital tiene Google Stitch frente a otras IAs generadoras de imágenes tradicionales en el contexto del desarrollo de software?",
      options: [
        "Genera imágenes de fondo con mayor resolución visual para publicidades.",
        "Exporta automáticamente a formato de Photoshop (PSD) para edición manual.",
        "Entiende intrínsecamente la lógica de la interfaz, jerarquías del DOM e interacciones, y puede exportar repositorios de React vía MCP."
      ],
      correctAnswer: 2,
      explanation: "A diferencia de un generador de píxeles, Stitch posee una arquitectura cognitiva orientada al desarrollo, permitiendo transferir un Mockup a un modelo ejecutable de React en segundos usando la opción Build in AI Studio."
    }
  },
  {
    id: "fullstack-y-secretos",
    title: "Entorno Full-Stack y Gestor de Secretos",
    icon: "Shield",
    estimatedTime: "6 min",
    content: "Google AI Studio aprovisiona de forma inteligente entornos **Full-Stack duales** al presionar 'Build'.\n\nPor el lado del cliente domina **React 19** con TypeScript gracias a su inmenso marco referencial en los entrenamientos de LLMs y compiladores que ahorran renderizados inútiles.\n\nPor el servidor, levanta contenedores con **Node.js** permitiendo manipulación pura de lógica comercial y variables de entorno.\n\nUn fallo brutal de seguridad en años anteriores era la exposición de claves en el frontend. La edición 2026 introdujo un **Gestor de Secretos** inviolable integrado directamente. El agente está programado rígidamente para invocar las credenciales a través de `process.env` únicamente dentro del entorno backend (Node.js). Además, si detecta una librería externa que requiere API key, solicita proactivamente al usuario que inserte el dato de manera segura en el prompt sin quemarlo en código duro.",
    goodPractices: [
      "Confiar en el aislamiento de AI Studio: declarar dependencias npm verbalmente y el agente resolverá las instalaciones por sí mismo.",
      "Siempre almacenar credenciales de Stripe, SendGrid o bases de datos en la bóveda de 'Secrets' del Workspace."
    ],
    badPractices: [
      "Deshabilitar las comprobaciones automáticas del agente para intentar quemar (hardcodear) identificadores temporalmente en el frontend."
    ],
    infographic: {
      title: "Arquitectura Full-Stack Segura",
      imageUrl: "/images/guia/3.webp",
      alt: "Diagrama del aprovisionamiento Full-Stack seguro en Google AI Studio separando frontend (React 19) del backend (Node.js) con gestión y solicitud proactiva de credenciales inviolable."
    },
    quiz: {
      question: "¿Cómo reacciona el Agente en AI Studio si omites proporcionarle una clave de API requerida para conectarse a un servicio?",
      options: [
        "Despliega una tarjeta interactiva en el panel de chat solicitando la entrada segura de dicha credencial en el Gestor de Secretos.",
        "Crashea el contenedor y borra el entorno de pruebas.",
        "Inserta una clave pública genérica que es insegura."
      ],
      correctAnswer: 0,
      explanation: "El análisis estático proactivo del agente pausa la ejecución y demanda la inserción de claves de manera encriptada antes de continuar, protegiendo al usuario del desarrollo inseguro."
    }
  },
  {
    id: "bases-de-datos",
    title: "Integración de Bases de Datos (Firebase vs Supabase)",
    icon: "Database",
    estimatedTime: "10 min",
    content: "Las iteraciones interactivas se vuelven aplicaciones reales al anexar almacenamiento. La plataforma ofrece rutas según la arquitectura deseada: Documental o Relacional.\n\n**1. Ecosistema Firebase (NoSQL):** Es la vía automatizada y default.\nAI Studio provee la base de datos Firestore y cuentas de servicio con permisos administrativos bajo la nomenclatura `ais-sandbox@PROJECT_ID.iam.gservice.com`. Permite la configuración de seguridad delegada con la interfaz de consola de Gemini, que redacta reglas basándose en el principio de menor privilegio mediante el comando `/firestore:generate_security_rules`.\n\n**2. Arquitecturas Relacionales (Supabase/PostgreSQL):**\nHacia bases de datos SQL de terceros el flujo se basa en credenciales (API REST y anon key). Como los ecosistemas relacionales son vulnerables a 'alucinaciones' del agente generando sentencias SQL dinámicas impredecibles para los CRUD, el estándar de mejores prácticas de 2026 dicta la inyección de una **'Capa de Herramientas' (Tool Layer)**. Aquí el desarrollador solicita que el generador estructure funciones intermediarias muy estrictas (ej. crear_registro_JSON) que el LLM invoca en vez de concatenar cadenas SQL al aire, protegiendo así la base de datos empresarial.",
    goodPractices: [
      "En proyectos Supabase, implementar siempre un Strict Tool Layer limitando artificialmente al Agente a interactuar mediante JSON.",
      "Re-ejecutar pruebas unitarias de Gemini RLS/Security Rules luego de agregar cualquier nueva colección en Firestore."
    ],
    badPractices: [
      "Confiar de forma ciega en la 'seguridad y arquitectura a través del autocompletado', sin auditar las políticas de control de acceso manualmente.",
      "Asignar proyectos de Google Cloud que ya contengan una capa Firestore activa desde hace años; AI Studio exige instancias nuevas para gestionar permisos sanos."
    ],
    infographic: {
      title: "Modelo Tool Layer Seguro",
      imageUrl: "/images/guia/4.webp",
      alt: "Infografía técnica comparando la vía automatizada default (Firebase NoSQL) contra la arquitectura relacional (Supabase PostgreSQL) mediada por una estricta Capa de Herramientas para evitar alucinaciones SQl."
    },
    quiz: {
      question: "¿Qué papel juega el 'Tool Layer' (Capa de Herramientas) recomendado para bases relacionales como Supabase?",
      options: [
        "Comprime los datos para que Supabase facture un 25% menos por ancho de banda de salida.",
        "Previene alucinaciones y riesgos de seguridad donde el agente concatena o improvisa sentencias SQL de forma desgobernada.",
        "Genera interfaces gráficas en React para inyección visual de bases de datos PostgreSQL."
      ],
      correctAnswer: 1,
      explanation: "El Tool Layer constriñe la maleabilidad de comportamiento de la IA creando barreras operativas. Las herramientas aceptan solo I/O en JSON y mapean estrictamente 1 a 1 a consultas SQL ya preparadas en el servidor, eliminando vulnerabilidades arquitectónicas impredecibles."
    }
  },
  {
    id: "despliegues",
    title: "Despliegues Múltiples (Cloud Run, Vercel y APIs proxy)",
    icon: "Cloud",
    estimatedTime: "8 min",
    content: "La publicación del producto ocurre bifurcada conforme las metas corporativas:\n\n**Google Cloud Run:**\nEs la ruta de integración directa ('1 Clic') transformando la amalgama de código de AI Studio en un contenedor Docker subyacente de altísima disponibilidad. Tras este despliegue automatizado, el mapeo de domino avanza por un balanceador de carga o un registro DNS de validación criptográfica apuntando a la arquitectura de Cloud Run. Es letalmente vital asegurar los endpoints proxy (CORS/auth) que la plataforma expone contra ataques DDos de costos de IA.\n\n**Exportación a Vercel / Netlify:**\nReconocidas por su renderizado del Edge y mejoras con DX para Next.js, se prefiere esta vía por su velocidad frontend asombrosa. Se transfiere generando y extraendo un ZIP empaquetado, migrando el source a Github, y configurando laboriosamente variables de entorno de vuelta.\n\n**Alojamiento Local y Mock APIs:**\nEquipos jóvenes de software importan el código comprimido localmente con un fin monetario estratégico: reemplazar el baseURL e insertar keys de pasarelas de modelo 'Proxy API' descontadas temporalmente hasta que se llegue a la etapa de despliegue donde el fondo del producto permita conectar modelos Gemini puros.",
    goodPractices: [
      "En despliegues de 1-click a Cloud Run, usar Cloud Armor de GCR o CORS estricto para evitar ataques a tu billing de Gemini a través del End-Point público del servidor auto-generado."
    ],
    badPractices: [
      "Exportar proyectos en ZIPs entre equipos de trabajo y asumir que las API Keys originales están compiladas en él. Nunca se envían por política de seguridad."
    ],
    infographic: {
      title: "Rutas de Despliegue de Código",
      imageUrl: "/images/guia/5.webp",
      alt: "Esquema ilustrativo de publicación automatizada para aplicaciones de agentes: Ruta 1-clic de Cloud Run de alta disponibilidad VS Exportación perimetral a Vercel y Alojamiento proxy local."
    },
    quiz: {
      question: "¿Cuál de estos perfiles empresariales tiende estadísticamente a extraer el código a Vercel en lugar de desplegar directo a Cloud Run?",
      options: [
        "Un equipo de backend especializado en procesamientos ML gigantes y canalizaciones masivas.",
        "Una startup enfocada en los First Input Delay, rutas súper rápidas en SSR para optimizar el Frontend bajo Node/Nextjs y UX/DX ágiles.",
        "Administradores de red que exigen contenedores Linux aislados y terminal pura."
      ],
      correctAnswer: 1,
      explanation: "Vercel opera de manera magnífica en despliegues con hincapié en el Frontend y renderizados optimizados perimetrales, por tanto el equipo sacrificará la 'conveniencia de 1 clic' a favor del desempeño en React y redes Edge."
    }
  },
  {
    id: "modelos-gemini",
    title: "Economía de Tokens y Modelos Fundacionales 3.1",
    icon: "Zap",
    estimatedTime: "5 min",
    content: "El cerebro operativo, **Gemini**, se ha segmentado estratégicamente para dominar la cadena de desarrollo equilibrando costos operativos, velocidad de inferencia y raciocinio estructural frente a problemas abstractos complejos. Comprender la economía de modelos delata la escalabilidad del sistema.\n\n**1. Gemini 3.1 Pro:** Mente analítica robusta, excelente para flujos densos de Vibe-coding que reestructuran arquitecturas enteras o desarrollan Tool Layers. Su costo roza los $2 a $4 USD/Millón Input, por lo que demanda prudencia financiera en entornos Live.\n\n**2. Gemini 3.1 Flash:** Diseñado como el estándar para alta interactividad en los prototipos diarios. Su meta principal es un TTFT (Time To First Token) relámpago.\n\n**3. Gemini 3.1 Flash-Lite:** Un logro monumental de escalabilidad para empresas. Maneja hasta **1,048,576 tokens** de Contexto Entrada por un coste bajísimo. Capaz de arrastrar y devorar más de 3,000 archivos masivos directamente (como bases de datos MySQL, libros base pesados de JS o Repositorios de Documentación empresarial completos interactuando asincrónicamente mediante *Batch API*).",
    goodPractices: [
      "Usar Batch API Tasks al 50% de descuento con el modelo Flash-Lite si precisas analizar terabytes de logs acumulados en formato JSON desde infraestructuras.",
      "Emplear el Free-Tier moderadamente para ideación de UI; el techo actual va entre las 5/15 llamadas y Rate limits rápidos."
    ],
    badPractices: [
      "Utilizar ciega e indiscretamente Gemini 3.1 Pro en bucles de producción de interacciones banales de interfaces (se agota tu margen económico)."
    ],
    infographic: {
      title: "Selección del Modelo IA",
      imageUrl: "/images/guia/6.webp",
      alt: "Diagrama evolutivo del Modelo Gemini 3.1 detallando la cadena de desarrollo equilibrando tokens, velocidad y coste computacional: Mente Pro, interactivo Flash, y gran escala analítica Flash-Lite."
    },
    quiz: {
      question: "¿Cuál es la cualidad técnica sobresaliente de la arquitectura de Gemini 3.1 Flash-Lite?",
      options: [
        "Garantiza un análisis gramatical 100% puro al nivel de Pro para códigos relacionales enormes.",
        "Permite el almacenamiento interno en frío de la nube de Firebase de forma asíncrona.",
        "Mantiene ventanas de contexto gigantes superando 1 millón de tokens con procesamiento asíncrono para ingestas gigantescas minimizando costos."
      ],
      correctAnswer: 2,
      explanation: "El poder diferenciador absoluto de Flash-Lite es devorar repositorios gigantes (código fuente gigante o corpus en PDF pesadísimos) en el prompt de forma baratísima, redefiniendo las capacidades contextuales del agente mediante un millón de tokens de memoria RAM activa."
    }
  }
];

export const aiStudioFaqs = [
  {
    question: "¿Tengo que aprender a programar para usar Google AI Studio en 2026?",
    answer: "El paradigma ha mutado de \"escribir código\" a \"describir reglas de negocio\". Aunque no necesitas saber la sintaxis perfecta de lenguajes como C++ o JavaScript, sí debes desarrollar pensamiento sistémico para orquestar la lógica (vibe coding) y gestionar bases de datos con el agente."
  },
  {
    question: "¿Qué ocurre con mis proyectos anteriores en Firebase Studio?",
    answer: "Firebase Studio está programado para su desconexión en 2027. La modernización requiere importar tu esquema de datos mediante los nuevos agentes a un entorno nativo y renovado de Google AI Studio, o transicionar tu lógica hacia un Tool Layer si usas PostgreSQL/Supabase."
  },
  {
    question: "¿Es seguro dar control a un agente sobre la base de datos conectada?",
    answer: "La clave en el 2026 radica en la implementación del 'Tool Layer'. En lugar de dictar sentencias SQL directas (que podrían suponer riesgos inmensos de pérdida de datos por alucinación), fuerzas al agente a hablar solo vía endpoints pre-configurados."
  },
  {
    question: "¿Cuál es la principal ventaja de descargar el archivo ZIP hacia Vercel, VS Cloud Run?",
    answer: "Cloud Run brinda una integración con Google Cloud casi trivial (1-Click Deploy). Sin embargo, plataformas Edge como Vercel otorgan mejoras de First Input Delay insuperables para Single Page Applications (SPA) y facilitan integraciones fluidas con repositorios en Github."
  }
];

