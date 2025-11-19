# Admin Panel - Quraşdırma Təlimatları

Bu admin panel Prisma və Express istifadə edərək yaradılıb.

## Quraşdırma

### 1. Dependencies quraşdırın

```bash
npm install
```

### 2. Environment dəyişənlərini təyin edin

`.env` faylı yaradın (və ya mövcud olanı redaktə edin):

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3001
```

### 3. Prisma Database yaradın

```bash
# Prisma client generate et
npm run prisma:generate

# Database migration yarat və tətbiq et
npm run prisma:migrate

# Seed data əlavə et (opsional)
npm run prisma:seed
```

### 4. Serveri işə salın

Yeni terminal açın və backend serveri işə salın:

```bash
npm run dev:server
```

Və ya:

```bash
npm run server
```

### 5. Frontend-i işə salın

Başqa bir terminal açın:

```bash
npm run dev
```

## Default Login

- **Email:** admin@azeltexnika.az
- **Şifrə:** admin123

## Admin Panel URL-ləri

- Login: http://localhost:8081/admin/login
- Dashboard: http://localhost:8081/admin/dashboard
- Blog Posts: http://localhost:8081/admin/blog-posts
- Projects: http://localhost:8081/admin/projects
- Messages: http://localhost:8081/admin/messages

## API Endpoints

Backend server `http://localhost:3001` ünvanında işləyir.

### Auth
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user

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

## Prisma Studio

Database-i vizual olaraq idarə etmək üçün:

```bash
npm run prisma:studio
```

Bu `http://localhost:5555` ünvanında Prisma Studio açacaq.

## Qeydlər

- Database SQLite istifadə edir (local development üçün)
- Production üçün PostgreSQL və ya MySQL istifadə etməyi tövsiyə edirik
- JWT_SECRET production-da mütləq dəyişdirilməlidir
- `.env` faylı git-ə commit edilməməlidir


