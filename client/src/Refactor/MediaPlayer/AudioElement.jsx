import React from 'react';

class AudioElement extends React.Component {
    componentDidMount() {
        if (this.props.isPlaying) {
            this.refs.audioNode.play();
        }
    }

    getStyles(){
      // return {display: "none"}
    }

    render() {
        return (
          <audio style={this.getStyles()} id={this.props.beat_id} src={"http://localhost:3000/api/beats/" + this.props.beat_id} ></audio>
        )
    }
}

export default AudioElement;
