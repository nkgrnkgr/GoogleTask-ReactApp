import React, { FC, MouseEvent } from 'react';
import { Button, Icon } from 'semantic-ui-react';

interface ClearTaskButtonProps {
  handleOnClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ClearTaskButton: FC<ClearTaskButtonProps> = ({ handleOnClick }) => (
  <Button icon secondary labelPosition="left" onClick={handleOnClick}>
    <Icon name="trash alternate" />
    Clear Compoleted
  </Button>
);

export default ClearTaskButton;
