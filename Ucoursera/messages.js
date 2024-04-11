const express = require('express');
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

const router = express.Router();

// Middleware to authenticate user using JWT token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided');

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Send a message
router.post('/', authenticate, async (req, res) => {
  const { receiver, message } = req.body;
  const sender = req.userId;

  try {
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();
    res.status(201).send('Message sent successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Retrieve messages for the authenticated user
router.get('/', authenticate, async (req, res) => {
  const userId = req.userId;

  try {
    const messages = await Message.find({ receiver: userId });
    res.send(messages);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
