"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";

import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

type SettingsPayload = {
  telegram_alert_interval: number;
  emergency_call_interval: number;
  video_save_path: string;
};

const cardStyle =
  "!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const toastRef = useRef<Toast>(null);

  /* ---------- Fetch current settings ---------- */
  useEffect(() => {
    fetch("http://localhost:8001/settings")
      .then((r) => {
        if (!r.ok) throw new Error("API offline");
        return r.json();
      })
      .then((data: SettingsPayload) => {
        setSettings(data);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  /* ---------- Handlers ---------- */
  const handleSave = async () => {
    if (!settings) return;

    /* validação simples */
    if (
      settings.telegram_alert_interval < 1 ||
      settings.emergency_call_interval < 1
    ) {
      toastRef.current?.show({
        severity: "warn",
        summary: "Intervalos inválidos",
        detail: "Os valores devem ser ≥ 1 segundo.",
      });
      return;
    }

    setSaving(true);
    const body = new URLSearchParams({
      telegram_alert_interval: String(settings.telegram_alert_interval),
      emergency_call_interval: String(settings.emergency_call_interval),
      video_save_path: settings.video_save_path,
    });

    try {
      const res = await fetch("http://localhost:8001/update_settings", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!res.ok) throw new Error("Falha no backend");
      toastRef.current?.show({
        severity: "success",
        summary: "Salvo",
        detail: "Configurações atualizadas com sucesso.",
      });
    } catch {
      toastRef.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Não foi possível salvar. Verifique o backend.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof SettingsPayload, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Toast ref={toastRef} position="top-right" />

      <section className="p-6 flex justify-center">
        <Card title="Configurações" className={cardStyle} style={{ width: 500 }}>
          {loading ? (
            <p className="text-gray-400">Carregando…</p>
          ) : error ? (
            <p className="text-red-400">
              Erro ao conectar com o backend. Verifique se o FastAPI está
              rodando.
            </p>
          ) : settings ? (
            <div className="flex flex-col gap-6">
              {/* Telegram Interval */}
              <div className="flex flex-col gap-2">
                <label htmlFor="telegram" className="font-semibold">
                  Telegram Alert Interval (s)
                </label>
                <InputNumber
                  id="telegram"
                  value={settings.telegram_alert_interval}
                  onValueChange={(e) =>
                    handleChange("telegram_alert_interval", e.value ?? 0)
                  }
                  min={1}
                  className="w-full"
                />
              </div>

              {/* Emergency Interval */}
              <div className="flex flex-col gap-2">
                <label htmlFor="emergency" className="font-semibold">
                  Emergency Call Interval (s)
                </label>
                <InputNumber
                  id="emergency"
                  value={settings.emergency_call_interval}
                  onValueChange={(e) =>
                    handleChange("emergency_call_interval", e.value ?? 0)
                  }
                  min={1}
                  className="w-full"
                />
              </div>

              {/* Video Path */}
              <div className="flex flex-col gap-2">
                <label htmlFor="path" className="font-semibold">
                  Video Save Path
                </label>
                <InputText
                  id="path"
                  value={settings.video_save_path}
                  onChange={(e) =>
                    handleChange("video_save_path", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              <Button
                label={saving ? "Salvando…" : "Salvar"}
                icon="pi pi-save"
                onClick={handleSave}
                loading={saving}
                disabled={saving}
              />
            </div>
          ) : null}
        </Card>
      </section>
    </div>
  );
}
