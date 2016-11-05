import React from 'react';
import NavView from './NavView.jsx';
import SearchResultsView from './SearchResultsView.jsx';
import RecommPodcastsView from './RecommPodcastsView.js';
import $ from 'jquery';

class SearchWrapper extends React.Component {
  constructor () {
    super();

    this.state = {
      searching: false,
      searchResults: [],
      subscriptions: [],
      recommended: [],
      searchBar: true
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
    if (query) {
      let search = this.requestPodcastData(query).done(data => {
        this.setState({searchResults: data.results, searching: true});
      });
    } else {
      this.setState({searching: false});
    }
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
    $.ajax({
      url: `/user/${window.username}/recommended`,
      method: 'GET',
      dataType: 'JSON'
    }).done(data => {
      this.setState({recommended: data});
    });
  }

  render () {
    return (
      <div style={styles.container}>
        <NavView
          username={window.username}
          handleSearchInputChange={this.getPodcasts.bind(this)}
          stopSearching={this.stopSearching.bind(this)}
          searchBar = {this.state.searchBar}
        />
        {this.state.searching ?
          <SearchResultsView
            searchResults={this.state.searchResults}
            subscribe={this.subscribe.bind(this)}
            subscriptions={this.state.subscriptions}
            searching = {this.state.searching}
          />
          :
          <div style={styles.cardStyle}>
            <h3>Hey, what do you feel like listening today?</h3>
              <div style={styles.descriptionStyle}>Use the search bar above to find your favorite channel or simply choose from one of the recommended podcasts!</div>
          </div>
        }

        <RecommPodcastsView recommPodcasts={this.state.recommended} />

      </div>
    );
  }

}

const styles = {
  container: {
    marginTop: '50px'
  },
  placeHolder: {
    borderStyle: 'dotted',
    borderColor: 'grey',
    borderWidth: '20px dashed #ccc',
    fontFamily: 'droid sans',
    fontSize: '40px',
    fontWeight: 'bold',
    color: 'grey',
    width: '400px',
    height: '320px',
    textAlign: 'center',
    padding: '35px'
  },
  placeHolderMsg: {
    fontFamily: 'droid sans',
    fontSize: '20px',
    fontWeight: 'normal',
    color: 'grey',
    textAlign: 'center',
    padding: '45px',
  },
  cardStyle: {
    paddingTop: '15px',
    marginBottom: '15px',
    marginLeft: '16px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    width: '400px',
    padding: '10px',
    background: 'white',
    fontFamily: 'Droid Sans',
    marginTop: '60px'
  },
  descriptionStyle: {
    fontSize: '14px',
    marginBottom: '8px'
  },
  durationStyle: {
    fontSize: '12px',
  },
};

export default SearchWrapper;
