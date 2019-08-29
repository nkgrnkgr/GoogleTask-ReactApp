import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Divider } from 'semantic-ui-react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import TaskListSelection from './containers/TaskListSelection/index';
import TaskListContainer from './containers/TaskListContainer/index';
import GoogleApiConfig from './GoogleApiConfig';
import SignInPage from './components/SignInPage/index';

const App: React.FC = () => {
  // const [isSignedIn, setSignedIn] = useState(false);

  const initClient = () => {
    gapi.client.init({
      apiKey: GoogleApiConfig.API_KEY,
      clientId: GoogleApiConfig.CLIENT_ID,
      discoveryDocs: GoogleApiConfig.DISCOVERY_DOCS,
      scope: GoogleApiConfig.SCOPES,
    });
  };

  // const handleClick = () => {
  //   gapi.auth2.getAuthInstance().signIn();
  // };

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  // useEffect(() => {
  //   if (gapi.auth2) {
  //     gapi.auth2.getAuthInstance().isSignedIn.listen(() => {
  //       setSignedIn(true);
  //     });
  //   }
  // });

  return (
    <BrowserRouter>
      <Route exact path="/" component={SignInPage} />
      <Route
        exact
        path="/tasks"
        render={props => (
          <div className="App">
            <header className="App-header">
              <TaskListSelection />
              <Divider />
              <TaskListContainer />
            </header>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default App;
