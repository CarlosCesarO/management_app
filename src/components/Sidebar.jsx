import { ModeToggle } from "@/shadcn/components/mode-toggle";
import { Button } from "@/shadcn/components/ui/button";
import { ExitIcon, LightningBoltIcon, PersonIcon } from "@radix-ui/react-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/useLogout";
import Logo from "./logo";
import { Separator } from "@/shadcn/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@shadcn/components/ui/avatar";
import { useAuthContext } from "@/hooks/useAuthContext";

const userOptions = [
  {
    route: "/activity",
    name: "Atividade",
    icon: <LightningBoltIcon className="h-4 w-4" />,
  },
  {
    route: "/profile",
    name: "Meu perfil",
    icon: <PersonIcon className="h-4 w-4" />,
  },
];

const projectOptions = [
  { route: "/", name: "Dashboard" },
  { route: "/projects", name: "Meus projetos" },
  { route: "/chats", name: "Conversas" },
  { route: "/calendar", name: "Calendrio" },
];

const labelOptions = [
  { route: "/", name: "Alta prioridade" },
  { route: "/", name: "Média prioridade" },
  { route: "/", name: "Baixa prioridade" },
  { route: "/", name: "Em Standby" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, error, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="h-screen w-[250px] bg-secondary">
      <div className="p-5">
        <Logo size="sm" />
      </div>
      <div className="flex  gap-3 p-5">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/50">CC</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user.displayName}</p>
          <p className="text-muted-foreground/75 text-sm">Premium account</p>
        </div>
      </div>

      {userOptions.map((option) => (
        <div
          key={option.route}
          role="button"
          className="px-5 py-1.5 flex items-center gap-2"
          onClick={() => navigate(option.route)}
        >
          {option.icon}
          <p className="text-md font-medium">{option.name}</p>
        </div>
      ))}
      <Separator className="my-4" />
      <ModeToggle />
      <Button variant="outline" onClick={logout}>
        <ExitIcon className="w-4 h-4 mr-2" />
        Sair da Conta
      </Button>
    </div>
  );
}
