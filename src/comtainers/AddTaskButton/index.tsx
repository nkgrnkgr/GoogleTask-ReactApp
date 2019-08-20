import React, { FC } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { InsertAndGetTaskList } from '../../actions/Task';
import AddTaskButtonComponent from '../../components/AddTaskButton';
import { CombinedState } from '../../reducers/root';

interface StateProps {
  isLoading?: boolean;
  selectedTaskListId: string;
}

interface DispatchProps {
  insertAndGetTaskListStart: (selectedTaskListId: string) => void;
}

type EnhancemembersProps = StateProps & DispatchProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  selectedTaskListId: state.application.selectedTaskListId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      insertAndGetTaskListStart: (selectedTaskListId: string) =>
        InsertAndGetTaskList.start({ tasklist: selectedTaskListId, title: '' }),
    },
    dispatch,
  );

const AddTaskButton: FC<EnhancemembersProps> = ({
  insertAndGetTaskListStart,
  selectedTaskListId,
}) => {
  if (selectedTaskListId === '') {
    return <></>;
  }

  return (
    <AddTaskButtonComponent
      handleOnClick={() => insertAndGetTaskListStart(selectedTaskListId)}
    />
  );
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(AddTaskButton);
