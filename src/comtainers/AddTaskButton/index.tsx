import React, { FC } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { InsertAndGetTaskList } from '../../actions/Task';
import AddTaskButtonComponent from '../../components/AddTaskButton';
import { CombinedState } from '../../reducers/root';

interface StateProps {
  isLoading?: boolean;
  selectedToDoListId: string;
}

interface DispatchProps {
  insertAndGetTaskListStart: (selectedToDoListId: string) => void;
}

type EnhancemembersProps = StateProps & DispatchProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  selectedToDoListId: state.application.selectedToDoListId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      insertAndGetTaskListStart: (selectedToDoListId: string) =>
        InsertAndGetTaskList.start({ tasklist: selectedToDoListId, title: '' }),
    },
    dispatch,
  );

const AddTaskButton: FC<EnhancemembersProps> = ({
  insertAndGetTaskListStart,
  selectedToDoListId,
}) => {
  if (selectedToDoListId === '') {
    return <></>;
  }

  return (
    <AddTaskButtonComponent
      handleOnClick={() => insertAndGetTaskListStart(selectedToDoListId)}
    />
  );
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(AddTaskButton);
