import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ secretData, user }) => (
  <div className="container">
    <p>Dashboard</p>
    <p>You Should get access to this page only after authentication</p>
  {secretData && <p style={{ fontSize: '16px', color: 'green' }}>Welcome <strong>{user.name}</strong>!<br />{secretData}</p>}
</div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
