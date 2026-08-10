import { useEffect, useState } from "react";
import HeroTabs from "../HeroTabs";
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

interface HeroContentProps {
  CardHeroSlot?: React.ReactNode;
  TerminalSlot?: React.ReactNode;
}
export type TabsType = "terminal" | "split" | "card";

const DIVIDER_TARGET: Record<TabsType, number> = {
  split: 50,
  card: 100,
  terminal: 0,
};

function HeroContentWrapper({ CardHeroSlot, TerminalSlot }: HeroContentProps) {
  const [activeTab, setActiveTab] = useState<TabsType>("split");
  const reduceMotion = useReducedMotion();

  const dividerX = useSpring(50, { stiffness: 320, damping: 30, mass: 0.8 });
  const dividerPct = useTransform(dividerX, (v) => `${v}%`); // ← sufixo % para a CSS var

  useEffect(() => {
    const target = DIVIDER_TARGET[activeTab];
    // reduceMotion ? dividerX.jump(target) : dividerX.set(target);
    dividerX.set(target);
  }, [activeTab, dividerX]);

  const cardOpacity = useTransform(dividerX, [0, 30], [0, 1]);
  const terminalOpacity = useTransform(dividerX, [70, 100], [1, 0]);

  return (
    <section className="flex flex-col min-h-120 w-full max-w-6xl border border-border-muted-alt">
      <HeroTabs tab={activeTab} setTab={setActiveTab} />
      <motion.div
        className="relative min-h-120 w-full grow overflow-hidden"
        style={{ "--divider-x": dividerPct } as React.CSSProperties}
      >
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-surface-dim"
          style={{ width: "var(--divider-x)" }}
        >
          <motion.div
            className="h-full w-full"
            style={{ opacity: cardOpacity }}
          >
            {CardHeroSlot}
          </motion.div>
        </div>
        <div
          className="absolute inset-y-0 right-0 overflow-hidden bg-bg-main"
          style={{ width: "calc(100% - var(--divider-x))" }}
        >
          <motion.div
            className="h-full w-full"
            style={{ opacity: terminalOpacity }}
          >
            {TerminalSlot}
          </motion.div>
        </div>
        <motion.div
          className="absolute inset-y-0 z-10 w-px cursor-col-resize  -translate-x-1/2 bg-border-active shadow-[0_0_12px_var(--color-border-active)]"
          style={{ left: "var(--divider-x)" }}
        />
      </motion.div>
    </section>
  );
}

export default HeroContentWrapper;
