import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run():
    server_params = StdioServerParameters(
        command="C:\\Users\\dani\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python313\\Scripts\\notebooklm-mcp.exe",
        args=[]
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            notebook_id = "c384d06d-454d-4cce-9cd3-f4e8ab4d89bf"
            print("Querying NotebookLM about the Guia Maestra...")
            result = await session.call_tool("notebook_query", {
                "notebook_id": notebook_id,
                "query": "Por favor transcribe la 'Guía Maestra de Implementación' completa o resume detalladamente los puntos de la guía maestra que está en el Studio."
            })
            print(result)

if __name__ == "__main__":
    asyncio.run(run())
