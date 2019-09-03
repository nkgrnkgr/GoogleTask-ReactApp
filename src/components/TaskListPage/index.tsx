import React from 'react';
import { Divider } from 'semantic-ui-react';
import AuthContainer from '../../containers/Auth/index';
import HtmlTitle from '../HtmlTitle';
import TaskListSelection from '../../containers/TaskListSelection';
import TaskListContainer from '../../containers/TaskListContainer';
import Header from '../../containers/Header/index';

interface Props {
  isSignedIn: boolean;
}

const SignInPage: React.FC<Props> = () => {
  return (
    <AuthContainer>
      <HtmlTitle title="Tasks" />
      <Header />
      <Divider hidden />
      <TaskListSelection />
      <Divider hidden />
      <TaskListContainer />
    </AuthContainer>
  );
};

export default SignInPage;
