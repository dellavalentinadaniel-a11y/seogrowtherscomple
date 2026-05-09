const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Función manual para cargar .env
function loadEnv() {
    const envPath = 'c:/Users/della/OneDrive/Escritorio/seogrowthers/Nueva carpeta/Nueva carpeta/horizons-export-4ae51224-e377-439c-9315-7d2c7f7b11c2/.env';
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
    }
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: Faltan variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const articles = [
    {
        title: "Project Glasswing: la IA ya puede encontrar los errores. ¿Quién los va a corregir?",
        slug: "project-glasswing-ia-errores-seguridad",
        summary: "Anthropic lanza Project Glasswing para identificar vulnerabilidades desconocidas en software crítico mediante IA. El desafío: ¿podemos corregir fallos a la velocidad que la IA los encuentra?",
        content: `
# Project Glasswing: la IA ya puede encontrar los errores. ¿Quién los va a corregir?

Hay un error en el sistema operativo OpenBSD que tenía 27 años. Sobrevivió décadas de revisiones por expertos, campañas intensivas de pruebas automatizadas y el escrutinio constante de una comunidad cuya identidad entera gira alrededor de la seguridad. No lo encontró un equipo de investigadores de élite. Lo encontró una inteligencia artificial, en pocas horas, por menos de 50 dólares.

Unas semanas después, el mismo sistema encontró una vulnerabilidad de 16 años en FFmpeg, la biblioteca de procesamiento de video que vive dentro de navegadores, servicios de streaming, teléfonos y televisores en todo el planeta. Las herramientas automatizadas tradicionales habían ejecutado el código afectado cinco millones de veces sin detectar nada.

Bienvenidos al mundo de Project Glasswing.

## ¿Qué es Project Glasswing?

Anthropic, la empresa detrás del asistente de IA Claude, lanzó Project Glasswing: una iniciativa que usa inteligencia artificial para identificar y remediar vulnerabilidades de ciberseguridad desconocidas en software crítico.

El proyecto reúne a gigantes como Google, Microsoft, Apple y NVIDIA, poniendo a trabajar un nuevo modelo de IA —Claude Mythos Preview— con fines de seguridad defensiva. Anthropic destinó hasta 100 millones de dólares en créditos de uso al proyecto.

## El problema que nadie quería ver

El tiempo medio desde la divulgación de una vulnerabilidad hasta su explotación armada cayó de 771 días en 2018 a pocas horas en 2024. Los atacantes ya operan a velocidad de máquina. Los defensores, todavía a ritmo humano.

## ¿Por qué no lanzarlo al público?

Anthropic tomó una decisión inusual: Mythos Preview quedó restringido a una coalición cerrada. La lógica es simple: un modelo que puede encontrar vulnerabilidades de día cero es también un modelo que podría usarse para atacarlos. El mismo motor que detecta una falla puede escribir el exploit.

## El verdadero problema: encontrar es fácil, corregir es difícil

Aquí está la pregunta incómoda: ¿de qué sirve encontrar miles de vulnerabilidades si el sistema para corregirlas no puede absorberlas?

Los mantenedores de software de código abierto trabajan en su mayoría de forma voluntaria. Cuanto más eficiente se vuelve la IA para detectar problemas, mayor es la presión sobre los humanos que tienen que resolverlos.

## Lo que viene

La pregunta que Project Glasswing deja abierta no es tecnológica. Es organizacional: ¿tenemos la infraestructura y el financiamiento para corregir errores a la velocidad a la que la IA puede encontrarlos?

La IA ya puede encontrar los errores. Ahora nos toca a nosotros.
        `,
        category: "Tendencias",
        featured_image: "/images/blog/project-glasswing.png",
        status: "published"
    },
    {
        title: "Sostenibilidad digital: de iniciativa ESG a ventaja competitiva real",
        slug: "sostenibilidad-digital-ventaja-competitiva-esg",
        summary: "En 2026, digitalizar de forma sostenible ya no es una opción — es el nuevo estándar de competitividad. El 82% de las empresas que invierten en descarbonización obtienen beneficios económicos directos.",
        content: `
# Sostenibilidad digital: de iniciativa ESG a ventaja competitiva real

En 2026, digitalizar de forma sostenible ya no es una opción — es el nuevo estándar de competitividad que los líderes de negocio no pueden ignorar.

## Resumen ejecutivo
El 82% de las empresas que invirtieron en descarbonización obtienen beneficios económicos directos, con retornos medios que superan los 221 millones de dólares por compañía. La pregunta ya no es si integrar la sostenibilidad digital, sino cuánto está costando no hacerlo.

## 1. El nuevo imperativo: digitalizar sin destruir
Los centros de datos consumen entre el 1% y el 2% de la electricidad global. Las organizaciones que comprenden esta convergencia no solo reducen su huella de carbono — también fortalecen su competitividad y resiliencia operativa.

## 2. Los tres ejes de la sostenibilidad digital
- **Infraestructura verde**: Migración a centros de datos alimentados por energía renovable.
- **IA y datos ESG**: Uso de la IA para transparencia y medición de impacto ambiental.
- **Economía circular**: Trazabilidad y criterios ESG en la cadena de suministro.

## 3. Cifras clave
- **82% de empresas**: Obtienen beneficios económicos directos de la descarbonización.
- **40% de ahorro**: En consumo energético con refrigeración líquida.
- **50% de clientes B2B**: Ya priorizan proveedores sostenibles.

## 4. El marco regulatorio
En marzo de 2026 entró en vigor la directiva europea contra el greenwashing. No cumplir tiene consecuencias financieras y reputacionales directas. La normativa exige datos sólidos y reales.

## Conclusión
Las organizaciones que hoy lideran la sostenibilidad digital no lo hacen por imagen — lo hacen porque ven el retorno. Es una ventaja competitiva estructural que atrae capital y consolida la confianza de clientes e inversores.
        `,
        category: "Estrategia",
        featured_image: "/images/blog/sostenibilidad-digital.png",
        status: "published"
    }
];

async function insertArticles() {
    let sessionUser = null;
    console.log('Intentando iniciar sesión como administrador...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: 'dellavalentina.daniel@gmail.com',
        password: 'admin123'
    });

    if (authError) {
        console.warn("Login administrador falló. Intentando registrar usuario temporal...");
        const tempEmail = `temp_admin_${Date.now()}@example.com`;
        const tempPass = 'TempPass123!';
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: tempEmail,
            password: tempPass
        });

        if (signUpError) {
            console.error("Error al registrar usuario temporal:", signUpError.message);
            // Si falla el registro, intentamos insertar sin sesión (por si acaso)
        } else {
            console.log("Usuario temporal registrado:", tempEmail);
            sessionUser = signUpData.user;
        }
    } else {
        console.log("Sesión iniciada con éxito.");
        sessionUser = authData.user;
    }

    console.log('Iniciando inserción de artículos...');
    
    for (const article of articles) {
        const articleToInsert = {
            title: article.title,
            summary: article.summary,
            content: article.content,
            featured_image: article.featured_image,
            slug: article.slug,
            category: article.category,
            created_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('articles')
            .upsert(articleToInsert, { onConflict: 'slug' })
            .select();

        if (error) {
            console.error(`Error insertando artículo "${article.title}":`, error.message);
        } else {
            console.log(`Artículo insertado/actualizado con éxito: ${article.title}`);
        }
    }
}

insertArticles();
