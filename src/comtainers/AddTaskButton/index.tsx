import React, { FC } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { insertTask } from '../../actions/Task';
import AddTaskButtonComponent from '../../components/AddTaskButton';
import { CombinedState } from '../../reducers/root';

interface StateProps {
  isLoading?: boolean;
  selectedToDoListId: string;
}

interface DispatchProps {
  insertTaskStart: (selectedToDoListId: string) => void;
}

type EnhancemembersProps = StateProps & DispatchProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  selectedToDoListId: state.application.selectedToDoListId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      insertTaskStart: (selectedToDoListId: string) =>
        insertTask.start({ tasklist: selectedToDoListId, title: '' }),
    },
    dispatch,
  );

const AddTaskButton: FC<EnhancemembersProps> = ({
  insertTaskStart,
  selectedToDoListId,
}) => {
  if (selectedToDoListId === '') {
    return <></>;
  }

  return (
    <AddTaskButtonComponent
      handleOnClick={() => insertTaskStart(selectedToDoListId)}
    />
  );
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(AddTaskButton);
