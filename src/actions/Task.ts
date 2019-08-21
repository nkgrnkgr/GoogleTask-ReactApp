import * as ActionType from './TaskConstants';
import { Task } from '../services/googleTasks/models';
import {
  TasksPatchParam,
  TasksInsertParam,
  TasksListParam,
} from '../services/googleTasks/taskApi';

export const getTaskList = {
  start: (params: TasksListParam) => ({
    type: ActionType.GET_TASKLIST_START as typeof ActionType.GET_TASKLIST_START,
    payload: params,
  }),

  succeed: (params: TasksListParam, result: Task[]) => ({
    type: ActionType.GET_TASKLIST_SUCCEED as typeof ActionType.GET_TASKLIST_SUCCEED,
    payload: { params, result },
  }),

  fail: (params: TasksListParam, error: Error) => ({
    type: ActionType.GET_TASKLIST_FAIL as typeof ActionType.GET_TASKLIST_FAIL,
    payload: { params, error },
    error: true,
  }),
};
export const insertAndGetTaskList = {
  start: (params: TasksInsertParam) => ({
    type: ActionType.INSERT_AND_GET_TASKLIST_START as typeof ActionType.INSERT_AND_GET_TASKLIST_START,
    payload: params,
  }),
  succeed: (params: TasksInsertParam, result: Task[]) => ({
    type: ActionType.INSERT_AND_GET_TASKLIST_SUCCEED as typeof ActionType.INSERT_AND_GET_TASKLIST_SUCCEED,
    payload: { params, result },
  }),

  fail: (params: TasksInsertParam, error: Error) => ({
    type: ActionType.INSERT_AND_GET_TASKLIST_FAIL as typeof ActionType.INSERT_AND_GET_TASKLIST_FAIL,
    payload: { params, error },
    error: true,
  }),
};

export const patchTask = {
  start: (params: TasksPatchParam) => ({
    type: ActionType.PATCH_TASK_START as typeof ActionType.PATCH_TASK_START,
    payload: params,
  }),
  succeed: (params: TasksPatchParam, result: Task) => ({
    type: ActionType.PATCH_TASK_SUCCEED as typeof ActionType.PATCH_TASK_SUCCEED,
    payload: { params, result },
  }),

  fail: (params: TasksPatchParam, error: Error) => ({
    type: ActionType.PATCH_TASK_FAIL as typeof ActionType.PATCH_TASK_FAIL,
    payload: { params, error },
    error: true,
  }),
};

export type TaskAction =
  | ReturnType<typeof getTaskList.start>
  | ReturnType<typeof getTaskList.succeed>
  | ReturnType<typeof getTaskList.fail>
  | ReturnType<typeof insertAndGetTaskList.start>
  | ReturnType<typeof insertAndGetTaskList.succeed>
  | ReturnType<typeof insertAndGetTaskList.fail>
  | ReturnType<typeof patchTask.start>
  | ReturnType<typeof patchTask.succeed>
  | ReturnType<typeof patchTask.fail>;
