import asyncio
import json
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

EXE = r"C:\Users\dani\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\LocalCache\local-packages\Python313\Scripts\notebooklm-mcp.exe"
NOTEBOOK_ID = "c384d06d-454d-4cce-9cd3-f4e8ab4d89bf"

QUERIES = {
    "core_web_vitals": (
        "Explica detalladamente qué son los Core Web Vitals (LCP, INP, CLS), cómo se miden, "
        "cuáles son los umbrales de Google para considerar una página como buena, cuáles son los "
        "errores más comunes que los bajan y qué herramientas usa Google para medirlos. "
        "Dame tips y pasos concretos para optimizarlos."
    ),
    "indexacion_search_console": (
        "¿Cuáles son los errores de indexación más comunes en Google Search Console? "
        "Explica qué es el Crawl Budget, qué son los errores 'Discovered - currently not indexed', "
        "'Crawled - currently not indexed', y errores 404. ¿Cómo se resuelven paso a paso?"
    ),
    "enlazado_interno": (
        "¿Cuál es la importancia del enlazado interno según Google Search Central? "
        "Explica las estrategias de Topic Clusters, la distribución de PageRank interno, "
        "cómo estructurar el anchor text, cuántos enlaces internos poner por página y "
        "cómo usar el enlazado interno para mejorar la indexación y el ranking."
    ),
}

async def main():
    server_params = StdioServerParameters(command=EXE, args=[], env=None)
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            for key, query in QUERIES.items():
                print(f"\n{'='*60}")
                print(f"QUERY: {key}")
                print(f"{'='*60}")
                result = await session.call_tool("notebook_query", {
                    "notebook_id": NOTEBOOK_ID,
                    "query": query
                })
                for item in result.content:
                    text = getattr(item, 'text', str(item))
                    try:
                        data = json.loads(text)
                        answer = data.get("answer", text)
                        print(answer[:3000])
                    except:
                        print(text[:3000])
                print()

asyncio.run(main())
