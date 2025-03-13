// Fullstack_Part4/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const tokenExtractor = require('./middleware/tokenExtractor');
const userExtractor = require('./middleware/userExtractor');

const app = express();

app.use(cors());
app.use(express.json());

// Define comments route before tokenExtractor
app.post('/api/blogs/:id/comments', async (req, res) => {
    const Blog = require('./models/blog');
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
  
    const comment = req.body.content;
    if (!comment) return res.status(400).json({ error: 'Comment content required' });
  
    blog.comments = blog.comments || [];
    blog.comments.push(comment);
    const updatedBlog = await blog.save();
    res.status(201).json(updatedBlog);
  });

app.use(tokenExtractor); // Applies to all routes below
app.use('/api/blogs', userExtractor, blogRoutes); // Apply userExtractor only to /api/blogs
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
