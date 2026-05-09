import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

EXE = r"C:\Users\dani\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\LocalCache\local-packages\Python313\Scripts\notebooklm-mcp.exe"

async def main():
    server_params = StdioServerParameters(command=EXE, args=[], env=None)
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await session.list_tools()
            for t in tools.tools:
                desc = t.description[:80] if t.description else ""
                print(f"{t.name}: {desc}")

asyncio.run(main())
