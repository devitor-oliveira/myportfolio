import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";

const EASE_SNAPPY = [0.2, 0, 0, 1] as const;

interface TagListProps {
  tags: string[];
  max?: number;
  className?: string;
}

export default function TagList({
  tags,
  max = 3,
  className = "",
}: TagListProps) {
  const [expanded, setExpanded] = useState(false);

  const visible = tags.slice(0, max);
  const rest = tags.slice(max);
  const hasMore = rest.length > 0;

  return (
    <div
      className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 font-detail text-detail text-on-surface-variant ${className}`}
    >
      {visible.map((tag, i) => (
        <span key={tag} className="flex items-center gap-1.5">
          <Tag label={tag} />
          {(i < visible.length - 1 || hasMore) && <Slash />}
        </span>
      ))}

      <AnimatePresence initial={false}>
        {expanded &&
          rest.map((tag, i) => (
            <motion.span
              key={tag}
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{
                duration: 0.15,
                ease: EASE_SNAPPY,
                delay: i * 0.025,
              }}
            >
              <Tag label={tag} />
              {i < rest.length - 1 && <Slash />}
            </motion.span>
          ))}
      </AnimatePresence>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={
            expanded ? "Mostrar menos tags" : `Mostrar mais ${rest.length} tags`
          }
          className="flex items-center gap-0.5 text-brand-hover transition-colors hover:text-primary cursor-pointer"
        >
          {!expanded && <span>+{rest.length}</span>}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.15, ease: EASE_SNAPPY }}
            className="flex"
          >
            <ChevronRight size={16} />
          </motion.span>
        </button>
      )}
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="transition-colors duration-150 ease-out hover:text-on-surface">
      {label.toLowerCase()}
    </span>
  );
}

function Slash() {
  return (
    <span className="text-outline-variant" aria-hidden="true">
      /
    </span>
  );
}
