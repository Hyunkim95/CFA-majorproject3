import React from 'react';
import Auth from '../modules/Auth';
import Beat from '../components/Beat';
import SearchInput, {createFilter} from 'react-search-input';
import { Container, Row, Col } from 'reactstrap';
import MediaPlayer from '../Refactor/MediaPlayer/MediaPlayer.jsx'
var Loader = require('halogen/ScaleLoader');
var Spinner = require('react-spinkit');

const HomePage = ({
  filtered_beats,
  searchUpdated,
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
        <Col auto>
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
        <Col auto>
          {beats ?
          (
            <div>
                <SearchInput style={{width: "100%"}} className="search-input" onChange={searchUpdated} />
                <br/>
                <Beat
                  current_beat = {current_beat}
                  beats = {filtered_beats}
                  error = {error}
                  temp_error = {temp_error}
                  handleClick = {handleClick}
                  chooseBeat = {chooseBeat}
                />
            </div>
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
