const fs = require('fs');
const https = require('https');
const path = require('path');

const screens = [
  { name: 'Registrarse', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdiZmMzMTlkYjA3NTRiOTk4YzY5YTlmN2IwMzNhMjZhEgsSBxCltZau6A0YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTEzMTE5OTA4NTU5OTY2ODU5&filename=&opi=89354086' },
  { name: 'Google_AI_Studio', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzM2YTZlYWY0MDZkYTQ3MmNhNTgzNGZkNzVkZjVkYjI1EgsSBxCltZau6A0YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTEzMTE5OTA4NTU5OTY2ODU5&filename=&opi=89354086' },
  { name: 'Contacto', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2E2MTliNWE3Y2U1MTQxZGQ5NjAzNjI4OGM3ZWU3MmU0EgsSBxCltZau6A0YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTEzMTE5OTA4NTU5OTY2ODU5&filename=&opi=89354086' },
  { name: 'Recursos', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzhmYzFkM2UyNTMxNDRkZWM4ODgxYThmOWUyZTI5MjEwEgsSBxCltZau6A0YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTEzMTE5OTA4NTU5OTY2ODU5&filename=&opi=89354086' },
  { name: 'Noticias', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzk5MDY5NGRlNWIxMTQwNTY5ZTliNzk1YjkxMzY3YzQyEgsSBxCltZau6A0YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTEzMTE5OTA4NTU5OTY2ODU5&filename=&opi=89354086' },
  { name: 'Perfil', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzZkYmVjNjM5NjAzMDRkM2ZhMTJlOGIxNDIwNjcwNjFiEgsSBxCltZau6A0YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTEzMTE5OTA4NTU5OTY2ODU5&filename=&opi=89354086' },
  { name: 'Herramientas', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q1ZGJlNmRlOGM2YTQ5ZmE5NDUyZTk1NTU1ZWYyMGNjEgsSBxCltZau6A0YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTEzMTE5OTA4NTU5OTY2ODU5&filename=&opi=89354086' },
  { name: 'Iniciar_Sesion', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2FlYzgxY2FmMzYyODQ0ZTk4N2QwOWQ4ODUwMzc4MzA0EgsSBxCltZau6A0YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTEzMTE5OTA4NTU5OTY2ODU5&filename=&opi=89354086' },
  { name: 'Servicios', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzE4ZDg1YTFmNGQ0NzRlM2ZiZGRhNzYxOTBkNmNlODg4EgsSBxCltZau6A0YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTEzMTE5OTA4NTU5OTY2ODU5&filename=&opi=89354086' }
];

const dir = path.join(__dirname, 'stitch-html');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

async function run() {
  for (const s of screens) {
    const filePath = path.join(dir, `${s.name}.html`);
    console.log(`Downloading ${s.name}...`);
    const res = await fetch(s.url);
    const text = await res.text();
    fs.writeFileSync(filePath, text);
    console.log(`Saved ${filePath}`);
  }
}

// Since fetch is global in Node 18+, we can just use it inside our CommonJS script.
run().catch(console.error);
