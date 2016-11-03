import React from 'react';

class SearchResultsItemView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  render() {
    let hover = this.state.hover ? styles.deepShadow : styles.shadow;
    return (
      <div style={Object.assign({}, styles.cardStyle, hover)} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
        <div style={styles.content}>
          <div>
            <img style={styles.artwork} src={this.props.podcast.artworkUrl100} />
          </div>
          <div style={styles.title}>
            <span>{this.props.podcast.collectionName.length > 24 ? this.props.podcast.collectionName.substring(0, 24) + ' ...' : this.props.podcast.collectionName}</span>
          </div>
        </div>
        <div>
        <i style={styles.subscribe} onClick={this.props.subscribe.bind(this, this.props.podcast.collectionId)} className="fa fa-plus-circle" ariaHidden="true"></i>
        </div>
      </div>
    );
  }
}

const styles = {
  cardStyle: {
    marginBottom: '15px',
    marginLeft: '15px',
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
  subscribe: {
    top: '35px',
    left: '275px',
    position: 'absolute',
    color: 'rgb(74,201,67)',
    fontSize: '22px',
    cursor: 'pointer'
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

export default SearchResultsItemView;