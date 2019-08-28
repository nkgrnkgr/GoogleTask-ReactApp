import * as ActionType from './TaskConstants';
import { Task } from '../services/googleTasks/models';
import {
  TasksPatchParam,
  TasksInsertParam,
  TasksListParam,
  TasksDeleteParam,
  TasksMoveParam,
  TasksClearParam,
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

export const deleteTask = {
  start: (param: TasksDeleteParam) => ({
    type: ActionType.DELETE_TASK_START as typeof ActionType.DELETE_TASK_START,
    payload: param,
  }),
  succeed: (param: TasksDeleteParam) => ({
    type: ActionType.DELETE_TASK_SUCCEED as typeof ActionType.DELETE_TASK_SUCCEED,
    payload: { param },
  }),

  fail: (param: TasksDeleteParam, error: Error) => ({
    type: ActionType.DELETE_TASK_FAIL as typeof ActionType.DELETE_TASK_FAIL,
    payload: { param, error },
    error: true,
  }),
};
export const moveTask = {
  start: (param: TasksMoveParam) => ({
    type: ActionType.MOVE_TASK_START as typeof ActionType.MOVE_TASK_START,
    payload: param,
  }),
  succeed: (param: TasksMoveParam) => ({
    type: ActionType.MOVE_TASK_SUCCEED as typeof ActionType.MOVE_TASK_SUCCEED,
    payload: { param },
  }),

  fail: (param: TasksMoveParam, error: Error) => ({
    type: ActionType.MOVE_TASK_FAIL as typeof ActionType.MOVE_TASK_FAIL,
    payload: { param, error },
    error: true,
  }),
};

export const clearAndGetTaskList = {
  start: (paramForClear: TasksClearParam, paramForList: TasksListParam) => ({
    type: ActionType.CLEAR_AND_GET_TASK_LIST_START as typeof ActionType.CLEAR_AND_GET_TASK_LIST_START,
    payload: { paramForClear, paramForList },
  }),
  succeed: (
    paramForClear: TasksClearParam,
    paramForList: TasksListParam,
    result: Task[],
  ) => ({
    type: ActionType.CLEAR_AND_GET_TASK_LIST_SUCCEED as typeof ActionType.CLEAR_AND_GET_TASK_LIST_SUCCEED,
    payload: { paramForClear, paramForList, result },
  }),

  fail: (
    paramForClear: TasksClearParam,
    paramForList: TasksListParam,
    error: Error,
  ) => ({
    type: ActionType.CLEAR_AND_GET_TASK_LIST_FAIL as typeof ActionType.CLEAR_AND_GET_TASK_LIST_FAIL,
    payload: { paramForClear, paramForList, error },
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
  | ReturnType<typeof patchTask.fail>
  | ReturnType<typeof deleteTask.start>
  | ReturnType<typeof deleteTask.succeed>
  | ReturnType<typeof deleteTask.fail>
  | ReturnType<typeof moveTask.start>
  | ReturnType<typeof moveTask.succeed>
  | ReturnType<typeof moveTask.fail>
  | ReturnType<typeof clearAndGetTaskList.start>
  | ReturnType<typeof clearAndGetTaskList.succeed>
  | ReturnType<typeof clearAndGetTaskList.fail>;
