import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import { Separator } from "@/shadcn/components/ui/separator";
import React from "react";
import { useSubcollection } from "@/hooks/useSubCollection";

export default function Chat(selectedChat) {
  const messages = null;
  console.log(selectedChat);
  return (
    <div className="fixed bottom-34 right-[248px] h-[500px] bg-input w-96 rounded-lg p-5 drop-shadow-2xl border border-foreground/10">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/50">CC</AvatarFallback>
          </Avatar>
          <p className="text-medium">{selectedChat.recipient}</p>
        </div>
        <Separator className="bg-foreground/10 my-4" />
        <ScrollArea className="flex-grow">
          {messages?.map((message) => (
            <div key={message.id}>{message.content}</div>
          ))}
        </ScrollArea>
        <div className="flex gap-2.5">
          <Input type="text" className="" />
          <Button>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
