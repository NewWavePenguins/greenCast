import React from 'react';
import NavView from './NavView.jsx';
import UserView from './UserView.jsx';
import FeedView from './FeedView.jsx';
import PlayerView from './PlayerView.jsx';
import $ from 'jquery';

class UserWrapper extends React.Component {
  constructor () {
    super()

    this.state = {
      searching: false,
      subscriptions: [],
      currentFeed: null,
      queue: null,
      nowPlayingTitle: null,
      nowPlaying: null
    };
  }

  subscribe(channelId) {
    $.ajax({
      url: `/user/${window.username}/subscriptions`,
      method: 'POST',
      data: {channel: channelId}
    }).done(() => {
      console.log('subscribed to', channelId);
      this.refreshSubscriptions();
    });
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

  showEpisodes(channelId) {
    this.setState({currentFeed: channelId});
    console.log(this.state.currentFeed);
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
        // this.setState({subscriptions: data});
        console.log('episode', episode)
        console.log('data', data)
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
        // this.setState({subscriptions: data});
        console.log('episode', episode)
        console.log('data', data)
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
        // this.setState({subscriptions: data});
        console.log('episode', episode)
        console.log('data', data)
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
          searching={this.state.searching}
        />
        <UserView
          subscriptions={this.state.subscriptions}
          unsubscribe={this.unsubscribe.bind(this)}
          showEpisodes={this.showEpisodes.bind(this)}
        />
        {this.state.currentFeed ? <FeedView currentFeed={this.state.currentFeed} playThis={this.playThis.bind(this)} addToQueue={this.addToQueue.bind(this)}/> : null}
        {/* {this.state.queue ? <FeedView queue={this.state.queue} playThis={this.playThis.bind(this)} addToQueue={this.addToQueue.bind(this)}/> : null} */}
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
