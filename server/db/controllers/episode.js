const EpisodeModel = require('../models/episode.js');

function addOne(episode, cb) {
  EpisodeModel.create(episode, cb);
}

module.exports = {
  addOne: addOne
};