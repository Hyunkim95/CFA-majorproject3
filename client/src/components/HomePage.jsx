import React from 'react';
import Auth from '../modules/Auth';
import Beat from '../components/Beat';
import { Container, Row, Col } from 'reactstrap';
import MediaPlayer from '../Refactor/MediaPlayer/MediaPlayer.jsx'
var Loader = require('halogen/ScaleLoader');
var Spinner = require('react-spinkit');

const HomePage = ({
  current_beat,
  nextBeat,
  previousBeat,
  beat,
  chooseBeat,
  temp_error,
  handleClick,
  error,
  beats
}) => (
    <Container>
      <Row>
        <Col>
          <p>React Application</p>
          <p>Welcome</p>
        </Col>
      </Row>
      <Row>
        <Col>
          {Auth.isUserAuthenticated() ? (
            <p style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</p>
          ) : (
            <p style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col md="7">
          {beat._id == null ? null :
            <MediaPlayer
              beat = {beat}
              nextBeat = {nextBeat}
              previousBeat = {previousBeat}
              beat_id = {beat._id}
              beat_price = {beat.price}
              beat_title = {beat.title}
            />
          }
        </Col>
        <Col md="5">
          {beats ?
          (
            <Beat
              current_beat = {current_beat}
              beats = {beats}
              error = {error}
              temp_error = {temp_error}
              handleClick = {handleClick}
              chooseBeat = {chooseBeat}
            />
          )
            :
          (
            <Spinner name="line-scale-pulse-out" color="purple"/>
          )}
        </Col>
      </Row>
    </Container>

)

export default HomePage;
