import React, { FC, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { TaskList } from '../../services/googleTasks/models';
import { application } from '../../actions/Application';
import { getTaskLists } from '../../actions/TaskList';
import TaskListSelection from '../../components/TaskListSelection/index';
import { CombinedState } from '../../reducers/root';

type OuterProps = RouteComponentProps;

interface StateProps {
  taskLists: TaskList[];
  isLoading?: boolean;
  selectedTaskListId: string;
}

interface DispatchProps {
  getTaskListsStart: () => void;
  selectTaskList: (selectedTaskListId: string) => void;
}

type EnhancemembersProps = StateProps & DispatchProps & OuterProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  taskLists: state.taskList.taskLists,
  isLoading: state.taskList.isLoading,
  selectedTaskListId: state.application.selectedTaskListId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getTaskListsStart: () => getTaskLists.start(),
      selectTaskList: (selectedTaskListId: string) =>
        application.selectTaskList({
          selectedTaskListId,
        }),
    },
    dispatch,
  );

const TaskContainers: FC<EnhancemembersProps> = ({
  getTaskListsStart,
  taskLists = [],
  isLoading = false,
  selectTaskList,
  selectedTaskListId,
  history,
}) => {
  useEffect(() => {
    setTimeout(() => {
      getTaskListsStart();
    }, 1000);
  }, []);

  const handleOnChange = (tasklistId: string) => {
    selectTaskList(tasklistId);
    history.push(`/?tasklist=${tasklistId}`);
  };

  return (
    <TaskListSelection
      taskLists={taskLists}
      isLoading={isLoading}
      handleOnChange={handleOnChange}
      defaultSelectedTaskListId={selectedTaskListId}
    />
  );
};

export default withRouter(
  connect(
    mapStateTopProps,
    mapDispatchToProps,
  )(TaskContainers),
);
