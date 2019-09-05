import React from 'react';
import { Divider } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router';
import AuthContainer from '../../containers/Auth/index';
import HtmlTitle from '../HtmlTitle';
import TaskListSelection from '../../containers/TaskListSelection';
import TaskListContainer from '../../containers/TaskListContainer';
import Header from '../../containers/Header/index';

interface SignInPageProps {
  isSignedIn: boolean;
}

type ReactRouterProps = RouteComponentProps;

type EnhancedProps = SignInPageProps & ReactRouterProps;

const SignInPage: React.FC<EnhancedProps> = props => {
  return (
    <AuthContainer {...props}>
      <HtmlTitle title="Tasks" />
      <Header />
      <Divider hidden />
      <TaskListSelection {...props} />
      <Divider hidden />
      <TaskListContainer />
    </AuthContainer>
  );
};

export default SignInPage;
