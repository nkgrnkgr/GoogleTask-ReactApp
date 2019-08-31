import React from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '../../reducers/root';
import SignInPage from '../../components/SignInPage/index';

interface StateProps {
  isSignIned: boolean;
}

const mapStateTopProps = (state: CombinedState): StateProps => ({
  isSignIned: state.application.isSignIned,
});

const SignInPageContainer: React.FC<StateProps> = ({ isSignIned }) => (
  <SignInPage isSignedIn={isSignIned} />
);

export default connect(mapStateTopProps)(SignInPageContainer);
