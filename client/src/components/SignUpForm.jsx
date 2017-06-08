import React from 'react';
import style from './SignUpForm.css'
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Container, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (

  <Container class="input-fields">
    <Form action="/" onSubmit={onSubmit}>
    <h2>Sign Up</h2>
      <FormGroup>
        <Label>Name</Label>
        <Input className="input-field" type="name" name="name" onChange={onChange} value={user.name}/>
        <p>{errors.name}</p>
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input className="input-field" type="email" name="email" onChange={onChange} value={user.email}/>
        <p>{errors.email}</p>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input className="input-field" type="password" name="password" onChange={onChange} value={user.password}/>
        <p>{errors.password}</p>
      </FormGroup>


      <Button className ="roundedbut" outline color="primary">Sign Up</Button>
    </Form>
    <br/>
    <p>Already have an account?</p>
    <Link to={'/login'}>
      <Button className ="roundedbut" outline color="primary">Login</Button>
    </Link>
  </Container>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
