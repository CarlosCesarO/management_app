import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`fake-container p-5 border border-border mb-2 rounded-lg bg-background ${
              snapshot.isDragging && "bg-primary"
            }`}
          >
            {task.content}
          </div>
        );
      }}
    </Draggable>
  );
}