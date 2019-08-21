import React, { FC } from 'react';
import { Input, Icon, Button } from 'semantic-ui-react';
import { Task } from '../../services/googleTasks/models';

export interface TaskProps {
  task: Task;
  handleOnChange: (task: Task) => void;
}

const TaskComponent: FC<TaskProps> = ({ task, handleOnChange }) => {
  const { title = '', status = 'needsAction' } = task;

  const handleOnChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const t = { ...task, title: e.currentTarget.value };
    handleOnChange(t);
  };

  const handleOnChangeStatus = () => {
    const h = {
      ...task,
      status: task.status === 'completed' ? 'needsAction' : 'completed',
    };
    handleOnChange(h);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Button
        icon
        basic
        style={{ boxShadow: '0px 0px' }}
        onClick={() => handleOnChangeStatus()}
      >
        <Icon
          name={status === 'completed' ? 'check' : 'circle outline'}
          color="blue"
        />
      </Button>
      <Input
        transparent
        onChange={handleOnChangeInput}
        defaultValue={title || ''}
      />
    </div>
  );
};

export default TaskComponent;
