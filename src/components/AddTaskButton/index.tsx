import React, { FC, MouseEvent } from 'react';
import { Button, Icon } from 'semantic-ui-react';

interface AddTaskButtonProps {
  handleOnClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const AddTaskButton: FC<AddTaskButtonProps> = ({ handleOnClick }) => (
  <Button icon primary labelPosition="left" onClick={handleOnClick}>
    <Icon name="plus" />
    Add Task
  </Button>
);

export default AddTaskButton;
