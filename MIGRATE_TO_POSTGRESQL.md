# Local SQLite-dən PostgreSQL-ə Migration Guide

Bu sənəd lokal SQLite database-dən production PostgreSQL database-ə məlumatların köçürülməsi prosesini izah edir.

## Addımlar

### 1. Prisma Schema-nı PostgreSQL üçün Konfiqurasiya Et

Schema artıq PostgreSQL üçün konfiqurasiya olunub (`prisma/schema.prisma`). Yoxlayaq:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. PostgreSQL Database Yaradın

Serverdə PostgreSQL database yaradın:

```bash
# PostgreSQL-ə qoşulun
psql -U postgres

# Database və user yaradın
CREATE DATABASE azeltech_midiya;
CREATE USER azeltech_db WITH PASSWORD '5Fx25jp6Xp5z4ckORjwNxKRH';
GRANT ALL PRIVILEGES ON DATABASE azeltech_midiya TO azeltech_db;
\q
```

### 3. Environment Variables Təyin Edin

`.env.production` faylı yaradın:

```env
DATABASE_URL="postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya"
```

### 4. PostgreSQL-ə Migrations Apply Edin

```bash
# PostgreSQL connection string ilə
DATABASE_URL="postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya" npx prisma migrate deploy

# Prisma client generate
DATABASE_URL="postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya" npx prisma generate
```

### 5. Local SQLite-dən Data Export Edin

Migration script-i çalıştırın:

```bash
# .env.production faylında DATABASE_URL PostgreSQL connection string olmalıdır
npm run prisma:migrate-to-postgres
```

**Qeyd:** Bu script:
- Local SQLite database-dən (`prisma/dev.db`) bütün məlumatları oxuyur
- PostgreSQL database-ə yazır
- Bütün table-ları migrate edir: Users, BlogPosts, Projects, Services, Equipment, ContactMessages, Vacancies, CVs

### 6. Yoxlama

PostgreSQL-də məlumatları yoxlayın:

```bash
# Prisma Studio ilə
DATABASE_URL="postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya" npx prisma studio
```

Və ya psql ilə:

```bash
psql -U azeltech_db -d azeltech_midiya

# Table-ları yoxlayın
\dt

# Məlumat sayını yoxlayın
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM blog_posts;
SELECT COUNT(*) FROM projects;
SELECT COUNT(*) FROM services;
SELECT COUNT(*) FROM equipment;
```

## Manual Migration (Alternativ)

Əgər script işləmirsə, manual olaraq:

### 1. SQLite-dən Export

```bash
# SQLite database-dən SQL export
sqlite3 prisma/dev.db .dump > local_data.sql
```

### 2. PostgreSQL-ə Import

```bash
# SQL faylını PostgreSQL formatına çevirin (manual düzəlişlər lazım ola bilər)
# Sonra import edin
psql -U azeltech_db -d azeltech_midiya < local_data.sql
```

## Troubleshooting

### Connection Error

```bash
# PostgreSQL servisinin işlədiyini yoxlayın
sudo systemctl status postgresql

# Connection test
psql -U azeltech_db -d azeltech_midiya -h 127.0.0.1
```

### Migration Script Error

- SQLite database faylının mövcud olduğunu yoxlayın: `prisma/dev.db`
- PostgreSQL connection string-in düzgün olduğunu yoxlayın
- Prisma client-in generate olunduğunu yoxlayın

### Data Duplicate Error

Script `upsert` istifadə edir, ona görə duplicate error olmamalıdır. Əgər olarsa:

```bash
# PostgreSQL-də table-ları təmizləyin
psql -U azeltech_db -d azeltech_midiya

TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE blog_posts CASCADE;
-- və s.
```

Sonra migration script-i yenidən çalıştırın.

## Qeydlər

- **Local SQLite database** (`prisma/dev.db`) silinməyəcək, yalnız köçürüləcək
- **Production PostgreSQL** database-də yeni məlumatlar olacaq
- **Uploaded files** (`public/uploads/`, `public/cvs/`) ayrıca köçürülməlidir (FTP ilə)
- **Environment variables** serverdə təyin edilməlidir

## Uploaded Files Migration

Şəkillər və CV faylları ayrıca köçürülməlidir:

```bash
# Local-dan serverə FTP ilə
# public/uploads/ qovluğunu yükləyin
# public/cvs/ qovluğunu yükləyin
```

Və ya `ftp_upload.ps1` script-i istifadə edin.

## Nəticə

Migration tamamlandıqdan sonra:
- ✅ Bütün məlumatlar PostgreSQL-də olacaq
- ✅ Production server-də işləyəcək
- ✅ Local SQLite database hələ də mövcud olacaq (backup kimi)

