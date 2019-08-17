import React, { FC, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Task } from '../../services/googleTasks/models';
import { getTaskList } from '../../actions/Task';
import TaskListContainer from '../../components/TaskListContainer';
import { CombinedState } from '../../reducers/root';

interface StateProps {
  taskList: Task[];
  isLoading?: boolean;
  selectedToDoListId: string;
}

interface DispatchProps {
  getTaskListStart: (taskListId: string) => void;
}

type EnhancemembersProps = StateProps & DispatchProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  taskList: state.task.taskList,
  isLoading: state.task.isLoading,
  selectedToDoListId: state.application.selectedToDoListId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getTaskListStart: (taskListId: string) =>
        getTaskList.start({ taskListId }),
    },
    dispatch,
  );

const TaskListContainerContainer: FC<EnhancemembersProps> = ({
  getTaskListStart,
  taskList = [],
  isLoading = false,
  selectedToDoListId,
}) => {
  useEffect(() => {
    if (selectedToDoListId !== '') {
      getTaskListStart(selectedToDoListId);
    }
  }, [selectedToDoListId]);

  return <TaskListContainer taskList={taskList} isLoading={isLoading} />;
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(TaskListContainerContainer);
