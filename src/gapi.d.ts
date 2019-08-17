import {
  TaskList as TaskListsResource,
  Task as TasksResource,
} from './services/googleTasks/models';

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

// Resource

// RequestParam

interface StandardParameters {
  alt?: 'JSON';
  fields?: string;
  prettyPrint?: boolean;
  quotaUser?: string;
  userIp?: string;
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
    param: {
      maxResults?: number;
      pageToken?: string;
    } & StandardParameters,
  ) => Promise<Response<ListResult<TaskListsResource>>>;
  get: (
    param: { tasklist: string } & StandardParameters,
  ) => Promise<Response<TaskListsResource>>;
  insert: (
    param: {} & TaskListsResource & StandardParameters,
  ) => Promise<Response<TaskListsResource>>;
  update: (
    param: {
      tasklist: string;
    } & TaskListsResource &
      StandardParameters,
  ) => Promise<Response<TaskListsResource>>;
  delete: (
    param: { tasklist: string } & StandardParameters,
  ) => Promise<Response<false>>;
  patch: (
    param: {
      tasklist: string;
    } & TaskListsResource &
      StandardParameters,
  ) => Promise<Response<TaskListsResource>>;
}

// Tasks

declare interface Tasks {
  list: (
    param: {
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
    } & StandardParameters,
  ) => Promise<Response<ListResult<TasksResource>>>;
  get: (
    param: { tasklist: string; task: string } & StandardParameters,
  ) => Promise<Response<TasksResource>>;
  insert: (
    param: {
      tasklist: string;
      parent?: string;
      previous?: string;
    } & TasksResource &
      StandardParameters,
  ) => Promise<Response<TasksResource>>;
  update: (
    param: {
      tasklist: string;
      task: string;
    } & TasksResource &
      StandardParameters,
  ) => Promise<Response<TasksResource>>;
  delete: (
    param: { tasklist: string; task: string } & StandardParameters,
  ) => Promise<Response<false>>;
  clear: (
    param: { tasklist: string } & StandardParameters,
  ) => Promise<Response<false>>;
  move: (
    param: {
      tasklist: string;
      task: string;
      parent?: string;
      previous?: string;
    } & StandardParameters,
  ) => Promise<Response<TasksResource>>;
  patch: (
    param: {
      tasklist: string;
      task: string;
    } & TasksResource &
      StandardParameters,
  ) => Promise<Response<TasksResource>>;
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
