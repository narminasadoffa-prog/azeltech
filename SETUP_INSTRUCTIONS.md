# Admin Panel Quraşdırma Təlimatları

## ✅ Tamamlanan Addımlar

1. ✅ Prisma və backend dependencies quraşdırıldı
2. ✅ Prisma schema yaradıldı
3. ✅ Backend API server yaradıldı
4. ✅ Admin panel səhifələri yaradıldı
5. ✅ Database migration tamamlandı
6. ✅ Seed data əlavə edildi

## 📋 Qalan Addımlar

### 1. .env Faylı Yaradın

Layihə root qovluğunda `.env` faylı yaradın və aşağıdakı məzmunu əlavə edin:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3001
```

### 2. Backend Serveri İşə Salın

Yeni terminal açın və backend serveri işə salın:

```bash
npm run dev:server
```

Və ya:

```bash
$env:DATABASE_URL="file:./prisma/dev.db"; npm run server
```

Server `http://localhost:3001` ünvanında işləyəcək.

### 3. Frontend-i İşə Salın

Başqa bir terminal açın və frontend-i işə salın:

```bash
npm run dev
```

Frontend `http://localhost:8081` ünvanında işləyəcək.

## 🔐 Default Login

- **URL:** http://localhost:8081/admin/login
- **Email:** admin@azeltexnika.az
- **Şifrə:** admin123

## 📁 Admin Panel Səhifələri

- **Dashboard:** http://localhost:8081/admin/dashboard
- **Blog Yazıları:** http://localhost:8081/admin/blog-posts
- **Layihələr:** http://localhost:8081/admin/projects
- **Mesajlar:** http://localhost:8081/admin/messages

## 🗄️ Database İdarəetmə

Prisma Studio ilə database-i vizual olaraq idarə edin:

```bash
$env:DATABASE_URL="file:./prisma/dev.db"; npm run prisma:studio
```

Bu `http://localhost:5555` ünvanında Prisma Studio açacaq.

## 📝 API Endpoints

Backend server `http://localhost:3001` ünvanında işləyir.

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user (auth tələb olunur)

### Blog Posts
- `GET /api/blog-posts` - Bütün yazılar
- `GET /api/blog-posts/:id` - Tək yazı
- `POST /api/blog-posts` - Yeni yazı (auth tələb olunur)
- `PUT /api/blog-posts/:id` - Yazını yenilə (auth tələb olunur)
- `DELETE /api/blog-posts/:id` - Yazını sil (auth tələb olunur)

### Projects
- `GET /api/projects` - Public layihələr
- `GET /api/admin/projects` - Bütün layihələr (auth tələb olunur)
- `POST /api/admin/projects` - Yeni layihə (auth tələb olunur)
- `PUT /api/admin/projects/:id` - Layihəni yenilə (auth tələb olunur)
- `DELETE /api/admin/projects/:id` - Layihəni sil (auth tələb olunur)

### Services
- `GET /api/services` - Public xidmətlər
- `GET /api/admin/services` - Bütün xidmətlər (auth tələb olunur)
- `POST /api/admin/services` - Yeni xidmət (auth tələb olunur)
- `PUT /api/admin/services/:id` - Xidməti yenilə (auth tələb olunur)
- `DELETE /api/admin/services/:id` - Xidməti sil (auth tələb olunur)

### Contact Messages
- `POST /api/contact-messages` - Yeni mesaj
- `GET /api/admin/contact-messages` - Bütün mesajlar (auth tələb olunur)

## ⚠️ Qeydlər

- Database SQLite istifadə edir (local development üçün)
- Production üçün PostgreSQL və ya MySQL istifadə etməyi tövsiyə edirik
- JWT_SECRET production-da mütləq dəyişdirilməlidir
- `.env` faylı git-ə commit edilməməlidir (artıq .gitignore-da var)

## 🚀 İstifadə

1. `.env` faylını yaradın
2. Backend serveri işə salın: `npm run dev:server`
3. Frontend-i işə salın: `npm run dev`
4. Admin panelə daxil olun: http://localhost:8081/admin/login

