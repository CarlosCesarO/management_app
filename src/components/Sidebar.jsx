import { ModeToggle } from "@/shadcn/components/mode-toggle";
import { Button } from "@/shadcn/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/useLogout";
const options = [
  { route: "/", name: "Página Inicial" },
  { route: "/projects", name: "Meus projetos" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, error, isPending } = useLogout();

  return (
    <div className="h-screen w-[200px] bg-red-500">
      <div className="text-xl font-bold p-5">LOGO</div>
      {options.map((option) => (
        <div
          key={option.route}
          role="button"
          className="p-5"
          onClick={() => navigate(option.route)}
        >
          {option.name}
        </div>
      ))}
      <ModeToggle />
      <Button variant="outline" onClick={logout}>
        <ExitIcon className="w-4 h-4 mr-2" />
        Sair da Conta
      </Button>
    </div>
  );
}
