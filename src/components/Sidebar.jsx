import { Button } from "@/shadcn/components/ui/button";
import {
  CalendarIcon,
  ChatBubbleIcon,
  DashboardIcon,
  ExitIcon,
  FileTextIcon,
  InfoCircledIcon,
  LightningBoltIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
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
import LabelSvg from "./Label";

const userOptions = [
  {
    route: "/activity",
    name: "Atividade",
    icon: <LightningBoltIcon />,
  },
  {
    route: "/profile",
    name: "Meu perfil",
    icon: <PersonIcon />,
  },
];

const projectOptions = [
  {
    route: "/",
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    route: "/tasks",
    name: "Tarefas",
    icon: <FileTextIcon />,
  },

  {
    route: "/chats",
    name: "Conversas",
    icon: <ChatBubbleIcon />,
  },
  {
    route: "/calendar",
    name: "Calendário",
    icon: <CalendarIcon />,
  },
];

const labelOptions = [
  { route: "/", name: "Alta prioridade", icon: <LabelSvg color="#e04057" /> },
  { route: "/", name: "Média prioridade", icon: <LabelSvg color="#e58d3a" /> },
  { route: "/", name: "Baixa prioridade", icon: <LabelSvg color="#f8d376" /> },
  { route: "/", name: "Em Standby", icon: <LabelSvg color="#5fb756" /> },
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
          className="px-5 py-1.5 flex items-center gap-3"
          onClick={() => navigate(option.route)}
        >
          {option.icon}
          <p className="text-md">{option.name}</p>
        </div>
      ))}

      <Separator className="my-4" />
      <h2 className="font-semibold text-xl px-5 py-5 mb-5"> Projetos</h2>

      {projectOptions.map((option) => (
        <div
          key={option.route}
          role="button"
          className="px-5 py-1.5 flex items-center gap-3"
          onClick={() => navigate(option.route)}
        >
          {option.icon}
          <p className="text-md font-medium">{option.name}</p>
        </div>
      ))}

      <Separator className="my-4" />

      <h2 className="font-semibold text-xl px-5 py-5 mb-5"> Labels</h2>

      {labelOptions.map((option) => (
        <div
          key={option.route}
          role="button"
          className="px-5 py-1.5 flex items-center gap-e"
          onClick={() => navigate(option.route)}
        >
          {option.icon}
          <p className="text-md/90">{option.name}</p>
        </div>
      ))}

      <Separator className="my-4" />

      <div className="px-5">
        <Button
          size="noPadding"
          variant="ghost"
          onClick={logout}
          className="opacity-50"
        >
          <InfoCircledIcon className="w-4 h-4 mr-2" />
          Sair da Conta
        </Button>

        <Button
          size="noPadding"
          variant="ghost"
          onClick={logout}
          className="opacity-50"
        >
          <ExitIcon className="w-4 h-4 mr-2" />
          Sair da Conta
        </Button>
      </div>
    </div>
  );
}
