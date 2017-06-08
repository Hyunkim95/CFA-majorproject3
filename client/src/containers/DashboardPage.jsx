import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
var axios = require('axios');
import AdminDashboard from '../components/AdminDashboard.jsx'

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      user: {},
      personal_beats: false
    };
    this.getBeats.bind(this)
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    this.getUser()
  }

  getUser(){
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/user/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message,
          user: xhr.response.user
        });
      }
      this.getBeats()
    });
    xhr.send();
  }

  getBeats(){
    console.log('componentDidMount')
    const USERID = this.state.user._id
    const URL = 'https://beat-profile.herokuapp.com/api/beats/user/'
    axios.get(URL + USERID + '/')
      .then((response) => { //need to escape the context another option is to use bind
        this.setState({personal_beats: response.data})
      })
      .catch(function(error){
        console.log(error)
      });
    }

  /**
   * Render the component.
   */
  render() {
    console.log(this.state.personal_beats)
    return (
      <div>
        {this.state.user.roles != "Admin" ?
          <Dashboard
            secretData={this.state.secretData}
            user={this.state.user}
            personal_beats = {this.state.personal_beats}
          />
          :
          <AdminDashboard />  }
      </div>
    );
  }

}

export default DashboardPage;
