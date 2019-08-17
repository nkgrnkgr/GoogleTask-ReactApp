export interface GoogleTasksBaseResource {
  kind?: string;
  id?: string;
  etag?: string;
  title?: string;
  updated?: string;
  selfLink?: string;
}
// eslint-disable-next-line
export interface TaskList extends GoogleTasksBaseResource {}
export interface Task extends GoogleTasksBaseResource {
  parent?: string;
  position?: string;
  notes?: string;
  status?: string;
  due?: Date;
  completed?: Date;
  deleted?: boolean;
  hidden?: boolean;
  links?: [
    {
      type?: string;
      description?: string;
      link?: string;
    },
  ];
}
