import React, { FC, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Task } from '../../services/googleTasks/models';
import { getTaskList, patchTask } from '../../actions/Task';
import TaskListContainer from '../../components/TaskListContainer';
import { CombinedState } from '../../reducers/root';
import {
  TasksListParam,
  TasksPatchParam,
} from '../../services/googleTasks/taskApi';

interface StateProps {
  taskList: Task[];
  isLoading?: boolean;
  selectedTaskListId: string;
}

interface DispatchProps {
  getTaskListStart: (param: TasksListParam) => void;
  patchTaskStart: (param: TasksPatchParam) => void;
}

type EnhancemembersProps = StateProps & DispatchProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  taskList: state.task.taskList,
  isLoading: state.task.isLoading,
  selectedTaskListId: state.application.selectedTaskListId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getTaskListStart: (param: TasksListParam) => getTaskList.start(param),
      patchTaskStart: (param: TasksPatchParam) => patchTask.start(param),
    },
    dispatch,
  );

const TaskListContainerContainer: FC<EnhancemembersProps> = ({
  getTaskListStart,
  patchTaskStart,
  taskList,
  isLoading = false,
  selectedTaskListId,
}) => {
  useEffect(() => {
    if (selectedTaskListId !== '') {
      getTaskListStart({ tasklist: selectedTaskListId });
    }
  }, [selectedTaskListId]);

  const handleOnChangeTask = (task: Task) => {
    patchTaskStart({
      tasklist: selectedTaskListId,
      task: task.id || '',
      title: task.title,
      status: task.status || 'needsAction',
    });
  };

  return (
    <TaskListContainer
      taskList={taskList}
      isLoading={isLoading}
      handleOnChange={handleOnChangeTask}
    />
  );
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(TaskListContainerContainer);
