import { AxiosError } from 'axios';
import * as ActionType from './TaskConstants';
import { Task } from '../services/googleTasks/models';

interface GetTaskListParams {
  taskListId: string;
}
interface GetTaskListResult {
  tasklist: Task[];
}

export const getTaskList = {
  start: (params: GetTaskListParams) => ({
    type: ActionType.GET_TASKLIST_START as typeof ActionType.GET_TASKLIST_START,
    payload: params,
  }),

  succeed: (params: GetTaskListParams, result: GetTaskListResult) => ({
    type: ActionType.GET_TASKLIST_SUCCEED as typeof ActionType.GET_TASKLIST_SUCCEED,
    payload: { params, result },
  }),

  fail: (params: GetTaskListParams, error: AxiosError) => ({
    type: ActionType.GET_TASKLIST_FAIL as typeof ActionType.GET_TASKLIST_FAIL,
    payload: { params, error },
    error: true,
  }),
};
interface InsertTaskParams {
  tasklist: string;
  parent?: string;
  previous?: string;
  title: string;
}
interface InsertTaskResult {
  task: Task;
}

export const insertTask = {
  start: (params: InsertTaskParams) => ({
    type: ActionType.INSERT_TASK_START as typeof ActionType.INSERT_TASK_START,
    payload: params,
  }),
  succeed: (params: InsertTaskParams, result: InsertTaskResult) => ({
    type: ActionType.INSERT_TASK_SUCCEED as typeof ActionType.INSERT_TASK_SUCCEED,
    payload: { params, result },
  }),

  fail: (params: InsertTaskParams, error: AxiosError) => ({
    type: ActionType.INSERT_TASK_FAIL as typeof ActionType.INSERT_TASK_FAIL,
    payload: { params, error },
    error: true,
  }),
};

export type TaskAction =
  | ReturnType<typeof getTaskList.start>
  | ReturnType<typeof getTaskList.succeed>
  | ReturnType<typeof getTaskList.fail>
  | ReturnType<typeof insertTask.start>
  | ReturnType<typeof insertTask.succeed>
  | ReturnType<typeof insertTask.fail>;
