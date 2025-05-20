"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

export default function NavBar() {
  const router = useRouter();

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => router.push("/"),
    },
    {
      label: "About",
      icon: "pi pi-exclamation-triangle",
      command: () => router.push("/about"),
    },
  ];

  const end = (
    <Button
      label="Login"
      icon="pi pi-user"
      severity="secondary"
      outlined
      onClick={() => router.push("/login")}
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