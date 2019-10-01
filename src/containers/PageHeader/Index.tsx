import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { User } from '../../reducers/ApplicationReducer';
import { application } from '../../actions/Application';
import { CombinedState } from '../../reducers/root';
import { PageHeader as PageHeaderComponent } from '../../components/PageHeader/Index';

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

const PageHeaderContainer: React.FC<EnhancemembersProps> = ({
  user,
  signOut,
}) => {
  const handleOnClickSignOut = async () => {
    await gapi.auth2.getAuthInstance().signOut();
    await signOut();
    window.location.reload();
  };

  return (
    <PageHeaderComponent
      user={user}
      handleOnClickSignOut={handleOnClickSignOut}
    />
  );
};

export const PageHeader = connect(
  mapStateTopProps,
  mapDispatchToProps,
)(PageHeaderContainer);
