import React from "react";
import { useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

const initialData = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "Backlog",
      taskIds: [],
    },
    "column-2": { id: "column-2", title: "To Do", taskIds: [] },
    "column-3": { id: "column-3", title: "Doing", taskIds: [] },
    "column-4": { id: "column-4", title: "Done", taskIds: [] },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export default function KanbanBoard() {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (destination.droppableId === source.droppableId) {
      const column = state.columns[source.droppableId];
      const newTasksIds = Array.from(column.taskIds);
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...column, taskIds: newTasksIds };

      const newState = {
        ...state,
        columns: { ...state.columns, [newColumn.id]: newColumn },
      };

      setState(newState);
    } else {
      const newStartTaskIds = Array.from(start.taskIds);
      newStartTaskIds.splice(source.index, 1);

      const newStart = { ...start, taskIds: newStartTaskIds };

      const newFinishTaskIds = Array.from(finish.taskIds);
      newFinishTaskIds.splice(destination.index, 0, draggableId);

      const newFinish = { ...finish, taskIds: newFinishTaskIds };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };

      setState(newState);
    }
  };

  return (
    <div className="mt-10 flex gap-5">
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return (
            <Column
              state={state}
              setState={setState}
              key={column.id}
              column={column}
              tasks={tasks}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
}
