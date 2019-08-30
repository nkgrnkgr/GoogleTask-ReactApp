import React, { FC } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { application } from '../../actions/Application';
import { CombinedState } from '../../reducers/root';
import SignInPage from '../../components/SignInPage/index';

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

const SignInPageContainer: FC<EnhancemembersProps> = ({
  isSignIned,
  signIn,
}) => <SignInPage isSignedIn={isSignIned} signIn={signIn} />;

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(SignInPageContainer);
