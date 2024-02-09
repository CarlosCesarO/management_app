import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "@/shadcn/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Column({ column, tasks, state, setState }) {
  const addTask = async () => {
    const content = prompt("Qual o conteúdo da tarefa?");
    if (!content) return;

    const newTask = { id: Math.random().toString(36).substr(2, 9), content };

    const newTasks = [...tasks, newTask];

    const newState = {
      ...state,
      tasks: { ...state.tasks, [newTask.id]: newTask },
      columns: {
        ...state.columns,
        [column.id]: {
          ...state.columns[column.id],
          taskIds: newTasks.map((task) => task.id),
        },
      },
    };

    setState(newState);
  };
  return (
    <div className="fake-container w-1/4 bg-secondary/50 p-5 border border-border rounded-xl flex flex-col justify-between">
      <h3 className="font-semibold text-xl">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => {
          return (
            <div
              className="mt-5 flex-grow min-h-[250px] flex flex-col"
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
              <Button
                size="xl"
                className="border border-border mb-2 rounded-lg bg-background shadow-sm text-foreground text-md w-full hover:bg-primary/50 "
                onClick={addTask}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Adicionar Tarefa
              </Button>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
