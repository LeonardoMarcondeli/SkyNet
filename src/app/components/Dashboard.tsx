"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { ProgressBar } from "primereact/progressbar";
import { Timeline } from "primereact/timeline";

type Status = {
  level: string;
  max_confidence: number;
  detections: number;
  last_update: string;
  alert: string;
  logs: string[];
};

export default function VideoStreamPage() {
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("http://localhost:8001/status_view");
        if (!res.ok) throw new Error("API offline");
        const data = await res.json();
        setStatus(data);
        setError(false);
      } catch {
        setError(true);
      }
    };

    fetchStatus();
    const id = setInterval(fetchStatus, 5_000);
    return () => clearInterval(id);
  }, []);

  const severityColor = (level: string) =>
    level === "HIGH" ? "danger" : level === "MILD" ? "warning" : "info";

  const cardStyle =
    "!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">

        <Card title="Live Stream" className={`col-span-1 lg:col-span-2 ${cardStyle}`}>
          {error ? (
            <p className="text-red-400">
              Erro ao conectar com o backend. Verifique se o FastAPI está rodando.
            </p>
          ) : (
            <img
              src="http://localhost:8001/video_feed"
              alt="Stream de Vídeo"
              className="w-full max-w-[640px] h-[480px] mx-auto object-cover border-4 border-green-500 rounded-lg"
            />
          )}
        </Card>

        <div className="space-y-6">

          <Card title="Status de Detecção" className={cardStyle}>
            {status ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Severidade:</span>
                  <Tag value={status.level} severity={severityColor(status.level)} />
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">Confiança Máx.:</span>
                  <span>{status.max_confidence.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">Detecções:</span>
                  <span>{status.detections}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">Última atualização:</span>
                  <span>{status.last_update}</span>
                </div>

                <ProgressBar
                  value={status.max_confidence * 100}
                  showValue={false}
                  className="h-2"
                />
              </div>
            ) : (
              <p>Carregando…</p>
            )}
          </Card>

          <Card title="Alertas" className={cardStyle}>
            {status?.alert ? (
              <p className="text-yellow-400">{status.alert}</p>
            ) : (
              <p className="text-gray-400">Nenhum alerta no momento.</p>
            )}
          </Card>

          <Card title="Logs Recentes" className={cardStyle}>
            {status?.logs?.length ? (
              <Timeline
                value={status.logs.slice().reverse()}
                align="alternate"
                content={({ item }) => <small>{item}</small>}
                marker={() => (
                  <span className="pi pi-circle-fill text-green-400 text-xs" />
                )}
              />
            ) : (
              <p className="text-gray-400">Ainda sem registros.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
