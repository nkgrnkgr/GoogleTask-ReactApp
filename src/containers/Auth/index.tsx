import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { CombinedState } from '../../reducers/root';

interface StateProps {
  isGapiClientInitialized: boolean;
  isSignIned: boolean;
}

const mapStateTopProps = (state: CombinedState): StateProps => ({
  isGapiClientInitialized: state.application.isGapiClientInitialized,
  isSignIned: state.application.isSignIned,
});

const AuthContainer: FC<StateProps> = ({
  isGapiClientInitialized,
  isSignIned,
  children,
}) => {
  if (!isGapiClientInitialized) {
    return <>Google Api Initializing...</>;
  }

  if (!isSignIned) {
    return <Redirect to="/signIn" />;
  }

  return <>{children}</>;
};

export default connect(mapStateTopProps)(AuthContainer);
