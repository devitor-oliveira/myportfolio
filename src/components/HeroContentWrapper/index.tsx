import { useEffect, useLayoutEffect, useRef, useState } from "react";
import HeroTabs from "../HeroTabs";
import { motion, useSpring, useTransform } from "motion/react";
import { useMediaQuery } from "usehooks-ts";

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
  const viewWidth = useMediaQuery("(min-width: 768px)"); // md breakpoint

  const [activeTab, setActiveTab] = useState<TabsType>("split");
  const defaultApplied = useRef(false);
  // const reduceMotion = useReducedMotion();

  const dividerX = useSpring(50, {
    stiffness: 320,
    damping: 30,
    mass: 0.8,
  });
  const dividerPct = useTransform(dividerX, (v) => `${v}%`); // ← sufixo % para a CSS var

  useLayoutEffect(() => {
    if (defaultApplied.current) return;
    defaultApplied.current = true;
    if (!viewWidth) {
      setActiveTab("card");
      dividerX.jump(DIVIDER_TARGET.card);
    }
  }, [dividerX, viewWidth]);

  useEffect(() => {
    const target = DIVIDER_TARGET[activeTab];
    // reduceMotion ? dividerX.jump(target) : dividerX.set(target);
    dividerX.set(target);
  }, [activeTab, dividerX]);

  const cardOpacity = useTransform(dividerX, [0, 30], [0, 1]);
  const terminalOpacity = useTransform(dividerX, [70, 100], [1, 0]);

  return (
    <section className="flex flex-col min-h-120 w-full max-w-6xl border border-border-muted-alt debug-border-red">
      <HeroTabs tab={activeTab} setTab={setActiveTab} />
      <motion.div
        className="relative min-h-120 w-full grow overflow-hidden debug-border-green"
        style={{ "--divider-x": dividerPct } as React.CSSProperties}
      >
        <div
          className="absolute left-0 top-0 w-full h-(--divider-x) overflow-hidden bg-surface-dim md:h-full md:w-(--divider-x)"
          // style={{ height: "var(--divider-x)" }}
        >
          <motion.div
            className="h-full w-full"
            style={{ opacity: cardOpacity }}
          >
            {CardHeroSlot}
          </motion.div>
        </div>
        <div className=" absolute bottom-0 left-0 w-full h-[calc(100%-var(--divider-x))] overflow-hidden bg-bg-main md:top-0 md:right-0 md:h-full md:w-[calc(100%-var(--divider-x))] md:left-auto">
          <motion.div
            className="h-full w-full"
            style={{ opacity: terminalOpacity }}
          >
            {TerminalSlot}
          </motion.div>
        </div>
        <motion.div
          className="absolute left-0 top-(--divider-x) z-10 h-px w-full -translate-y-1/2 bg-border-active shadow-[0_0_12px_var(--color-border-active)] md:top-0 md:left-(--divider-x) md:h-full md:w-px md:-translate-x-1/2 md:translate-y-0"
          // style={{ top: "var(--divider-x)", left: "0" }}
        />
      </motion.div>
    </section>
  );
}

export default HeroContentWrapper;
