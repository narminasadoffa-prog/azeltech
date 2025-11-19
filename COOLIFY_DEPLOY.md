# Coolify Deployment Guide - azeltech.midiya.az

Bu sənəd proyektin Coolify platformunda deployment prosesini izah edir.

## Coolify Nədir?

Coolify modern bir self-hosted PaaS (Platform as a Service) platformudur. Docker container-ları ilə işləyir və GitHub repository-lərdən avtomatik deploy edə bilir.

## Deployment Addımları

### 1. Coolify-da Yeni Resource Yaratmaq

1. Coolify dashboard-a daxil olun
2. "Resources" → "New Resource" klikləyin
3. "Application" seçin
4. Repository URL-i daxil edin: `https://github.com/narminasadoffa-prog/azeltech.git`
5. Branch: `main`
6. Build Pack: `Dockerfile` seçin

### 2. Environment Variables Təyin Etmək

Coolify-da aşağıdakı environment variables-ları əlavə edin:

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya
JWT_SECRET=change-this-to-a-secure-random-string-in-production
VITE_API_URL=https://azeltech.midiya.az/api
FRONTEND_URL=https://azeltech.midiya.az
```

**Qeyd:** `JWT_SECRET`-i təhlükəsiz random string ilə əvəz edin!

### 3. PostgreSQL Database Konfiqurasiyası

Coolify-da PostgreSQL database yaradın:

1. "Resources" → "New Resource" → "Database" → "PostgreSQL"
2. Database adı: `azeltech_midiya`
3. İstifadəçi: `azeltech_db`
4. Parol: `5Fx25jp6Xp5z4ckORjwNxKRH`
5. Host: `127.0.0.1` (və ya Coolify-in verəcəyi internal host)
6. Port: `5432`

**Qeyd:** Əgər database artıq mövcuddursa, yalnız connection string-i düzgün təyin edin.

### 4. Build və Deploy

1. Coolify-da "Deploy" düyməsinə basın
2. Build prosesi avtomatik başlayacaq
3. Build tamamlandıqdan sonra container işə düşəcək

### 5. Domain Konfiqurasiyası

1. Coolify-da "Domains" bölməsinə keçin
2. Domain əlavə edin: `azeltech.midiya.az`
3. SSL sertifikatı avtomatik yaradılacaq (Let's Encrypt)
4. Nginx proxy avtomatik konfiqurasiya olunacaq

### 6. Database Migrations

İlk deployment-dan sonra database migrations-i çalıştırın:

**Seçim 1: Coolify Terminal-dən**
```bash
# Coolify-da container-ə terminal açın
npx prisma migrate deploy
```

**Seçim 2: Local-dan**
```bash
# DATABASE_URL environment variable ilə
DATABASE_URL="postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya" npx prisma migrate deploy
```

### 7. Seed Data (İstəyə görə)

İlk deployment-dan sonra seed data əlavə edin:

```bash
# Coolify terminal-dən
npm run prisma:seed
```

## Coolify Xüsusiyyətləri

### Automatic Deployments

Coolify GitHub repository-ni izləyir və yeni commit-lər olduqda avtomatik deploy edir.

**Enable etmək:**
1. Repository settings-də "Auto Deploy" aktivləşdirin
2. Branch: `main`

### Health Checks

Dockerfile-da health check endpoint-i var: `/api/health`

Coolify avtomatik olaraq container-in sağlamlığını yoxlayır.

### Logs

Coolify-da real-time logs görə bilərsiniz:
- Application logs
- Build logs
- Database logs

### Volumes

Aşağıdakı qovluqlar persistent volume kimi saxlanılır:
- `public/uploads` - Yüklənmiş şəkillər
- `public/cvs` - CV faylları
- `logs` - Application logs

### Environment Variables

Coolify-da environment variables-ları:
- UI-dan dəyişə bilərsiniz
- Secret kimi saxla bilərsiniz
- Fərqli environment-lar üçün fərqli dəyərlər təyin edə bilərsiniz

## Troubleshooting

### Build Fails

1. **Prisma Client Generate Error:**
   ```bash
   # Build zamanı Prisma generate edilməlidir
   # Dockerfile-da bu addım var
   ```

2. **Dependencies Error:**
   ```bash
   # package-lock.json yoxlanılmalıdır
   # npm ci istifadə olunur (clean install)
   ```

### Container Doesn't Start

1. **Health Check Fails:**
   - `/api/health` endpoint-inin işlədiyini yoxlayın
   - Logs-da error-ları yoxlayın

2. **Database Connection Error:**
   - `DATABASE_URL` environment variable-ı düzgün olmalıdır
   - Database-in işlədiyini yoxlayın
   - Network connectivity yoxlayın

### Static Files Not Loading

1. **MIME Type Error:**
   - Nginx konfiqurasiyası avtomatik olmalıdır
   - Əgər problem varsa, Coolify support-a müraciət edin

2. **404 Errors:**
   - `dist/` qovluğunun build olunduğunu yoxlayın
   - Volume mounts düzgün olmalıdır

## Update Prosesi

1. **Automatic (GitHub Integration):**
   - `main` branch-ə push edin
   - Coolify avtomatik deploy edəcək

2. **Manual:**
   - Coolify-da "Redeploy" düyməsinə basın
   - Və ya "Force Rebuild" istifadə edin

## Database Migrations Update

Yeni migration əlavə etdikdə:

```bash
# Coolify terminal-dən
npx prisma migrate deploy
```

Və ya Coolify-da "Run Command" istifadə edin:
```bash
npx prisma migrate deploy
```

## Monitoring

Coolify-da monitoring:
- CPU və Memory istifadəsi
- Network traffic
- Container status
- Health check status

## Backup

Coolify-da backup:
- Database backup-ları avtomatik edilə bilər
- Volume backup-ları konfiqurasiya edilə bilər

## Support

Problem olduqda:
1. Coolify logs yoxlayın
2. Container logs yoxlayın
3. Database connection test edin
4. Health check endpoint-ini test edin: `https://azeltech.midiya.az/api/health`

## Əlavə Qeydlər

- Coolify Docker istifadə edir, buna görə Dockerfile lazımdır
- Environment variables Coolify UI-dan idarə olunur
- SSL sertifikatları avtomatik yaradılır
- Nginx proxy avtomatik konfiqurasiya olunur
- GitHub integration ilə CI/CD avtomatik işləyir

