import { ModeToggle } from "@/shadcn/components/mode-toggle";
import React from "react";
import { useNavigate } from "react-router-dom";

const options = [
  { route: "/", name: "Página Inicial" },
  { route: "/projects", name: "Meus projetos" },
];

export default function Sidebar() {
  const navigate = useNavigate();

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
    </div>
  );
}
