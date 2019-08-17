import React, { FC, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskList } from '../../services/googleTasks/models';
import { application } from '../../actions/Application';
import { getTaskLists } from '../../actions/TaskList';
import ToDoListSelection from '../../components/ToDoListSelection';
import { CombinedState } from '../../reducers/root';

interface StateProps {
  taskLists: TaskList[];
  isLoading?: boolean;
}

interface DispatchProps {
  getTaskListsStart: () => void;
  selectToDoList: (selectedToDoListId: string) => void;
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
      selectToDoList: (selectedToDoListId: string) =>
        application.selectToDoList({
          selectedToDoListId,
        }),
    },
    dispatch,
  );

const TaskContainers: FC<EnhancemembersProps> = ({
  getTaskListsStart,
  taskLists = [],
  isLoading = false,
  selectToDoList,
}) => {
  useEffect(() => {
    setTimeout(() => {
      getTaskListsStart();
    }, 1000);
  }, []);

  return (
    <ToDoListSelection
      taskLists={taskLists}
      isLoading={isLoading}
      handleOnChange={selectToDoList}
    />
  );
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(TaskContainers);
