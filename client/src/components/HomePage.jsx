import React from 'react';
import Auth from '../modules/Auth';
import Beat from '../Refactor/Beat';
import { Card, CardTitle, CardText } from 'material-ui/Card';
var axios = require('axios');
var Loader = require('halogen/ScaleLoader');


class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      beats: false
    }
  }

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
    this.getSongs()
  }

  getSongs(){
    console.log('componentDidMount')
    const URL = 'http://localhost:3000/admin/beats'
    axios.get(URL)
      .then((response) => { //need to escape the context another option is to use bind
        this.setState({ beats: response.data })
        console.log(this.state.beats)
      })
      .catch(function(error){
        console.log(error)
      });
  }

  render() {
    return (
      <Card className="container">
        <CardTitle
        title="React Application"
        subtitle="Admin"
        />
          {Auth.isUserAuthenticated() ? (
            <p style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</p>
          ) : (
            <p style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</p>
          )}
          {this.state.beats ? <Beat beats = {this.state.beats}/> :  <Loader color="#26A65B" size="100px" margin="4px"/>}
      </Card>
    )
  }
};

export default HomePage;
