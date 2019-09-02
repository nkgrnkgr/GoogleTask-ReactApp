import React, { FC } from 'react';
import './App.css';
import { Divider } from 'semantic-ui-react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import Header from './containers/Header/index';
import TaskListSelection from './containers/TaskListSelection/index';
import TaskListContainer from './containers/TaskListContainer/index';
import SignInPage from './containers/SignInPage/index';
import AuthContainer from './containers/Auth/index';
import GapiClientInitializer from './containers/GapiClientInitializer/index';
import HtmlTitle from './components/HtmlTitle/index';

const App: FC = () => {
  return (
    <BrowserRouter>
      <GapiClientInitializer>
        <Route exact path="/signIn" component={SignInPage} />
        <Route
          exact
          path="/"
          render={() => (
            <AuthContainer>
              <HtmlTitle title="Tasks" />
              <Header />
              <Divider hidden />
              <TaskListSelection />
              <Divider hidden />
              <TaskListContainer />
            </AuthContainer>
          )}
        />
      </GapiClientInitializer>
    </BrowserRouter>
  );
};

export default App;
