import React from 'react';
import Background from './Background.jsx'
import VisualizerContainer from './VisualizerContainer.jsx';
import MediaPlayerControls from './MediaPlayerControls.jsx'
import AudioElement from './AudioElement.jsx'
import { getAverageVolume } from '../../modules/helpers';
import * as d3 from "d3";
import InfoBelt from './InfoBelt.jsx'

class MediaPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.audioNode;
    // this.printElement.bind(this)

    this.state = {
      isPlaying: false,
      hover: false,
      currentSongTimeElapsed: 0,
      visualizer: "bars",
      currentSongDuration: 0,
      artist: "Jason Park",
      layoutConfig: {
        playerWidth: 360,
        scrubberBar: {
            height: 7
        }
    }
    }
  }

  getStyles() {
    var isPlaying = this.state.isPlaying,
        hover = this.state.hover;
    return {
        background: "#fff",
        position: "relative",
        //overflow: "hidden",
        width: this.state.layoutConfig.playerWidth,
        transform:  hover || isPlaying ? "translateY(-3px)" : "",
        boxShadow:  hover || isPlaying ? "2px 6px 20px 0px rgba(0,0,0,0.6)" : "1px 0px 4px 0px rgba(0,0,0,0.66)",
        transition: "all ease 0.3s",
        margin: 10
    }
}

handleMouseEnter() {
  this.setState({hover: true})
}

handleMouseLeave() {
  this.setState({hover: false})
}

enlargePlayer(){
  this.state.layoutConfig.playerWidth = 500;
  this.setState({layoutConfig: this.state.layoutConfig })
}

shrinkPlayer(){
  this.state.layoutConfig.playerWidth = 360;
  this.setState({layoutConfig: this.state.layoutConfig })

}

  componentDidMount(){
    console.log('beat id',this.props.beat_id);
    this.audioNode = document.getElementById(this.props.beat_id);
    this.getTime()

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById(this.props.beat_id);
    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    // Bind our analyser to the media element source.
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    /*
       D3 setup
    */
    // Setup the SVG
    var svgHeight = document.getElementById("frequency-visualizer").offsetHeight;
    var svgWidth = document.getElementById("frequency-visualizer").offsetWidth;
    function createSvg(parent, height, width) {
        return d3.select(parent)
            .append('svg')
            .attr('height', height)
            .attr('width', width);
    }

    // Visualizer
    var graph = createSvg('#' + "frequency-visualizer", svgHeight, svgWidth);
    var frequencyData = new Uint8Array(255);

    this.renderFrequencyBars(graph, analyser, svgWidth, svgHeight)
    this.pulsateArt(analyser)
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

renderFrequencyBars(graph, analyser, svgWidth, svgHeight) {
    var barPadding = 1;
    var i = 0;
    var color = "red";
    var frequencyData = new Uint8Array(133);
    graph.selectAll('rect')
        .data(frequencyData)
        .enter()
        .append('rect')
        .attr('fill', function(d) {
            //return d3.hsl((d = (d + 1) % 360), 1, 0.66)
            //return d3.hsl((i = (i + 1) % 360), 1, 0.66)
            return color
        })
        .attr('width', svgWidth / frequencyData.length - barPadding)
        .attr('x', function (d, i) {
            return i * (svgWidth / frequencyData.length);
        })

    // NEED TO DO THIS THE REACT WAY!!
    // Continuously loop and update chart with frequency data.
    function renderChart() {
        requestAnimationFrame(renderChart);

        // Copy frequency data to frequencyData array.
        analyser.getByteFrequencyData(frequencyData);

        // Update d3 chart with new data.
        graph.selectAll('rect')
            .data(frequencyData)
            .attr('y', function(d) {
            return svgHeight - d;
        })
            .attr('height', function(d) {
            return d;
        })
    }
    // Run the loop
    renderChart();
}

pulsateArt(analyser) {
    var albumArt = document.getElementById("BGimg");
    var frequencyData = new Uint8Array(8);

    function pulsate() {
        requestAnimationFrame(pulsate);
        // Copy frequency data to frequencyData array.
        analyser.getByteFrequencyData(frequencyData);
        // Get the average level
        var average = Math.ceil(getAverageVolume(frequencyData) / 10) * 10;
        // Pulsate the art
        albumArt.style.webkitFilter = "blur(" + average / 50 + "px)";
        albumArt.style.filter = "blur(" + average / 50 + "px)";
    }

    pulsate();
}


  render() {
    return (
      <div
        style={this.getStyles()}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}>
        <Background
          beat_title={this.props.beat_title}
          artist = {this.state.artist}
          hover = {this.state.hover}
          handleMouseLeave = {this.handleMouseLeave}
          handleMouseEnter = {this.handleMouseEnter}
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
          hover = {this.state.hover}
          isPlaying = {this.state.isPlaying}
          beat_id = {this.props.beat_id}
        />
        <InfoBelt
          playerWidth = {this.state.layoutConfig.playerWidth}
          enlargePlayer = {this.enlargePlayer.bind(this)}
          shrinkPlayer = {this.shrinkPlayer.bind(this)}
          beat = {this.props.beat}
          nextBeat = {this.props.nextBeat}
          previousBeat = {this.props.previousBeat}
        />
      </div>
    );
  }

}

export default MediaPlayer;
