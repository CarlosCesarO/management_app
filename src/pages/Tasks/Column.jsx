import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "@/shadcn/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import NewTaskDialog from "./NewTaskDialog";

export default function Column({ column, tasks, state, setState }) {
  const addTask = async () => {};
  return (
    <div className="fake-container w-1/4 bg-secondary/50 p-5 border border-border rounded-xl flex flex-col ">
      <h3 className="font-semibold text-xl">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => {
          return (
            <div
              className="mt-5 flex-grow min-h-[250px] flex flex-col justify-between"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.length ? (
                tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))
              ) : (
                <div></div>
              )}
              {provided.placeholder}

              <NewTaskDialog>
                <Button
                  size="xl"
                  variant="outline"
                  className=" shadow-sm"
                  onClick={addTask}
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Adicionar Tarefa
                </Button>
              </NewTaskDialog>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
