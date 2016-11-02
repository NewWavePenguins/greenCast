const mongoose = require('mongoose');

const episodeSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  title: String,
  description: String,
  duration: Number,
  enclosure: {
    url: {
      type: String,
      unique: true
    }
  }
});

const EpisodeModel = mongoose.model('User', episodeSchema);

module.exports = EpisodeModel;