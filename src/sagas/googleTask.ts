import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import * as TaskListAction from '../actions/TaskListConstants';
import * as TaskAction from '../actions/TaskConstants';
import { getTaskLists } from '../actions/TaskList';
import { getTaskList, InsertAndGetTaskList } from '../actions/Task';
import { getTaskListsFactory } from '../services/googleTasks/taskListApi';
import {
  getTaskListFactory,
  insertAndGetTaskListFactory,
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

function* runInsertAndGetTaskList(
  action: ReturnType<typeof InsertAndGetTaskList.start>,
) {
  const { tasklist, title, parent, previous } = action.payload;

  try {
    const api = insertAndGetTaskListFactory();
    const taskList = yield call(api, { tasklist, title, parent, previous });

    yield put(
      InsertAndGetTaskList.succeed(
        { tasklist, title, parent, previous },
        { tasklist: taskList },
      ),
    );
  } catch (error) {
    yield put(
      InsertAndGetTaskList.fail({ tasklist, title, parent, previous }, error),
    );
  }
}
export function* watchInsertAndGetTaskList() {
  yield takeLatest(
    TaskAction.INSERT_AND_GET_TASKLIST_START,
    runInsertAndGetTaskList,
  );
}

export default function* rootSaga() {
  yield all([
    fork(watchGetTaskLists),
    fork(watchGetTaskList),
    fork(watchInsertAndGetTaskList),
  ]);
}
