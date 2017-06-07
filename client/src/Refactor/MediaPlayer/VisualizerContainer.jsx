import React from 'react';
import Visualizer from './Visualizer.jsx'

class VisualizerContainer extends React.Component {
    getStyles() {
        var isPlaying = this.props.isPlaying;
        // Get dimension of album art
        // These are the dimensions we will map the visualizer to... for now..
        var width = this.props.playerWidth,
            height = this.props.playerWidth;

        return {
            top: 0,
            left: 0,
            width: "100%",
            height: height,
            position: "absolute",
            zIndex: 99,
            transition: "all ease 0.7s",
            opacity: isPlaying ? 1 : 0,
            background:  "rgba(20,20,20,0.2)"
      }
  }

    render() {
        return (
            <div id = "frequency-visualizer" style={this.getStyles()}>
                <Visualizer
                  {...this.props}
                />
            </div>
        )
    }
}

export default VisualizerContainer;
