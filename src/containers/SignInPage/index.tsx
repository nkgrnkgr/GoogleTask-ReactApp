import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CombinedState } from '../../reducers/root';
import SignInPage from '../../components/SignInPage/index';

interface StateProps {
  isSignIned: boolean;
}

type ReactRouterProps = RouteComponentProps;

type EnhancedProps = StateProps & ReactRouterProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  isSignIned: state.application.isSignIned,
});

const SignInPageContainer: React.FC<EnhancedProps> = props => {
  const { isSignIned } = props;

  return <SignInPage {...props} isSignedIn={isSignIned} />;
};

export default connect(mapStateTopProps)(SignInPageContainer);
