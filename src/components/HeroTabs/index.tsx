import { cva } from "class-variance-authority";
import type { TabsType } from "../HeroContentWrapper";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface HeroTabsProps {
  tab?: TabsType;
  setTab?: (tab: TabsType) => void;
}

const tabs: { id: TabsType; icon: string }[] = [
  { id: "split", icon: "mdi:view-dashboard-outline" },
  { id: "card", icon: "mdi:account-outline" },
  {
    id: "terminal",
    icon: "mdi:code-greater-than-or-equal",
  },
];

const tabTriggerVariants = cva([
  // Tipografia e Layout
  "group/trigger font-detail text-detail tracking-wider text-text-muted transition-colors duration-200 ease-snappy px-4 py-2.5 uppercase w-full h-full",
  // Hover State
  "hover:bg-surface-container-low hover:text-neutral-50",
  // Active State (Fundo e Texto)
  "data-active:bg-on-secondary data-active:text-primary",
  // Active State (Cor da Barra Inferior do pseudo-elemento after)
  "after:bg-primary",
]);

const tabIconVariants = cva(
  " transition-colors group-hover:text-neutral-50 group-data-[state=active]:surface-tint",
);

const HeroTabs = ({ tab, setTab }: HeroTabsProps) => {
  return (
    <header className="flex justify-between items-center w-full h-12 bg-surface-container-low border-b border-border-muted-alt py-0">
      <Tabs
        value={tab}
        onValueChange={(val) => setTab?.(val as TabsType)}
        className="w-full p-0 h-full"
      >
        <TabsList variant="line" className="flex grow p-0 gap-2.5 h-full">
          {tabs.map(({ id, icon }) => {
            return id === "split" ? (
              <TabsTrigger
                className={cn(tabTriggerVariants(), "hidden md:flex")}
                value={id}
                key={id}
              >
                <Icon
                  icon={icon}
                  className={`${cn(tabIconVariants())} size-5 py-0`}
                />
                <p className="hidden md:block">{id}</p>
              </TabsTrigger>
            ) : (
              <TabsTrigger
                className={cn(tabTriggerVariants())}
                value={id}
                key={id}
              >
                <Icon
                  icon={icon}
                  className={`${cn(tabIconVariants())} size-5 py-0`}
                />
                <p className="hidden md:block">{id}</p>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
      <span className="flex-center gap-6 h-full mr-4 ">
        <p className="uppercase font-detail text-text-muted text-caption">
          Build_System_v1.0.0
        </p>
        {/* <div className="flex h-full items-center">
          
          <div className="flex h-full w-12 items-center justify-center text-text-muted transition-colors duration-150 hover:bg-surface-container-high hover:text-neutral-50 cursor-pointer">
            <Icon icon="mdi:minus" className="size-4" />
          </div>

          
          <div className="flex h-full w-12 items-center justify-center text-text-muted transition-colors duration-150 hover:bg-surface-container-high hover:text-neutral-50 cursor-pointer">
            <Icon icon="mdi:square-outline" className="size-3.5" />
          </div>

          
          <div className="flex h-full w-12 items-center justify-center text-text-muted transition-colors duration-150 hover:bg-red-500 hover:text-white cursor-pointer">
            <Icon icon="mdi:close" className="size-5" />
          </div>
        </div> */}
      </span>
    </header>
  );
};

export default HeroTabs;
