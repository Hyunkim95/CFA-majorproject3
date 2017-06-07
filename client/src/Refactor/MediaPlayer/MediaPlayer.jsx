import React from 'react';
import Background from './Background.jsx'
import VisualizerContainer from './VisualizerContainer.jsx';
import MediaPlayerControls from './MediaPlayerControls.jsx'
import AudioElement from './AudioElement.jsx'
import InfoBelt from './InfoBelt.jsx'

class MediaPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.audioNode;
    // this.printElement.bind(this)

    this.state = {
      isPlaying: false,
      currentSongTimeElapsed: 0,
      visualizer: "bars",
      currentSongDuration: 0,
      artist: "Jason Park",
      layoutConfig: {
        playerWidth: 500,
        scrubberBar: {
            height: 7
        }
    }
    }
  }

  getStyles() {
    var isPlaying = this.state.isPlaying;
    return {
        background: "#fff",
        position: "relative",
        //overflow: "hidden",
        width: this.state.layoutConfig.playerWidth,
        transform:  isPlaying ? "translateY(-3px)" : "",
        boxShadow:  isPlaying ? "2px 6px 20px 0px rgba(0,0,0,0.6)" : "1px 0px 4px 0px rgba(0,0,0,0.66)",
        transition: "all ease 0.3s",
        margin: 10
    }
}


  componentDidMount(){
    console.log('beat id',this.props.beat_id);
    this.audioNode = document.getElementById(this.props.beat_id);
    this.getTime()
  }

  getTime(){
    var song = this.audioNode
    song.onloadedmetadata = () => this.setState({currentSongDuration: song.duration})
    song.ontimeupdate = () => this.updateTime();
  }

  updateTime(){
    var currentTime = this.audioNode.currentTime;
    this.setState({currentSongTimeElapsed: currentTime})
  }

  audioPlay(){
    this.audioNode.play()
    this.setState({
      isPlaying: true,
    })
  }

  audioPause(){
    this.audioNode.pause()
    this.setState({
      isPlaying: false,
    })
  }


  render() {
    return (
      <div style={this.getStyles()}>
        <Background
          beat_title={this.props.beat_title}
          artist = {this.state.artist}
          beat_price = {this.props.beat_price}
          isPlaying = {this.state.isPlaying}
        />
        <VisualizerContainer
          beat_id = {this.props.beat_id}
          isPlaying = {this.state.isPlaying}
          playerWidth={this.state.layoutConfig.playerWidth}
          visualisation = {this.state.visualizer}
         />
        <MediaPlayerControls
          audioNode = {this.audioNode}
          beat_id = {this.props.beat_id}
          isPlaying = {this.state.isPlaying}
          play = {this.audioPlay.bind(this)}
          pause = {this.audioPause.bind(this)}
          layoutConfig={this.state.layoutConfig}
          duration = {this.state.currentSongDuration}
          elapsed = {this.state.currentSongTimeElapsed}
        />
        <AudioElement
          isPlaying = {this.state.isPlaying}
          beat_id = {this.props.beat_id}
        />
        <InfoBelt
          beat = {this.props.beat}
          nextBeat = {this.props.nextBeat}
          previousBeat = {this.props.previousBeat}
        />
      </div>
    );
  }

}

export default MediaPlayer;
