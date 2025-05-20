"use client";

import Link from "next/link";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Timeline } from "primereact/timeline";

const cardStyle =
  "!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm";

/* cor de destaque */
const accent = "text-[#22d3ee]";
const accentBg = "bg-[#22d3ee]";

export default function AboutPage() {
  const milestones = [
    {
      date: "2024-09",
      title: "Ideia inicial",
      text: "Prototipagem do detector de violência em Python + YOLOv5.",
    },
    {
      date: "2025-01",
      title: "Migração para YOLOv8",
      text: "Ganho de 18 % na precisão e redução de latência.",
    },
    {
      date: "2025-03",
      title: "FastAPI + DirectML",
      text: "Backend curva-amigável com suporte a GPUs AMD.",
    },
    {
      date: "2025-05",
      title: "Dashboard Next.js",
      text: "Frontend React responsivo, stream ao vivo e alertas em tempo real.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Sobre o&nbsp;<span className={accent}>Skynet&nbsp;Vision</span>
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-gray-300 mb-10">
          Uma solução completa de <strong>videomonitoramento inteligente</strong>{' '}
          que une inferência de borda otimizada, backend FastAPI escalável e
          interface React moderna.
        </p>
        <Link href="/dashboard">
          <Button
            label="Ver Dashboard"
            icon="pi pi-chart-bar"
            className={`${accentBg} border-none`}
          />
        </Link>
      </section>

      {/* MISSÃO & VISÃO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Card title="Nossa Missão" className={cardStyle}>
          <p className="text-gray-300 leading-relaxed">
            Democratizar a detecção de comportamentos violentos,
            oferecendo&nbsp;uma ferramenta <span className={accent}>rápida</span>,{' '}
            <span className={accent}>acessível</span> e{' '}
            <span className={accent}>configurável</span>&nbsp;para escolas,
            lojas e espaços públicos.
          </p>
        </Card>
        <Card title="Nossa Visão" className={cardStyle}>
          <p className="text-gray-300 leading-relaxed">
            Ser referência em <strong>segurança preditiva</strong>, integrando
            análise de vídeo com IA, IoT e automação de respostas em um único
            ecossistema.
          </p>
        </Card>
      </section>

      {/* MARCOS DO PROJETO */}
      <section className="p-6">
        <Card title="Linha do Tempo" className={cardStyle}>
          <Timeline
            value={milestones}
            align="alternate"
            opposite={(item) => (
              <small className="text-gray-400">{item.date}</small>
            )}
            content={(item) => (
              <div>
                <h4 className={`${accent} font-semibold mb-1`}>
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm">{item.text}</p>
              </div>
            )}
            marker={() => (
              <span className={`pi pi-circle-fill ${accent} text-xs`} />
            )}
          />
        </Card>
      </section>

      {/* STACK TECNOLÓGICO */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {[
          ["pi-camera", "YOLOv8", "Inferência em FP16 (< 30 ms)"],
          ["pi-server", "FastAPI", "API assíncrona • CORS • Streaming MJPEG"],
          ["pi-desktop", "Next.js 14", "App Router • ISR • Tailwind"],
        ].map(([icon, title, text]) => (
          <Card
            key={title as string}
            className={cardStyle}
            header={
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10">
                <i className={`pi ${icon} text-3xl ${accent}`} />
              </div>
            }
            title={title as string}
          >
            <p className="m-0 text-gray-300">{text as string}</p>
          </Card>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-8">
        © {new Date().getFullYear()} Skynet Vision — onde IA encontra segurança.
      </footer>
    </div>
  );
}
