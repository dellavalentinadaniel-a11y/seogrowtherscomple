import json
import time
import httpx
import websocket

def execute_cdp_command(ws_url, method, params=None):
    ws = websocket.create_connection(ws_url, timeout=30)
    try:
        command = {"id": 1, "method": method, "params": params or {}}
        ws.send(json.dumps(command))
        while True:
            response = json.loads(ws.recv())
            if response.get("id") == 1:
                return response.get("result", {})
    finally:
        ws.close()

def main():
    try:
        # Get list of open pages
        response = httpx.get("http://localhost:9222/json", timeout=5)
        pages = response.json()
    except Exception as e:
        print(f"Failed to connect to Chrome DevTools: {e}")
        return

    # Find a page to connect to
    page = next((p for p in pages if p.get("type") == "page"), None)
    if not page:
        print("No valid page found to extract cookies")
        return

    ws_url = page.get("webSocketDebuggerUrl")
    if not ws_url:
        print("No WebSocket URL found")
        return

    print("Navigating to NotebookLM to load cookies...")
    execute_cdp_command(ws_url, "Network.enable")
    execute_cdp_command(ws_url, "Page.enable")
    execute_cdp_command(ws_url, "Page.navigate", {"url": "https://notebooklm.google.com/"})
    time.sleep(6)

    print("Extracting cookies...")
    result = execute_cdp_command(ws_url, "Network.getCookies")
    cookies = result.get("cookies", [])
    
    # Filter for session cookies
    cookie_str = "; ".join([f"{c['name']}={c['value']}" for c in cookies])
    
    if cookie_str:
        with open("cookies.txt", "w") as f:
            f.write(cookie_str)
        print(f"Successfully extracted {len(cookies)} cookies to cookies.txt")
    else:
        print("No cookies found.")

if __name__ == "__main__":
    main()
