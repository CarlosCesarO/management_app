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
import Message from "./Message";
import getInitials from "@/utils/getInitials";
import { useFirestore } from "@/hooks/useFirestore";
import { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
};

export default function Chat({
  selectedChat,
  chats,
  setSelectedChat,
  setChatIsOpen,
  users,
}) {
  const { user } = useAuthContext();
  const { addSubDocument: createMessage } = useFirestore("chats");
  const [messageContent, setMessageContent] = useState("");

  const chat = chats.find((chat) => {
    return chat.id === selectedChat?.id;
  });

  const { documents: messages } = useSubcollection(
    "chats",
    chat?.id,
    "messages",
    null,
    ["createdAt", "asc"]
  );

  const sendMessage = async () => {
    if (messageContent == "") return;
    await createMessage(chat?.id, "messages", {
      author: user.uid,
      createdAt: new Date(),
      content: messageContent,
    });

    setMessageContent("");
  };

  const closeChat = () => {
    setChatIsOpen(false);
    setSelectedChat(null);
  };

  return (
    <div className="fixed bottom-32 right-[248px] h-[500px] bg-input w-96 rounded-lg p-5 drop-shadow-2xl border border-foreground/10">
      <div className="flex flex-col h-full">
        <Button
          variant="ghost"
          className="absolute top-2 right-2"
          onClick={closeChat}
        >
          <Cross1Icon />
        </Button>
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
            ? messages?.map((message) => <Message message={message} />) || (
                <p className="text-foreground/50 text-sm">
                  Não há mensagens para exibir.
                </p>
              )
            : chats?.map((chat) => (
                <div key={chat.id}>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/50">
                      {getInitials(
                        users.find(
                          (u) =>
                            chat.participants.includes(u.id) &&
                            u.id !== user.uid
                        ).name
                      )}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )) || (
                <p className="text-foreground/50 text-sm">
                  Não há conversas para exibir.
                </p>
              )}
        </ScrollArea>
        <div className="flex gap-2.5">
          <Input
            value={messageContent}
            type="text"
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <Button onClick={sendMessage}>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
