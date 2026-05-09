
#!/bin/bash

# Configuration
DIST_DIR="./dist"
HOSTINGER_HOST="${HOSTINGER_HOST:-ftp.yourdomain.com}"
HOSTINGER_USER="${HOSTINGER_USER:-username}"
HOSTINGER_PASS="${HOSTINGER_PASS:-password}"
REMOTE_DIR="/public_html"

echo "🚀 Starting Deployment Process..."

# 1. Validation
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Ensure environment variables are set."
fi

# 2. Generate Sitemap
echo "🗺️  Generating Sitemap..."
npm run generate:sitemap
if [ $? -ne 0 ]; then
    echo "❌ Sitemap generation failed."
    exit 1
fi

# 3. Build Project
echo "🏗️  Building Project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed."
    exit 1
fi

# 4. Optimize Images (Simple placeholder for compression logic)
# Requires 'imagemin' or similar if implemented, skipping for now to rely on build tool
echo "✨ Build complete."

# 5. Check .htaccess
if [ ! -f "$DIST_DIR/.htaccess" ]; then
    echo "⚠️  Warning: .htaccess missing in dist. Copying from public..."
    cp public/.htaccess $DIST_DIR/ 2>/dev/null
fi

# 6. Upload via LFTP (Requires lftp installed)
# This is a template command. In a real CI environment, secrets should be masked.
echo "📤 Uploading to Hostinger..."

if command -v lftp &> /dev/null; then
    lftp -u "$HOSTINGER_USER","$HOSTINGER_PASS" "$HOSTINGER_HOST" <<EOF
    set ssl:verify-certificate no
    mirror -R -v -e "$DIST_DIR" "$REMOTE_DIR"
    bye
EOF
    echo "✅ Upload complete."
else
    echo "⚠️  lftp not installed. Skipping automatic upload."
    echo "ℹ️  Please upload the contents of '/dist' manually via FileZilla."
fi

# 7. Post-Deployment Check (Simple curl)
echo "🔍 Verifying Deployment..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://seogrowthers.com)

if [ "$RESPONSE" -eq 200 ] || [ "$RESPONSE" -eq 301 ]; then
    echo "✅ Site is reachable (Status: $RESPONSE)."
else
    echo "⚠️  Site might be down (Status: $RESPONSE). Check manually."
fi

echo "🎉 Deployment finished!"
