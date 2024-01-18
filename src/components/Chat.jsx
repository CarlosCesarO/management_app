import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import React from "react";

export default function Chat() {
  return (
    <div className="fixed bottom-12 right-[248px] h-96 bg-input w-72">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback className="bg-primary/50">CC</AvatarFallback>
      </Avatar>
    </div>
  );
}
