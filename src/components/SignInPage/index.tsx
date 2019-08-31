import React from 'react';
import { Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import './index.css';

interface Props {
  isSignedIn: boolean;
}

const SignInPage: React.FC<Props> = ({ isSignedIn }) => {
  if (isSignedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="SignInPage">
      <header className="SingInPage-header">
        <h2>Google Tasks Client</h2>
        <Button positive onClick={() => gapi.auth2.getAuthInstance().signIn()}>
          SignIn
        </Button>
      </header>
    </div>
  );
};

export default SignInPage;
