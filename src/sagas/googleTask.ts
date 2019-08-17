import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import * as TaskListAction from '../actions/TaskListConstants';
import * as TaskAction from '../actions/TaskConstants';
import { getTaskLists } from '../actions/TaskList';
import { getTaskList } from '../actions/Task';
import { getTaskListsFactory } from '../services/googleTasks/taskListApi';
import { getTaskListFactory } from '../services/googleTasks/taskApi';

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

export default function* rootSaga() {
  yield all([fork(watchGetTaskLists), fork(watchGetTaskList)]);
}
