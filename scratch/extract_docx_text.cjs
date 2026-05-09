const fs = require('fs');
const path = 'c:/Users/della/OneDrive/Escritorio/seogrowthers/Nueva carpeta/Nueva carpeta/horizons-export-4ae51224-e377-439c-9315-7d2c7f7b11c2/public/doc/BLOG/articulo_sostenibilidad_digital_extracted/word/document.xml';
const xml = fs.readFileSync(path, 'utf8');

// Una forma más robusta de extraer texto de document.xml
// El texto está dentro de etiquetas <w:t>
// Pero los párrafos están en <w:p>
const paragraphs = xml.match(/<w:p[^>]*>.*?<\/w:p>/g) || [];
const cleanText = paragraphs.map(p => {
    const texts = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
    return texts.map(t => t.replace(/<[^>]*>/g, '')).join('');
}).join('\n\n');

console.log(cleanText);
