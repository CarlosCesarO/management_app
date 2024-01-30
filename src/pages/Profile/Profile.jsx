import React, { useRef } from "react";
import { ModeToggle } from "@/shadcn/components/mode-toggle";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shadcn/components/ui/avatar";
import getInitials from "@/utils/getInitials";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Profile() {
  const { user } = useAuthContext();

  const inputRef = useRef();
  const openFileSelector = () => input.current.click();

  return (
    <div className="p-5">
      <h1 className="font-semibold text-2xl mb-10">Meu Perfil</h1>
      <div className="mb-10">
        <Avatar className="h-16 w-16" role="button" onClick={openFileSelector}>
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/50 text-xl">
            {getInitials(user.displayName)}
          </AvatarFallback>
        </Avatar>
        <input ref={inputRef} type="file" className="hidden" />
      </div>
      <ModeToggle />
    </div>
  );
}
