import React, { useEffect } from 'react';
import './App.css';
import { Divider } from 'semantic-ui-react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import TaskListSelection from './containers/TaskListSelection/index';
import TaskListContainer from './containers/TaskListContainer/index';
import GoogleApiConfig from './GoogleApiConfig';
import SignInPage from './containers/SignInPage/index';
import Auth from './containers/Auth/index';

const App: React.FC = () => {
  const initClient = () => {
    gapi.client.init({
      apiKey: GoogleApiConfig.API_KEY,
      clientId: GoogleApiConfig.CLIENT_ID,
      discoveryDocs: GoogleApiConfig.DISCOVERY_DOCS,
      scope: GoogleApiConfig.SCOPES,
    });
  };

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  return (
    <BrowserRouter>
      <Route exact path="/" component={SignInPage} />
      <Route
        exact
        path="/tasks"
        render={() => (
          <Auth>
            <div className="App">
              <header className="App-header">
                <TaskListSelection />
                <Divider />
                <TaskListContainer />
              </header>
            </div>
          </Auth>
        )}
      />
    </BrowserRouter>
  );
};

export default App;
