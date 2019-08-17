import { AxiosError } from 'axios';
import * as ActionType from './TaskListConstants';
import { TaskList } from '../services/googleTasks/models';

interface GetTaskListsResult {
  tasklists: TaskList[];
}

export const getTaskLists = {
  start: () => ({
    type: ActionType.GET_TASKLISTS_START as typeof ActionType.GET_TASKLISTS_START,
  }),
  succeed: (result: GetTaskListsResult) => ({
    type: ActionType.GET_TASKLISTS_SUCCEED as typeof ActionType.GET_TASKLISTS_SUCCEED,
    payload: { result },
  }),

  fail: (error: AxiosError) => ({
    type: ActionType.GET_TASKLISTS_FAIL as typeof ActionType.GET_TASKLISTS_FAIL,
    payload: { error },
    error: true,
  }),
};

export type TaskListAction =
  | ReturnType<typeof getTaskLists.start>
  | ReturnType<typeof getTaskLists.succeed>
  | ReturnType<typeof getTaskLists.fail>;
