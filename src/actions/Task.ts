import * as ActionType from './TaskConstants';
import { Task } from '../services/googleTasks/models';
import {
  TasksPatchParam,
  TasksInsertParam,
  TasksListParam,
} from '../services/googleTasks/taskApi';

export const getTaskList = {
  start: (param: TasksListParam) => ({
    type: ActionType.GET_TASKLIST_START as typeof ActionType.GET_TASKLIST_START,
    payload: param,
  }),

  succeed: (param: TasksListParam, result: Task[]) => ({
    type: ActionType.GET_TASKLIST_SUCCEED as typeof ActionType.GET_TASKLIST_SUCCEED,
    payload: { param, result },
  }),

  fail: (param: TasksListParam, error: Error) => ({
    type: ActionType.GET_TASKLIST_FAIL as typeof ActionType.GET_TASKLIST_FAIL,
    payload: { param, error },
    error: true,
  }),
};
export const insertAndGetTaskList = {
  start: (paramForInsert: TasksInsertParam, paramForList: TasksListParam) => ({
    type: ActionType.INSERT_AND_GET_TASKLIST_START as typeof ActionType.INSERT_AND_GET_TASKLIST_START,
    payload: { paramForInsert, paramForList },
  }),
  succeed: (
    paramForInsert: TasksInsertParam,
    paramForList: TasksListParam,
    result: Task[],
  ) => ({
    type: ActionType.INSERT_AND_GET_TASKLIST_SUCCEED as typeof ActionType.INSERT_AND_GET_TASKLIST_SUCCEED,
    payload: { paramForInsert, paramForList, result },
  }),

  fail: (
    paramForInsert: TasksInsertParam,
    paramForList: TasksListParam,
    error: Error,
  ) => ({
    type: ActionType.INSERT_AND_GET_TASKLIST_FAIL as typeof ActionType.INSERT_AND_GET_TASKLIST_FAIL,
    payload: { paramForInsert, paramForList, error },
    error: true,
  }),
};

export const patchTask = {
  start: (param: TasksPatchParam) => ({
    type: ActionType.PATCH_TASK_START as typeof ActionType.PATCH_TASK_START,
    payload: param,
  }),
  succeed: (param: TasksPatchParam, result: Task) => ({
    type: ActionType.PATCH_TASK_SUCCEED as typeof ActionType.PATCH_TASK_SUCCEED,
    payload: { param, result },
  }),

  fail: (param: TasksPatchParam, error: Error) => ({
    type: ActionType.PATCH_TASK_FAIL as typeof ActionType.PATCH_TASK_FAIL,
    payload: { param, error },
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
