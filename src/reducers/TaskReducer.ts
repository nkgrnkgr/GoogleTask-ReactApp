import { Reducer } from 'redux';
import { Task } from '../services/googleTasks/models';
import { TaskAction } from '../actions/Task';
import * as ActionType from '../actions/TaskConstants';

export interface TaskState {
  taskList: Task[];
  isLoading: boolean;
  error?: Error | null;
}
export const initialState: TaskState = {
  taskList: [],
  isLoading: false,
};

const updateTaskList = (taskList: Task[], task: Task) => {
  return taskList.map(c => (c.id === task.id ? task : c));
};

const taskReducer: Reducer<TaskState, TaskAction> = (
  state: TaskState = initialState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case ActionType.GET_TASKLIST_START:
      return {
        ...state,
        taskList: [],
        isLoading: true,
      };
    case ActionType.GET_TASKLIST_SUCCEED:
      return {
        ...state,
        taskList: action.payload.result,
        isLoading: false,
      };
    case ActionType.GET_TASKLIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case ActionType.INSERT_AND_GET_TASKLIST_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.INSERT_AND_GET_TASKLIST_SUCCEED:
      return {
        ...state,
        taskList: action.payload.result,
        isLoading: false,
      };
    case ActionType.INSERT_AND_GET_TASKLIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case ActionType.PATCH_TASK_START:
      return {
        ...state,
      };
    case ActionType.PATCH_TASK_SUCCEED:
      return {
        ...state,
        taskList: updateTaskList(state.taskList, action.payload.result),
      };
    case ActionType.PATCH_TASK_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;

      return state;
    }
  }
};

export default taskReducer;
