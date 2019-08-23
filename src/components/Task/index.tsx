import React, { FC } from 'react';
import { Input, Icon, Button, Divider } from 'semantic-ui-react';
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { Task } from '../../services/googleTasks/models';

export interface TaskProps {
  task: Task;
  index: number;
  handleOnChange: (task: Task) => void;
  handleDelete: (task: Task) => void;
}

const TaskComponent: FC<TaskProps> = ({
  task,
  index,
  handleOnChange,
  handleDelete,
}) => {
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

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
  ) => ({
    background: isDragging ? 'lightgreen' : '#FFFFFF',
    ...draggableStyle,
  });

  return (
    <Draggable key={task.id} draggableId={task.id || ''} index={index}>
      {(provided2, snapshot2) => (
        <div
          ref={provided2.innerRef}
          {...provided2.draggableProps}
          {...provided2.dragHandleProps}
          style={getItemStyle(
            snapshot2.isDragging,
            provided2.draggableProps.style,
          )}
        >
          <div style={{ display: 'flex' }}>
            <Button icon basic style={{ boxShadow: '0px 0px' }} disabled>
              <Icon name="sort" color="blue" />
            </Button>
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
            <Button
              icon
              basic
              style={{ boxShadow: '0px 0px' }}
              onClick={() => handleDelete(task)}
            >
              <Icon name="delete" color="red" />
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskComponent;
