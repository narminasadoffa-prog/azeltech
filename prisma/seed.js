import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@azeltexnika.az' },
    update: {},
    create: {
      email: 'admin@azeltexnika.az',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });

  console.log('Created admin user:', admin.email);

  // Create sample blog post
  const blogPost = await prisma.blogPost.create({
    data: {
      title: 'Yeni Shantui SD22 buldozerləri parkımıza qoşuldu',
      excerpt: 'Buldozer parkımız genişlənərək daha böyük həcmli torpaq işlərini daha operativ icra etməyə imkan verir.',
      date: 'Mart 2025',
      image: 'https://iytgdt68iww627sj.public.blob.vercel-storage.com/layih%C9%99l%C9%99rimiz%20AZEL%20/gerold-hinzen-WoZs8gGyQBY-unsplash%20(1).jpg',
      published: true,
    },
  });

  console.log('Created sample blog post');

  // Create sample project
  const project = await prisma.project.create({
    data: {
      no: '1',
      name: 'Daşkəsən qızıl mədəni layihəsi',
      contractor: '"MAQRO CONSTRUCTION" MMC',
      period: '2022–2023',
      published: true,
    },
  });

  console.log('Created sample project');

  // Create equipment items
  const equipmentData = [
    {
      category: 'Ekskavatorlar',
      name: 'Hyundai 210 (8 təkərli) Ekskavator',
      description: 'İş çəkisi: 21 t\n• Mühərrik gücü: 110 kVt\n• Əsas qazma radiusu: 9.8 m\n• Kova tutumu: 1.0 m³\n• İstehsalçı: Hyundai\n• İstehsal ili: 2016',
      count: null,
      published: true,
    },
    {
      category: 'Yükləyicilər',
      name: 'SDLG 956 Frontal Yükləyici',
      description: 'İş çəkisi: 5.6 t\n• Mühərrik gücü: 85 kVt\n• Kova tutumu: 2.0–2.3 m³\n• Maksimal qaldırma hündürlüyü: 3.2 m\n• İstehsalçı: SDLG\n• İstehsal ili: 2022',
      count: null,
      published: true,
    },
    {
      category: 'Ekskavatorlar',
      name: 'Doosan DX300 Ekskavator',
      description: 'İş çəkisi: 30 t\n• Mühərrik gücü: 165 kVt\n• Əsas qazma radiusu: 10 m\n• Kova tutumu: 1.5 m³\n• İstehsalçı: Doosan\n• İstehsal ili: 2016',
      count: null,
      published: true,
    },
    {
      category: 'Ekskavatorlar',
      name: 'Doosan DX340 Tırtıllı Ekskavator',
      description: 'İş çəkisi: 34 t\n• Mühərrik gücü: 200 kVt\n• Əsas qazma radiusu: 10.5 m\n• Kova tutumu: 1.6 m³\n• İstehsalçı: Doosan\n• İstehsal ili: 2012',
      count: null,
      published: true,
    },
    {
      category: 'Katoklar',
      name: 'XCMG Katok',
      description: 'İş çəkisi: 12–15 t\n• Mühərrik gücü: 92 kVt\n• Rulon eni: 2.1 m\n• Maksimal sıxılma gücü: 120 kN\n• İstehsalçı: XCMG\n• İstehsal ili: 2018',
      count: null,
      published: true,
    },
    {
      category: 'Katoklar',
      name: 'Liugong Katok',
      description: 'İş çəkisi: 10–14 t\n• Mühərrik gücü: 85 kVt\n• Rulon eni: 2.0 m\n• Maksimal sıxılma gücü: 110 kN\n• İstehsalçı: Liugong\n• İstehsal ili: 2023',
      count: null,
      published: true,
    },
    {
      category: 'Katoklar',
      name: 'Dynapac Katok',
      description: 'İş çəkisi: 14 t\n• Mühərrik gücü: 95 kVt\n• Rulon eni: 2.2 m\n• Maksimal sıxılma gücü: 130 kN\n• İstehsalçı: Dynapac\n• İstehsal ili: 2013',
      count: null,
      published: true,
    },
    {
      category: 'Ekskavatorlar',
      name: 'New Holland 305 Ekskavator',
      description: 'İş çəkisi: 30 t\n• Mühərrik gücü: 110 kVt\n• Əsas qazma radiusu: 9.8 m\n• Kova tutumu: 1.0–1.2 m³\n• İstehsalçı: New Holland\n• İstehsal ili: 2022',
      count: null,
      published: true,
    },
    {
      category: 'Ekskavatorlar',
      name: 'New Holland 925 Ekskavator-Rokson',
      description: 'İş çəkisi: 24 t\n• Mühərrik gücü: 90 kVt\n• Əsas qazma radiusu: 8.5 m\n• Kova tutumu: 0.9–1.1 m³\n• İstehsalçı: New Holland\n• İstehsal ili: 2019',
      count: null,
      published: true,
    },
    {
      category: 'Qreyderlər',
      name: 'Liugong 418 Qreyder',
      description: 'İş çəkisi: 16 t\n• Mühərrik gücü: 125 kVt\n• Lame eni: 4.2 m\n• Maksimal qaldırma hündürlüyü: 0.4 m\n• İstehsalçı: Liugong\n• İstehsal ili: 2024',
      count: null,
      published: true,
    },
  ];

  for (const equipment of equipmentData) {
    const existing = await prisma.equipment.findFirst({
      where: { name: equipment.name },
    });

    if (!existing) {
      await prisma.equipment.create({
        data: equipment,
      });
      console.log(`Created equipment: ${equipment.name}`);
    } else {
      console.log(`Equipment already exists: ${equipment.name}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

