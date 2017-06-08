import React from 'react';
import Auth from '../modules/Auth';
var FontAwesome = require('react-fontawesome');
import { Button, Alert, UncontrolledAlert, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import StripeCheckout from 'react-stripe-checkout';
var axios = require('axios');

class Sale extends React.Component {
  constructor(props){
    super(props)
      this.state={
        user: ''
      }
    this.onToken = this.onToken.bind(this);
    this.purchase = this.purchase.bind(this);
  }

  componentDidMount(){
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
    this.purchase()
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

  purchase(){
    const URL = "http://localhost:3000/api/beats/"
    var beat_id = this.props.beat._id
    var purchaser_id = this.state.user._id

    axios.post(URL + beat_id + '/edit/' + '?purchaser=' + purchaser_id + '&purchased=' + 'true')
    window.location.reload()
  }

  render() {
    return(
      <div className = {this.props.i}>
        {this.props.temp_error === 401 ?
          <div
            onClick={this.props.handleClick}
            >
              <FontAwesome name='rocket' />
            </div>

          :

          <StripeCheckout
            name={this.props.beat.title}
            description="Big Data Stuff"
            token={this.onToken}
            stripeKey={'pk_test_XUsjh67O3t4PJe5mw1GZS0Rf'}
            amount={this.props.beat.price * 100}
            currency="USD">
            <div>
              <FontAwesome name='shopping-cart' />
            </div>
            </StripeCheckout>
          }
        {/* <button onClick={this.purchase}>POST IT</button> */}
      </div>
    )
  }
}

export default Sale;
