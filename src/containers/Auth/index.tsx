import React, { FC } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { application } from '../../actions/Application';
import { CombinedState } from '../../reducers/root';

interface StateProps {
  isSignIned: boolean;
}

interface DispatchProps {
  signIn: () => void;
}

type EnhancemembersProps = StateProps & DispatchProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  isSignIned: state.application.isSignIned,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      signIn: () => application.signIn(),
    },
    dispatch,
  );

const Auth: FC<EnhancemembersProps> = ({ isSignIned, children }) => {
  if (!isSignIned) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(Auth);
