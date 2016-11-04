const mongoose = require('mongoose');
// const Schema = mongoose.Schema

const podcastSchema = mongoose.Schema({
  itunesId: {
    type: Number,
    unique: true
  },
  title: String,
  url: String,
  recommended: false,
  comment: String
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;