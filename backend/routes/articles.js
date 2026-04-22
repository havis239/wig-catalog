const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `article-${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Images only!');
    }
  }
});

// @route   GET /api/articles
// @desc    Get all articles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/articles/:id
// @desc    Get single article
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/articles
// @desc    Create an article
// @access  Private
router.post('/', protect, upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, content } = req.body;
    let thumbnailUrl = '';

    if (req.file) {
      const baseUrl = req.protocol + '://' + req.get('host');
      thumbnailUrl = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const article = new Article({
      title,
      content,
      thumbnailUrl: thumbnailUrl || 'https://via.placeholder.com/600x400'
    });

    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/articles/:id
// @desc    Update an article
// @access  Private
router.put('/:id', protect, upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.findById(req.params.id);

    if (article) {
      article.title = title || article.title;
      article.content = content || article.content;

      if (req.file) {
        const baseUrl = req.protocol + '://' + req.get('host');
        article.thumbnailUrl = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const updatedArticle = await article.save();
      res.json(updatedArticle);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/articles/:id
// @desc    Delete an article
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article) {
      await Article.deleteOne({ _id: article._id });
      res.json({ message: 'Article removed' });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
