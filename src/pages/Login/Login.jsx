import React, { useState } from "react";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Login() {
  const { login, isPending, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div className="flex gap-20 h-screen w-full py-20 px-40">
      <div className="w-1/2 bg-muted rounded-lg p-12">
        <div className="flex items-center gap-3">
          <img className="h-8" src={Logo} alt="logo" />
          <h2 className="text-2xl tracking-widest font-medium mb-0.5">
            get<span className="text-primary">it</span>done.
          </h2>
        </div>
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
          <h1 className="text-3xl font-semibold ">Entre na sua conta</h1>
          <p className="mt-4 text-muted-foreground font-normal text-lg">
            Informe seus dados de acesso
          </p>
          <form className="mt-10" onSubmit={handleLogin}>
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              size="xl"
              className="mt-10 text-lg w-full"
              disabled={isPending}
            >
              {isPending && (
                <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />
              )}
              Entrar na minha conta
            </Button>
          </form>
          <div className="flex justify-center gap-2 text-lg mt-12">
            <p>Não tem uma conta?</p>
            <Link to="/signup" className="text-primary">
              Cadastre-se agora.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
