"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Timeline } from "primereact/timeline";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Tag } from "primereact/tag";

const cardStyle =
  "!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm";

/* ---------- Types ---------- */
type Stats = { totalAlerts: number; totalClips: number };

/* ---------- Component ---------- */
export default function HomePage() {
  /* Pequena chamada de exemplo para números-chave */
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("http://localhost:8001/stats")
      .then((r) => r.ok && r.json())
      .then(setStats)
      .catch(() => null); // silencioso
  }, []);

  const flow = [
    "Captura de vídeo ao vivo via câmera IP ou arquivo.",
    "YOLOv8 otimizado identifica violência em tempo real.",
    "Algoritmo de severidade classifica o risco (MILD ou HIGH).",
    "Alerta enviado para Telegram + chamada de emergência (HIGH).",
    "Clipes MP4 salvos para auditoria e análise posterior.",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative w-full h-[75vh] overflow-hidden">
        {/* Vídeo de fundo (opcional) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          src="/bg.mp4"
        />
        {/* Fallback imagem */}
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-30" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Skynet&nbsp;<span className="text-green-400">Vision</span>
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-gray-300 mb-10">
            Detecção de violência <strong>em tempo real</strong> com YOLOv8 +
            FastAPI. Respostas instantâneas, ambientes mais seguros.
          </p>

          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button label="Dashboard" icon="pi pi-chart-bar" />
            </Link>
            <Link href="/video">
              <Button
                label="Stream ao vivo"
                icon="pi pi-video"
                severity="secondary"
                outlined
              />
            </Link>
          </div>
        </div>
      </section>

      {/* NÚMEROS-CHAVE */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <Card className={cardStyle}>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-400">
              {stats?.totalAlerts ?? "--"}
            </p>
            <p className="uppercase tracking-wide text-gray-300 mt-1">
              Alertas enviados
            </p>
          </div>
        </Card>
        <Card className={cardStyle}>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-400">
              {stats?.totalClips ?? "--"}
            </p>
            <p className="uppercase tracking-wide text-gray-300 mt-1">
              Clipes salvos
            </p>
          </div>
        </Card>
        <Card className={cardStyle}>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-400">30 ms</p>
            <p className="uppercase tracking-wide text-gray-300 mt-1">
              Latência média
            </p>
          </div>
        </Card>
        <Card className={cardStyle}>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-400">99 %</p>
            <p className="uppercase tracking-wide text-gray-300 mt-1">
              Precisão modelo
            </p>
          </div>
        </Card>
      </section>

      {/* BENEFÍCIOS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <Card
          header={<i className="pi pi-bolt text-3xl text-green-400" />}
          title="Inferência Instantânea"
          className={cardStyle}
        >
          <p className="m-0 text-gray-300">
            Pipeline <code>float16 + fuse</code> garante <b>&lt; 30&nbsp;ms</b>{" "}
            por frame em GPUs de mercado.
          </p>
        </Card>

        <Card
          header={<i className="pi pi-shield text-3xl text-green-400" />}
          title="Alertas Inteligentes"
          className={cardStyle}
        >
          <p className="m-0 text-gray-300">
            Frequência + confiança modulam a severidade, reduzindo falsos
            positivos.
          </p>
        </Card>

        <Card
          header={<i className="pi pi-send text-3xl text-green-400" />}
          title="Integrações Prontas"
          className={cardStyle}
        >
          <p className="m-0 text-gray-300">
            Webhooks REST, Telegram e chamadas automáticas em poucos cliques.
          </p>
        </Card>

        <Card
          header={<i className="pi pi-cog text-3xl text-green-400" />}
          title="Configuração Flexível"
          className={cardStyle}
        >
          <p className="m-0 text-gray-300">
            Ajuste tempo de buffer, limiar de confiança e destinos de alerta via
            painel.
          </p>
        </Card>
      </section>

      {/* FLUXO DE TRABALHO */}
      <section className="p-6">
        <Card title="Como Funciona" className={cardStyle}>
          <Timeline
            value={flow}
            align="alternate"
            content={({ item }) => <p>{item}</p>}
            marker={() => (
              <span className="pi pi-circle-fill text-green-400 text-xs" />
            )}
          />
        </Card>
      </section>

      {/* FAQ */}
      <section className="p-6">
        <Card title="Perguntas Frequentes" className={cardStyle}>
          <Accordion multiple>
            <AccordionTab header="Quais GPUs são suportadas?">
              <p className="m-0 text-gray-300">
                Qualquer GPU NVIDIA ou AMD com suporte a FP16. Em CPUs o sistema
                funciona, porém com latência maior.
              </p>
            </AccordionTab>
            <AccordionTab header="Posso treinar meu próprio modelo?">
              <p className="m-0 text-gray-300">
                Sim — basta substituir o arquivo <code>model1.pt</code> pela sua
                versão e ajustar as classes de interesse.
              </p>
            </AccordionTab>
            <AccordionTab header="Como recebo alertas em outro app?">
              <p className="m-0 text-gray-300">
                Use o endpoint <code>/webhook</code> ou integre direto no
                Telegram bot configurado. Exemplos disponíveis no README.
              </p>
            </AccordionTab>
          </Accordion>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 py-10 px-6">
        <span>
          © {new Date().getFullYear()} Skynet Vision · Feito com FastAPI &
          Next.js
        </span>

        <div className="flex gap-4 text-xl">
          <Link href="https://github.com/yourrepo" target="_blank">
            <i className="pi pi-github hover:text-white transition-colors" />
          </Link>
          <Link href="https://twitter.com/yourhandle" target="_blank">
            <i className="pi pi-twitter hover:text-white transition-colors" />
          </Link>
          <Link href="mailto:contact@skynet.ai">
            <i className="pi pi-envelope hover:text-white transition-colors" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
