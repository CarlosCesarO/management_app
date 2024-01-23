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
import { useAuthContext } from "@/hooks/useAuthContext";
import { useSubcollection } from "@/hooks/useSubcollection";

export default function Chat({ selectedChat, chats }) {
  const { user } = useAuthContext();

  const chat = chats.find((chat) => {
    return chat.id === selectedChat?.id;
  });

  const { documents: messages } = useSubcollection(
    "chats",
    chat?.id,
    "messages"
  );

  const getInitials = (str) => {
    if (!str) {
      str = user.displayName;
    }
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const getMessagePosition = (author) => {
    if (author === user.uid) {
      return "text-right";
    } else {
      return "text-left";
    }
  };

  return (
    <div className="fixed bottom-32 right-[248px] h-[500px] bg-input w-96 rounded-lg p-5 drop-shadow-2xl border border-foreground/10">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3">
          {selectedChat && (
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/50">
                {getInitials(selectedChat?.recipient)}
              </AvatarFallback>
            </Avatar>
          )}
          <p className="font-medium">
            {selectedChat?.recipient || "Conversas"}
          </p>
        </div>
        <Separator className="bg-foreground/10 my-4" />
        <ScrollArea className="flex-grow">
          {selectedChat
            ? messages?.map((message) => (
                <div
                  key={message.id}
                  className={`${getMessagePosition(message.author)}`}
                >
                  {message.content}
                </div>
              )) || (
                <p className="text-foreground/50 text-sm">
                  Não há mensagens para exibir.
                </p>
              )
            : chats?.map((chat) => <div key={chat.id}>TODO</div>) || (
                <p className="text-foreground/50 text-sm">
                  Não há conversas para exibir.
                </p>
              )}
        </ScrollArea>
        <div className="flex gap-2.5">
          <Input type="text" className="" />
          <Button>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
