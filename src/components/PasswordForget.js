import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { CenterContainer, Button, BoxText, InputBox, AdditionalFormData } from './styles';

const PasswordForgetPage = () =>
  <CenterContainer>
    <BoxText>PasswordForget</BoxText>
    <PasswordForgetForm />
  </CenterContainer>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <InputBox
          value={this.state.email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <Button disabled={isInvalid} type="submit">
          Reset My Password
        </Button>
        { error && <p>{error.message}</p> }
      </form>
    );
  }
}



export default PasswordForgetPage;

export {
  PasswordForgetForm,
};
