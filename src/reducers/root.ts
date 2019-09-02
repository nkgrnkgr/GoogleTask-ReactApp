import { combineReducers } from 'redux';
import application, { ApplicationState } from './ApplicationReducer';
import taskList, { TaskListState } from './TaskListReducer';
import task, { TaskState } from './TaskReducer';

const rootReducer = combineReducers({ application, taskList, task });

export interface CombinedState {
  application: ApplicationState;
  taskList: TaskListState;
  task: TaskState;
}

export default rootReducer;
