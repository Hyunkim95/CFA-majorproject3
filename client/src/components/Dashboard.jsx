import React from 'react';
import PurchasedBeats from '../Refactor/PurchasedBeats.jsx'
import PropTypes from 'prop-types';

const Dashboard = ({ secretData, user, personal_beats}) => (
  <div className="container">
    <p>Dashboard</p>
    <p>You Should get access to this page only after authentication</p>
  {secretData && <p style={{ fontSize: '16px', color: 'green' }}>Welcome <strong>{user.name}</strong>!<br />{secretData}</p>}

  {personal_beats.length > 0 ?
    <PurchasedBeats
      beats = {personal_beats}
    />
    :
    <p>Empty</p>
  }

</div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
