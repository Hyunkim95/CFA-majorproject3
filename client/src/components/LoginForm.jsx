import React from 'react';
import PropTypes from 'prop-types';
import style from './SignUpForm.css'
import { Button, Form, FormGroup, Label, Container, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  toggleAuthenticateStatus
}) => (
  <Container class="input-fields">
    <Form action="/" onSubmit={onSubmit}>
    <h2>Log In</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}
        <FormGroup>
          <Label >Email</Label>
          <Input className="input-field" type="email" name="email" onChange={onChange} value={user.email}/>
          <p>{errors.email}</p>
        </FormGroup>
        <FormGroup>
          <Label >Password</Label>
          <Input className="input-field" type="password" name="password" onChange={onChange} value={user.password}/>
          <p>{errors.password}</p>
        </FormGroup>
        <Button className ="roundedbut" outline color="primary">Login</Button>
    </Form>
    <br/>
    <p>Already have an account?</p>
    <Link to={'/signup'}>
      <Button className ="roundedbut" outline color="primary">Sign Up</Button>
    </Link>
  </Container>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
