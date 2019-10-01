import React, { FC } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import TaskListPage from './components/TaskListPage/index';
import GapiClientInitializer from './containers/GapiClientInitializer/index';
import SignInPage from './containers/SignInPage/index';

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
