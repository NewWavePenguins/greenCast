const mongoose = require('mongoose');
// const Schema = mongoose.Schema

const podcastSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: String,
  img: String,
  recommended: Boolean,
  comment: String
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;