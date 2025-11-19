import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create CVs directory if it doesn't exist
const cvsDir = path.join(__dirname, '../public/cvs');
if (!fs.existsSync(cvsDir)) {
  fs.mkdirSync(cvsDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Serve static files with proper MIME types
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.use('/cvs', express.static(path.join(__dirname, '../public/cvs')));

// Serve frontend build files in production (before API routes)
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  
  // Serve static assets with proper MIME types
  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (filePath.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (filePath.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      } else if (filePath.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      } else if (filePath.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (filePath.endsWith('.webp')) {
        res.setHeader('Content-Type', 'image/webp');
      } else if (filePath.endsWith('.woff')) {
        res.setHeader('Content-Type', 'font/woff');
      } else if (filePath.endsWith('.woff2')) {
        res.setHeader('Content-Type', 'font/woff2');
      } else if (filePath.endsWith('.ttf')) {
        res.setHeader('Content-Type', 'font/ttf');
      } else if (filePath.endsWith('.eot')) {
        res.setHeader('Content-Type', 'application/vnd.ms-fontobject');
      }
    },
    maxAge: '1y', // Cache static assets
    immutable: true
  }));
}

// Middleware for authentication
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
});

// Upload Route
app.post('/api/upload', authenticateToken, (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const image = req.files.image;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!allowedTypes.includes(image.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type. Only images are allowed.' });
    }

    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(image.name)}`;
    const filePath = path.join(uploadsDir, fileName);

    image.mv(filePath, (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Failed to upload file' });
      }

      const imageUrl = `/uploads/${fileName}`;
      res.json({ url: imageUrl, fileName });
    });
  } catch (error) {
    console.error('Error in upload route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all uploaded images
app.get('/api/admin/images', authenticateToken, (req, res) => {
  try {
    if (!fs.existsSync(uploadsDir)) {
      return res.json([]);
    }

    const files = fs.readdirSync(uploadsDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    const images = imageFiles.map(file => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      const baseUrl = process.env.API_URL || `http://localhost:${PORT}`;
      return {
        fileName: file,
        url: `/uploads/${file}`,
        fullUrl: `${baseUrl}/uploads/${file}`,
        size: stats.size,
        uploadedAt: stats.birthtime,
      };
    });

    // Sort by upload date, newest first
    images.sort((a, b) => b.uploadedAt - a.uploadedAt);

    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Blog Posts Routes
app.get('/api/blog-posts', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/blog-posts/:id', async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/blog-posts', authenticateToken, async (req, res) => {
  try {
    const post = await prisma.blogPost.create({
      data: req.body,
    });
    res.json(post);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/blog-posts/:id', authenticateToken, async (req, res) => {
  try {
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/blog-posts/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.blogPost.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Blog Posts Routes
app.get('/api/admin/blog-posts', authenticateToken, async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/blog-posts/:id', authenticateToken, async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Projects Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/projects', authenticateToken, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/admin/projects', authenticateToken, async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: req.body,
    });
    res.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/admin/projects/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.project.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Services Routes
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/services', authenticateToken, async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/services/:id', authenticateToken, async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: req.params.id },
    });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/admin/services', authenticateToken, async (req, res) => {
  try {
    const service = await prisma.service.create({
      data: req.body,
    });
    res.json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/services/:id', authenticateToken, async (req, res) => {
  try {
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/admin/services/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.service.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact Messages Routes
app.get('/api/admin/contact-messages', authenticateToken, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/contact-messages', async (req, res) => {
  try {
    const message = await prisma.contactMessage.create({
      data: req.body,
    });
    res.json(message);
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Equipment Categories Route
app.get('/api/equipment/categories', async (req, res) => {
  try {
    const categories = await prisma.equipment.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
      orderBy: {
        category: 'asc',
      },
    });
    const categoryList = categories.map((item) => item.category);
    // Add default categories if none exist
    const defaultCategories = [
      'Buldozerlər',
      'Ekskavatorlar',
      'Teleskopik yükləyicilər',
      'Bekoladerlər',
      'Qreyderlər',
      'Katoklar',
      'Frontal yükləyicilər',
      'Digər',
    ];
    const allCategories = [...new Set([...defaultCategories, ...categoryList])];
    res.json(allCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Equipment Routes
app.get('/api/equipment', async (req, res) => {
  try {
    const equipment = await prisma.equipment.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(equipment);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/equipment', authenticateToken, async (req, res) => {
  try {
    const equipment = await prisma.equipment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(equipment);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/equipment/:id', authenticateToken, async (req, res) => {
  try {
    const equipment = await prisma.equipment.findUnique({
      where: { id: req.params.id },
    });
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    res.json(equipment);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/admin/equipment', authenticateToken, async (req, res) => {
  try {
    const equipment = await prisma.equipment.create({
      data: req.body,
    });
    res.json(equipment);
  } catch (error) {
    console.error('Error creating equipment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/equipment/:id', authenticateToken, async (req, res) => {
  try {
    // Check if equipment exists
    const existing = await prisma.equipment.findUnique({
      where: { id: req.params.id },
    });
    
    if (!existing) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    const equipment = await prisma.equipment.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(equipment);
  } catch (error) {
    console.error('Error updating equipment:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

app.delete('/api/admin/equipment/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.equipment.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Vacancies Routes
app.get('/api/vacancies', async (req, res) => {
  try {
    const vacancies = await prisma.vacancy.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(vacancies);
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/vacancies', authenticateToken, async (req, res) => {
  try {
    const vacancies = await prisma.vacancy.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(vacancies);
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/vacancies/:id', authenticateToken, async (req, res) => {
  try {
    const vacancy = await prisma.vacancy.findUnique({
      where: { id: req.params.id },
    });
    if (!vacancy) {
      return res.status(404).json({ error: 'Vacancy not found' });
    }
    res.json(vacancy);
  } catch (error) {
    console.error('Error fetching vacancy:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/admin/vacancies', authenticateToken, async (req, res) => {
  try {
    const { title, description, requirements, location, salary, type, published } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Başlıq və təsvir tələb olunur' });
    }

    const vacancy = await prisma.vacancy.create({
      data: {
        title,
        description,
        requirements: requirements || null,
        location: location || null,
        salary: salary || null,
        type: type || null,
        published: published ?? false,
      },
    });
    res.json(vacancy);
  } catch (error) {
    console.error('Error creating vacancy:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

app.put('/api/admin/vacancies/:id', authenticateToken, async (req, res) => {
  try {
    const existing = await prisma.vacancy.findUnique({
      where: { id: req.params.id },
    });
    
    if (!existing) {
      return res.status(404).json({ error: 'Vakansiya tapılmadı' });
    }

    const { title, description, requirements, location, salary, type, published } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Başlıq və təsvir tələb olunur' });
    }

    const vacancy = await prisma.vacancy.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        requirements: requirements || null,
        location: location || null,
        salary: salary || null,
        type: type || null,
        published: published ?? false,
      },
    });
    res.json(vacancy);
  } catch (error) {
    console.error('Error updating vacancy:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

app.delete('/api/admin/vacancies/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.vacancy.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Vacancy deleted successfully' });
  } catch (error) {
    console.error('Error deleting vacancy:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CV Upload Route
app.post('/api/cv-upload', async (req, res) => {
  try {
    if (!req.files || !req.files.cv) {
      return res.status(400).json({ error: 'No CV file provided' });
    }

    const cvFile = req.files.cv;
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(cvFile.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type. Only PDF and Word documents are allowed.' });
    }

    if (cvFile.size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size must be less than 10MB' });
    }

    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(cvFile.name)}`;
    const filePath = path.join(cvsDir, fileName);

    cvFile.mv(filePath, async (err) => {
      if (err) {
        console.error('Error uploading CV:', err);
        return res.status(500).json({ error: 'Failed to upload CV' });
      }

      const { name, email, phone, position, message } = req.body;

      try {
        const cv = await prisma.cV.create({
          data: {
            name: name || 'Unknown',
            email: email || '',
            phone: phone || null,
            position: position || null,
            cvFile: `/cvs/${fileName}`,
            message: message || null,
            read: false,
          },
        });

        console.log('CV saved successfully:', cv.id);
        res.json({ success: true, cv, message: 'CV uğurla yükləndi' });
      } catch (dbError) {
        console.error('Error saving CV to database:', dbError);
        // Delete uploaded file if database save fails
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        res.status(500).json({ error: dbError.message || 'Failed to save CV to database' });
      }
    });
  } catch (error) {
    console.error('Error in CV upload route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CVs Routes (Admin only)
app.get('/api/admin/cvs', authenticateToken, async (req, res) => {
  try {
    const cvs = await prisma.cV.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(cvs);
  } catch (error) {
    console.error('Error fetching CVs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/cvs/:id', authenticateToken, async (req, res) => {
  try {
    const cv = await prisma.cV.findUnique({
      where: { id: req.params.id },
    });
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }
    res.json(cv);
  } catch (error) {
    console.error('Error fetching CV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/cvs/:id/read', authenticateToken, async (req, res) => {
  try {
    const cv = await prisma.cV.update({
      where: { id: req.params.id },
      data: { read: true },
    });
    res.json(cv);
  } catch (error) {
    console.error('Error updating CV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/admin/cvs/:id', authenticateToken, async (req, res) => {
  try {
    const cv = await prisma.cV.findUnique({
      where: { id: req.params.id },
    });

    if (cv) {
      // Delete CV file
      const filePath = path.join(__dirname, '..', 'public', cv.cvFile);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await prisma.cV.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.error('Error deleting CV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve index.html for all non-API routes (SPA routing) - must be after all API routes
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.get('*', (req, res) => {
    // Don't serve index.html for API routes, uploads, or cvs
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/cvs')) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
  }
});

