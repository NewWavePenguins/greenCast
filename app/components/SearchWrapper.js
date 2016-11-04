import React from 'react';   
import NavView from './NavView.jsx';
import SearchResultsView from './SearchResultsView.jsx';
import $ from 'jquery';

class SearchWrapper extends React.Component {
  constructor () {
    super();

    this.state = {
      searching: true,
      searchResults: [],
      subscriptions: []
    };
  }


  addPodcast(podcast) {

  }

  subscribe(channelId, podcast) {
    $.ajax({
      url: `/user/${window.username}/subscriptions`,
      method: 'POST',
      data: {channel: channelId}
    }).done(() => {
      console.log('subscribed to', channelId);
      this.refreshSubscriptions();
    });
    
    console.log('INSIDE ADDPODCAST', podcast);
  }

  getPodcasts(query) {
    let search = this.requestPodcastData(query).done(data => {
      // console.log('DATA',data);
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

  componentDidMount() {
    // load recommended podcasts
  }

  render () {
    return (
      <div style={styles.container}>
        <NavView
          username={window.username}
          handleSearchInputChange={this.getPodcasts.bind(this)}
          stopSearching={this.stopSearching.bind(this)}
          searching = {this.state.searching}
        />
        <SearchResultsView
          searchResults={this.state.searchResults}
          subscribe={this.subscribe.bind(this)}
          subscriptions={this.state.subscriptions}
          addPodcast={this.addPodcast.bind(this)}
        />
      </div>
      ) 
  }

}

const styles = {
  container: {
    marginTop: '50px'
  }
};  

export default SearchWrapper;



