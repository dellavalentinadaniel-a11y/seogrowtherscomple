import os
import json
import base64
import sqlite3
import shutil
from pathlib import Path

def get_encryption_key():
    import win32crypt
    local_state_path = os.path.join(os.environ["LOCALAPPDATA"],
                                    "Google", "Chrome",
                                    "User Data", "Local State")
    if not os.path.exists(local_state_path):
        print(f"Local state not found at {local_state_path}")
        return None
        
    with open(local_state_path, "r", encoding="utf-8") as f:
        local_state = f.read()
        local_state = json.loads(local_state)

    key = base64.b64decode(local_state["os_crypt"]["encrypted_key"])
    key = key[5:]
    decrypted_key = win32crypt.CryptUnprotectData(key, None, None, None, 0)[1]
    return decrypted_key

def decrypt_data(data, key):
    try:
        from Crypto.Cipher import AES
        iv = data[3:15]
        data = data[15:]
        cipher = AES.new(key, AES.MODE_GCM, iv)
        return cipher.decrypt(data)[:-16].decode()
    except Exception as e:
        try:
            import win32crypt
            return str(win32crypt.CryptUnprotectData(data, None, None, None, 0)[1].decode())
        except Exception as e:
            return ""

def main():
    cookies = []
    user_data = os.path.join(os.environ["LOCALAPPDATA"], "Google", "Chrome", "User Data")
    
    # Find all cookie databases
    db_paths = []
    for root, dirs, files in os.walk(user_data):
        if "Cookies" in files and "Network" in root:
            db_paths.append(os.path.join(root, "Cookies"))
            
    key = get_encryption_key()
    if not key:
        print("Failed to get encryption key")
        return
        
    for idx, db_path in enumerate(db_paths):
        temp_db = f"temp_cookies_{idx}.db"
        import subprocess
        subprocess.call(f'cmd /c copy /Y "{db_path}" "{temp_db}"', shell=True)
        
        try:
            conn = sqlite3.connect(temp_db)
            cursor = conn.cursor()
            cursor.execute('SELECT host_key, name, value, encrypted_value FROM cookies WHERE host_key LIKE "%google.com%"')
            
            for host_key, name, value, encrypted_value in cursor.fetchall():
                if encrypted_value:
                    decrypted_value = decrypt_data(encrypted_value, key)
                else:
                    decrypted_value = value
                    
                if decrypted_value:
                    cookies.append(f"{name}={decrypted_value}")
            conn.close()
        except Exception as e:
            print(f"Error reading {temp_db}: {e}")
            
        try:
            os.remove(temp_db)
        except:
            pass
    print(f"Extracted {len(cookies)} cookies.")
    with open("extracted_cookies.txt", "w", encoding="utf-8") as f:
        f.write("; ".join(cookies))

if __name__ == "__main__":
    main()
