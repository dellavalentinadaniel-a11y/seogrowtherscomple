import os
from PIL import Image
import re
import base64
import json

ROOT_DIR = r'c:\Users\della\OneDrive\Escritorio\seogrowthers\Nueva carpeta\Nueva carpeta\horizons-export-4ae51224-e377-439c-9315-7d2c7f7b11c2'
IMAGE_DIR = os.path.join(ROOT_DIR, 'public', 'images')
SRC_DIR = os.path.join(ROOT_DIR, 'src')
EXTENSIONS = ('.png', '.jpg', '.jpeg')

def optimize_images():
    conversions = {}
    for root, dirs, files in os.walk(IMAGE_DIR):
        for file in files:
            input_path = os.path.join(root, file)
            rel_path = os.path.relpath(input_path, IMAGE_DIR)
            
            if file.lower().endswith(EXTENSIONS):
                output_path = os.path.splitext(input_path)[0] + '.webp'
                
                try:
                    with Image.open(input_path) as img:
                        # Convert to RGB if necessary for JPEG/WebP compatibility
                        if img.mode in ("RGBA", "P"):
                            img = img.convert("RGBA")
                        else:
                            img = img.convert("RGB")
                        img.save(output_path, 'WEBP', quality=80, method=6)
                    
                    old_size = os.path.getsize(input_path)
                    new_size = os.path.getsize(output_path)
                    
                    if new_size < old_size:
                        print(f"Optimized: {rel_path} ({old_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB)")
                        conversions[file] = os.path.splitext(file)[0] + '.webp'
                        # We keep both for now, but in a real scenario we might delete the old one
                    else:
                        if os.path.exists(output_path):
                            os.remove(output_path)
                        print(f"Skipped: {rel_path} (WebP was larger)")
                except Exception as e:
                    print(f"Error processing {file}: {e}")
            
            elif file.lower().endswith('.svg'):
                if os.path.getsize(input_path) > 300 * 1024: # > 300KB
                    try:
                        with open(input_path, 'r', encoding='utf-8', errors='ignore') as f:
                            content = f.read()
                        
                        match = re.search(r'data:image/(png|jpeg);base64,([A-Za-z0-9+/= \n\r]+)', content)
                        if match:
                            fmt = match.group(1)
                            b64_data = match.group(2).replace('\n', '').replace('\r', '').replace(' ', '')
                            output_path = os.path.splitext(input_path)[0] + '.webp'
                            
                            temp_file = f"temp_img.{fmt}"
                            with open(temp_file, "wb") as fh:
                                fh.write(base64.b64decode(b64_data))
                            
                            with Image.open(temp_file) as img:
                                if img.mode in ("RGBA", "P"):
                                    img = img.convert("RGBA")
                                else:
                                    img = img.convert("RGB")
                                img.save(output_path, 'WEBP', quality=80, method=6)
                            
                            os.remove(temp_file)
                            
                            old_size = os.path.getsize(input_path)
                            new_size = os.path.getsize(output_path)
                            print(f"Converted SVG with base64: {rel_path} ({old_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB)")
                            conversions[file] = os.path.splitext(file)[0] + '.webp'
                    except Exception as e:
                        print(f"Error processing SVG {file}: {e}")

    return conversions

def update_references(conversions):
    if not conversions:
        return

    # Sort conversions by length of original filename (descending) to avoid partial matches
    sorted_convs = sorted(conversions.items(), key=lambda x: len(x[0]), reverse=True)
    
    # We will search in src and index.html
    files_to_check = []
    for root, dirs, files in os.walk(SRC_DIR):
        for file in files:
            if file.endswith(('.jsx', '.js', '.css', '.html')):
                files_to_check.append(os.path.join(root, file))
    
    index_html = os.path.join(ROOT_DIR, 'index.html')
    if os.path.exists(index_html):
        files_to_check.append(index_html)

    for file_path in files_to_check:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            for old, new in sorted_convs:
                # We look for the filename in quotes or path contexts
                # Simple replacement for now, but could be more robust
                content = content.replace(old, new)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated references in: {os.path.relpath(file_path, ROOT_DIR)}")
        except Exception as e:
            print(f"Error updating {file_path}: {e}")

if __name__ == "__main__":
    print("Starting image optimization...")
    convs = optimize_images()
    print(f"\nOptimization complete. {len(convs)} files to update.")
    
    with open('conversions.json', 'w') as f:
        json.dump(convs, f)
        
    print("Updating references in codebase...")
    update_references(convs)
    print("All done!")
