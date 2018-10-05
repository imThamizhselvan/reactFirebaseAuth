import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { SignUpLink } from './SignUp';

import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { CenterContainer, Button, BoxText, InputBox, AdditionalFormData } from './styles';

const SignInPage = ({ history }) =>
  <CenterContainer>
    <BoxText>SignIn</BoxText>
    <SignInForm history={history} />
    <AdditionalFormData>
      <Link to={routes.PASSWORD_FORGET}>
        Forgot Password?
        </Link>
    </AdditionalFormData>
    <AdditionalFormData>
      <Link to={routes.SIGN_UP}>
        SignUp
      </Link>
    </AdditionalFormData>
  </CenterContainer>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <InputBox
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <InputBox
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <Button disabled={isInvalid} type="submit">
          Sign In
        </Button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
