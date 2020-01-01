import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <div>
    <h1>Login Page</h1>
    <button onClick={startLogin}>Login</button>
  </div>
);

const mapDispathToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispathToProps)(LoginPage);
