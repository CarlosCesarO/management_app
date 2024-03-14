import React from "react";
import Logo from "./Logo";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

export default function Topbar() {
  return (
    <div className="fixed w-full bg-muted border border-border h-12 flex justify-between items-center px-6">
      <HamburgerMenuIcon className="invisible h-6 w-6" />
      <Logo justify="justify-center" />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HamburgerMenuIcon className="h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Minha Conta </DropdownMenuLabel>
          <DropdownMenuItem>Atividade</DropdownMenuItem>
          <DropdownMenuItem>Meu perfil</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
          <DropdownMenuItem>Tarefas</DropdownMenuItem>
          <DropdownMenuItem>Conversas</DropdownMenuItem>
          <DropdownMenuItem>Calendário</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
