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

const updateTask = (taskList: Task[], task: Task) => {
  const index = taskList.findIndex(t => t.id === task.id);
  const t = [...taskList];
  t.splice(index, 1, task);

  return t;
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
        taskList: updateTask(state.taskList, action.payload.result),
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
