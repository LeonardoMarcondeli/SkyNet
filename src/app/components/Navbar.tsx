"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

export default function NavBar() {
  const router = useRouter();

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => router.push("/dashboard"),
    },
    {
      label: "Incidents",
      icon: "pi pi-exclamation-triangle",
      command: () => router.push("/incidents"),
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => router.push("/settings"),
    },
  ];

  const end = (
    <Button
      label="Logout"
      icon="pi pi-sign-out"
      severity="secondary"
      outlined
      onClick={() => router.push("/")}
    />
  );

  return (
    <header className="w-full shadow-md">
      <Menubar
        model={items}
        end={end}
        className="border-0 rounded-none !bg-transparent !text-white"
      />
    </header>
  );
}