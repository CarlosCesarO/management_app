import { Button } from "@/shadcn/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import { ChevronDown, FilterIcon } from "lucide-react";
import React from "react";
import KanbanBoard from "./KanbanBoard";

const getColumnName = (id) => {
  switch (id) {
    case "column-1":
      return "backlog";
    case "column-2":
      return "todo";
    case "column-3":
      return "in_progress";
    case "column-4":
      return "in_review";
    default:
      return "backlog";
  }
};

export default function Tasks() {
  const [showNewTaksDialog, setShowNewTaksDialog] = useState(false);
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold">Tarefas do Time</h1>
        <div className="flex items-center gap-5 ">
          <div className="flex items-center gap-2.5 border border-border p y-2.5 px-5 rounded-lg">
            <MagnifyingGlassIcon className="h-6 w-6 text-muted-foreground  " />
            <input className="focus: outline-none " placeholder="Pesquisar " />
          </div>
          <Button
            size="lg"
            className="text-lg"
            onClick={() => {
              localStorage.setItem("selectedColumn", getColumnName());
              setShowNewTaksDialog(true);
            }}
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Nova Tarefa
          </Button>
        </div>
      </div>
      <div className="flex">
        <Popover>
          <PopoverTrigger>
            <div
              className="flex items-center gap-2 text-muted-foreground"
              role="button"
            >
              <FilterIcon className="w-4  h-4" />
              <p>Filtrar</p>
              <ChevronDown className="w-5 h-5" />
            </div>
          </PopoverTrigger>
          <PopoverContent>Filtros.</PopoverContent>
        </Popover>
      </div>
      <KanbanBoard
        showNewTaksDialog={showNewTaksDialog}
        setShowNewTaksDialog={setShowNewTaksDialog}
      />
    </div>
  );
}
