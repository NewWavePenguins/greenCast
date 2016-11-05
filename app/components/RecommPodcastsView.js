import React from 'react';
import RecommPodcastItemView from './RecommPodcastItemView.js';

class RecommPodcastsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.search}>
      {this.props.recommPodcasts.map(podcast => {
            return <RecommPodcastItemView podcast={podcast} />;
        })}
      </div>
    );
  }
}

const styles = {
  search: {
    paddingTop: '15px',
    display: 'flex',
    flexFlow: 'row wrap'
  }
};

export default RecommPodcastsView;