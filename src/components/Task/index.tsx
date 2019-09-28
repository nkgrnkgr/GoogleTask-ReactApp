import React, { FC } from 'react';
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import {
  IconButton,
  Icon,
  Input,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { Task } from '../../services/googleTasks/models';

export interface TaskProps {
  task: Task;
  index: number;
  handleOnChange: (task: Task) => void;
  handleDelete: (task: Task) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    iconButton: {
      margin: theme.spacing(1),
    },
    input: {
      margin: theme.spacing(1),
      color: '#fff',
      background: '#1b1c1d',
      '&:focus': {
        border: 'none',
      },
    },
  }),
);

const TaskComponent: FC<TaskProps> = ({
  task,
  index,
  handleOnChange,
  handleDelete,
}) => {
  const classes = useStyles();

  const { title = '', status = 'needsAction' } = task;

  const handleOnChangeInput = (value: string) => {
    const t = { ...task, title: value };
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
    background: isDragging ? 'lightgreen' : '#1b1c1d',
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
          <div className={classes.root}>
            <IconButton className={classes.iconButton} disabled>
              <Icon className="fas fa-grip-lines-vertical" />
            </IconButton>
            <IconButton
              aria-label="check"
              className={classes.iconButton}
              onClick={() => handleOnChangeStatus()}
            >
              <Icon
                color={status === 'completed' ? 'secondary' : 'inherit'}
                className={
                  status === 'completed'
                    ? 'far fa-check-circle'
                    : 'far fa-circle'
                }
              />
            </IconButton>
            <Input
              defaultValue={title || ''}
              className={classes.input}
              onChange={e => handleOnChangeInput(e.target.value)}
              inputProps={{
                'aria-label': 'description',
              }}
            />
            <IconButton
              aria-label="delete"
              className={classes.iconButton}
              onClick={() => handleDelete(task)}
            >
              <Icon className="fas fa-times" color="error" />
            </IconButton>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskComponent;
