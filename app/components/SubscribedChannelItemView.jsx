import React from 'react';

const Recommend = () => <div style={styles.hoverRecommend}>Recommend</div>
const Unsubscribe = () => <div style={styles.hoverUnsubscribe}>Unsubscribe</div>

class SubscribedChannelItemView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      hoverRecommend: false,
      hoverUnsubscribe: false
    };
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  toggleHoverRecommend() {
    this.setState({hoverRecommend: !this.state.hoverRecommend});
  }

  toggleHoverUnsubscribe() {
    this.setState({hoverUnsubscribe: !this.state.hoverUnsubscribe});
  }

  render() {
    let hover = this.state.hover ? styles.deepShadow : styles.shadow;
    return (
      <div style={Object.assign({}, styles.cardStyle, hover)} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
        <div style={styles.content} onClick={this.props.showEpisodes.bind(this, this.props.channel.collectionId)}>
          <div>
            <img style={styles.artwork} src={this.props.channel.artworkUrl100} />
          </div>
          <div style={styles.title}>
            <span>{this.props.channel.collectionName.length > 24 ? this.props.channel.collectionName.substring(0, 24) + ' ...' : this.props.channel.collectionName}</span>
          </div>
        </div>
        <div>
          <i style={styles.unsubscribe} onClick={this.props.unsubscribe.bind(this, this.props.channel.collectionId)} className="fa fa-times-circle" ariaHidden="true"
          onMouseEnter={this.toggleHoverUnsubscribe.bind(this)} onMouseLeave={this.toggleHoverUnsubscribe.bind(this)}></i>
          {this.state.hoverUnsubscribe ? <Unsubscribe /> : null}
        </div>
        <div>
          <i style={styles.recommend} onClick={this.props.toggleRecommend.bind(this, this.props.channel.collectionId)} className="fa fa-star-o" aria-hidden="true"
          onMouseEnter={this.toggleHoverRecommend.bind(this)} onMouseLeave={this.toggleHoverRecommend.bind(this)}></i>
          {this.state.hoverRecommend ? <Recommend /> : null}
        </div>
      </div>
    );
  }
}

const styles = {
  cardStyle: {
    marginBottom: '15px',
    height: '60px',
    width: '300px',
    position: 'relative',
    background: 'white'
  },
  artwork: {
    height: '60px',
    width: '60px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    position: 'absolute',
    top: 0,
    left: 0
  },
  content: {
    width: '400px',
    height: '100px'
  },
  title: {
    fontFamily: 'Droid Sans',
    fontSize: '15px',
    fontWeight: 'bold',
    left: '80px',
    top: '20px',
    position: 'absolute'
  },
  unsubscribe: {
    top: '-10px',
    left: '-10px',
    position: 'absolute',
    color: 'rgb(251,73,71)',
    fontSize: '20px',
    cursor: 'pointer'
  },
  hoverUnsubscribe: {
    top: '10px',
    left: '-10px',
    position: 'absolute',
    fontFamily: 'Droid Sans',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'inline-block',
    paddingTop: '2px',
    paddingRight: '6px',
    paddingBottom: '2px',
    paddingLeft: '6px',
    backgroundColor: 'rgb(251,73,71)',
    borderRadius: '4px',
    margin: '3px'
  },
  recommend: {
    bottom: '35px',
    left: '275px',
    position: 'absolute',
    color: '#FFBF00',
    fontSize: '22px',
    cursor: 'pointer'
  },
  hoverRecommend: {
    bottom: '35px',
    left: '300px',
    position: 'absolute',
    fontFamily: 'Droid Sans',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'inline-block',
    paddingTop: '2px',
    paddingRight: '6px',
    paddingBottom: '2px',
    paddingLeft: '6px',
    backgroundColor: '#FFBF00',
    borderRadius: '4px',
    margin: '3px'
  },
  shadow: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.4s'
  },
  deepShadow: {
    boxShadow: '0 4px 16px 0 rgba(0,0,0,0.2)',
    transition: '0.4s'
  }
};

export default SubscribedChannelItemView;
