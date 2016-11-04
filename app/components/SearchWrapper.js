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


  subscribe(collectionId, podcast) {
    $.ajax({
      url: `/user/${window.username}/subscriptions`,
      method: 'POST',
      data: {collectionId: collectionId,
             collectionName: podcast.collectionName,
             img: podcast.artworkUrl100
             }
    }).done(() => {
      console.log('subscribed to', collectionId);
      this.refreshSubscriptions();
    });
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
    $.ajax({
      url: `/user/${window.username}/recommended`,
      method: 'GET',
      dataType: 'JSON'
    }).done(data => {
      this.setState({subscriptions: data});
    });
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



