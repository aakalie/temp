const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./messages');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/secure_messaging', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/auth', authRoutes);
app.use('/messages', messagesRoutes);

// Start the server
const port = process.env.PORT || 5813 || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
