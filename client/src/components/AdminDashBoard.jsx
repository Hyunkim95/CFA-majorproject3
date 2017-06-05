import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import UploadForm from '../Refactor/UploadForm.jsx';

const AdminDashboard = () => (
  <Card className="container">
    <CardTitle
      title="AdminDashboard"
      subtitle="Admin"
    />
    <UploadForm />
  </Card>
);

export default AdminDashboard;
