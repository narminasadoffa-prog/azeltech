// Script to migrate data from local SQLite to PostgreSQL
// Run this script after setting up PostgreSQL database

import { PrismaClient as SQLiteClient } from '@prisma/client';
import { PrismaClient as PostgresClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

// SQLite connection (local)
const sqliteClient = new SQLiteClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db', // Local SQLite database
    },
  },
});

// PostgreSQL connection (production)
const postgresClient = new PostgresClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // PostgreSQL connection string
    },
  },
});

async function migrateData() {
  console.log('🚀 Starting data migration from SQLite to PostgreSQL...\n');

  try {
    // 1. Migrate Users
    console.log('📦 Migrating Users...');
    const users = await sqliteClient.user.findMany();
    if (users.length > 0) {
      for (const user of users) {
        await postgresClient.user.upsert({
          where: { email: user.email },
          update: {},
          create: {
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
      }
      console.log(`✅ Migrated ${users.length} users`);
    }

    // 2. Migrate Blog Posts
    console.log('\n📦 Migrating Blog Posts...');
    const blogPosts = await sqliteClient.blogPost.findMany();
    if (blogPosts.length > 0) {
      for (const post of blogPosts) {
        await postgresClient.blogPost.upsert({
          where: { id: post.id },
          update: {},
          create: {
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            image: post.image,
            date: post.date,
            published: post.published,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          },
        });
      }
      console.log(`✅ Migrated ${blogPosts.length} blog posts`);
    }

    // 3. Migrate Projects
    console.log('\n📦 Migrating Projects...');
    const projects = await sqliteClient.project.findMany();
    if (projects.length > 0) {
      for (const project of projects) {
        await postgresClient.project.upsert({
          where: { id: project.id },
          update: {},
          create: {
            id: project.id,
            no: project.no,
            name: project.name,
            contractor: project.contractor,
            period: project.period,
            image: project.image,
            published: project.published,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
          },
        });
      }
      console.log(`✅ Migrated ${projects.length} projects`);
    }

    // 4. Migrate Services
    console.log('\n📦 Migrating Services...');
    const services = await sqliteClient.service.findMany();
    if (services.length > 0) {
      for (const service of services) {
        await postgresClient.service.upsert({
          where: { id: service.id },
          update: {},
          create: {
            id: service.id,
            title: service.title,
            description: service.description,
            image: service.image,
            items: service.items,
            published: service.published,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt,
          },
        });
      }
      console.log(`✅ Migrated ${services.length} services`);
    }

    // 5. Migrate Equipment
    console.log('\n📦 Migrating Equipment...');
    const equipment = await sqliteClient.equipment.findMany();
    if (equipment.length > 0) {
      for (const item of equipment) {
        await postgresClient.equipment.upsert({
          where: { id: item.id },
          update: {},
          create: {
            id: item.id,
            category: item.category,
            name: item.name,
            description: item.description,
            image: item.image,
            count: item.count,
            published: item.published,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          },
        });
      }
      console.log(`✅ Migrated ${equipment.length} equipment items`);
    }

    // 6. Migrate Contact Messages
    console.log('\n📦 Migrating Contact Messages...');
    const messages = await sqliteClient.contactMessage.findMany();
    if (messages.length > 0) {
      for (const message of messages) {
        await postgresClient.contactMessage.upsert({
          where: { id: message.id },
          update: {},
          create: {
            id: message.id,
            name: message.name,
            email: message.email,
            phone: message.phone,
            subject: message.subject,
            message: message.message,
            read: message.read,
            createdAt: message.createdAt,
          },
        });
      }
      console.log(`✅ Migrated ${messages.length} contact messages`);
    }

    // 7. Migrate Vacancies
    console.log('\n📦 Migrating Vacancies...');
    const vacancies = await sqliteClient.vacancy.findMany();
    if (vacancies.length > 0) {
      for (const vacancy of vacancies) {
        await postgresClient.vacancy.upsert({
          where: { id: vacancy.id },
          update: {},
          create: {
            id: vacancy.id,
            title: vacancy.title,
            description: vacancy.description,
            requirements: vacancy.requirements,
            location: vacancy.location,
            salary: vacancy.salary,
            type: vacancy.type,
            published: vacancy.published,
            createdAt: vacancy.createdAt,
            updatedAt: vacancy.updatedAt,
          },
        });
      }
      console.log(`✅ Migrated ${vacancies.length} vacancies`);
    }

    // 8. Migrate CVs
    console.log('\n📦 Migrating CVs...');
    const cvs = await sqliteClient.cV.findMany();
    if (cvs.length > 0) {
      for (const cv of cvs) {
        await postgresClient.cV.upsert({
          where: { id: cv.id },
          update: {},
          create: {
            id: cv.id,
            name: cv.name,
            email: cv.email,
            phone: cv.phone,
            position: cv.position,
            cvFile: cv.cvFile,
            message: cv.message,
            read: cv.read,
            createdAt: cv.createdAt,
          },
        });
      }
      console.log(`✅ Migrated ${cvs.length} CVs`);
    }

    console.log('\n✅ Data migration completed successfully!');
  } catch (error) {
    console.error('❌ Error during migration:', error);
    throw error;
  } finally {
    await sqliteClient.$disconnect();
    await postgresClient.$disconnect();
  }
}

migrateData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

