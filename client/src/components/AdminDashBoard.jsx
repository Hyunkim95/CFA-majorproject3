import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import UploadForm from '../Refactor/UploadForm.jsx';

const AdminDashboard = () => (
  <Container>
    <h2>DashBoard</h2>
    <Row>
      <Col md="6">
        <h3>DATA RELATED TO SALES AND ANALYTICS</h3>
      </Col>
      <Col md="6">
          <UploadForm />
      </Col>
    </Row>
  </Container>
);

export default AdminDashboard;
