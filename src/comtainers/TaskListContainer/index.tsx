import React, { FC, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Task } from '../../services/googleTasks/models';
import {
  getTaskList,
  patchTask,
  deleteTask,
  moveTask,
} from '../../actions/Task';
import TaskListContainer from '../../components/TaskListContainer';
import { CombinedState } from '../../reducers/root';
import {
  TasksListParam,
  TasksPatchParam,
  TasksDeleteParam,
  TasksMoveParam,
} from '../../services/googleTasks/taskApi';

interface StateProps {
  taskList: Task[];
  isLoading?: boolean;
  selectedTaskListId: string;
}

interface DispatchProps {
  getTaskListStart: (param: TasksListParam) => void;
  patchTaskStart: (param: TasksPatchParam) => void;
  deleteTaskStart: (param: TasksDeleteParam) => void;
  moveTaskStart: (param: TasksMoveParam) => void;
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
      deleteTaskStart: (param: TasksDeleteParam) => deleteTask.start(param),
      moveTaskStart: (param: TasksMoveParam) => moveTask.start(param),
    },
    dispatch,
  );

const TaskListContainerContainer: FC<EnhancemembersProps> = ({
  getTaskListStart,
  patchTaskStart,
  deleteTaskStart,
  moveTaskStart,
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

  const handleDeleteTask = (task: Task) => {
    deleteTaskStart({ tasklist: selectedTaskListId, task: task.id || '' });
  };

  const handleReorderTask = (sourceIndex: number, destinationIndex: number) => {
    const sourceTaskId = taskList[sourceIndex].id || '';
    const destinationTaskId = taskList[destinationIndex].id || '';

    if (sourceTaskId === '' || destinationTaskId === '') {
      return;
    }

    moveTaskStart({
      tasklist: selectedTaskListId,
      task: sourceTaskId,
      previous: destinationTaskId,
    });
  };

  return (
    <TaskListContainer
      taskList={taskList}
      isLoading={isLoading}
      handleOnChange={handleOnChangeTask}
      handleDelete={handleDeleteTask}
      handleReorder={handleReorderTask}
    />
  );
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(TaskListContainerContainer);
