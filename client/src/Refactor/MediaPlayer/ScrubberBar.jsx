import React from 'react';

class ScrubberBar extends React.Component {
    getStyles() {
        return {
            width: "100%",
            height: this.props.layoutConfig.scrubberBar.height,
            position: "absolute",
            bottom: 0, left: 0,
            background: "black",
            transition: "all ease 0.3s"
        }
    }
    render() {
        return (
            <div style={this.getStyles()}>
            </div>
        )
    }
}


export default ScrubberBar;
