import React, { FC } from 'react';
// import { Dropdown, DropdownItemProps, DropdownProps } from 'semantic-ui-react';
import {
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { TaskList } from '../../services/googleTasks/models';
import Loading from '../Loader/index';

export interface TaskListSelectionProps {
  taskLists: TaskList[];
  isLoading: boolean;
  handleOnChange: (selectedTaskListId: string) => void;
  defaultSelectedTaskListId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
    },
  }),
);

const TaskListSelection: FC<TaskListSelectionProps> = ({
  taskLists,
  isLoading,
  handleOnChange,
  defaultSelectedTaskListId,
}) => {
  const classes = useStyles();

  if (isLoading) {
    return <Loading />;
  }

  if (taskLists.length === 0) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      <List component="nav">
        {taskLists.map(task => {
          return (
            <ListItem
              button
              selected={task.id === defaultSelectedTaskListId}
              onClick={() => handleOnChange(task.id || '')}
            >
              <ListItemIcon>
                <Icon className="fas fa-tasks" />
              </ListItemIcon>
              <ListItemText secondary={task.title} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
export default TaskListSelection;
