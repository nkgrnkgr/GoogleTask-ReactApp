import React, { FC, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Task } from '../../services/googleTasks/models';
import {
  getTaskList,
  insertAndGetTaskList,
  patchTask,
  deleteTask,
  moveTask,
  clearAndGetTaskList,
} from '../../actions/Task';
import TaskListContainer from '../../components/TaskListContainer/index';
import { CombinedState } from '../../reducers/root';
import {
  TasksListParam,
  TasksPatchParam,
  TasksDeleteParam,
  TasksMoveParam,
  TasksClearParam,
  TasksInsertParam,
} from '../../services/googleTasks/taskApi';

interface StateProps {
  taskList: Task[];
  isLoading?: boolean;
  selectedTaskListId: string;
}

interface DispatchProps {
  getTaskListStart: (param: TasksListParam) => void;
  insertAndGetTaskListStart: (
    paramForInsert: TasksInsertParam,
    paramForList: TasksListParam,
  ) => void;
  patchTaskStart: (param: TasksPatchParam) => void;
  deleteTaskStart: (param: TasksDeleteParam) => void;
  moveTaskStart: (param: TasksMoveParam) => void;
  clearAndGetTaskListStart: (
    paramForClear: TasksClearParam,
    paramForList: TasksListParam,
  ) => void;
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
      insertAndGetTaskListStart: (
        paramForInsert: TasksInsertParam,
        paramForList: TasksListParam,
      ) => insertAndGetTaskList.start(paramForInsert, paramForList),
      patchTaskStart: (param: TasksPatchParam) => patchTask.start(param),
      deleteTaskStart: (param: TasksDeleteParam) => deleteTask.start(param),
      moveTaskStart: (param: TasksMoveParam) => moveTask.start(param),
      clearAndGetTaskListStart: (
        paramForClear: TasksClearParam,
        paramForList: TasksListParam,
      ) => clearAndGetTaskList.start(paramForClear, paramForList),
    },
    dispatch,
  );

const TaskListContainerContainer: FC<EnhancemembersProps> = ({
  getTaskListStart,
  insertAndGetTaskListStart,
  patchTaskStart,
  deleteTaskStart,
  moveTaskStart,
  clearAndGetTaskListStart,
  taskList,
  isLoading = false,
  selectedTaskListId,
}) => {
  useEffect(() => {
    if (selectedTaskListId !== '') {
      getTaskListStart({ tasklist: selectedTaskListId });
    }
  }, [selectedTaskListId]);

  const handleInsertTask = () => {
    insertAndGetTaskListStart(
      { tasklist: selectedTaskListId, title: '' },
      { tasklist: selectedTaskListId },
    );
  };

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
    if (sourceIndex === destinationIndex) {
      return;
    }

    const sourceTaskId = taskList[sourceIndex].id || '';
    let destinationTaskId = '';

    if (destinationIndex !== 0) {
      if (sourceIndex < destinationIndex) {
        destinationTaskId = taskList[destinationIndex].id || '';
      } else {
        destinationTaskId = taskList[destinationIndex - 1].id || '';
      }
    }

    if (!destinationTaskId) {
      moveTaskStart({
        tasklist: selectedTaskListId,
        task: sourceTaskId,
      });
    } else {
      moveTaskStart({
        tasklist: selectedTaskListId,
        task: sourceTaskId,
        previous: destinationTaskId,
      });
    }
  };

  const handleClearTask = () => {
    clearAndGetTaskListStart(
      { tasklist: selectedTaskListId },
      { tasklist: selectedTaskListId },
    );
  };

  return (
    <TaskListContainer
      taskList={taskList}
      isLoading={isLoading}
      handleInsert={handleInsertTask}
      handleOnChange={handleOnChangeTask}
      handleDelete={handleDeleteTask}
      handleReorder={handleReorderTask}
      handleClear={handleClearTask}
    />
  );
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(TaskListContainerContainer);
