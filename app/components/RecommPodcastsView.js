import React from 'react';
import RecommPodcastItemView from './RecommPodcastItemView.js';

class RecommPodcastsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.search}>
      <div>
        Recommended Podcasts
      </div>
      <br/>
      {this.props.recommPodcasts.map(podcast => {
            return <RecommPodcastItemView podcast={podcast} />;
        })}
      </div>
    );
  }
}

const styles = {
  search: {
    float: 'left',
    paddingTop: '15px',
    display: 'flex',
    flexFlow: 'column wrap',
    fontFamily: 'Droid Sans'
  }
};

export default RecommPodcastsView;
