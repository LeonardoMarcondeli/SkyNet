"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HomeNavbar from "./components/HomeNavbar";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Timeline } from "primereact/timeline";
import { Accordion, AccordionTab } from "primereact/accordion";

const cardStyle =
  "!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm";

const accent = "text-[#22d3ee]";
const accentBorder = "border-[#22d3ee]";
const accentBg = "bg-[#22d3ee]";

type Stats = { totalAlerts: number; totalClips: number };

export default function HomePage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("http://localhost:8001/stats")
      .then((r) => r.ok && r.json())
      .then(setStats)
      .catch(() => null);
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
      <HomeNavbar />

      <section className="flex flex-col items-center text-center px-6 py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          &nbsp;<span className={accent}>Skynet&nbsp;Vision</span>
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-gray-300 mb-10">
          Uma solução completa de <strong>videomonitoramento inteligente</strong>{' '}
          que une inferência de borda otimizada, backend FastAPI escalável e
          interface React moderna.
        </p>
        <Link href="/login">
          <Button
            label="Ver Dashboard"
            icon="pi pi-chart-bar"
            className={`${accentBg} border-none`}
          />
        </Link>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {[
          { label: "Alertas enviados", value: stats?.totalAlerts ?? "--" },
          { label: "Clipes salvos", value: stats?.totalClips ?? "--" },
          { label: "Latência média", value: "30 ms" },
          { label: "Precisão modelo", value: "99 %" },
        ].map((item) => (
          <Card key={item.label} className={cardStyle}>
            <div className="text-center">
              <p className={`text-4xl font-bold ${accent}`}>{item.value}</p>
              <p className="uppercase tracking-wide text-gray-300 mt-1">
                {item.label}
              </p>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        {[
          ["pi-bolt",  "Inferência Instantânea", "Pipeline float16 + fuse garante < 30&nbsp;ms/frame."],
          ["pi-shield","Alertas Inteligentes",  "Frequência + confiança modulam severidade."],
          ["pi-send",  "Integrações Prontas",   "Webhooks REST, Telegram e chamadas automáticas."],
          ["pi-cog",   "Configuração Flexível", "Ajuste buffer, confiança e destinos via painel."],
        ].map(([icon, title, text]) => (
          <Card
            key={title as string}
            header={
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10">
                <i className={`pi ${icon} text-3xl ${accent}`} />
              </div>
            }
            title={title as string}
            className={cardStyle}
          >
            <p
              className="m-0 text-gray-300"
              dangerouslySetInnerHTML={{ __html: text as string }}
            />
          </Card>
        ))}
      </section>

      <section className="p-6">
        <Card title="Como Funciona" className={cardStyle}>
          <Timeline
            value={[
              {
                title: "1 · Captura",
                text: "Stream da câmera IP ou arquivo local chega ao pipeline.",
                icon: "pi pi-video",
              },
              {
                title: "2 · Inferência",
                text: "YOLOv8 em FP16 realiza detecção de violência em tempo real.",
                icon: "pi pi-cpu",
              },
              {
                title: "3 · Análise",
                text: "Algoritmo somatório decide se o risco é MILD ou HIGH.",
                icon: "pi pi-chart-line",
              },
              {
                title: "4 · Alerta",
                text: "Em HIGH: vídeo + mensagem para Telegram e chamada automática.",
                icon: "pi pi-bell",
              },
              {
                title: "5 · Arquivo",
                text: "Clipes MP4 são salvos em disco para auditoria posterior.",
                icon: "pi pi-save",
              },
            ]}
            align="alternate"
            className="howitworks"
            marker={(item) => (
              <span
                className={`pi pi-circle-fill ${accent} text-xs shadow-md`}
              />
            )}
            content={(item) => (
              <div className="pl-3">
                <h4 className={`${accent} font-semibold mb-1`}>{item.title}</h4>
                <p className="text-gray-300 text-sm">{item.text}</p>
              </div>
            )}
            opposite={(item) => (
              <i className={`pi ${item.icon} ${accent} text-lg`} />
            )}
          />
        </Card>
      </section>

      <section className="p-6">
        <Card title="Perguntas Frequentes" className={cardStyle}>
          <Accordion multiple>
            {[
              [
                "Quais GPUs são suportadas?",
                "Qualquer GPU NVIDIA ou AMD com FP16. CPUs funcionam com maior latência.",
              ],
              [
                "Posso treinar meu próprio modelo?",
                'Sim — substitua <code>model1.pt</code> pelo seu e ajuste as classes.',
              ],
              [
                "Como recebo alertas em outro app?",
                "Use o endpoint <code>/webhook</code> ou integre o bot Telegram.",
              ],
            ].map(([header, body]) => (
              <AccordionTab key={header as string} header={header as string}>
                <p
                  className="m-0 text-gray-300"
                  dangerouslySetInnerHTML={{ __html: body as string }}
                />
              </AccordionTab>
            ))}
          </Accordion>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 py-10 px-6">
        <span>
          © {new Date().getFullYear()} Skynet Vision · Feito com FastAPI & Next.js
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
