import { combineReducers } from 'redux';
import application, { ApplicationState } from './Application';
import taskList, { TaskListState } from './TaskListReducer';
import task, { TaskState } from './TaskReducer';

const rootReducer = combineReducers({ application, taskList, task });

export interface CombinedState {
  application: ApplicationState;
  taskList: TaskListState;
  task: TaskState;
}

export default rootReducer;
