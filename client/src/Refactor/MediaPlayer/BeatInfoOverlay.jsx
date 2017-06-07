import React from 'react';

class BeatInfoOverlay extends React.Component {
    getStyles() {
        var isPlaying = this.props.isPlaying,
            tone = "#111111"
        return {
            width: "100%",
            height: "auto",
            background: "linear-gradient(transparent, " + tone + ")",
            display: "block",
            margin: 0,
            position: "absolute",
            zIndex: 100,
            bottom: 0,
            left: 0,
            padding: "100px 20px 20px",
            color: "#fff",
            transition: "all ease 0.5s",
            textShadow: "2px 2px 2px rgba(0,0,0,0.5)",
            transform: isPlaying ? "translateY(0%)" : "translateY(100%)"
        }
    }

    getNowPlayingStyles() {
        var isPlaying = this.props.isPlaying;
        return {
            fontSize: "0.5em",
            background: "rgba(0,0,0,0.8)",
            padding: "5px 10px",
            margin: "10px 0px",
            borderRadius: 3,
            fontWeight: 700,
            opacity: isPlaying ? 1 : 0,
            transform: isPlaying ? "translateY(0px)" : "translateY(-20px)" ,
            textTransform: "uppercase"
        }
    }
    render() {
        var isPlaying = this.props.isPlaying,
            nowPlaying = isPlaying ? "Now Playing" : null;
        return (
            <div style={this.getStyles()} className="text-left">
                <span style={this.getNowPlayingStyles()}>{nowPlaying}</span>
                <h3 style={{margin: "10px 0px", fontSize: "1.8em"}}>{this.props.beat_title}</h3>
                <p style={{margin: "5px 0px"}}>{this.props.artist}</p>
                <p style={{margin: "5px 0px"}}>{this.props.beat_price}</p>
            </div>
        )
    }
}

export default BeatInfoOverlay;
