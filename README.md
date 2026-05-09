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

**Tiempo total estimado de la jornada:** ~2 horas.