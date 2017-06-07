import React, { Component } from 'react';
import { UncontrolledAlert, Table } from 'reactstrap';
import Sale from './Sale.jsx'

const Beat = ({
  current_beat,
  chooseBeat,
  temp_error,
  handleClick,
  beats,
  error
}) => (
    <div>
      {error ?
        (
          <UncontrolledAlert color="danger">
              {error}
          </UncontrolledAlert>
        )
        :
        (
          null
        )
      }
      <Table hover>
        <thead>
          <th>Title</th>
          <th>Price</th>
          <th>Purchase</th>
        </thead>
        <tbody>
      {beats.map((beat, i) =>
        <tr style={current_beat(beat)} onClick={()=>{chooseBeat(beat)}}>
          <td>{beat.title}</td>
          <td>{beat.price}</td>
          <td>
            <Sale
              index = {i}
              temp_error = {temp_error}
              handleClick = {handleClick}
              error = {error}
              beat = {beat}
            />
          </td>
        </tr>
      )}
      </tbody>
      </Table>
    </div>
);

export default Beat;
