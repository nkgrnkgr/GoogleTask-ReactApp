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

const sortByPostion = (taskList: Task[]) => {
  return taskList.sort((a, b) => {
    const { position: positionA = '0' } = a;
    const { position: positionB = '0' } = b;

    return parseInt(positionA, 10) - parseInt(positionB, 10);
  });
};

const updateTask = (taskList: Task[], task: Task) => {
  return taskList.map(c => (c.id === task.id ? task : c));
};
const deleteTask = (taskList: Task[], deleteTargetId: string) => {
  return taskList.filter(c => c.id !== deleteTargetId);
};

const reorderTask = (
  tasklist: Task[],
  sourceTaskId: string,
  destinationTaskId: string,
) => {
  const result = Array.from(tasklist);
  const startIndex = tasklist.findIndex(t => t.id === sourceTaskId);
  const endIndex = tasklist.findIndex(t => t.id === destinationTaskId);
  if (startIndex > endIndex) {
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex + 1, 0, removed);
  } else {
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  }

  return result;
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
        taskList: sortByPostion(action.payload.result),
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
        taskList: sortByPostion(action.payload.result),
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
        taskList: updateTask(state.taskList, {
          id: action.payload.task,
          title: action.payload.title,
          status: action.payload.status,
        }),
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
    case ActionType.DELETE_TASK_START:
      return {
        ...state,
        taskList: deleteTask(state.taskList, action.payload.task),
      };
    case ActionType.DELETE_TASK_SUCCEED:
      return {
        ...state,
      };
    case ActionType.DELETE_TASK_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case ActionType.MOVE_TASK_START:
      return {
        ...state,
        taskList: reorderTask(
          state.taskList,
          action.payload.task,
          action.payload.previous || '',
        ),
      };
    case ActionType.MOVE_TASK_SUCCEED:
      return {
        ...state,
      };
    case ActionType.MOVE_TASK_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case ActionType.CLEAR_AND_GET_TASK_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.CLEAR_AND_GET_TASK_LIST_SUCCEED:
      return {
        ...state,
        taskList: sortByPostion(action.payload.result),
        isLoading: false,
      };
    case ActionType.CLEAR_AND_GET_TASK_LIST_FAIL:
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

export default taskReducer;
