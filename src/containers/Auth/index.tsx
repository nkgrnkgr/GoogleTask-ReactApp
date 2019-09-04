import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, Route } from 'react-router';
import { CombinedState } from '../../reducers/root';

interface StateProps {
  isGapiClientInitialized: boolean;
  isSignIned: boolean;
}

type ReactRouterProps = RouteComponentProps;

type EnhancedProps = StateProps & ReactRouterProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  isGapiClientInitialized: state.application.isGapiClientInitialized,
  isSignIned: state.application.isSignIned,
});

const AuthContainer: FC<EnhancedProps> = ({
  isGapiClientInitialized,
  isSignIned,
  children,
  location,
}) => {
  if (!isGapiClientInitialized) {
    return <>Google Api Initializing...</>;
  }

  if (!isSignIned) {
    return (
      <Route
        exact
        path="/signin"
        render={() => (
          <Redirect
            to={`/signin${location.search ? `/${location.search}` : ''}`}
          />
        )}
      />
    );
  }

  return <>{children}</>;
};

export default connect(mapStateTopProps)(AuthContainer);
