import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        NAME
        <input
          type="text"
          name="name"
          onChange={onChange}
          value={user.name}
        />
        <p>{errors.name}</p>
      </div>

      <div className="field-line">
        EMAIL
        <input
          type="text"
          name="email"
          onChange={onChange}
          value={user.email}
        />
        <p>{errors.email}</p>
      </div>

      <div className="field-line">
        PASSWORD
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
        />
        <p>{errors.password}</p>
      </div>

      <div className="button-line">
        <input type="submit" value="Log in"/>
      </div>

      <p>Already have an account? </p><Link to={'/login'}>Log in</Link>
    </form>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
