import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import GoogleApiConfig from '../../GoogleApiConfig';
import './index.css';

interface Props {
  isSignedIn: boolean;
  signIn: () => void;
}

const SignInPage: React.FC<Props> = ({ isSignedIn, signIn }) => {
  const initClient = () => {
    gapi.client
      .init({
        apiKey: GoogleApiConfig.API_KEY,
        clientId: GoogleApiConfig.CLIENT_ID,
        discoveryDocs: GoogleApiConfig.DISCOVERY_DOCS,
        scope: GoogleApiConfig.SCOPES,
      })
      .then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(() => {
          signIn();
        });
      });
  };

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  if (isSignedIn) {
    return <Redirect to="/tasks" />;
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
