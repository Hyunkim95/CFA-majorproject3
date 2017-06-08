import React from 'react';

class FullScreenIcon extends React.Component {
    render() {
        return (
            <svg style={this.props.style}
                viewBox="0 0 38 24"
                width="20px"
                enable-background="new 0 0 38 24">
                <g>
                    <path fill="#fff" d="M0,0v24h38V0H0z M33,12H20V5h13V12z"/>
                </g>
            </svg>
        )
    }
}

export default FullScreenIcon;
