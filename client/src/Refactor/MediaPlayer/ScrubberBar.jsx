import React from 'react';

class ScrubberBar extends React.Component {
    getStyles() {
        return {
            width: "100%",
            height: this.props.layoutConfig.scrubberBar.height,
            position: "absolute",
            bottom: 0, left: 0,
            background: "linear-gradient(to right, rgba(73,164,182,1) 0%, rgba(77,173,195,1) 12%, rgba(34,87,95,1) 56%, rgba(34,87,95,1) 100%)",
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
