import { Reducer } from 'redux';
import { TaskList } from '../services/googleTasks/models';
import { TaskListAction } from '../actions/TaskList';
import * as ActionType from '../actions/TaskListConstants';

export interface TaskListState {
  taskLists: TaskList[];
  isLoading: boolean;
  error?: Error | null;
}
export const initialState: TaskListState = {
  taskLists: [],
  isLoading: false,
};

const taskListReducer: Reducer<TaskListState, TaskListAction> = (
  state: TaskListState = initialState,
  action: TaskListAction,
): TaskListState => {
  switch (action.type) {
    case ActionType.GET_TASKLISTS_START:
      return {
        ...state,
        taskLists: [],
        isLoading: true,
      };
    case ActionType.GET_TASKLISTS_SUCCEED:
      return {
        ...state,
        taskLists: action.payload.result.tasklists,
        isLoading: false,
      };
    case ActionType.GET_TASKLISTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;

      return state;
    }
  }
};

export default taskListReducer;
