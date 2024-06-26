import { Button } from "@/shadcn/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import {
  ChevronDownIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import KanbanBoard from "./KanbanBoard";
import { useUserContext } from "@/hooks/useUserContext";
import { useDocument } from "@/hooks/useDocument";
import { Badge } from "@/shadcn/components/ui/badge";
import { useUsersContext } from "@/hooks/useUsersContext";

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

export default function Tasks({ selectedPriority }) {
  const [showNewTaksDialog, setShowNewTaksDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const { userDoc } = useUserContext();
  const { document: teamDoc } = useDocument("teams", userDoc.teamId);
  const { users } = useUsersContext();

  return (
    <div className="p-5 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold">Tarefas do Time</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 ">
          <div className="flex items-center gap-2.5 border border-border py-2.5 px-5 rounded-lg mt-5 sm:mt-0">
            <MagnifyingGlassIcon className="h-6 w-6 text-muted-foreground  " />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus: outline-none bg-transparent w-full"
              placeholder="Pesquisar "
            />
            <Cross2Icon
              role="button"
              className="text-muted-foreground"
              onClick={() => setSearch("")}
            />
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
      <div className="flex justify-between ">
        <div className="flex gap-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                className="flex items-center gap-2 text-muted-foreground"
                role="button"
              >
                <p>Filtrar por tags</p>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {teamDoc?.tags?.map((tag) => (
                <DropdownMenuItem
                  className={`${tag === selectedTag ? "bg-primary/50" : ""} `}
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedTag && (
            <Badge className={"cursor-default"}>
              {selectedTag}
              <Cross2Icon
                onClick={() => setSelectedTag(null)}
                role="button"
                className="ml-2.5"
              />
            </Badge>
          )}
        </div>
        <div className="flex gap-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                className="flex items-center gap-2 text-muted-foreground"
                role="button"
              >
                <p>Filtrar por membro</p>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Membros</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {users?.map((u) => (
                <DropdownMenuItem
                  className={`${
                    u.id === selectedMember ? "bg-primary/50" : ""
                  } `}
                  key={u.id}
                  onClick={() => setSelectedMember(u.id)}
                >
                  {u.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedMember && (
            <Badge className={"cursor-default"}>
              {users.find((u) => u.id === selectedMember)?.name}
              <Cross2Icon
                onClick={() => setSelectedMember(null)}
                role="button"
                className="ml-2.5"
              />
            </Badge>
          )}
        </div>
      </div>
      <KanbanBoard
        search={search}
        selectedTag={selectedTag}
        selectedMember={selectedMember}
        selectedPriority={selectedPriority}
        showNewTaksDialog={showNewTaksDialog}
        setShowNewTaksDialog={setShowNewTaksDialog}
      />
    </div>
  );
}
