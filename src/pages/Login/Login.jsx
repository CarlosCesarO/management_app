import React from "react";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";

export default function Login() {
  return (
    <div className="flex gap-20 h-screen w-full p-5">
      <div className="w-1/2 bg-muted rounded-lg p-5">
        <h2 className="text-3xl font-semibold">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quia
          tempore mollitia labore rem necessitatibus ullam enim ea deserunt!
          Dolores labore nam voluptas alias repellendus nihil maxime distinctio
          veritatis sed?
        </p>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat,
          illo. At aperiam earum sed optio aspernatur. Commodi natus, nemo
          veritatis voluptatum quos enim deleniti temporibus nam. Aliquam, iure.
          Ratione, fugiat!
        </div>
      </div>
      <div className="w-1/2">
        <h1 className="text-2xl font-semibold ">Cadastre-se agora</h1>
        <p className="mt-4 text-muted-foreground font-normal text-lg">
          Crie sua conta agora mesmo
        </p>
        <form className="mt-10">
          <p className="text-muted-foreground mb-2.5">Nome Completo</p>
          <Input />
          <p className="mt-5 text-muted-foreground mb-2.5">E-mail</p>
          <Input />
          <p className="mt-5 text-muted-foreground mb-2.5">Senha</p>
          <Input />
        </form>
      </div>
      <Button className="h-10 p-5">Entrar na minha conta</Button>
    </div>
  );
}
