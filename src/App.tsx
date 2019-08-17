import React, { useEffect } from 'react';
import './App.css';
import { Button, Divider } from 'semantic-ui-react';
import ToDoListSelection from './comtainers/ToDoListSelection/index';
import TaskListContainer from './comtainers/TaskListContainer/index';
import GoogleApiConfig from './GoogleApiConfig';

const App: React.FC = () => {
  const initClient = () => {
    gapi.client.init({
      apiKey: GoogleApiConfig.API_KEY,
      clientId: GoogleApiConfig.CLIENT_ID,
      discoveryDocs: GoogleApiConfig.DISCOVERY_DOCS,
      scope: GoogleApiConfig.SCOPES,
    });
  };

  const handleClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Google Tasks Client</p>
        <Button primary onClick={() => handleClick()}>
          SignIn
        </Button>
        <Divider />
        <ToDoListSelection />
        <Divider />
        <TaskListContainer />
      </header>
    </div>
  );
};

export default App;
