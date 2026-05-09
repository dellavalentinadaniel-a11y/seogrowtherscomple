const fs = require('fs');

async function download() {
  const url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdiZmMzMTlkYjA3NTRiOTk4YzY5YTlmN2IwMzNhMjZhEgsSBxCltZau6A0YAZIBIwoKcHJvamVjdF9pZBIVQhMzNTEzMTE5OTA4NTU5OTY2ODU5&filename=&opi=89354086";
  const res = await fetch(url);
  const text = await res.text();
  fs.writeFileSync('src/Registrarse.html', text);
}

download();
