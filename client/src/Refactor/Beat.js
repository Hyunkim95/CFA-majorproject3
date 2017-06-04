import React, { Component } from 'react';

class Beat extends Component {

  render() {
    return (
      <div >
          {this.props.beats.map((beat,i) =>
            <div key={i}>
            {beat.title}
            {beat.price}
            <audio controls>
              <source src={'http://localhost:3000/api/beats/' + beat._id}/>
            </audio>

          </div>)}
      </div>
    );
  }
}

export default Beat;
