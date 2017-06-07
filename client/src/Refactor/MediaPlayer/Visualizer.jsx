import React from 'react';
import { getAverageVolume } from '../../modules/helpers';
import * as d3 from "d3";

class Visualizer extends React.Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
      /*
          MOVE ALL OF THIS
          - This all should go into the MusicPlayer component and be passed through as props
          - Figure out best way to store and pass the Analyser, Media Element, etc...

      */
      // Get the audio data and format it for clean handoff to D3.js
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

      if(this.props.visualisation == "bars"){
        this.renderFrequencyBars(graph, analyser, svgWidth, svgHeight)
        this.pulsateArt(analyser)
      }else{
        this.renderFrequencyRipples(graph, analyser, svgWidth, svgHeight)
        this.pulsateArt(analyser)
      }
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

  renderFrequencyRipples(graph, analyser, svgWidth, svgHeight) {
    var i = 0;
    var frequencyData = new Uint8Array(svgWidth);
    var color = "#557c89";

    // NEED TO DO THIS THE REACT WAY!!
    // Continuously loop and update chart with frequency data.
    function renderChart() {
        requestAnimationFrame(renderChart);
        //var color = d3.hsl((i = (i + 1) % 360), 1, 0.66);
        //var color = helpers.randomProperty(gradient);
        // Copy frequency data to frequencyData array.
        analyser.getByteFrequencyData(frequencyData);

        graph.insert("circle", "rect")
            .data(frequencyData)
            .attr("cx", (d, i) => d * (svgWidth / frequencyData.length))
            .attr("cy", (d) =>  svgHeight + 10)
            .attr("r", 1e-6)
            .style("stroke", color)
            .style("stroke-opacity", 0.7)
            .transition()
            .duration(10000)
            .ease(Math.sqrt)
            .attr("r", 600)
            .style("stroke-opacity", 0.001)
            .remove();

    }
    // Run the loop
    renderChart();
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

  render() {
      return (
          <div id="frequency-visualizer">
          </div>
      )
  }
}

export default Visualizer;
