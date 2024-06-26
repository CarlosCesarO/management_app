import React, { useState } from "react";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Link } from "react-router-dom";
import { useSignup } from "@/hooks/useSignup";
import { ReloadIcon } from "@radix-ui/react-icons";
import Logo from "@/components/logo";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, fullName);
  };
  return (
    <div className="flex gap-20 h-screen w-full py-20 px-40">
      <div className="w-1/2 bg-muted rounded-lg p-12">
        <Logo />
        <h2 className="mt-24 text-3xl leading-[50px] font-semibold">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <p className="mt-10 text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quia
          tempore mollitia labore rem necessitatibus ullam enim ea deserunt!
          Dolores labore nam voluptas alias repellendus nihil maxime distinctio
          veritatis sed?
        </p>
        <div className="bg-foreground text-background p-8 rounded-xl mt-16 leading-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat,
          illo. At aperiam earum sed optio aspernatur. Commodi natus, nemo
          veritatis voluptatum quos enim deleniti temporibus nam. Aliquam, iure.
          Ratione, fugiat!
        </div>
      </div>
      <div className="flex flex-col justify-center w-1/2 px-20">
        <div>
          <h1 className="text-3xl font-medium">Cadastre-se agora</h1>
          <p className="mt-4 text-muted-foreground font-normal text-lg">
            Crie sua conta agora mesmo
          </p>
          <form className="mt-10" onSubmit={handleSubmit}>
            <p className="text-muted-foreground mb-2.5">Nome Completo</p>
            <Input
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <p className="mt-5 text-muted-foreground mb-2.5">E-mail</p>
            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="mt-5 text-muted-foreground mb-2.5">Senha</p>
            <Input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              disabled={isPending}
              size="xl"
              className="mt-10 text-lg w-full"
            >
              {isPending && (
                <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />
              )}
              {isPending ? "Criando a conta..." : "Criando minha conta"}
            </Button>
          </form>
          <div className="flex justify-center gap-2 text-lg mt-12">
            <p>Já tem uma conta?</p>
            <Link to="/login" className="text-primary">
              Entre agora.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
