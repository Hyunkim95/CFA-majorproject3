import React from 'react';

class ScrubberHandle extends React.Component {
    constructor() {
        super();

        this.state = {
            hover: false
        }
    }
    handleMouseOver() {
        this.setState({hover: true});
    }
    handleMouseOut() {
        this.setState({hover: false});
    }
    getStyles() {
        var hover = this.state.hover,
            scrubberPosition = (this.props.elapsed / this.props.duration * 100);
        return {
            width:  hover ? 20 : 15,
            height:  hover ? 20 : 15,
            position: "absolute",
            top: hover ? -15 : -10,
            left: scrubberPosition + "%",
            borderRadius: "50%",
            border: "solid 2px #ddd",
            transition: "all ease 0.2s",
            cursor: "ew-resize",
            background: "radial-gradient(#fff, #ddd)",
            boxShadow: hover ? "0px 0px 8px 2px rgba(255,255,255,0.5), inset 0px 0px 2px rgba(0,0,0,0.4)" : "0px 0px 4px 0px rgba(0,0,0,0.3), inset 0px 0px 2px rgba(0,0,0,0.3)",
        }
    }
    render() {
        return (
            <div style={this.getStyles()}
                onMouseOver={this.handleMouseOver.bind(this)}
                onMouseOut={this.handleMouseOut.bind(this)}>
            </div>
        )
    }
}

export default ScrubberHandle;
