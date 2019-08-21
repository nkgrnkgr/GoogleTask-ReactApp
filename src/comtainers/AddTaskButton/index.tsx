import React, { FC } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { insertAndGetTaskList } from '../../actions/Task';
import AddTaskButtonComponent from '../../components/AddTaskButton';
import { CombinedState } from '../../reducers/root';
import {
  TasksInsertParam,
  TasksListParam,
} from '../../services/googleTasks/taskApi';

interface StateProps {
  isLoading?: boolean;
  selectedTaskListId: string;
}

interface DispatchProps {
  insertAndGetTaskListStart: (param: TasksInsertParam & TasksListParam) => void;
}

type EnhancemembersProps = StateProps & DispatchProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  selectedTaskListId: state.application.selectedTaskListId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      insertAndGetTaskListStart: (param: TasksInsertParam & TasksListParam) =>
        insertAndGetTaskList.start(param),
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
      handleOnClick={() =>
        insertAndGetTaskListStart({ tasklist: selectedTaskListId, title: '' })
      }
    />
  );
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(AddTaskButton);
