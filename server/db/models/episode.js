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

//presave...push episode id to user's episode array

const EpisodeModel = mongoose.model('Episode', episodeSchema);

module.exports = EpisodeModel;