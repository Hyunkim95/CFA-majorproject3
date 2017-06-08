import React from 'react';
import ScrubberHandle from './ScrubberHandle.jsx'
import ScrubberBar from './ScrubberBar.jsx'

class Scrubber extends React.Component {
  getStyles() {
      return {
          width: "100%",
          height: "auto",
          position: "absolute",
          bottom: -this.props.layoutConfig.scrubberBar.height,
          left: 0
      }
  }

  render(){
    return(
        <div style={this.getStyles()}>
          <ScrubberBar
            {...this.props}
          />
          {this.props.isPlaying ?
            (
              <ScrubberHandle
                elapsed = {this.props.elapsed}
                duration = {this.props.duration}
              />
            )
            :
            (
              null
            )}
        </div>
    );
  }
}

export default Scrubber;
