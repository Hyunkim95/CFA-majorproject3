import React from 'react';
import Auth from '../modules/Auth';
import Beat from '../components/Beat';
var Loader = require('halogen/ScaleLoader');
var Spinner = require('react-spinkit');

const HomePage = ({
  temp_error,
  modal,
  toggle,
  handleClick,
  error,
  beats
}) => (
  <div className="container">
    <p>React Application</p>
    <p>Welcome</p>
      {Auth.isUserAuthenticated() ? (
        <p style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</p>
      ) : (
        <p style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</p>
      )}
      {beats ?
      (
        <Beat
          beats = {beats}
          error = {error}
          temp_error = {temp_error}
          handleClick = {handleClick}
          modal = {modal}
          toggle = {toggle}
        />
      )
        :
      (
        <Spinner name="line-scale-pulse-out" color="purple"/>
      )}
  </div>
)

export default HomePage;
