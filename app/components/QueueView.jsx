import React from 'react';
import $ from 'jquery';
import QueueItemView from './QueueItemView.jsx';
import Promise from 'bluebird';

class QueueView extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.queue.length === 0) {
      return (
        <div style={styles.noQueueMsg}> No episodes in queue </div>
      );
    } else {
      return (
        <div style={styles.queueStyle}> 
          {
            this.props.queue.map((episode, index) =>
              <QueueItemView key={index} episode = {episode} playThis={this.props.playThis} removeFromQueue={this.props.removeFromQueue} />
            )
          }
        </div>
      );
    }
  }

}



const styles = {
  queueStyle: {
    float: 'right',
    fontFamily: 'Droid Sans',
    width: '450px',
    height: '700',
    marginRight: '10%',
    marginTop: '15px',
    overflow: 'auto'
  },
  noQueueMsg: {
      border: 'none',
      // borderStyle: 'dotted',
      // borderColor: 'grey',
      // borderWidth: '20px dashed #ccc',
      fontFamily: 'droid sans',
      fontSize: '40px',
      fontWeight: 'bold',
      color: 'grey',
      width: '200px',
      height: '200px',
      textAlign: 'center',
      padding: '35px',
    }
};

export default QueueView;
