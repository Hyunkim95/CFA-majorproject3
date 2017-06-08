import React from 'react';
import FullScreenIcon from './FullScreenIcon.jsx'

class InfoBelt extends React.Component {

    getStyles() {
        var clicked = this.props.clicked

        return {
            width: "100%",
            height: "auto",
            background: "#333333",
            display: "flex",
            position: "relative",
            zIndex: 100
        }
    }

    getLiStyles() {
        return {
            listStyle: "none",
            flex: "1 0 auto",
            textAlign: "center",
            color: "#eee",
            textTransform: "uppercase",
            fontSize: "18px",
            letterSpacing: "1px",
            padding: "12px 0px 12px",
            display: "flex",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "row wrap"
        }
    }

    getLiStyles2() {
        return {
          listStyle: "none",
          flex: "1 0 auto",
          textAlign: "center",
          color: "#eee",
          textTransform: "uppercase",
          fontSize: "8px",
          letterSpacing: "1px",
          padding: "12px 0px 8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "row wrap"
        }
    }

    getIconStyles() {
        return {
            height: 18
        }
    }
    getTitleStyles() {
        return {
            flex: "2 0 100%",
            marginTop: 12,
            color: "#fff"
        }
    }


    render() {
        return (
            <div style={this.getStyles()}>
                <li
                  style={this.getLiStyles()}
                  onClick = {()=>{this.props.previousBeat(this.props.beat)}}
                  >
                    <div  style={this.getLiStyles()}>
                        <span style={this.getTitleStyles()}>&#8249; Prev</span>
                    </div>
                </li>
                <li
                  style={this.getLiStyles()}
                  onClick = {()=>{this.props.nextBeat(this.props.beat)}}
                  >
                    <div style={this.getLiStyles()}>
                        <span style={this.getTitleStyles()}>Next &#8250;</span>
                    </div>
                </li>
                <li
                  style={this.getLiStyles()}
                    onClick={this.props.playerWidth == 360 ? this.props.enlargePlayer : this.props.shrinkPlayer}
                  >
                  <div style={this.getLiStyles2()}>
                      <FullScreenIcon
                          style={this.getIconStyles()}
                          theme={this.props.theme}>
                      </FullScreenIcon>
                      {this.props.playerWidth == 360 ?
                        (
                          <span style={this.getTitleStyles()}>Enlarge</span>
                        )
                        :
                        (
                          <span style={this.getTitleStyles()}>Shrink</span>
                        )
                      }
                  </div>
              </li>
            </div>
        )
    }
}

export default InfoBelt;
