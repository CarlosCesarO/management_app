import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

export default function Column({ column, tasks }) {
  return (
    <div className="fake-container bg-secondary p-5 border border-border rounded-xl">
      <h3>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {() => {
          return (
            <div className="task-list">
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
