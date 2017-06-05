import React from 'react';
import Auth from '../modules/Auth';
import HomePage from '../components/HomePage.jsx';
import { Button } from 'reactstrap';
var axios = require('axios');


class HomePageContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      beats: false,
      temp_error: '',
      error: false,
      user: {},
      modal: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.onToken = this.onToken.bind(this);
    this.purchase = this.purchase.bind(this);
  }

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
    this.getSongs()
    this.getUser()
  }

  onToken(token) {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }


  getSongs(){
    console.log('componentDidMount')
    const URL = 'http://localhost:3000/api/beats'
    axios.get(URL)
      .then((response) => { //need to escape the context another option is to use bind
        this.setState({ beats: response.data })
        // console.log(this.state.beats)
      })
      .catch(function(error){
        console.log(error)
      });
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

  purchase(){

  }

  render() {
    return (
      <HomePage
        beats = {this.state.beats}
        error = {this.state.error}
        temp_error = {this.state.temp_error}
        handleClick = {this.handleClick}
        token = {this.onToken}
        purchase = {this.purchase}
      />
    )
  }
};

export default HomePageContainer;
