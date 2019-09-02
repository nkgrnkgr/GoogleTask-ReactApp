import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import './index.css';
import logo from '../../images/_logo.svg';

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
        <Header as="h1" image={logo} content="Google Tasks Client" />
        <Button positive onClick={() => gapi.auth2.getAuthInstance().signIn()}>
          SignIn
        </Button>
      </header>
    </div>
  );
};

export default SignInPage;
