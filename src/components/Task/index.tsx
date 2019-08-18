import React, { FC, ChangeEvent } from 'react';
import { Input, Icon, Button } from 'semantic-ui-react';

export interface TaskProps {
  label: string;
  handleOnChange: (isChecked: boolean) => void;
  checked: boolean;
}

const Task: FC<TaskProps> = ({
  label = '',
  handleOnChange,
  checked = false,
}) => {
  const handleOnChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Button icon basic style={{ boxShadow: '0px 0px' }}>
        <Icon name={checked ? 'check' : 'circle outline'} color="blue" />
      </Button>
      <Input transparent onChange={handleOnChange2} defaultValue={label} />
    </div>
  );
};

export default Task;
