import { Button } from "@/shadcn/components/ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React from "react";

export default function ChatButton({ setChatIsOpen }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-16 bg-primary text-background w-16 fixed bottom-12 right-[224px] rounded-full p-2.5"
      onClick={() => setChatIsOpen((prev) => !prev)}
    >
      <ChatBubbleIcon className="h-8 w-8" />
    </Button>
  );
}
