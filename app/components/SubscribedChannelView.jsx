import React from 'react';
import Promise from 'bluebird';
import $ from 'jquery';
import SubscribedChannelItemView from './SubscribedChannelItemView.jsx';

class SubscribedChannelView extends React.Component {

  constructor() {
    super();

    this.state = {
      requests: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.subscriptions !== this.props.subscriptions) {
      const context = this;
      const requests = this.props.subscriptions.map(id => this.requestPodcastData(id));
      Promise.all(requests).done(results => {
        context.setState({
          requests: results.map(data => data.results[0])
        });
      });
    }
  }

  componentDidMount() {
    const context = this;
    const requests = this.props.subscriptions.map(id => this.requestPodcastData(id));
    Promise.all(requests).done(results => {
      context.setState({
        requests: results.map(data => data.results[0])
      });
    });
  }

  render() {
    return (
      <div style={styles.subscriptions}>
      <div>
        Subscribed Podcasts
      </div>
      <br/>
        {
          this.state.requests.map((channel, index) =>
            <SubscribedChannelItemView
              key = {index}
              channel={channel}
              unsubscribe={this.props.unsubscribe}
              showEpisodes={this.props.showEpisodes} toggleRecommend={this.props.toggleRecommend}
            />
          )
        }
      </div>
    );
  }

  requestPodcastData(id) {
    return $.ajax({
      url: `http://itunes.apple.com/lookup?id=${id}`,
      method: 'GET',
      dataType: 'JSONP'
    });
  }
}

const styles = {
  subscriptions: {
    fontFamily: 'Droid Sans',
    width: '450px',
    height: '550px',
    marginBottom: '80px',
    marginLeft: '10%',
    paddingTop: '11px',
    paddingLeft: '30px',
    overflow: 'auto'
  }
}

export default SubscribedChannelView;
