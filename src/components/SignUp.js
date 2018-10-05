import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import { CenterContainer, Button, BoxText, InputBox, AdditionalFormData } from './styles';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpPage = ({history}) =>
  <CenterContainer>
    <BoxText>SignUp</BoxText>
    <SignUpForm history={history}/>
  </CenterContainer>


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;
    const {
      history,
    } = this.props;


    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;



    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
      <InputBox
        value={username}
        onChange={event => this.setState(byPropKey('username', event.target.value))}
        type="text"
        placeholder="Full Name"
      />
      <InputBox
        value={email}
        onChange={event => this.setState(byPropKey('email', event.target.value))}
        type="text"
        placeholder="Email Address"
      />
      <InputBox
        value={passwordOne}
        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
        type="password"
        placeholder="Password"
      />
      <InputBox
        value={passwordTwo}
        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
        type="password"
        placeholder="Confirm Password"
      />
      <Button disabled={isInvalid} type="submit">
        Sign Up
      </Button>

      </form>
    );
  }
}

  export default withRouter(SignUpPage);

export {
  SignUpForm,
};
