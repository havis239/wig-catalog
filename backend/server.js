const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded images)
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));
app.use('/brain', express.static('C:/Users/LENOVO/.gemini/antigravity/brain/f6d0b95e-01e8-442e-bcbf-b477252af354'));


// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes (to be imported)
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const articleRoutes = require('./routes/articles');
const inquiryRoutes = require('./routes/inquiries');
const testimonialRoutes = require('./routes/testimonials');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Wig Catalog API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
