import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import * as TaskListAction from '../actions/TaskListConstants';
import * as TaskAction from '../actions/TaskConstants';
import { getTaskLists } from '../actions/TaskList';
import { getTaskList, insertTask } from '../actions/Task';
import { getTaskListsFactory } from '../services/googleTasks/taskListApi';
import {
  getTaskListFactory,
  insertTaskFactory,
} from '../services/googleTasks/taskApi';

function* runGetTaskLists() {
  try {
    const api = getTaskListsFactory();
    const tasklists = yield call(api);

    yield put(getTaskLists.succeed({ tasklists }));
  } catch (error) {
    yield put(getTaskLists.fail(error));
  }
}
export function* watchGetTaskLists() {
  yield takeLatest(TaskListAction.GET_TASKLISTS_START, runGetTaskLists);
}

function* runGetTaskList(action: ReturnType<typeof getTaskList.start>) {
  const { taskListId } = action.payload;

  try {
    const api = getTaskListFactory();
    const tasklist = yield call(api, taskListId);

    yield put(getTaskList.succeed({ taskListId }, { tasklist }));
  } catch (error) {
    yield put(getTaskList.fail({ taskListId }, error));
  }
}
export function* watchGetTaskList() {
  yield takeLatest(TaskAction.GET_TASKLIST_START, runGetTaskList);
}

function* runInsertTask(action: ReturnType<typeof insertTask.start>) {
  const { tasklist, title, parent, previous } = action.payload;

  try {
    const api = insertTaskFactory();
    const task = yield call(api, { tasklist, title, parent, previous });

    yield put(
      insertTask.succeed({ tasklist, title, parent, previous }, { task }),
    );
  } catch (error) {
    yield put(insertTask.fail({ tasklist, title, parent, previous }, error));
  }
}
export function* watchInsertTask() {
  yield takeLatest(TaskAction.INSERT_TASK_START, runInsertTask);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetTaskLists),
    fork(watchGetTaskList),
    fork(watchInsertTask),
  ]);
}
