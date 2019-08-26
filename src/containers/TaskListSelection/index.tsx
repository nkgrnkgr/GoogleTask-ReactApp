import React, { FC, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskList } from '../../services/googleTasks/models';
import { application } from '../../actions/Application';
import { getTaskLists } from '../../actions/TaskList';
import TaskListSelection from '../../components/TaskListSelection/index';
import { CombinedState } from '../../reducers/root';

interface StateProps {
  taskLists: TaskList[];
  isLoading?: boolean;
}

interface DispatchProps {
  getTaskListsStart: () => void;
  selectTaskList: (selectedTaskListId: string) => void;
}

type EnhancemembersProps = StateProps & DispatchProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  taskLists: state.taskList.taskLists,
  isLoading: state.taskList.isLoading,
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
}) => {
  useEffect(() => {
    setTimeout(() => {
      getTaskListsStart();
    }, 1000);
  }, []);

  return (
    <TaskListSelection
      taskLists={taskLists}
      isLoading={isLoading}
      handleOnChange={selectTaskList}
    />
  );
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(TaskContainers);
