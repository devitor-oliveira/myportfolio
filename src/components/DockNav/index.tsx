"use client";
import { Icon } from "@iconify/react";
import { Dock, DockIcon } from "../ui/dock";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container rounded-full";

function DockNav() {
  const handleScrollUp = () => {
    const topElement = document.getElementById("top");
    topElement?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollDown = () => {
    const downElement = document.getElementById("down");
    downElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Dock direction="middle" className="pointer-events-auto">
      <DockIcon>
        <button
          type="button"
          className={`flex w-full h-full items-center justify-center cursor-pointer ${focusRing}`}
          aria-label="Rolar para baixo"
          onClick={handleScrollDown}
        >
          <Icon icon="mdi:chevron-down" className="size-6" />
        </button>
      </DockIcon>

      <div aria-hidden="true" className="h-6 w-px bg-border-muted-alt mx-1" />

      <DockIcon>
        <a
          href="/"
          className={`flex w-full h-full items-center justify-center cursor-pointer ${focusRing}`}
          aria-label="Início"
        >
          <Icon icon="mdi:home-outline" className="size-6" />
        </a>
      </DockIcon>

      <div aria-hidden="true" className="h-6 w-px bg-border-muted-alt mx-1" />

      <DockIcon>
        <button
          type="button"
          className={`flex w-full h-full items-center justify-center cursor-pointer ${focusRing}`}
          aria-label="Rolar para cima"
          onClick={handleScrollUp}
        >
          <Icon icon="mdi:chevron-up" className="size-6" />
        </button>
      </DockIcon>
    </Dock>
  );
}

export default DockNav;
