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
            "name": "guide_urls",
            "query": "En tus fuentes hay información sobre Errores y Cómo Nombrar Páginas Web. Genera una 'Guía Maestra' sobre 'Nomenclatura y URLs para SEO'. Devuelve SOLAMENTE código HTML válido sin backticks (<ul>, <p>, <h2>, <h3>). No uses markdown."
        },
        {
            "name": "guide_metadata",
            "query": "En tus fuentes hay información sobre Fragmentos y Metadatos de Búsqueda (metadescripciones, títulos). Genera una 'Guía Maestra' de implementación en HTML puro sin backticks ni etiquetas markdown."
        },
        {
            "name": "guide_images",
            "query": "En tus fuentes hay información sobre Optimización de Imágenes para Google. Genera una 'Guía Maestra' completa sobre SEO Visual en HTML puro sin backticks ni etiquetas markdown."
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
                    with open(f"mcp_{q['name']}.txt", "w", encoding="utf-8") as f:
                        f.write(str(result))
                    print(f"[{q['name']}] Done.")
                except Exception as e:
                    print(f"Error on {q['name']}: {e}")

if __name__ == "__main__":
    asyncio.run(run())
