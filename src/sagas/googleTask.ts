import { all, call, fork, put, takeLatest, delay } from 'redux-saga/effects';

import * as TaskListAction from '../actions/TaskListConstants';
import * as TaskAction from '../actions/TaskConstants';
import { getTaskLists } from '../actions/TaskList';
import {
  getTaskList,
  insertAndGetTaskList,
  patchTask,
  deleteTask,
  moveTask,
  clearAndGetTaskList,
} from '../actions/Task';
import { getTaskListsFactory } from '../services/googleTasks/taskListApi';
import {
  getTaskListFactory,
  insertAndGetTaskListFactory,
  patchTaskFactory,
  deleteTaskFactory,
  moveTaskFactory,
  clearAndGetTaskListFactory,
} from '../services/googleTasks/taskApi';
import { Task } from '../services/googleTasks/models';

function* runGetTaskLists() {
  try {
    const api = getTaskListsFactory();
    const tasklists = yield call(api);

    yield put(getTaskLists.succeed(tasklists));
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
    yield delay(500);
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

function* runDeleteTask(action: ReturnType<typeof deleteTask.start>) {
  try {
    const api = deleteTaskFactory();
    yield call(api, action.payload);

    yield put(deleteTask.succeed(action.payload));
  } catch (error) {
    yield put(deleteTask.fail(action.payload, error));
  }
}
export function* watchDeleteTask() {
  yield takeLatest(TaskAction.DELETE_TASK_START, runDeleteTask);
}

function* runMoveTask(action: ReturnType<typeof moveTask.start>) {
  try {
    const api = moveTaskFactory();
    yield call(api, action.payload);

    yield put(moveTask.succeed(action.payload));
  } catch (error) {
    yield put(moveTask.fail(action.payload, error));
  }
}
export function* watchMoveTask() {
  yield takeLatest(TaskAction.MOVE_TASK_START, runMoveTask);
}

function* runClearAndGetTaskList(
  action: ReturnType<typeof clearAndGetTaskList.start>,
) {
  try {
    const api = clearAndGetTaskListFactory();
    const { paramForClear, paramForList } = action.payload;
    const result: Task[] = yield call(api, paramForClear, paramForList);

    yield put(clearAndGetTaskList.succeed(paramForClear, paramForList, result));
  } catch (error) {
    yield put(
      clearAndGetTaskList.fail(
        action.payload.paramForClear,
        action.payload.paramForList,
        error,
      ),
    );
  }
}
export function* watchClearAndGetTaskList() {
  yield takeLatest(
    TaskAction.CLEAR_AND_GET_TASK_LIST_START,
    runClearAndGetTaskList,
  );
}

export default function* rootSaga() {
  yield all([
    fork(watchGetTaskLists),
    fork(watchGetTaskList),
    fork(watchInsertAndGetTaskList),
    fork(watchPatchTask),
    fork(watchDeleteTask),
    fork(watchMoveTask),
    fork(watchClearAndGetTaskList),
  ]);
}
