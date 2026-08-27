import { Icon } from "@iconify/react";
import { Dock, DockIcon } from "../ui/dock";

function DockNav() {
  return (
    <Dock
      direction="middle"
      className=" pointer-events-auto border border-primary"
    >
      <DockIcon className="cursor-pointer">
        <button
          type="button"
          className="flex w-full h-full items-center justify-center cursor-pointer"
          aria-label="Rolar para baixo"
        >
          <Icon icon="mdi:caret" className="size-6 rotate-180" />
        </button>
      </DockIcon>
      <DockIcon className="cursor-pointer ">
        <a
          href="/"
          className="flex w-full h-full items-center justify-center cursor-pointer"
          aria-label="Início"
        >
          <Icon icon="mdi:home" className="size-6" />
        </a>
      </DockIcon>
      <DockIcon className="cursor-pointer ">
        <button
          type="button"
          className="flex w-full h-full items-center justify-center cursor-pointer"
          aria-label="Rolar para cima"
        >
          <Icon icon="mdi:caret" className="size-6" />
        </button>
      </DockIcon>
    </Dock>
  );
}

export default DockNav;
