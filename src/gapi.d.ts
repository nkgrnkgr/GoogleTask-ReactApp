import {
  TaskList as TaskListsResource,
  Task as TasksResource,
} from './services/googleTasks/models';

import {
  TasksListParam,
  TasksGetParam,
  TasksClearParam,
  TasksDeleteParam,
  TasksInsertParam,
  TasksMoveParam,
  TasksPatchParam,
  TasksUpdateParam,
} from './services/googleTasks/taskApi';

import {
  TaskListsListParam,
  TaskListsGetParam,
  TaskListsInsertParam,
  TaskListsUpdateParam,
  TaskListsDeleteParam,
  TaskListsPatchParam,
} from './services/googleTasks/taskListApi';

declare interface Gapi {
  load: Function;
  client: Client;
  auth2: Auth2;
}

declare interface Client {
  init: Function;
  getToken: Function;
  tasks: {
    tasklists: TaskLists;
    tasks: Tasks;
  };
}

declare interface Auth2 {
  getAuthInstance: Function;
}

// Response

interface Response<T> {
  body: JSON;
  headers: Headers;
  result: T;
  status: number;
  statusText: string;
}

interface BaseResult {
  kind: string;
  etag: string;
}

interface ListResult<T> extends BaseResult {
  id: string;
  title: string;
  nextPageToken: string;
  items: T[];
}

// Method

// TaskLists

declare interface TaskLists {
  list: (
    param: TaskListsListParam,
  ) => Promise<Response<ListResult<TaskListsResource>>>;
  get: (param: TaskListsGetParam) => Promise<Response<TaskListsResource>>;
  insert: (param: TaskListsInsertParam) => Promise<Response<TaskListsResource>>;
  update: (param: TaskListsUpdateParam) => Promise<Response<TaskListsResource>>;
  delete: (param: TaskListsDeleteParam) => Promise<Response<false>>;
  patch: (param: TaskListsPatchParam) => Promise<Response<TaskListsResource>>;
}

// Tasks

declare interface Tasks {
  list: (param: TasksListParam) => Promise<Response<ListResult<TasksResource>>>;
  get: (param: TasksGetParam) => Promise<Response<TasksResource>>;
  insert: (param: TasksInsertParam) => Promise<Response<TasksResource>>;
  update: (param: TasksUpdateParam) => Promise<Response<TasksResource>>;
  delete: (param: TasksDeleteParam) => Promise<Response<false>>;
  clear: (param: TasksClearParam) => Promise<Response<false>>;
  move: (param: TasksMoveParam) => Promise<Response<TasksResource>>;
  patch: (param: TasksPatchParam) => Promise<Response<TasksResource>>;
}

interface Headers {
  'cache-control': string;
  'content-encoding': string;
  'content-length': string;
  'content-type': string;
  date: string;
  etag: string;
  expires: string;
  server: string;
  vary: string;
}

declare global {
  const gapi: Gapi;
}

export {};
