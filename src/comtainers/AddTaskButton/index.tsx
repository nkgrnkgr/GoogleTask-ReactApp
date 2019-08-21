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
  insertAndGetTaskListStart: (
    paramForInsert: TasksInsertParam,
    paramForList: TasksListParam,
  ) => void;
}

type EnhancemembersProps = StateProps & DispatchProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  selectedTaskListId: state.application.selectedTaskListId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      insertAndGetTaskListStart: (
        paramForInsert: TasksInsertParam,
        paramForList: TasksListParam,
      ) => insertAndGetTaskList.start(paramForInsert, paramForList),
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
        insertAndGetTaskListStart(
          { tasklist: selectedTaskListId, title: '' },
          { tasklist: selectedTaskListId },
        )
      }
    />
  );
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(AddTaskButton);
