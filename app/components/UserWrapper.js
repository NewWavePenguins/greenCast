import React from 'react';
import NavView from './NavView.jsx';
import UserView from './UserView.jsx';
import FeedView from './FeedView.jsx';
import QueueView from './QueueView.jsx';
import PlayerView from './PlayerView.jsx';
import $ from 'jquery';

class UserWrapper extends React.Component {
  constructor () {
    super()

    this.state = {
      searchBar: false,
      subscriptions: [],
      currentFeed: null,
      queue: [],
      nowPlayingTitle: null,
      nowPlaying: null,
      getQueueFlag: false
    };
  }

  playThis(episode) {
    console.log(episode);
    console.log(episode.title, ' is loading, be patient!');
    this.setState({
      nowPlaying: episode.enclosure.url,
      nowPlayingTitle: episode.title
    });
  }

  unsubscribe(channelId) {
    $.ajax({
      url: `/user/${window.username}/subscriptions`,
      method: 'DELETE',
      data: {channel: channelId}
    }).done(() => {
      console.log('unsubscribed from', channelId);
      this.refreshSubscriptions();
    });
  }

  toggleRecommend(podcastId) {
    $.ajax({
      url: `/user/${window.username}/recommended`,
      method: 'POST',
      data: {podcastId: podcastId}
    }).done(() => {
      console.log('Toggled recommended for podcase ', podcastId);
    });
  }

  showEpisodes(channelId) {
    this.setState({currentFeed: channelId});
  }

  getPodcasts(query) {
    let search = this.requestPodcastData(query).done(data => {
      this.setState({searchResults: data.results, searching: true});
    });
  }

  stopSearching() {
    this.setState({searching: false});
  }

  requestPodcastData(query) {
    return $.ajax({
      url: `https://itunes.apple.com/search?term=${query}&media=podcast`,
      method: 'GET',
      dataType: 'JSONP'
    });
  }

  componentDidMount() {
    this.refreshSubscriptions();
    this.getQueue();
  }

  refreshSubscriptions() {
    if (window.username) {
      $.ajax({
        url: `/user/${window.username}/subscriptions`,
        method: 'GET',
        dataType: 'JSON'
      }).done(data => {
        this.setState({subscriptions: data});
      });
    }
  }

  addToQueue(episode) {
    if (window.username) {
      $.ajax({
        url: `/user/${window.username}/queue`,
        method: 'POST',
        data: {episode: episode}
      }).done(data => {
        this.getQueue();
      });
    }
  }

  removeFromQueue(episode) {
    if (window.username) {
      $.ajax({
        url: `/user/${window.username}/queue`,
        method: 'DELETE',
        data: {episode: episode}
      }).done(data => {
        this.getQueue();
      });
    }
  }

  getQueue() {
    if (window.username) {
      $.ajax({
        url: `/user/${window.username}/queue`,
        method: 'GET',
        dataType: 'JSON'
      }).done(data => {
        this.setState({queue: data});
      });
    }
  }

  render () {
    return (
      <div style={styles.container}>
        <NavView
          username={window.username}
          handleSearchInputChange={this.getPodcasts.bind(this)}
          stopSearching={this.stopSearching.bind(this)}
          searchBar={this.state.searchBar}
        />
        
        <UserView
          subscriptions={this.state.subscriptions}
          unsubscribe={this.unsubscribe.bind(this)}
          showEpisodes={this.showEpisodes.bind(this)}
          toggleRecommend={this.toggleRecommend.bind(this)}
        />

        {this.state.currentFeed ? <FeedView currentFeed={this.state.currentFeed} playThis={this.playThis.bind(this)} addToQueue={this.addToQueue.bind(this)}/> : null}

        <QueueView
          queue={this.state.queue}
          playThis={this.playThis.bind(this)}
          getQueue={this.getQueue.bind(this)}
          removeFromQueue={this.removeFromQueue.bind(this)}
          />

        <PlayerView nowPlaying={this.state.nowPlaying} nowPlayingTitle={this.state.nowPlayingTitle || null}/>
      </div>
      )
  }

}


const styles = {
  container: {
    marginTop: '50px'
  }
};

export default UserWrapper;
