import React from 'react';
import Auth from '../modules/Auth';
import Beat from '../components/Beat';
import SearchInput, {createFilter} from 'react-search-input';
import { Container, Row, Col } from 'reactstrap';
import MediaPlayer from '../Refactor/MediaPlayer/MediaPlayer.jsx'
var Loader = require('halogen/RingLoader');


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
      <Col auto>
        {beat._id == null ?
          (
            <img style={{width: "350px", height: "auto"}} className="filler" src="https://s-media-cache-ak0.pinimg.com/564x/c8/a1/19/c8a1197e18e2b647ef8afe8491845ac7.jpg" alt=""/>
          )
           :
           (
             <MediaPlayer
               beat = {beat}
               nextBeat = {nextBeat}
               previousBeat = {previousBeat}
               beat_id = {beat._id}
               beat_price = {beat.price}
               beat_title = {beat.title}
             />
           )
        }
      </Col>
      <Col auto>
        {beats ?
        (
          <div>
              <SearchInput  className="search-input" onChange={searchUpdated} />
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
          <div>
            <div className="alignit">
              <Loader
                color="#FDCAF3"
                size="100px"
                margin="16px"/>
            </div>
            <h2 style={{color:"#FDCAF3"}}>LOADING</h2>
          </div>

        )}
      </Col>
    </Row>
  </Container>

)

export default HomePage;
