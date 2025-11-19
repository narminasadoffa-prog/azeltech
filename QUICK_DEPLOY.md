# Quick Deployment Guide

Bu qısa guide ilə proyekti tez bir zamanda serverə deploy edə bilərsiniz.

## 1. Lokal Hazırlıq (Bir dəfə)

```bash
# Dependencies install
npm install

# Environment faylı yarat (.env.production)
# Aşağıdakı məzmunu .env.production faylına kopyalayın:
```

**`.env.production` faylı yaradın:**
```
DATABASE_URL="postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya"
PORT=3001
NODE_ENV=production
JWT_SECRET=change-this-to-secure-random-string
VITE_API_URL=https://azeltech.midiya.az/api
FRONTEND_URL=https://azeltech.midiya.az
```

```bash
# Build və hazırlıq
npm run deploy:prepare
```

## 2. FTP ilə Upload

**FileZilla və ya başqa FTP client istifadə edərək:**

1. FTP bağlantısı:
   - Host: `azeltech.midiya.az` və ya `68.183.173.136`
   - Port: `21`
   - Username: `azeltech_ftp`
   - Password: `uMdSqxQaQXCG`

2. Bütün faylları yükləyin (yalnız `node_modules` və `.git` istisna):
   - `dist/` ✅
   - `server/` ✅
   - `prisma/` ✅
   - `public/` ✅
   - `package.json` ✅
   - `package-lock.json` ✅
   - `ecosystem.config.js` ✅
   - `.env.production` ✅
   - `.gitignore` ✅

**Qeyd:** `node_modules/` və `.git/` yükləməyin!

## 3. Serverdə Quraşdırma (SSH)

```bash
# SSH ilə serverə qoşulun
ssh your-user@azeltech.midiya.az

# Proyekt qovluğuna keçin
cd /path/to/your/project

# Dependencies install (yalnız production)
npm install --production

# Database migrations
npx prisma migrate deploy

# Prisma client generate
npx prisma generate

# Qovluqlar yarat
mkdir -p public/uploads public/cvs logs

# Permissions
chmod -R 755 public logs

# PM2 ilə başlat
pm2 start ecosystem.config.js

# PM2 startup
pm2 save
pm2 startup

# Status yoxla
pm2 status
pm2 logs azeltech-backend
```

## 4. Nginx Konfiqurasiyası

`/etc/nginx/sites-available/azeltech.midiya.az` faylına əlavə edin:

```nginx
server {
    listen 443 ssl http2;
    server_name azeltech.midiya.az;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /path/to/project/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /uploads {
        alias /path/to/project/public/uploads;
        expires 30d;
    }
    
    location /cvs {
        alias /path/to/project/public/cvs;
    }
}

server {
    listen 80;
    server_name azeltech.midiya.az;
    return 301 https://$server_name$request_uri;
}
```

Konfiqurasiyadan sonra:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## 5. Update Prosesi (Sonrakı dəfələr)

```bash
# Lokalda:
npm run build
npx prisma generate

# FTP ilə yalnız dəyişən faylları yükləyin:
# - dist/
# - server/ (əgər dəyişibsə)
# - prisma/ (əgər dəyişibsə)
# - package.json (əgər dəyişibsə)

# Serverdə:
cd /path/to/project
npm install --production  # əgər package.json dəyişibsə
npx prisma migrate deploy  # əgər migration var
npx prisma generate
pm2 restart azeltech-backend
```

## Əsas Komandalar

```bash
# PM2
pm2 status                    # Status yoxla
pm2 logs azeltech-backend     # Logs görüntülə
pm2 restart azeltech-backend  # Restart
pm2 stop azeltech-backend     # Dayandır
pm2 delete azeltech-backend   # Sil

# Database
npx prisma studio             # Database UI
npx prisma migrate status     # Migration status

# Logs
tail -f logs/backend-out.log  # Backend logs
```

## Problemlərin həlli

### Backend başlamır
```bash
pm2 logs azeltech-backend --lines 50
```

### Frontend görünmür
- Browser console-da errors yoxlayın
- Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- `dist/` qovluğunun mövcud olduğunu yoxlayın

### Database bağlantısı
- `.env.production`-dakı DATABASE_URL-i yoxlayın
- PostgreSQL işləyir: `sudo systemctl status postgresql`
- Connection test: `npx prisma studio`

### Upload problemi
- `public/uploads` permissions: `chmod -R 755 public/uploads`
- Nginx konfiqurasiyasını yoxlayın

