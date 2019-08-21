import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import * as TaskListAction from '../actions/TaskListConstants';
import * as TaskAction from '../actions/TaskConstants';
import { getTaskLists } from '../actions/TaskList';
import { getTaskList, insertAndGetTaskList, patchTask } from '../actions/Task';
import { getTaskListsFactory } from '../services/googleTasks/taskListApi';
import {
  getTaskListFactory,
  insertAndGetTaskListFactory,
  patchTaskFactory,
} from '../services/googleTasks/taskApi';
import { Task } from '../services/googleTasks/models';

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
  try {
    const api = getTaskListFactory();
    const tasklist: Task[] = yield call(api, action.payload);

    yield put(getTaskList.succeed(action.payload, tasklist));
  } catch (error) {
    yield put(getTaskList.fail(action.payload, error));
  }
}
export function* watchGetTaskList() {
  yield takeLatest(TaskAction.GET_TASKLIST_START, runGetTaskList);
}

function* runInsertAndGetTaskList(
  action: ReturnType<typeof insertAndGetTaskList.start>,
) {
  const { paramForInsert, paramForList } = action.payload;
  try {
    const api = insertAndGetTaskListFactory();
    const taskList: Task[] = yield call(api, paramForInsert, paramForList);

    yield put(
      insertAndGetTaskList.succeed(paramForInsert, paramForList, taskList),
    );
  } catch (error) {
    yield put(insertAndGetTaskList.fail(paramForInsert, paramForList, error));
  }
}
export function* watchInsertAndGetTaskList() {
  yield takeLatest(
    TaskAction.INSERT_AND_GET_TASKLIST_START,
    runInsertAndGetTaskList,
  );
}

function* runPatchTask(action: ReturnType<typeof patchTask.start>) {
  try {
    const api = patchTaskFactory();
    const task: Task = yield call(api, action.payload);

    yield put(patchTask.succeed(action.payload, task));
  } catch (error) {
    yield put(patchTask.fail(action.payload, error));
  }
}
export function* watchPatchTask() {
  yield takeLatest(TaskAction.PATCH_TASK_START, runPatchTask);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetTaskLists),
    fork(watchGetTaskList),
    fork(watchInsertAndGetTaskList),
    fork(watchPatchTask),
  ]);
}
