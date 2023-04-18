const express = require('express');
const bodyParser = require('body-parser');
const User = require('../db/userSchema');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
