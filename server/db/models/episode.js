const mongoose = require('mongoose');

const episodeSchema = mongoose.Schema({
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

const EpisodeModel = mongoose.model('Episode', episodeSchema);

module.exports = EpisodeModel;