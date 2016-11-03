import React from 'react';
import $ from 'jquery';
import QueueItemView from './QueueItemView.jsx';

class QueueView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      queueList: []
    }
  }

  render() {
    if (this.state.queueList.length === 0) {
      return (
        <div style={styles.queueView}> No episodes in queue </div>
      );
    } else {
      return (
        <div style={styles.queueView}> {this.state.feedTitle}
          {
            this.state.queueList.map((episode, index) =>
              <QueueItemView key={index} episode = {episode} />
            )
          }
        </div>
      );
    }
  }

}

const styles = {
  feedStyle: {
    float: 'right',
    fontFamily: 'Droid Sans',
    width: '450px',
    height: '700',
    marginRight: '40%',
    marginTop: '15px',
    overflow: 'auto'
  }
};

export default QueueView;
