import { Folder, NotebookText } from "lucide-react";
import ButtonTab from "../ui/buttontab.tsx";

interface NavProps {
  activeTab: string;
  handleTabChange: (tab: "projects" | "blog") => void;
}

const TABS = [
  { id: "projects", label: "Projetos", icon: Folder },
  { id: "blog", label: "Blogs", icon: NotebookText },
] as const;

function Nav({ activeTab, handleTabChange }: NavProps) {
  return (
    <div
      role="tablist"
      aria-label="Conteúdo do portfólio"
      className="flex w-full max-w-2xl items-center gap-4 border-b border-border-muted p-0"
    >
      {TABS.map(({ id, label, icon }) => (
        <ButtonTab
          key={id}
          isactive={activeTab === id}
          variant="tab"
          icon={icon}
          onClick={() => handleTabChange(id)}
        >
          {label}
        </ButtonTab>
      ))}
    </div>
  );
}

export default Nav;
