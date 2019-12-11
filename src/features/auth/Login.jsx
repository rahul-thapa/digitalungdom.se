import React from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'antd';
import styled from 'styled-components';
import Login from 'components/auth/login';
import { Link } from 'react-router-dom';
import { login as loginAction } from 'actions/auth';

const StyledTitle = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.maincolor};
`;

function LoginContainer() {
  const dispatch = useDispatch();
  const login = (username, password) => dispatch(loginAction({ username, password }));
  return (
    <Row
      type="flex"
      justify="center"
    >
      <Login
        cardStyle={{
          marginTop: 24,
          width: '100%',
          maxWidth: 400,
        }}
        title={<StyledTitle>Logga in</StyledTitle>}
        text={{
          username: 'Användarnamn/e-mail',
          password: 'Lösenord',
          submit: 'Logga in',
          usernameRequired: 'Vänligen skriv in ditt användarnamn!',
          passwordRequired: 'Vänligen skriv in ditt lösenord!',
        }}
        forgotPasswordLink={<Link style={{ float: 'right', marginBottom: 8 }} to="/forgot-password">Glömt lösenordet?</Link>}
        createAccountLink={(
          <span style={{ display: 'block', textAlign: 'center' }}>
            Har du inget konto? &nbsp;
            <Link to="/bli-medlem">Skapa ett konto här!</Link>
          </span>
        )}
        onSubmit={login}
      >
        Login!
      </Login>
    </Row>
  );
}
export default LoginContainer;
