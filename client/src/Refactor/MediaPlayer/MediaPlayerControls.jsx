import React from 'react';
import AudioButtons from './AudioButtons.jsx'
import Scrubber from './Scrubber.jsx'

import { secondsToHMS }from '../../modules/helpers'

class MediaPlayerControls extends React.Component {

  getStyles() {
    return {
        background: "#222222",
        color: "#fff",
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        overflow: "visible",
        position: "relative",
        zIndex: 101
    }
}
getScrubTimeStyles() {
    return {
        fontSize: "0.8em",
        color: "white"
    }
}

  render(){
    return(
      <div style={this.getStyles()}>
        <Scrubber
          {...this.props}
        />
        <div style={this.getScrubTimeStyles()}>{secondsToHMS(this.props.elapsed)}</div>
          <AudioButtons
            {...this.props}
          />
        <div style={this.getScrubTimeStyles()}>{secondsToHMS(this.props.duration)}</div>
      </div>
    );
  }
}

export default MediaPlayerControls;
