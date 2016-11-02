const EpisodeModel = require('../models/episode.js');

function addOne(episode, cb) {
  EpisodeModel.create(episode, cb);
}

function removeOne(episodeTitle, cb) {
  EpisodeModel.findOneAndRemove({title: episodeTitle}, cb);
}

function findOne(episodeTitle, cb) {
  EpisodeModel.findOne({title: episodeTitle}, cb);
}

module.exports = {
  addOne: addOne,
  removeOne: removeOne,
  findOne: findOne
};