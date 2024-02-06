import React from "react";
import { useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Café para o Starbucks" },
    "task-2": { id: "task-2", content: "Terminar o MicroSaas" },
    "task-3": { id: "task-3", content: "Orar por um relacionamento" },
    "task-4": { id: "task-4", content: "Andar de Bike" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Backlog",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

export default function KanbanBoard() {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    // TODO: handle reordering
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}
