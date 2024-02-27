import { AvatarFallback, AvatarImage } from "@/shadcn/components/ui/avatar";
import { Badge } from "@/shadcn/components/ui/badge";
import getInitials from "@/utils/getInitials";
import { Avatar } from "@radix-ui/react-avatar";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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
            className={`fake-container p-5 border border-border mb-2 rounded-lg bg-background shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold"> {task.title}</h3>
              <DotsHorizontalIcon className="h-6 w-6" role="button" />
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

            <div className="mt-5 flex">
              {task.assignedMembers.map((member) => (
                <div
                  className="-ml-2.5 bg-primary/50 rounded-full flex justify-center intems-center w-8 h-8"
                  key={member}
                >
                  CC
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
