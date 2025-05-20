"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { Card } from "primereact/card";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";

type Incident = {
  date: string;
  time: string;
  severity: "HIGH" | "MILD" | "NONE";
  confidence: number;
  detections: number;
  message: string;
};

const cardStyle =
  "!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");

  /* ----- Fetch incidents on mount ----- */
  useEffect(() => {
    fetch("http://localhost:8001/incidents")
      .then((res) => {
        if (!res.ok) throw new Error("API offline");
        return res.json();
      })
      .then((data) => {
        // backend retorna { incidents: [...] }
        setIncidents(data.incidents ?? []);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  /* ----- Helpers ----- */
  const severityTemplate = (row: Incident) => (
    <Tag
      value={row.severity}
      severity={
        row.severity === "HIGH"
          ? "danger"
          : row.severity === "MILD"
          ? "warning"
          : "info"
      }
    />
  );

  const confidenceTemplate = (row: Incident) => row.confidence.toFixed(2);

  const header = (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Histórico de Incidentes</h2>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Pesquisar..."
          className="w-72"
        />
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="p-6">
        <Card className={cardStyle}>
          {loading ? (
            <p className="text-gray-400">Carregando…</p>
          ) : error ? (
            <p className="text-red-400">
              Erro ao conectar com o backend. Verifique se o FastAPI está
              rodando.
            </p>
          ) : incidents.length === 0 ? (
            <p className="text-gray-400">Nenhum incidente registrado.</p>
          ) : (
            <DataTable
              value={incidents}
              paginator
              rows={10}
              rowsPerPageOptions={[10, 20, 50]}
              stripedRows
              resizableColumns
              showGridlines
              globalFilter={globalFilter}
              header={header}
              className="p-datatable-sm"
            >
              <Column field="date" header="Data" sortable />
              <Column field="time" header="Hora" sortable />
              <Column
                field="severity"
                header="Severidade"
                body={severityTemplate}
                sortable
              />
              <Column
                field="confidence"
                header="Confiança"
                body={confidenceTemplate}
                sortable
              />
              <Column field="detections" header="Detecções" sortable />
              <Column field="message" header="Mensagem" style={{ width: "40%" }} />
            </DataTable>
          )}
        </Card>
      </section>
    </div>
  );
}
