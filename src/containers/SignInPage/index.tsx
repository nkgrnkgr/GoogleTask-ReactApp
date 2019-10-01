import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CombinedState } from '../../reducers/root';
import SignInPage from '../../components/SignInPage/index';

interface StateProps {
  isSignedIn: boolean;
}

type ReactRouterProps = RouteComponentProps;

type EnhancedProps = StateProps & ReactRouterProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  isSignedIn: state.application.isSignIned,
});

const SignInPageContainer: React.FC<EnhancedProps> = props => {
  return <SignInPage {...props} />;
};

export default connect(mapStateTopProps)(SignInPageContainer);
