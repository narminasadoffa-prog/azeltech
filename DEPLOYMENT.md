# Deployment Guide - Azel Tech Website

Bu sənəd proyektin `azeltech.midiya.az` serverinə deployment prosesini izah edir.

## Server Məlumatları

- **Domain**: azeltech.midiya.az
- **FTP Server**: azeltech.midiya.az və ya 68.183.173.136
- **FTP Port**: 21
- **FTP İstifadəçi**: azeltech_ftp
- **FTP Parol**: uMdSqxQaQXCG

## Database Məlumatları

- **Database**: azeltech_midiya
- **İstifadəçi**: azeltech_db
- **Parol**: 5Fx25jp6Xp5z4ckORjwNxKRH
- **Host**: 127.0.0.1
- **Port**: 5432
- **Connection String**: `postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya`

## Deployment Addımları

### 1. Lokal Hazırlıq

```bash
# Dependencies install et
npm install

# Environment variables yarat (.env.production)
# Aşağıdakı məzmunu .env.production faylına əlavə edin:
```

**`.env.production` faylı yaradın:**
```env
# Database - PostgreSQL
DATABASE_URL="postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya"

# Server
PORT=3001
NODE_ENV=production

# JWT
JWT_SECRET=change-this-to-a-secure-random-string-in-production

# API URL
VITE_API_URL=https://azeltech.midiya.az/api

# Frontend URL
FRONTEND_URL=https://azeltech.midiya.az
```

```bash
# Frontend build et
npm run build

# Prisma client generate et
npx prisma generate

# Deployment scripti çalıştır (Linux/Mac üçün)
chmod +x deploy.sh
./deploy.sh
```

### 2. Serverə Upload (FTP ilə)

FTP client (FileZilla, WinSCP və s.) istifadə edərək bütün faylları serverə yükləyin:

**Yüklənəcək fayllar və qovluqlar:**
- `dist/` - Frontend build edilmiş fayllar
- `server/` - Backend kodları
- `prisma/` - Database schema və migration faylları
- `public/` - Static fayllar (uploads, cvs qovluqları ilə)
- `package.json` və `package-lock.json`
- `ecosystem.config.js` - PM2 konfiqurasiyası
- `.env.production` - Production environment variables
- `node_modules/` - Yox, bu yüklənməməlidir! Serverdə `npm install` ediləcək

**Qeyd**: `node_modules/` və `.git/` qovluqlarını serverə yükləməyin. Serverdə `npm install` edəcəksiniz.

### 3. Serverdə Quraşdırma (SSH ilə)

SSH ilə serverə qoşulun və aşağıdakı əmrləri yerinə yetirin:

```bash
# Proyekt qovluğuna keçin (FTP-də yüklədiyiniz yer)
cd /path/to/project

# Dependencies install et
npm install --production

# Environment variables yoxlayın
cat .env.production

# Prisma migrations apply et
npx prisma migrate deploy

# Prisma client generate et
npx prisma generate

# Zəruri qovluqları yaradın
mkdir -p public/uploads
mkdir -p public/cvs
mkdir -p logs

# Permissions verin
chmod -R 755 public
chmod -R 755 logs

# PM2 ilə backend başlat
pm2 start ecosystem.config.js

# PM2 startup scripti yarat (server restart-dan sonra avtomatik başlamaq üçün)
pm2 save
pm2 startup

# PM2 status yoxlayın
pm2 status
pm2 logs azeltech-backend
```

### 4. Web Server Konfiqurasiyası (Nginx)

Nginx istifadə edirsinizsə, aşağıdakı konfiqurasiyadan istifadə edin:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name azeltech.midiya.az;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name azeltech.midiya.az;

    # SSL sertifikatları (Let's Encrypt və s.)
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend - Static files
    root /path/to/project/dist;
    index index.html;

    # Frontend routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static file uploads
    location /uploads {
        alias /path/to/project/public/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # CV files
    location /cvs {
        alias /path/to/project/public/cvs;
        # CV faylları şəxsi olduğu üçün cache yox
    }

    # Log files
    access_log /var/log/nginx/azeltech_access.log;
    error_log /var/log/nginx/azeltech_error.log;
}
```

Konfiqurasiyadan sonra:
```bash
# Nginx konfiqurasiyasını yoxlayın
sudo nginx -t

# Nginx restart edin
sudo systemctl restart nginx
```

### 5. Firewall və Portlar

Firewall-da port 3001-in açıq olub olmadığını yoxlayın (yalnız localhost üçün):

```bash
# UFW istifadə edirsinizsə
sudo ufw allow from 127.0.0.1 to any port 3001

# Firewall status
sudo ufw status
```

### 6. Database Migrations

İlk deployment-da:

```bash
# Migration status yoxlayın
npx prisma migrate status

# Migrations apply edin
npx prisma migrate deploy

# Seed data əlavə edin (istəyə görə)
npm run prisma:seed
```

### 7. Monitoring və Logs

```bash
# PM2 monitoring
pm2 monit

# PM2 logs
pm2 logs azeltech-backend --lines 100

# Nginx logs
sudo tail -f /var/log/nginx/azeltech_access.log
sudo tail -f /var/log/nginx/azeltech_error.log
```

## Update Prosesi

Proyekt yeniləndikdə:

```bash
# 1. Lokalda build edin
npm run build
npx prisma generate

# 2. Yalnız dəyişən faylları FTP ilə yükləyin:
#    - dist/
#    - server/
#    - prisma/
#    - package.json

# 3. Serverdə:
cd /path/to/project
git pull  # və ya FTP-dən yükləyib
npm install --production
npx prisma migrate deploy
npx prisma generate
pm2 restart azeltech-backend
```

## Troubleshooting

### Backend başlamır
```bash
# PM2 logs yoxlayın
pm2 logs azeltech-backend

# Database connection yoxlayın
npx prisma studio
```

### Frontend görünmür
- Nginx konfiqurasiyasını yoxlayın
- `dist/` qovluğunun düzgün yerləşdiyini yoxlayın
- Browser console-da error-ları yoxlayın

### Database connection problemi
- `.env.production` faylındakı DATABASE_URL-i yoxlayın
- PostgreSQL servisinin işlədiyini yoxlayın: `sudo systemctl status postgresql`
- Database və user-in mövcud olduğunu yoxlayın

### Upload faylları görünmür
- `public/uploads` qovluğunun permissions-ını yoxlayın
- Nginx konfiqurasiyasını yoxlayın
- File paths-in düzgün olduğunu yoxlayın

## Təhlükəsizlik

1. **JWT_SECRET**-i production-da dəyişdirin
2. `.env.production` faylını public repository-də yayımlamayın
3. Database parollarını dəyişməyi düşünün
4. SSL sertifikatı istifadə edin (HTTPS)
5. Regular backup-lar aparın

## Support

Problem olduqda:
1. PM2 logs: `pm2 logs azeltech-backend`
2. Nginx logs: `/var/log/nginx/azeltech_error.log`
3. Database: `npx prisma studio`

