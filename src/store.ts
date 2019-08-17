/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import root from './reducers/root';
import rootSaga from './sagas/googleTask';

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  root,
  composeWithDevTools(applyMiddleware(sagaMiddleWare)),
);

sagaMiddleWare.run(rootSaga);

export default store;
