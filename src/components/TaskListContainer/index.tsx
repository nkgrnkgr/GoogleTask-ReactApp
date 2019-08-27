import React, { FC } from 'react';
import { Form, Divider } from 'semantic-ui-react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Task } from '../../services/googleTasks/models';
import Loading from '../Loader/index';
import TaskComponent from '../Task/index';
import AddTaskButton from '../../containers/AddTaskButton';
import ClearTaskButton from '../ClearTaskButton/index';

export interface TaskListContainerProps {
  taskList: Task[];
  isLoading: boolean;
  handleOnChange: (task: Task) => void;
  handleDelete: (task: Task) => void;
  handleReorder: (sourceIndex: number, destinationIndex: number) => void;
  handleClear: () => void;
}

const TaskListContainer: FC<TaskListContainerProps> = ({
  taskList,
  isLoading = false,
  handleOnChange,
  handleDelete,
  handleReorder,
  handleClear,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    handleReorder(result.source.index, result.destination.index);
  };

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : '#FFFFFF',
  });

  if (taskList.length === 0) {
    return <></>;
  }

  return (
    <Form>
      <div>
        <AddTaskButton />
      </div>
      <Divider />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {taskList.map((task, index) => {
                return (
                  <TaskComponent
                    key={task.id}
                    task={task}
                    index={index}
                    handleOnChange={handleOnChange}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Divider />
      <div>
        <ClearTaskButton handleOnClick={() => handleClear()} />
      </div>
    </Form>
  );
};

export default TaskListContainer;
