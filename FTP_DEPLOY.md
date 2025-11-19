# FTP Deployment Guide - azeltech.az

Bu sənəd proyektin FTP serverə yüklənməsi və quraşdırılması prosesini izah edir.

## FTP Məlumatları

- **Host**: azeltech.az (və ya 68.183.173.136)
- **Port**: 21
- **Username**: azeltech
- **Password**: AzelTech2025@!

## Deployment Addımları

### 1. Lokal Hazırlıq

```bash
# Proyekt qovluğuna keçin
cd "C:\Users\user\Desktop\New folder\website\azel-build-pro"

# Build frontend
npm run build

# Prisma client generate
npx prisma generate
```

### 2. FTP ilə Upload

#### Seçim 1: PowerShell Script (Avtomatik)

```powershell
# PowerShell-də scripti çalıştırın
.\ftp_upload.ps1
```

#### Seçim 2: FileZilla (Manual)

1. **FileZilla** açın (və ya başqa FTP client)
2. **Quickconnect**:
   - Host: `azeltech.az` və ya `68.183.173.136`
   - Username: `azeltech`
   - Password: `AzelTech2025@!`
   - Port: `21`
3. **Yüklənəcək fayllar və qovluqlar:**
   - ✅ `dist/` - Frontend build
   - ✅ `server/` - Backend kodları
   - ✅ `prisma/` - Database schema
   - ✅ `public/` - Static fayllar
   - ✅ `package.json` və `package-lock.json`
   - ✅ `ecosystem.config.js` - PM2 konfiqurasiyası
   - ✅ `Dockerfile` - Docker konfiqurasiyası
   - ✅ `.dockerignore`
   - ✅ `coolify.yml` - Coolify konfiqurasiyası
   - ✅ `nginx.conf` - Nginx konfiqurasiyası
   - ❌ `node_modules/` - YOX (serverdə install ediləcək)
   - ❌ `.git/` - YOX
   - ❌ `.env*` - YOX (serverdə yaradılacaq)

### 3. Serverdə Quraşdırma (SSH)

SSH ilə serverə qoşulun:

```bash
# SSH connection (username və host dəyişdirin)
ssh username@azeltech.az
# və ya
ssh username@68.183.173.136
```

#### Proyekt qovluğuna keçin

```bash
# FTP-də yüklədiyiniz qovluğa keçin
cd /path/to/project
# Məsələn: cd /var/www/azeltech və ya cd /home/azeltech/public_html
```

#### Dependencies Install

```bash
# Production dependencies install
npm install --production
```

#### Environment Variables

`.env.production` faylı yaradın:

```bash
nano .env.production
```

Aşağıdakı məzmunu əlavə edin:

```env
DATABASE_URL="postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya"
PORT=3001
NODE_ENV=production
JWT_SECRET=change-this-to-a-secure-random-string-in-production
VITE_API_URL=https://azeltech.midiya.az/api
FRONTEND_URL=https://azeltech.midiya.az
```

**Qeyd:** `JWT_SECRET`-i təhlükəsiz random string ilə əvəz edin!

#### Database Migrations

```bash
# Prisma migrations apply
npx prisma migrate deploy

# Prisma client generate
npx prisma generate
```

#### Qovluqlar yarat

```bash
# Zəruri qovluqlar
mkdir -p public/uploads
mkdir -p public/cvs
mkdir -p logs

# Permissions
chmod -R 755 public
chmod -R 755 logs
```

#### PM2 ilə başlat

```bash
# PM2 start
pm2 start ecosystem.config.js

# PM2 save (server restart-dan sonra avtomatik başlamaq üçün)
pm2 save

# PM2 startup
pm2 startup

# Status yoxla
pm2 status
pm2 logs azeltech-backend
```

### 4. Nginx Konfiqurasiyası

Nginx istifadə edirsinizsə, `nginx.conf` faylını istifadə edin:

```bash
# Nginx config faylını kopyalayın
sudo cp nginx.conf /etc/nginx/sites-available/azeltech.midiya.az

# Path-ləri dəyişdirin (nano ilə)
sudo nano /etc/nginx/sites-available/azeltech.midiya.az

# Symlink yaradın
sudo ln -s /etc/nginx/sites-available/azeltech.midiya.az /etc/nginx/sites-enabled/

# Nginx test
sudo nginx -t

# Nginx restart
sudo systemctl restart nginx
```

**Qeyd:** `nginx.conf` faylında `/path/to/project` path-lərini real path-lərlə əvəz edin!

### 5. SSL Sertifikatı (HTTPS)

Let's Encrypt istifadə edin:

```bash
# Certbot install (əgər yoxdursa)
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# SSL sertifikatı yarat
sudo certbot --nginx -d azeltech.midiya.az

# Auto-renewal test
sudo certbot renew --dry-run
```

## Update Prosesi

Proyekt yeniləndikdə:

### Lokalda:

```bash
# Build
npm run build
npx prisma generate

# Yalnız dəyişən faylları FTP ilə yükləyin:
# - dist/
# - server/ (əgər dəyişibsə)
# - prisma/ (əgər dəyişibsə)
# - package.json (əgər dəyişibsə)
```

### Serverdə:

```bash
# SSH ilə qoşulun
ssh username@azeltech.az

# Proyekt qovluğuna keçin
cd /path/to/project

# Git pull (əgər git istifadə edirsinizsə)
git pull origin main

# Və ya FTP-dən yükləyib:
# Dependencies update (əgər package.json dəyişibsə)
npm install --production

# Migrations (əgər yeni migration var)
npx prisma migrate deploy
npx prisma generate

# PM2 restart
pm2 restart azeltech-backend
```

## Troubleshooting

### FTP Connection Problem

```bash
# FTP bağlantısını test edin
ftp azeltech.az
# Username: azeltech
# Password: AzelTech2025@!
```

### Backend Başlamır

```bash
# PM2 logs yoxlayın
pm2 logs azeltech-backend --lines 50

# Environment variables yoxlayın
cat .env.production

# Database connection test
npx prisma studio
```

### Frontend Görünmür

- Browser console-da errors yoxlayın
- Nginx logs: `sudo tail -f /var/log/nginx/azeltech_error.log`
- `dist/` qovluğunun mövcud olduğunu yoxlayın
- File permissions: `ls -la dist/`

### Database Connection Error

- `.env.production`-dakı `DATABASE_URL`-i yoxlayın
- PostgreSQL servisinin işlədiyini yoxlayın: `sudo systemctl status postgresql`
- Database və user-in mövcud olduğunu yoxlayın

### MIME Type Error

- Nginx konfiqurasiyasını yoxlayın (`nginx.conf`)
- MIME type-ların düzgün set olunduğunu yoxlayın
- Browser cache-i təmizləyin

## Əsas Komandalar

```bash
# PM2
pm2 status                    # Status
pm2 logs azeltech-backend     # Logs
pm2 restart azeltech-backend  # Restart
pm2 stop azeltech-backend     # Stop
pm2 delete azeltech-backend   # Delete

# Database
npx prisma studio             # Database UI
npx prisma migrate status     # Migration status
npx prisma migrate deploy     # Apply migrations

# Logs
tail -f logs/backend-out.log  # Backend logs
sudo tail -f /var/log/nginx/azeltech_error.log  # Nginx logs
```

## Təhlükəsizlik

1. **JWT_SECRET**-i production-da dəyişdirin
2. `.env.production` faylını public repository-də yayımlamayın
3. Database parollarını dəyişməyi düşünün
4. SSL sertifikatı istifadə edin (HTTPS)
5. Regular backup-lar aparın
6. Firewall konfiqurasiyası yoxlayın

## Support

Problem olduqda:
1. PM2 logs: `pm2 logs azeltech-backend`
2. Nginx logs: `/var/log/nginx/azeltech_error.log`
3. Database: `npx prisma studio`
4. Server logs: `tail -f logs/backend-out.log`

