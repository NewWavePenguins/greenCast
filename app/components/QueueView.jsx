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

  // get queue

    // set state with new queue

  //component will mount

  getQueue() {
    if (window.username) {
      $.ajax({
        url: `/user/${window.username}/queue`,
        method: 'GET',
        dataType: 'JSON'
      }).done(data => {
        this.setState({queueList: data});
      });
    }
  }

  //called before render
  componentWillMount() {
    this.getQueue()
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
              <QueueItemView key={index} episode = {episode} playThis={this.props.playThis} removeFromQueue={this.props.removeFromQueue}/>
            )
          }
        </div>
      );
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.queue !== this.props.queue) {
  //     const context = this;
  //     const requests = this.props.subscriptions.map(id => this.requestPodcastData(id));
  //     Promise.all(requests).done(results => {
  //       context.setState({
  //         requests: results.map(data => data.results[0])
  //       });
  //     });
  //   }
  // }

  componentDidMount() {
    var context = this;
    const requests = this.props.queue
    Promise.all(requests).done(() => {
      context.setState({
         queueList: context.props.queue
      })
    })
    // this.props.getQueue();
    // this.setState({
    // const context = this;
    // const requests = this.props.getQueue();
    // Promise.all(requests).done(results => {
    //   context.setState({
    //     queueList: results
    //   })
    // })

    // this.setState({
    //   queueList: this.props.queue
    // })
    // const context = this;
    // const data = this.props.getQueue();
    // data.done(results => {
    //   context.setState({
    //     queueList: results
    //   });
    // });
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
