import React, { FC, MouseEvent } from 'react';
import { Form, FormField, Divider } from 'semantic-ui-react';
import { Task } from '../../services/googleTasks/models';
import Loading from '../Loader/index';
import TaskComponent from '../Task/index';
import AddTaskButton from '../../comtainers/AddTaskButton';

export interface TaskListContainerProps {
  taskList: Task[];
  isLoading: boolean;
}

const TaskListContainer: FC<TaskListContainerProps> = ({
  taskList,
  isLoading = false,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };

  return (
    <Form>
      <div>
        <AddTaskButton />
      </div>
      <Divider />
      <div>
        {taskList
          .sort((a, b) => {
            const { position: positionA = '0' } = a;
            const { position: positionB = '0' } = b;

            return parseInt(positionA, 10) - parseInt(positionB, 10);
          })
          .map(task => {
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
      </div>
    </Form>
  );
};

export default TaskListContainer;
