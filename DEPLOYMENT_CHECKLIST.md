# Deployment Checklist ✅

Proyektin serverə deployment üçün addım-addım checklist.

## ✅ Hazırlıq

- [ ] Prisma schema PostgreSQL üçün konfiqurasiya olundu
- [ ] `.env.production` faylı yaradıldı və dolduruldu
- [ ] PM2 ecosystem.config.js yaradıldı
- [ ] Deployment scriptləri hazırlandı

## 📋 Deployment Addımları

### 1. Lokal Hazırlıq
- [ ] `npm install` edildi
- [ ] `.env.production` faylı yaradıldı və düzgün dolduruldu:
  ```env
  DATABASE_URL="postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya"
  PORT=3001
  NODE_ENV=production
  JWT_SECRET=secure-random-string
  VITE_API_URL=https://azeltech.midiya.az/api
  FRONTEND_URL=https://azeltech.midiya.az
  ```
- [ ] `npm run build` frontend build edildi
- [ ] `npx prisma generate` Prisma client generate edildi

### 2. FTP Upload
- [ ] FTP bağlantısı test edildi (azeltech_ftp / uMdSqxQaQXCG)
- [ ] Bütün fayllar yükləndi:
  - [ ] `dist/` qovluğu
  - [ ] `server/` qovluğu
  - [ ] `prisma/` qovluğu
  - [ ] `public/` qovluğu
  - [ ] `package.json` və `package-lock.json`
  - [ ] `ecosystem.config.js`
  - [ ] `.env.production`
  - [ ] `.gitignore`
- [ ] `node_modules/` və `.git/` yüklənmədi (düzgün)

### 3. Server Quraşdırması (SSH)
- [ ] SSH ilə serverə qoşulundu
- [ ] Proyekt qovluğuna keçildi
- [ ] `npm install --production` edildi
- [ ] `npx prisma migrate deploy` migrations apply edildi
- [ ] `npx prisma generate` Prisma client generate edildi
- [ ] `public/uploads` və `public/cvs` qovluqları yaradıldı
- [ ] `logs/` qovluğu yaradıldı
- [ ] Permissions verildi: `chmod -R 755 public logs`

### 4. PM2 Konfiqurasiyası
- [ ] `pm2 start ecosystem.config.js` backend başladıldı
- [ ] `pm2 save` edildi
- [ ] `pm2 startup` edildi (server restart-dan sonra avtomatik başlamaq üçün)
- [ ] `pm2 status` backend işləyir yoxlanıldı
- [ ] `pm2 logs azeltech-backend` logs təmizdir

### 5. Nginx Konfiqurasiyası
- [ ] Nginx konfiqurasiya faylı yaradıldı
- [ ] SSL sertifikatları konfiqurasiya olundu
- [ ] Frontend routing düzgün işləyir
- [ ] `/api` endpoint-ləri backend-ə proxy olunur
- [ ] `/uploads` və `/cvs` static files düzgün serve olunur
- [ ] `sudo nginx -t` konfiqurasiya yoxlandı
- [ ] `sudo systemctl restart nginx` Nginx restart edildi

### 6. Database
- [ ] PostgreSQL servis işləyir: `sudo systemctl status postgresql`
- [ ] Database və user mövcuddur
- [ ] Connection test edildi: `npx prisma studio`
- [ ] Migrations apply edildi
- [ ] Seed data əlavə edildi (istəyə görə)

### 7. Testing
- [ ] Frontend açılır: https://azeltech.midiya.az
- [ ] Backend API işləyir: https://azeltech.midiya.az/api
- [ ] Admin panel login işləyir: https://azeltech.midiya.az/admin/login
- [ ] File upload işləyir (test edildi)
- [ ] Database CRUD operations işləyir
- [ ] Mobile responsive işləyir

### 8. Monitoring
- [ ] PM2 monitoring: `pm2 monit`
- [ ] Logs yoxlandı: `pm2 logs azeltech-backend`
- [ ] Nginx logs yoxlandı: `/var/log/nginx/azeltech_error.log`
- [ ] Database monitoring setup edildi

## 🔒 Təhlükəsizlik

- [ ] `.env.production` faylı public repository-də yoxdur
- [ ] JWT_SECRET production-da dəyişdirildi
- [ ] SSL sertifikatı aktivdir (HTTPS)
- [ ] Database parolları güclüdür
- [ ] Firewall konfiqurasiyası düzgündür
- [ ] Regular backup planı hazırlandı

## 📝 Əlavə Qeydlər

- Frontend URL: https://azeltech.midiya.az
- Backend API: https://azeltech.midiya.az/api
- Admin Panel: https://azeltech.midiya.az/admin/login
- Database: PostgreSQL (azeltech_midiya)

## 🔧 Troubleshooting

Problem olduqda əvvəlcə bu komandaları yoxlayın:

```bash
# PM2 status
pm2 status
pm2 logs azeltech-backend --lines 50

# Nginx status
sudo systemctl status nginx
sudo tail -f /var/log/nginx/azeltech_error.log

# Database connection
npx prisma studio

# File permissions
ls -la public/uploads
ls -la public/cvs
```

## 📞 Support

- PM2 Docs: https://pm2.keymetrics.io/
- Prisma Docs: https://www.prisma.io/docs
- Nginx Docs: https://nginx.org/en/docs/

