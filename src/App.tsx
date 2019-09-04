import React, { FC } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import SignInPage from './containers/SignInPage/index';
import TaskListPage from './components/TaskListPage/index';
import GapiClientInitializer from './containers/GapiClientInitializer/index';

const App: FC = () => {
  return (
    <BrowserRouter>
      <GapiClientInitializer>
        <Route path="/" component={TaskListPage} />
        <Route path="/signIn" component={SignInPage} />
      </GapiClientInitializer>
    </BrowserRouter>
  );
};

export default App;
