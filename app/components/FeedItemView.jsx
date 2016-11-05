import React from 'react';

const Enqueue = () => <div style={styles.hoverEnqueue}>Add To Queue</div>
const Play = () => <div style={styles.hoverPlay}>Play</div>

class FeedItemView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      hoverEnqueue: false,
      hoverPlay: false
    };
  }

  shrinkDescription(desc) {
    if (desc) {
      let summary = desc + '';
      summary = summary.split('<')[0];
      return summary.substring(0, 325) + '...';
    } else {
      return '';
    }
  }

  //for formatting of podcast times
  timeEditor(time) {
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    let hrs = Math.floor(time / 3600);
    mins = Math.floor((time % 3600) / 60);
    secs = time % 60;
    let podLength = '';
    if (hrs > 0) {
      podLength += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    podLength += '' + mins + ':' + (secs < 10 ? '0' : '');
    podLength += '' + secs;
    return podLength;
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  toggleHoverEnqueue() {
    this.setState({hoverEnqueue: !this.state.hoverEnqueue});
  }

  toggleHoverPlay() {
    this.setState({hoverPlay: !this.state.hoverPlay});
  }

  render() {
    let hover = this.state.hover ? styles.deepShadow : styles.shadow;
    return (
      <div style={Object.assign({}, styles.cardStyle, hover)} onMouseEnter={this.toggleHover.bind(this)}
       onMouseLeave={this.toggleHover.bind(this)}>

        <div style={styles.content}>
          <div>
            <i style={styles.addToQueue} onClick={this.props.addToQueue.bind(this, this.props.episode)} className="fa fa-plus-circle" ariaHidden="true"
          onMouseEnter={this.toggleHoverEnqueue.bind(this)} onMouseLeave={this.toggleHoverEnqueue.bind(this)}></i>
          {this.state.hoverEnqueue ? <Enqueue /> : null}
          </div>
          <div>
            <i style={styles.playThis} onClick={this.props.playThis.bind(this, this.props.episode)} className="fa fa-play-circle" ariaHidden="true"
            onMouseEnter={this.toggleHoverPlay.bind(this)} onMouseLeave={this.toggleHoverPlay.bind(this)}></i>
          {this.state.hoverPlay ? <Play /> : null}  
          </div>
          <span>{this.props.episode.image ? <img src={this.props.episode.image} style={styles.image} /> : null}</span>
          <h3>{this.props.episode.title}</h3>
          <p style={styles.descriptionStyle}>{this.shrinkDescription(this.props.episode.description)}</p>
          <span style={styles.durationStyle}>Duration: {this.timeEditor(this.props.episode.duration)}</span>
        </div>
      </div>
    );
  }
};

const styles = {
  cardStyle: {
    marginBottom: '15px',
    marginLeft: '16px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    width: '400px',
    padding: '10px',
    background: 'white'
  },
  descriptionStyle: {
    fontSize: '14px',
    marginBottom: '8px'
  },
  durationStyle: {
    fontSize: '12px',
  },
  addToQueue: {
    // top: '35px',
    // left: '150px',
    // position: 'absolute',
    color: 'rgb(74,201,67)',
    fontSize: '22px',
    cursor: 'pointer'
  },
  hoverEnqueue: {
    // top: '10px',
    // left: '-10px',
    // position: 'absolute',
    fontFamily: 'Droid Sans',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'inline-block',
    paddingTop: '2px',
    paddingRight: '6px',
    paddingBottom: '2px',
    paddingLeft: '6px',
    backgroundColor: 'rgb(74,201,67)',
    borderRadius: '4px',
    margin: '3px'
  },
  playThis: {
   // top: '35px',
   // left: '150px',
   // position: 'absolute',
   // marginLeft: '3px',
   color: 'rgb(128,128,128)',
   fontSize: '22px',
   cursor: 'pointer'
  },
  hoverPlay: {
    // bottom: '35px',
    // left: '300px',
    // position: 'absolute',
    fontFamily: 'Droid Sans',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'inline-block',
    paddingTop: '2px',
    paddingRight: '6px',
    paddingBottom: '2px',
    paddingLeft: '6px',
    backgroundColor: 'rgb(128,128,128)',
    borderRadius: '4px',
    margin: '3px'
  },
  image: {
    width: '400px',
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

export default FeedItemView;
