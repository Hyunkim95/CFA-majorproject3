import React, { Component } from 'react';

const PurchasedBeats = ({
  beats
}) => (
    <div>
      {beats.map((beat, i) =>
        <audio controls>
          <source src={'http://localhost:3000/api/beats/' + beat._id}/>
        </audio>
      )}
    </div>
);

export default PurchasedBeats;
