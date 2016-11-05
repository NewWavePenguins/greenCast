import React from 'react';
import SearchResultsItemView from './SearchResultsItemView.jsx';

class SearchResultsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.search}>
      Search Results
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
    );
  }
}

const styles = {
  search: {
    paddingTop: '15px',
    fontFamily: 'Droid Sans',
    display: 'flex',
    flexFlow: 'column'
  }
};

export default SearchResultsView;
