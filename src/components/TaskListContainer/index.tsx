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
}

const TaskListContainer: FC<TaskListContainerProps> = ({
  taskList,
  isLoading = false,
  handleOnChange,
  handleDelete,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  // const reorder = (tasklist: Task[], startIndex: number, endIndex: number) => {
  //   const result = Array.from(tasklist);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);

  //   return result;
  // };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      console.log('called');
    }
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
              {taskList
                .sort((a, b) => {
                  const { position: positionA = '0' } = a;
                  const { position: positionB = '0' } = b;

                  return parseInt(positionA, 10) - parseInt(positionB, 10);
                })
                .map((task, index) => {
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
