const fs = require('fs');
const path = require('path');

const blogDir = './public/doc/BLOG';

// Mapeo manual de metadatos para los artículos conocidos
const articleMetadata = {
    'project-glasswing.md': {
        title: "Project Glasswing: la IA ya puede encontrar los errores. ¿Quién los va a corregir?",
        summary: "La inteligencia artificial ha pasado de generar código a supervisarlo. Project Glasswing de Google redefine la ciberseguridad y la calidad del software.",
        featured_image: "/images/blog/project-glasswing.png",
        slug: "project-glasswing-ia-errores",
        category: "Inteligencia Artificial"
    },
    'como-mejorar-respuestas-claude.md': {
        title: "Cómo mejorar las respuestas de Claude: 18 pasos para sacarle el máximo partido",
        summary: "Descubre las técnicas avanzadas de Anthropic para obtener resultados precisos y profesionales con Claude. De etiquetas XML a Chain-of-Thought.",
        featured_image: "/images/blog/mejorar-respuestas-claude.png",
        slug: "mejorar-respuestas-claude-paso-a-paso",
        category: "Productividad IA"
    },
    'google-one-que-es-tarifas-familia.md': {
        title: "Google One: qué es, cuánto cuestan sus tarifas y cómo compartir almacenamiento",
        summary: "Todo lo que necesitas saber sobre el ecosistema de almacenamiento de Google. Planes, precios y la guía definitiva para el Plan Familiar.",
        featured_image: "/images/blog/google-one-familia.png",
        slug: "google-one-guia-tarifas-familia",
        category: "Ecosistema Digital"
    }
};

// Artículo de sostenibilidad (que venía de DOCX, así que lo manejamos aparte)
const sustainabilityArticle = {
    title: "Sostenibilidad digital: de iniciativa ESG a ventaja competitiva real",
    summary: "En 2026, la huella de carbono de tus servidores importa tanto como tu tiempo de carga. Descubre cómo la eficiencia energética es el nuevo KPI.",
    content: `
<h2>El Coste Invisible del Bit</h2>
<p>Durante décadas, el mundo digital se percibió como etéreo e inmaterial. Sin embargo, la explosión de la IA generativa y el procesamiento masivo de datos han revelado una realidad física ineludible: los centros de datos ya consumen una fracción significativa de la energía global.</p>

<h2>De la Responsabilidad al Rendimiento</h2>
<p>Lo que comenzó como una métrica de cumplimiento ESG (Environmental, Social, and Governance) ha evolucionado hacia una ventaja competitiva tangible. Las infraestructuras optimizadas para la sostenibilidad no solo reducen el impacto ambiental, sino que disminuyen drásticamente los costes operativos y mejoran la percepción de marca ante un consumidor cada vez más consciente.</p>

<h2>Estrategias para una Web Verde</h2>
<ul>
    <li><strong>Optimización de Recursos:</strong> Reducción del tamaño de activos y eliminación de código redundante.</li>
    <li><strong>Arquitecturas Serverless:</strong> Escalado dinámico que consume energía solo cuando es necesario.</li>
    <li><strong>Selección de Proveedores:</strong> Migración a regiones de nube alimentadas al 100% por energías renovables.</li>
</ul>

<p>La sostenibilidad digital ya no es opcional; es el estándar de oro para la próxima generación de infraestructuras tecnológicas.</p>
    `,
    featured_image: "/images/blog/sostenibilidad-digital.png",
    slug: "sostenibilidad-digital-esg-competitiva",
    category: "Sostenibilidad"
};

let sql = "-- SQL para insertar 4 nuevos artículos en Supabase\n";
sql += "-- Ejecuta esto en el SQL Editor de tu Dashboard de Supabase\n\n";

function generateSqlForArticle(article) {
    const escapedContent = article.content.replace(/'/g, "''");
    const escapedSummary = article.summary.replace(/'/g, "''");
    const escapedTitle = article.title.replace(/'/g, "''");

    let s = `INSERT INTO articles (title, summary, content, featured_image, slug, category, status, created_at, updated_at)\n`;
    s += `VALUES (\n`;
    s += `  '${escapedTitle}',\n`;
    s += `  '${escapedSummary}',\n`;
    s += `  '${escapedContent}',\n`;
    s += `  '${article.featured_image}',\n`;
    s += `  '${article.slug}',\n`;
    s += `  '${article.category}',\n`;
    s += `  'published',\n`;
    s += `  NOW(),\n`;
    s += `  NOW()\n`;
    s += `)\n`;
    s += `ON CONFLICT (slug) DO UPDATE SET\n`;
    s += `  title = EXCLUDED.title,\n`;
    s += `  summary = EXCLUDED.summary,\n`;
    s += `  content = EXCLUDED.content,\n`;
    s += `  featured_image = EXCLUDED.featured_image,\n`;
    s += `  category = EXCLUDED.category,\n`;
    s += `  updated_at = NOW();\n\n`;
    return s;
}

// Generar para los artículos Markdown
for (const [file, meta] of Object.entries(articleMetadata)) {
    const filePath = path.join(blogDir, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        sql += generateSqlForArticle({ ...meta, content });
    }
}

// Generar para el de sostenibilidad
sql += generateSqlForArticle(sustainabilityArticle);

fs.writeFileSync('insert_all_new_articles.sql', sql);
console.log('Archivo SQL generado con 4 artículos: insert_all_new_articles.sql');
