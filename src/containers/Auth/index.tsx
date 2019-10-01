import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { Typography } from '@material-ui/core';
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
    return (
      <Typography component="p" color="textSecondary">
        Google Api Initializing...
      </Typography>
    );
  }

  const redirectUrl = location.search
    ? `/signin/${location.search}`
    : '/signIn';

  if (!isSignIned) {
    return <Redirect to={redirectUrl} />;
  }

  return <>{children}</>;
};

export default withRouter(connect(mapStateTopProps)(AuthContainer));
