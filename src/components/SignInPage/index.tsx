import React from 'react';
import { Button, Header, Image, Divider } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import './index.css';
import logo from '../../images/_logo.svg';
import googleSignInButton from '../../images/btn_google_signin_dark_normal_web@2x.png';
import HtmlTitle from '../HtmlTitle/index';

interface Props {
  isSignedIn: boolean;
}

const SignInPage: React.FC<Props> = ({ isSignedIn }) => {
  if (isSignedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <HtmlTitle title="Google Tasks Client" />
      <div className="SignInPage">
        <header className="SingInPage-header">
          <Header as="h1" image={logo} content="Google Tasks Client" />
          <Divider hidden />
          <Image
            src={googleSignInButton}
            style={{ cursor: 'pointer' }}
            as="a"
            alt="google sign in button"
            size="small"
            onClick={() => gapi.auth2.getAuthInstance().signIn()}
          />
        </header>
      </div>
    </>
  );
};

export default SignInPage;
