import asyncio
import json
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

EXE = r"C:\Users\dani\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\LocalCache\local-packages\Python313\Scripts\notebooklm-mcp.exe"

async def main():
    server_params = StdioServerParameters(command=EXE, args=[], env=None)

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            result = await session.call_tool("notebook_list", {})
            for item in result.content:
                text = getattr(item, 'text', str(item))
                try:
                    data = json.loads(text)
                    if isinstance(data, dict) and "notebooks" in data:
                        for nb in data["notebooks"]:
                            print(f"ID: {nb.get('id')}")
                            print(f"Title: {nb.get('title')}")
                            print(f"Source Count: {nb.get('source_count')}")
                            print(f"Modified: {nb.get('modified_at')}")
                            print("-"*50)
                    else:
                        print(json.dumps(data, indent=2, ensure_ascii=False))
                except Exception:
                    print(text)

if __name__ == "__main__":
    asyncio.run(main())
