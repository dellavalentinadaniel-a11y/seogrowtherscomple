import asyncio
import json
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run():
    server_params = StdioServerParameters(
        command="C:\\Users\\dani\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python313\\Scripts\\notebooklm-mcp.exe",
        args=[]
    )

    notebook_id = "c384d06d-454d-4cce-9cd3-f4e8ab4d89bf"
    queries = [
        {
            "name": "pillar",
            "query": "Escribe un artículo extenso (Artículo Pilar) sumamente atractivo titulado 'La Guía Definitiva de Fundamentos SEO y Directrices de Google Search Central para 2026'. Basate solo en las fuentes de este cuaderno. Devuelve SOLAMENTE código HTML válido y semántico sin backticks (solo <p>, <h2>, <h3>, <ul>, <li>, <strong>) listo para inyectar en un renderizador de React (como dangerouslySetInnerHTML). No incluyas el <h1> con el título de la página, empieza directo con una introducción de impacto."
        },
        {
            "name": "satellite1",
            "query": "Escribe un artículo medianamente corto (Artículo Satélite) titulado 'Cómo optimizar tu Core Web Vitals paso a paso'.  Devuelve SOLAMENTE código HTML válido sin backticks (solo <p>, <h2>, <ul>). Empieza directo con el contenido sin <h1> de título."
        },
        {
            "name": "satellite2",
            "query": "Escribe un artículo medianamente corto (Artículo Satélite) titulado 'El Mapa del Tesoro Visual: SEO Extremo para Imágenes'. Devuelve SOLAMENTE código HTML válido sin backticks (solo <p>, <h2>, <ul>). Empieza directo con el contenido sin <h1> de título."
        }
    ]

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            for q in queries:
                print(f"--- Generating {q['name']} ---")
                try:
                    result = await session.call_tool("notebook_query", {
                        "notebook_id": notebook_id,
                        "query": q["query"],
                        "timeout": 180.0
                    })
                    # Attempt to extract the text content from the weird NotebookLM object
                    # We print everything to an output file
                    with open(f"mcp_{q['name']}.txt", "w", encoding="utf-8") as f:
                        f.write(str(result))
                    print(f"[{q['name']}] Done.")
                except Exception as e:
                    print(f"Error on {q['name']}: {e}")

if __name__ == "__main__":
    asyncio.run(run())
