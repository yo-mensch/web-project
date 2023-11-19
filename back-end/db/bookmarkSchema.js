const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookmarker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const bookmarkSchema = new mongoose.Schema({
  url: String,
  title: String,
  description: String,
  category: String,
  userId: String
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = {
  Bookmark
};