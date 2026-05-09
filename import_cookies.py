"""
Import cookies from cookies.txt into notebooklm-mcp auth cache.
"""
import time
import sys
sys.path.insert(0, r"C:\Users\dani\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\LocalCache\local-packages\Python313\site-packages")

from notebooklm_mcp.auth import AuthTokens, save_tokens_to_cache, get_cache_path

# Read cookie string
with open("cookies.txt", "r") as f:
    cookie_string = f.read().strip()

# Parse key=value pairs
cookies = {}
for part in cookie_string.split(";"):
    part = part.strip()
    if "=" in part:
        k, v = part.split("=", 1)
        cookies[k.strip()] = v.strip()

print(f"Parsed {len(cookies)} cookies")

tokens = AuthTokens(
    cookies=cookies,
    csrf_token="",
    session_id="",
    extracted_at=time.time(),
)

save_tokens_to_cache(tokens)
print(f"Saved to: {get_cache_path()}")
print("Done!")
