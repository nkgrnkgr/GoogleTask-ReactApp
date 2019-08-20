import { TaskList as TaskListsResource } from './models';

export const getTaskListsFactory = () => {
  const getTaksLists = async () => {
    try {
      const response = await gapi.client.tasks.tasklists.list({
        maxResults: 10,
      });
      // const taskLists: TaskList[] = response.result.items;
      const taskLists = response.result.items;

      return taskLists;
    } catch (err) {
      throw err;
    }
  };

  return getTaksLists;
};

export type TaskListsListParam = {
  maxResults?: number;
  pageToken?: string;
} & StandardParameters;

export type TaskListsGetParam = {
  tasklist: string;
} & StandardParameters;

export type TaskListsInsertParam = {} & TaskListsResource & StandardParameters;

export type TaskListsUpdateParam = { tasklist: string } & TaskListsResource &
  StandardParameters;

export type TaskListsDeleteParam = {
  tasklist: string;
} & StandardParameters;

export type TaskListsPatchParam = { tasklist: string } & TaskListsResource &
  StandardParameters;

interface StandardParameters {
  alt?: 'JSON';
  fields?: string;
  prettyPrint?: boolean;
  quotaUser?: string;
  userIp?: string;
}
