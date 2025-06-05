"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";

import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { ProgressBar } from "primereact/progressbar";
import { Timeline } from "primereact/timeline";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

/* ——— types ——— */
type Status = {
  level: string;
  max_confidence: number;
  detections: number;
  last_update: string;
  alert: string;
  logs: string[];
};

type Incident = { date: string; time: string; severity: string };

/* ——— helper ——— */
const cardStyle =
  "!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm";
const accent = "text-[#22d3ee]";

export default function VideoStreamPage() {
  const [status, setStatus] = useState<Status | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [error, setError] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const videoRef = useRef<HTMLImageElement>(null);

  /* fetch status */
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const r = await fetch("http://localhost:8001/status_view");
        if (!r.ok) throw new Error();
        setStatus(await r.json());
        setError(false);
      } catch {
        setError(true);
      }
    };
    fetchStatus();
    const id = setInterval(fetchStatus, 5_000);
    return () => clearInterval(id);
  }, []);

  /* fetch incidents */
  useEffect(() => {
    fetch("http://localhost:8001/incidents")
      .then((r) => r.ok && r.json())
      .then((d) => setIncidents(d.incidents.slice(-6)))
      .catch(() => null);
  }, []);

  const severityColor = (l: string) =>
    l === "HIGH" ? "danger" : l === "MILD" ? "warning" : "info";

  /* últimas 8 confianças extraídas dos logs */
  const confidences =
    status?.logs
      ?.slice(-8)
      .map((l) => parseFloat(l.match(/Confidence: ([\d.]+)/)?.[1] ?? "0"))
      .reverse() ?? [];

  /* ——— JSX ——— */
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* métricas rápidas */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {[
          ["Incidentes (sessão)", incidents.length],
          ["Severidade atual", status?.level ?? "--"],
          ["Conf. máx", status?.max_confidence?.toFixed(2) ?? "--"],
          ["Detecções", status?.detections ?? "--"],
        ].map(([label, value]) => (
          <Card key={label} className={cardStyle}>
            <p className="text-xs uppercase text-gray-400">{label}</p>
            <p className={`text-2xl font-bold ${accent}`}>{value}</p>
          </Card>
        ))}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 p-6">
        {/* live stream */}
        <Card
          title="Live Stream"
          className={`col-span-1 xl:col-span-2 ${cardStyle}`}
          header={
            <div className="flex gap-2">
              <Button
                icon={paused ? "pi pi-play" : "pi pi-pause"}
                rounded text
                onClick={() => {
                  setPaused((p) => !p);
                  if (videoRef.current)
                    videoRef.current.src = paused
                      ? "http://localhost:8001/video_feed"
                      : "";
                }}
              />
              <Button
                icon="pi pi-expand"
                rounded text
                onClick={() => setShowFull(true)}
              />
            </div>
          }
        >
          {error ? (
            <p className="text-red-400">Backend offline.</p>
          ) : (
            <img
              ref={videoRef}
              src="http://localhost:8001/video_feed"
              alt="Stream"
              className="w-full max-h-[480px] object-cover border-4 border-[#22d3ee]/60 rounded-lg"
            />
          )}
        </Card>

        {/* painel lateral */}
        <div className="space-y-6">
          {/* status */}
          <Card title="Status de Detecção" className={cardStyle}>
            {status ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold">Severidade:</span>
                  <Tag value={status.level} severity={severityColor(status.level)} />
                </div>
                <ProgressBar
                  value={status.max_confidence * 100}
                  showValue={false}
                  className="h-2 mb-4"
                />
                <p className="text-sm text-gray-400">
                  Última atualização: {status.last_update}
                </p>
              </>
            ) : (
              <p>Carregando…</p>
            )}
          </Card>

          {/* histórico de confiança */}
          <Card title="Histórico de Confiança" className={cardStyle}>
            {confidences.length ? (
              <ul className="space-y-1">
                {confidences.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-10 text-right">{c.toFixed(2)}</span>
                    <div className="flex-1 bg-gray-700/40 rounded">
                      <div
                        style={{ width: `${c * 100}%` }}
                        className="h-2 rounded bg-[#22d3ee]"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">Sem dados.</p>
            )}
          </Card>

          {/* alerta */}
          <Card title="Alerta Atual" className={cardStyle}>
            {status?.alert ? (
              <p className="text-yellow-400">{status.alert}</p>
            ) : (
              <p className="text-gray-400">Nenhum alerta.</p>
            )}
          </Card>
        </div>
      </div>

      {/* timeline + incidents */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <Card title="Logs Recentes" className={cardStyle}>
          {status?.logs?.length ? (
            <Timeline
              value={status.logs.slice().reverse()}
              content={({ item }) => <small>{item}</small>}
              marker={() => (
                <span className="pi pi-circle-fill text-[#22d3ee] text-xs" />
              )}
            />
          ) : (
            <p className="text-gray-400">Sem logs.</p>
          )}
        </Card>

        <Card title="Incidentes Recentes" className={cardStyle}>
          {incidents.length ? (
            <ul className="space-y-2 text-sm">
              {incidents
                .slice()
                .reverse()
                .map((i, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>
                      {i.date} {i.time}
                    </span>
                    <Tag value={i.severity} severity={severityColor(i.severity)} />
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-400">Nenhum incidente registrado.</p>
          )}
        </Card>
      </section>

      {/* full-screen modal */}
      <Dialog
        header="Live Stream"
        visible={showFull}
        maximizable
        modal
        onHide={() => setShowFull(false)}
        style={{ width: "90vw" }}
        pt={{ root: { className: "bg-black/90 backdrop-blur-sm" } }}
      >
        <img
          src="http://localhost:8001/video_feed"
          alt="Full stream"
          className="w-full h-[70vh] object-cover border-4 border-[#22d3ee]/60 rounded-lg"
        />
      </Dialog>
    </div>
  );
}
