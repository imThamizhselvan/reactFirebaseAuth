import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import { CenterContainer, BoxText } from './styles';

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <CenterContainer>
        <BoxText>Account: {authUser.email}</BoxText>
        <PasswordChangeForm />
      </CenterContainer>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
