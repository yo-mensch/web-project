const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../db/userSchema');
const SHA256 = require("crypto-js/sha256");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async(req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || String(SHA256(password)) !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
    res.cookie('token', token, { httpOnly: true, domain: 'http://localhost:3000' });
    res.json({ success: true });

  } catch (err) {
    console.log(process.env.JWT_SECRET_KEY);
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/logout', (req, res) => {
  try {
    res.clearCookie('token');
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

app.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/:id', async (req, res) => {
  try {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    const updatedUser = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params._id);
    res.json(deletedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;
