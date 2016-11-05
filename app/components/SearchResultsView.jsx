import React from 'react';
import SearchResultsItemView from './SearchResultsItemView.jsx';

class SearchResultsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.search}>
      <div>
      Search Results
      </div>
      <br/>
      <div>
      {
        this.props.searchResults.map(podcast => {
          if (this.props.subscriptions.indexOf(podcast.collectionId + '') < 0) {
            return <SearchResultsItemView podcast={podcast}
            subscribe={this.props.subscribe}/>;
          } else {
            return null;
          }
        })
      }

      </div>
      </div>
    );
  }
}

const styles = {
  search: {
    paddingTop: '15px',
    fontFamily: 'Droid Sans',
    display: 'flex',
    flexFlow: 'column',
    paddingTop: '26px',
    marginTop: '15px',
    width: '650px',
    height: '700',
    overflow: 'auto',
    float: 'left'
  }
};

export default SearchResultsView;
