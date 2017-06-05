import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  toggleAuthenticateStatus
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <input
          type="text"
          name="email"
          onChange={onChange}
          value={user.email}
        />
        <p>{errors.email}</p>
      </div>

      <div className="field-line">
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

      <p>Don't have an account? </p><Link to={'/signup'}>Create one</Link>
    </form>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
