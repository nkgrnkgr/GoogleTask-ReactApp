import { Task as TasksResource } from './models';

export const getTaskListFactory = () => {
  const getTaskList = async (tasklistId: string) => {
    try {
      const response = await gapi.client.tasks.tasks.list({
        tasklist: tasklistId,
      });

      const taskList = response.result.items;

      return taskList;
    } catch (err) {
      throw err;
    }
  };

  return getTaskList;
};

export const insertTaskFactory = () => {
  const insertTask = async (param: TasksInsertParam) => {
    try {
      const response = await gapi.client.tasks.tasks.insert(param);

      const task = response.result;

      return task;
    } catch (err) {
      throw err;
    }
  };

  return insertTask;
};
interface StandardParameters {
  alt?: 'JSON';
  fields?: string;
  prettyPrint?: boolean;
  quotaUser?: string;
  userIp?: string;
}

export type TasksListParam = {
  tasklist: string;
  completedMax?: string;
  completedMin?: string;
  dueMax?: string;
  dueMin?: string;
  maxResults?: number;
  pageToken?: string;
  showCompleted?: boolean;
  showDeleted?: boolean;
  showHidden?: boolean;
  updatedMin?: string;
} & StandardParameters;

export type TasksGetParam = {
  tasklist: string;
  task: string;
} & StandardParameters;

export type TasksInsertParam = {
  tasklist: string;
  parent?: string;
  previous?: string;
} & TasksResource &
  StandardParameters;

export type TasksUpdateParam = {
  tasklist: string;
  task: string;
} & TasksResource &
  StandardParameters;

export type TasksDeleteParam = {
  tasklist: string;
  task: string;
} & StandardParameters;

export type TasksClearParam = {
  tasklist: string;
} & StandardParameters;

export type TasksMoveParam = {
  tasklist: string;
  task: string;
  parent?: string;
  previous?: string;
} & StandardParameters;

export type TasksPatchParam = {
  tasklist: string;
  task: string;
} & TasksResource &
  StandardParameters;
