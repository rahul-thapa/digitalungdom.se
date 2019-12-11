import React, { useState } from 'react';
import Login from './index';

export const LoginState = () => {
  const [problem, makeProblem] = useState(false);
  const [submitting, submit] = useState(false);

  return (
    <Login
      title="Logga in"
      usernameText="Användarnamn"
      passwordText="Lösenord"
      submitText="Logga in"
      onSubmit={() => {
        submit(true);
        setTimeout(() => {
          makeProblem(!problem);
          submit(false);
        }, 1000);
      }}
      submitting={submitting}
      errorUsername={problem ? 'Inget sådant konto' : null}
      forgotPasswordLink={(
        <a href="test" style={{ float: 'right' }}>
          Glömt lösenordet?
        </a>
      )}
      createAccountLink={(
        <a href="test" style={{ display: 'block', textAlign: 'center' }}>Saknar du konto? Skapa ett nu!</a>
      )}
    />
  );
};

export const BiggerState = () => {
  const [problem, makeProblem] = useState(false);

  return (
    <Login
      title="Logga in"
      usernameText="Användarnamn"
      passwordText="Lösenord"
      submitText="Logga in"
      submit={() => {
        setTimeout(() => makeProblem(!problem), 1000);
      }}
      errorUsername={problem ? 'Inget sådant konto' : null}
    />
  );
};
