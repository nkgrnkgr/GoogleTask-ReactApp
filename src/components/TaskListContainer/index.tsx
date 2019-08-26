import React, { FC } from 'react';
import { Form, Divider } from 'semantic-ui-react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Task } from '../../services/googleTasks/models';
import Loading from '../Loader/index';
import TaskComponent from '../Task/index';
import AddTaskButton from '../../comtainers/AddTaskButton';

export interface TaskListContainerProps {
  taskList: Task[];
  isLoading: boolean;
  handleOnChange: (task: Task) => void;
  handleDelete: (task: Task) => void;
  handleReorder: (sourceIndex: number, destinationIndex: number) => void;
}

const TaskListContainer: FC<TaskListContainerProps> = ({
  taskList,
  isLoading = false,
  handleOnChange,
  handleDelete,
  handleReorder,
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
    </Form>
  );
};

export default TaskListContainer;
