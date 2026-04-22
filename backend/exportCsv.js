require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

const Product = require('./models/Product');
const Article = require('./models/Article');
const User = require('./models/User');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wig-catalog';

async function exportToCsv(model, filename, fields) {
  try {
    const data = await model.find({}).lean();
    
    let csvStr = fields.join(',') + '\n';
    
    for (const row of data) {
      const rowData = fields.map(field => {
        let val = row[field];
        if (val === undefined || val === null) val = '';
        val = String(val).replace(/"/g, '""'); // Escape double quotes
        return `"${val}"`;
      });
      csvStr += rowData.join(',') + '\n';
    }

    const filepath = path.join(__dirname, filename);
    await fs.writeFile(filepath, csvStr);
    console.log(`Successfully exported ${data.length} records to ${filename}`);
  } catch (err) {
    console.error(`Error exporting ${filename}:`, err);
  }
}

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Export Users
    await exportToCsv(User, 'users.csv', ['_id', 'username', 'role', 'createdAt', 'updatedAt']);
    
    // Export Products
    await exportToCsv(Product, 'products.csv', ['_id', 'name', 'description', 'price', 'category', 'imageUrl', 'createdAt', 'updatedAt']);
    
    // Export Articles
    await exportToCsv(Article, 'articles.csv', ['_id', 'title', 'content', 'thumbnailUrl', 'createdAt', 'updatedAt']);

    await mongoose.disconnect();
    console.log('Export complete. Disconnected from MongoDB.');
  } catch (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }
}

main();
