import LabelSvg from "@/components/Label";
import { useUsersContext } from "@/hooks/useUsersContext";
import { Badge } from "@/shadcn/components/ui/badge";
import getInitials from "@/utils/getInitials";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import calculateDateUntilDue from "@/utils/daysUntilDue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { useFirestore } from "@/hooks/useFirestore";
import { useUserContext } from "@/hooks/useUserContext";
import { arrayRemove } from "firebase/firestore";

export default function Task({ task, index, columnId }) {
  const { users } = useUsersContext();
  const { userDoc } = useUserContext();
  const { deleteSubDocument: deleteTask, updateDocument: updateTeam } =
    useFirestore("teams");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "#f7d372";
      case "medium":
        return "orange";
      case "high":
        return "#ff0000";
      case "stadby":
        return "#5abb54";
      default:
        return "grey";
    }
  };

  const removeTask = async (taskId) => {
    await deleteTask(userDoc.teamId, "tasks", taskId);
    await updateTeam(userDoc.teamId, {
      [columnId]: arrayRemove(taskId),
    });
  };

  if (!task) return null;

  const assignedMembers = users.filter((u) =>
    task.assignedMembers.includes(u.id)
  );

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`fake-container p-5 border border-border mb-2 rounded-lg bg-background shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold"> {task.title}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsHorizontalIcon className="h-6 w-6" role="button" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => removeTask(task.id)}>
                    Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex mt-1 gap-1 flex-wrap">
              {task.tags.map((tag) => (
                <Badge
                  className="bg-muted-foreground font-light text-[11px] rounded-md "
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className=" flex">
                {assignedMembers.map((member) => (
                  <div
                    className="-ml-2 bg-foreground text-secondary rounded-full flex justify-center items-center w-8 h-8"
                    key={member.id}
                  >
                    {member.photoURL ? (
                      <img
                        src={member.photoURL}
                        alt={member.name}
                        className="rounded-full"
                      />
                    ) : (
                      <span>{getInitials(member.name)}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2.5">
                <LabelSvg color={getPriorityColor(task.priority)} />
                <p className="text-muted-foreground text-sm">
                  {calculateDateUntilDue(task.dueDate.seconds) < 0 ? (
                    `${Math.abs(
                      calculateDateUntilDue(task.dueDate.seconds)
                    )} dias atrasados`
                  ) : calculateDateUntilDue(task.dueDate.seconds) === 0 ? (
                    <span>Entrega hoje</span>
                  ) : (
                    `Faltam ${calculateDateUntilDue(task.dueDate.seconds)} dias`
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
