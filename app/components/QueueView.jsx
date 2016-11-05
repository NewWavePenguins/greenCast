import React from 'react';
import $ from 'jquery';
import QueueItemView from './QueueItemView.jsx';
import Promise from 'bluebird';

class QueueView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      queueList: []
    }
  }


  getQueue() {
      $.ajax({
        url: `/user/${window.username}/queue`,
        method: 'GET',
        dataType: 'JSON'
      }).done(data => {
        this.setState({queueList: data});
      });
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
      })
    }
    this.getQueue()
  }

  //called before render
  componentWillMount() {
    this.getQueue();
  }



  render() {
    if (this.state.queueList.length === 0) {
      return (
        <div style={styles.queueStyle}> No episodes in queue </div>
      );
    } else {
      return (
        <div style={styles.queueStyle}> {this.state.feedTitle}
          {
            this.state.queueList.map((episode, index) =>
              <QueueItemView key={index} episode = {episode} playThis={this.props.playThis} removeFromQueue={this.removeFromQueue.bind(this)} />
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
  }
};

export default QueueView;
