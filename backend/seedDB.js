const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Product = require('./models/Product');
const Article = require('./models/Article');
const Testimonial = require('./models/Testimonial');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wig-catalog';

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data (optional, but good for a fresh start)
    await Product.deleteMany({});
    await Article.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('Cleared existing data.');

    // Seed Products
    const productsData = fs.readFileSync(path.join(__dirname, 'products_seed.csv'), 'utf8')
      .split('\n')
      .slice(1) // Skip header
      .filter(line => line.trim() !== '')
      .map(line => {
        const [name, description, price, category, imageUrl] = line.split(',');
        return { name, description, price: Number(price), category, imageUrl };
      });

    await Product.insertMany(productsData);
    console.log(`Successfully seeded ${productsData.length} products.`);

    // Seed Articles
    const articlesData = fs.readFileSync(path.join(__dirname, 'articles_seed.csv'), 'utf8')
      .split('\n')
      .slice(1) // Skip header
      .filter(line => line.trim() !== '')
      .map(line => {
        const [title, content, thumbnailUrl] = line.split(',');
        return { title, content, thumbnailUrl };
      });

    await Article.insertMany(articlesData);
    console.log(`Successfully seeded ${articlesData.length} articles.`);

    // Seed Testimonials
    const testimonialsData = [
      {
        name: 'Sari Rahayu',
        role: 'Pelanggan Setia',
        content: 'Sangat puas dengan kualitas wig-nya! Terlihat sangat natural dan tidak gatal saat dipakai seharian. Sangat recommended untuk yang cari wig berkualitas.',
        rating: 5,
        image: 'http://localhost:5000/brain/testimonial_1.png'
      },
      {
        name: 'Budi Santoso',
        role: 'Penyintas',
        content: 'Terima kasih Wig Catalog. Berkat wig ini, saya kembali percaya diri untuk keluar rumah. Bahannya sangat lembut dan nyaman di kulit kepala.',
        rating: 5,
        image: 'http://localhost:5000/brain/testimonial_2.png'
      },
      {
        name: 'Maya Putri',
        role: 'Professional Model',
        content: 'Koleksinya lengkap dan trendy. Untuk kebutuhan photoshoot sangat membantu karena styling-nya mudah. Kualitas premium!',
        rating: 4,
        image: 'http://localhost:5000/brain/testimonial_3.png'
      }
    ];

    await Testimonial.insertMany(testimonialsData);
    console.log(`Successfully seeded ${testimonialsData.length} testimonials.`);

    await mongoose.disconnect();
    console.log('Seeding complete. Disconnected.');
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDB();
