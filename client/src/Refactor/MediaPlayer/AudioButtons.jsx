import React from 'react';
import PlayIcon from './PlayIcon.jsx';
import PauseIcon from './PauseIcon.jsx';

class AudioButtons extends React.Component {
  constructor(props){
    super(props)
  }

  getStyles() {
    var isPlaying = this.props.isPlaying,
        hover = this.props.hover

    return {
        background: hover || isPlaying ? ("#111") : null,
        color: "#fff",
        height: 60,
        width: 60,
        marginBottom: hover || isPlaying ? 10 : -10,
        borderRadius: "50%",
        alignSelf: "flex-end",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all ease 0.3s"
    }
}

  render(){
    return(
      <div
        style={this.getStyles()}
        onMouseEnter={this.props.handleMouseEnter}
        onMouseLeave={this.props.handleMouseLeave}
        >
        {!this.props.isPlaying ?
        (
          <div onClick={this.props.play}>
            <PlayIcon/>
          </div>
        )
          :
        (
          <div onClick={this.props.pause}>
            <PauseIcon/>
          </div>
        )}
      </div>
    );
  }
}

export default AudioButtons;
