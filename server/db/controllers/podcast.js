const PodcastModel = require('../models/podcast.js');

function addOne(podcast, cb) {
  PodcastModel.create(podcast, cb);
}

// function removeOne(episodeTitle, cb) {
//   EpisodeModel.findOneAndRemove({title: episodeTitle}, cb);
// }

function findOne(podcastTitle, cb) {
  PodcastModel.findOne({title: podcastTitle}, cb);
}

function findAllRecommended(cb) {
  PodcastModel.find( {recommended: true}, cb);
}


module.exports = {
  addOne: addOne,
  // removeOne: removeOne,
  findOne: findOne,
  findAllRecommended: findAllRecommended
};