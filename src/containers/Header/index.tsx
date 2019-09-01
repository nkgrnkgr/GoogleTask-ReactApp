import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { application } from '../../actions/Application';
import { CombinedState } from '../../reducers/root';
import { User } from '../../reducers/ApplicationReducer';
import Header from '../../components/Header/index';

interface StateProps {
  user: User;
}

interface DispatchProps {
  signOut: () => void;
}

type EnhancemembersProps = StateProps & DispatchProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  user: state.application.user,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      signOut: () => application.signOut(),
    },
    dispatch,
  );

const HeaderContainer: React.FC<EnhancemembersProps> = ({ user, signOut }) => {
  const handleOnClickSignOut = async () => {
    await gapi.auth2.getAuthInstance().signOut();
    await signOut();
    window.location.reload();
  };

  return <Header user={user} handleOnClickSignOut={handleOnClickSignOut} />;
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(HeaderContainer);
