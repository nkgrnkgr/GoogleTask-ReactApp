import React, { FC } from 'react';
import { Form, FormField } from 'semantic-ui-react';
import { Task } from '../../services/googleTasks/models';
import Loading from '../Loader/index';
import TaskComponent from '../Task/index';

export interface TaskListContainerProps {
  taskList: Task[];
  isLoading: boolean;
}

const TaskListContainer: FC<TaskListContainerProps> = ({
  taskList = [],
  isLoading = false,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Form>
      {taskList.map(task => {
        return (
          <FormField key={task.id}>
            <TaskComponent
              label={task.title || ''}
              handleOnChange={() => {}}
              checked={task.status === 'completed'}
            />
          </FormField>
        );
      })}
    </Form>
  );
};

export default TaskListContainer;
