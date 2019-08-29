import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import GoogleApiConfig from '../../GoogleApiConfig';
import './index.css';

const SignInPage: React.FC = () => {
  const initClient = () => {
    gapi.client.init({
      apiKey: GoogleApiConfig.API_KEY,
      clientId: GoogleApiConfig.CLIENT_ID,
      discoveryDocs: GoogleApiConfig.DISCOVERY_DOCS,
      scope: GoogleApiConfig.SCOPES,
    });
  };

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

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
