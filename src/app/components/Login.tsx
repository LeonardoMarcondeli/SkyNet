"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const cardStyle =
  "!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm";

export default function Login() {
  const router = useRouter();
  const toast = useRef<Toast>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciais inválidas");
      const { access_token } = await res.json();

      localStorage.setItem("token", access_token);

      toast.current?.show({
        severity: "success",
        summary: "Login efetuado",
        detail: "Redirecionando…",
      });

      setTimeout(() => router.push("/dashboard"), 800);
    } catch (err: any) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: err.message ?? "Falha de autenticação",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <Toast ref={toast} position="top-right" />

      <Card className={cardStyle} style={{ width: 400 }}>
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <span className="p-float-label">
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              autoFocus
            />
            <label htmlFor="email">E-mail</label>
          </span>

          <span className="p-float-label">
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <label htmlFor="password">Senha</label>
          </span>

          <Button
            type="submit"
            label={loading ? "Entrando…" : "Entrar"}
            icon="pi pi-sign-in"
            loading={loading}
            disabled={loading || !email || !password}
          />
        </form>
      </Card>
    </div>
  );
}
