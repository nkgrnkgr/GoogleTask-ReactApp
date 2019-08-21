import React, { FC, SyntheticEvent } from 'react';
import { Dropdown, DropdownItemProps, DropdownProps } from 'semantic-ui-react';
import { TaskList } from '../../services/googleTasks/models';
import Loading from '../Loader/index';

export interface TaskListSelectionProps {
  taskLists: TaskList[];
  isLoading: boolean;
  handleOnChange: (selectedTaskListId: string) => void;
}

const createOptionsFromTaskLists = (taskLists: TaskList[] = []) => {
  const options: DropdownItemProps[] = [];
  if (taskLists.length > 0) {
    taskLists.map(task => {
      options.push({
        key: task.id,
        text: task.title,
        value: task.title,
      });

      return task;
    });
  }

  return options;
};

const findTaskIdFromSelectedValue = (
  value: string,
  taskLists: TaskList[],
): string => {
  const taskList = taskLists.find(list => list.title === value);

  if (taskList) {
    return taskList.id || '';
  }

  return '';
};

// https://react.semantic-ui.com/modules/dropdown/#types-selection
const TaskListSelection: FC<TaskListSelectionProps> = ({
  taskLists,
  isLoading,
  handleOnChange,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  if (taskLists.length === 0) {
    return <div></div>;
  }

  const options = createOptionsFromTaskLists(taskLists);

  const handoleOnChangeTaskList = (data: DropdownProps) => {
    const { value } = data;
    if (value) {
      if (typeof value === 'string') {
        const id = findTaskIdFromSelectedValue(value, taskLists);
        handleOnChange(id);
      }
    }
  };

  return (
    <div style={{ width: '40%' }}>
      <Dropdown
        placeholder="Select TaskList"
        fluid
        selection
        options={options}
        onChange={(event: SyntheticEvent, data: DropdownProps) =>
          handoleOnChangeTaskList(data)
        }
      />
    </div>
  );
};

export default TaskListSelection;
