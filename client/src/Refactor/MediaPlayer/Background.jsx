import React from 'react';
import BeatInfoOverlay from './BeatInfoOverlay.jsx'

class Background extends React.Component {
    getStyles() {
        return {
            width: "100%",
            height: "auto",
            display: "block",
            position: "relative",
            margin: 0,
            overflow: "hidden"
        }
    }
    render() {
        var link = "http://i.imgur.com/cjnbSUC.png",
            artist = ""
        return (
            <div style={this.getStyles()}>
                <BeatInfoOverlay
                    {...this.props}/>

                <img id = "BGimg"
                    ref="art"
                    style={{width: "100%", height: "100%", transform: "translateZ(0)"}}
                    src={link} />
            </div>
        )
    }
}

export default Background;
