import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Separator } from "@/shadcn/components/ui/separator";
import React from "react";

export default function Chat() {
  return (
    <div className="fixed bottom-34 right-[248px] h-[500px] bg-input w-96 rounded-md p-5">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/50">CC</AvatarFallback>
          </Avatar>
          <p className="text-medium"> Bruce Wayne</p>
        </div>
        <Separator className="bg-foreground/10 my-4" />
        <div className="flex-grow">Mensagens</div>
        <div className="flex gap-2.5">
          <Input type="text" className="" />
          <Button>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
