# SEOGrowthers - Comunidad SEO & Growth

🚀 **SEOGrowthers** es una plataforma integral para expertos en SEO, Marketing Digital y Growth Hacking, diseñada para facilitar el intercambio de conocimientos y la gestión de contenido especializado.

## 🛠 Tecnologías Utilizadas
- **Frontend**: React.js con Vite, Tailwind CSS y Framer Motion.
- **Backend / Base de Datos**: Supabase (PostgreSQL + Auth + RLS).
- **Iconografía**: Lucide React.
- **Estilo**: Diseño premium con Dark Mode y estética futurista.

## 🔐 Sistema de Roles (RBAC)
Hemos implementado un sistema robusto de Control de Acceso Basado en Roles para garantizar la seguridad de la comunidad:

- **Usuario (User)**: Rol por defecto. Puede participar en el foro, comentar en artículos y gestionar su propio contenido.
- **Moderador (Moderator)**: Supervisores de la comunidad. Tienen permiso para moderar contenido en el Foro y eliminar publicaciones que incumplan las normas.
- **Administrador (Admin)**: Control total sobre la plataforma. Pueden publicar en el Blog de Expertos, gestionar cualquier contenido y administrar roles de usuario.

## 📍 Características Principales
- **Foro en Tiempo Real**: Debates dinámicos con perfiles personalizados.
- **Editor de Experto**: Selección de categorías inteligente según el rol del usuario.
- **Comentarios Seguros**: Sistema de respuestas protegido con políticas de Row Level Security (RLS).
- **Performance**: Optimizado para carga rápida y SEO.

## 🚀 Despliegue
Este proyecto está configurado para desplegarse automáticamente en **Vercel** en cada push a la rama `main`.

---
*Desarrollado con ❤️ para la comunidad de SEOGrowthers.*

## 📜 Bitácora de Desarrollo

### Jornada de Mantenimiento: 19 de Abril de 2026

Durante esta sesión, se llevó a cabo un proceso intensivo de depuración y estabilización ("debugging") para resolver problemas críticos que impedían la correcta visualización de los contenidos del blog (específicamente la vertical "Crianza Digital").

A continuación se detalla el control de fases, errores hallados, soluciones aplicadas y tiempo invertido en cada bloque.

#### Fase 1: Auditoría de Datos y Base de Datos (Tiempo est.: 30 min)
- **Objetivo**: Determinar por qué los artículos publicados no eran visibles para los lectores a pesar de existir en la base de datos de Supabase.
- **Hallazgos**: Se verificó la tabla `articles`. Los artículos contaban con estado `published` y respetaban las políticas de seguridad de Row Level Security (RLS) que permiten la visibilidad pública. La data existía, pero el frontend no la procesaba bien.

#### Fase 2: Corrección de Race Conditions en Fetch (Tiempo est.: 45 min)
- **Problema**: Carrera de obstáculos (race condition) en `BlogPage.jsx` y problemas de enrutamiento estricto en `ArticleDetail.jsx`.
- **Solución**:
  - En **BlogPage**: Se condicionó el disparo del `useEffect` de artículos para que esperase irrevocablemente a tener el catálogo de `categories` cargado.
  - En **ArticleDetail**: Se modificó robustamente la función `fetchArticle()`. Se eliminó la dependencia estricta a un slug unitario por una consulta flexible `orFilter` con `.maybeSingle()`, permitiendo buscar al artículo usando rutas completas, parciales o categorías compuestas.

#### Fase 3: Resolución del White Screen of Death (Tiempo est.: 30 min)
- **Problema**: Pantalla totalmente en blanco al intentar acceder a los detalles del artículo.
- **Error Detectado**: `Uncaught ReferenceError: LayoutGrid is not defined`.
- **Análisis**: El componente fallaba espectacularmente su inicialización porque intentaba montar el ícono `LayoutGrid` de la librería `lucide-react`, la cual no lo exportaba en el entorno actual.
- **Solución**: 
  - Traceamos el error.
  - Se sustituyó `LayoutGrid` por `List` de forma segura en las importaciones y la maqueta HTML (JSX) en `ArticleDetail.jsx`.
  - Se previno el mismo colapso futuro refactorizando paralelamente `LayoutGrid` por `Layout` en la página `ForumPage.jsx`.

#### Fase 4: QA, Limpieza y Despliegue en Producción (Tiempo est.: 15 min)
- **Objetivo**: Asegurar de que ningún otro error `ReferenceError` fantasma provocase cierres en vivo. 
- **Solución**: Se forzó una corrida completa del motor de paquetes (`npm run build`) validando con éxito toda la aplicación. Posteriormente, se consolidaron los cambios (`git commit`) argumentando la corrección de errores de interfaz y se empujó a la rama productiva de GitHub (`git push`).

### Jornada de Estabilización y UX Móvil: 6 de Mayo de 2026

En esta sesión se resolvieron bugs críticos de enrutamiento y se implementó una mejora sustancial en la experiencia de usuario móvil (UX) y SEO.

#### Fase 1: Corrección de Enrutamiento Crítico (Bug de Wildcards)
- **Problema**: Las páginas de Casos de Éxito y Testimonios eran inaccesibles debido a que la ruta dinámica `services/:slug` estaba declarada antes que las rutas específicas, capturando todo el tráfico de `/services/*`.
- **Solución**: Se reordenó el clúster de rutas en `App.jsx`, moviendo las rutas específicas (`success-cases`, `testimonials`) antes de la ruta dinámica.

#### Fase 2: Implementación de Menú Móvil y UI Fixes
- **Problema**: El botón de "Auditoría Gratis" estaba oculto en móviles y no existía un menú de navegación lateral (hamburger menu), limitando la navegación en dispositivos táctiles.
- **Solución**:
  - Se creó el componente `MobileMenu.jsx` con animaciones suaves mediante Framer Motion.
  - Se integró el menú en el `Layout` principal utilizando el contexto `MobileMenuContext`.
  - Se habilitó el toggle del menú y se restauró la visibilidad del botón de acción (CTA) en el `Header.jsx`.

#### Fase 3: Optimización SEO y Sitemap
- **Problema**: El esquema JSON-LD de servicios apuntaba erróneamente a España como área de servicio. El `sitemap.xml` contenía URLs incorrectas (`/privacy`, `/terms`) y faltaba el foro.
- **Solución**:
  - Se actualizó `seoHelpers.js` para establecer **Argentina** como `areaServed` por defecto.
  - Se corrigieron las rutas en el sitemap a `/privacy-policy` y `/terms-of-service`.
  - Se añadió la entrada del Foro y se ajustaron las prioridades de indexación.

**Estado**: Todos los cambios han sido verificados y subidos a la rama `main` de producción.

**Tiempo total estimado de la jornada:** ~1.5 horas.