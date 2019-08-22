import React, { FC, useState } from 'react';
import { Form, Divider } from 'semantic-ui-react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
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
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250,
  });

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
  ) => ({
    padding: 16,
    margin: `0 0 8px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
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
                    <Draggable
                      key={task.id}
                      draggableId={task.id || ''}
                      index={index}
                    >
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
                          <TaskComponent
                            task={task}
                            handleOnChange={handleOnChange}
                            handleDelete={handleDelete}
                          />
                        </div>
                      )}
                    </Draggable>
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
