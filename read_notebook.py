import asyncio
import json
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

EXE = r"C:\Users\dani\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\LocalCache\local-packages\Python313\Scripts\notebooklm-mcp.exe"
NOTEBOOK_ID = "c384d06d-454d-4cce-9cd3-f4e8ab4d89bf"  # Google Search Central Documentation

async def main():
    server_params = StdioServerParameters(command=EXE, args=[], env=None)

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # List sources in the notebook
            result = await session.call_tool("notebook_sources_list", {"notebook_id": NOTEBOOK_ID})
            for item in result.content:
                text = getattr(item, 'text', str(item))
                try:
                    data = json.loads(text)
                    print(json.dumps(data, indent=2, ensure_ascii=False)[:5000])
                except:
                    print(text[:5000])

if __name__ == "__main__":
    asyncio.run(main())
