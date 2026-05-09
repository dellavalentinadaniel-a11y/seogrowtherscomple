import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

EXE = r"C:\Users\dani\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\LocalCache\local-packages\Python313\Scripts\notebooklm-mcp.exe"

async def call_list_notebooks():
    server_params = StdioServerParameters(command=EXE, args=[], env=None)

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            tools = await session.list_tools()
            tool_names = [t.name for t in tools.tools]
            print("Tools:", tool_names)

            # Call notebook_list tool
            if "notebook_list" in tool_names:
                result = await session.call_tool("notebook_list", {})
                print("\nNotebooks:")
                print(result)
            else:
                print("No notebook_list tool found!")

if __name__ == "__main__":
    asyncio.run(call_list_notebooks())
