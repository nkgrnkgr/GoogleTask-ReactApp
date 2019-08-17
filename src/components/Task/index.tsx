import React, { FC } from 'react';
import { FormCheckbox } from 'semantic-ui-react';

export interface TaskProps {
  label: string;
  handleOnChange: (isChecked: boolean) => void;
  checked: boolean;
}

const Task: FC<TaskProps> = ({
  label = '',
  handleOnChange,
  checked = false,
}) => (
  <FormCheckbox
    label={label}
    onChange={() => handleOnChange(!checked)}
    checked={checked}
  />
);

export default Task;
