# Evolvix Mobile Performance & VPS Deep Optimization Guide

Based on the diagnosis of your application, you are using **Vite + React (SPA)** rather than Next.js. This actually means your web app can be **even faster** if deployed correctly because we can bypass Node.js entirely in production!

Here are the complete, correctly tailored instructions to optimize your Vite + Three.js application.

---

## 🚀 1. How to Build & Serve for Production (NO PM2 needed)

A Vite app compiles down to pure static HTML, CSS, and JS (the `dist` folder). **You do NOT need PM2 or Node.js to serve it in production**. Serving static files directly through Nginx is over 50x faster and uses almost 0 RAM compared to running `npm run preview` in PM2.

### Local Build Step:

1. Run `npm run build` on your local machine or your VPS.
2. This creates a `dist` folder.
3. You will copy the _contents_ of this `dist` folder to your Nginx web root (usually `/var/www/evolvix-website/html` or similar).

---

## 🌍 2. The Optimized Nginx Config for Vite (Replaces PM2)

Since we are serving static files, we don't need `proxy_pass http://localhost:3000`. We just serve the files directly and let Nginx handle the caching!

SSH into your VPS and replace your Nginx config:

```bash
# Backup your current config
sudo cp /etc/nginx/sites-available/evolvix /etc/nginx/sites-available/evolvix.backup

# Open for editing
sudo nano /etc/nginx/sites-available/evolvix
```

**Paste this exact configuration:**

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # Point this to your Vite 'dist' folder
    root /var/www/evolvix-website/dist;
    index index.html;

    # SSL Configuration (Keep your existing path)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Compression (Important for Three.js)
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml font/woff2 font/woff;
    gzip_min_length 256;

    # Vite React Router fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache JavaScript and CSS (Vite hashes these files, so safe to cache permanently)
    location ~* \.(js|css)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Cache 3D Models & Heavy Assets (Crucial for mobile load time!)
    location ~* \.(gltf|glb|fbx|obj|bin|hdr)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
        # Enable CORS if loading from a different subdomain/CDN
        add_header Access-Control-Allow-Origin "*";
    }

    # Images and Fonts
    location ~* \.(jpg|jpeg|png|gif|ico|webp|avif|svg|woff2|woff)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Logs
    access_log /var/log/nginx/evolvix_access.log;
    error_log /var/log/nginx/evolvix_error.log;
}
```

```bash
# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

---

## ☁️ 3. Cloudflare Configuration (Best free CDN)

If your VPS is in Europe/USA but users are in India, you **MUST** use Cloudflare, or the 3D model will take 10+ seconds to download.

1. Sign up for Cloudflare and add your domain.
2. Under **Optimization > Caching**, set `Browser Cache TTL` to **1 Year**.
3. Under **Page Rules (or Cache Rules)**, create a rule:
   - URL: `*your-domain.com/evolvix-model/*`
   - Cache Level: **Cache Everything**
   - Edge Cache TTL: **1 Month**
     _Why? Cloudflare normally does not cache heavy 3D files (.glb) automatically. You MUST force it using a Page Rule!_
4. Under **Speed > Optimization**, ensure **Brotli** is ON.

---

## 💻 4. App-Level Optimizations (Already Added Today)

I have already made the following updates to your codebase:

1. **`vite.config.ts` Code Splitting:**
   - We split Three.js, React Three Fiber, React Router, and Framer Motion into separate async chunks. This prevents the browser from freezing while parsing massive JS files, allowing the HTML to render faster!
   - We also added Brotli and Gzip compression plugins. Nginx will serve these pre-compressed assets automatically!

2. **`App.tsx` Smart Mobile Detection:**
   - The canvas now detects if the user is on mobile.
   - If they are, it drops the Pixel Ratio to `1.0` (from `2.0`), disables shadows, enables `low-power` WebGL preference, and disables heavy antialiasing.
   - This prevents mobile devices from running out of memory (RAM) and drastically improves Framerate (FPS).

### Next Steps...

Run `npm run build` locally, compress your `dist` folder into a ZIP, upload it to your VPS, exact it to `/var/www/evolvix-website/dist`, configure the Nginx file above, and you will see a **massive** performance boost.
