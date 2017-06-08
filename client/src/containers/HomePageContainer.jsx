import React from 'react';
import Auth from '../modules/Auth';
import Style from './HomePageContainer.css'
import HomePage from '../components/HomePage.jsx';
import { Button } from 'reactstrap';
import {createFilter} from 'react-search-input';
var axios = require('axios');

const KEYS_TO_FILTERS = ['title', 'price', 'genre']

class HomePageContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      current_beat: null,
      searchTerm: '',
      clicked: false,
      filteredBeats: [],
      beats: false,
      beat: '',
      temp_error: '',
      error: false,
      user: {},
    }
    this.handleClick = this.handleClick.bind(this);
    this.chooseBeat = this.chooseBeat.bind(this);
  }

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
    this.getBeats()
    this.getUser()
  }

  getBeats(){
    console.log('componentDidMount')
    const URL = 'https://beat-profile.herokuapp.com//api/beats'
    axios.get(URL)
      .then((response) => { //need to escape the context another option is to use bind
        this.setState({ beats: response.data })
        this.filterit()
        // console.log(this.state.beats)
      })
      .catch(function(error){
        console.log(error)
      });
  }

  filterit(){
    var beats = this.state.beats
    console.log(beats)
    const filteredBeats = beats.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    this.setState({filteredBeats: filteredBeats})
  }

  getUser() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/user/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          user: xhr.response.user
        });
      }

      if (xhr.status === 401) {
        this.setState({
          temp_error: 401
        })
      }
    });
    xhr.send();
  }

  handleClick(){
    if(this.state.temp_error === 401){
      this.setState({error: "You need to be logged in to purchase this beat"})
    }
  }

  nextBeat(beat){
    var index = this.state.beats.indexOf(beat)

    if(index+1 == this.state.beats.length){
      console.log('222')
      index = 0
    }else{
      console.log('333')
      index ++
    }
    this.setState({
      beat: this.state.beats[index]
    })
    console.log(index)
  }

  previousBeat(beat){
    var index = this.state.beats.indexOf(beat)
    if(index-1 < 0){
      index = this.state.beats.length-1
    }else{
      index = index - 1
    }
    this.setState({
      beat: this.state.beats[index]
    })
    console.log(index)
  }

  current_beat(beat){
    return{
      background: this.state.beat == beat ? "#404040" : "#282828"
    }
  }

  chooseBeat(beat) {
    this.setState({
      beat: beat
    })
  }

    searchUpdated (term) {
    this.setState({searchTerm: term})
    console.log(term)
  }

  render() {
    const Filtered = this.state.filteredBeats.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <HomePage
        filtered_beats = {Filtered}
        beats = {this.state.beats}
        searchUpdated = {this.searchUpdated.bind(this)}
        beat = {this.state.beat}
        current_beat = {this.current_beat.bind(this)}
        error = {this.state.error}
        temp_error = {this.state.temp_error}
        handleClick = {this.handleClick}
        previousBeat = {this.previousBeat.bind(this)}
        nextBeat = {this.nextBeat.bind(this)}
        chooseBeat = {this.chooseBeat}
      />
    )
  }
};

export default HomePageContainer;
