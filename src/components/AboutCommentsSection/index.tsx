import { useState } from "react";
import {
  useGetComments,
  type Comment,
  type CommentsApiResponse,
} from "@/hooks/useGetComments";
import { formatDate } from "@/lib/utils";
import { Icon } from "@iconify/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  initialData: CommentsApiResponse;
}

const COMMENT_LONG_LENGTH = 200;

function normalizeUrl(url: string): string {
  return url.startsWith("http") ? url : `https://${url}`;
}

const TOOLTIP_CONTENT_CLASS =
  "max-w-65 break-all bg-surface-container-high text-text-main border border-border-muted [&_polygon]:fill-surface-container-high";

interface TimelineDotStyle {
  borderColor: string;
  backgroundColor: string;
  boxShadow: string;
}

function getTimelineDotStyle(index: number, total: number): TimelineDotStyle {
  if (index === 0) {
    return {
      borderColor: `oklch(from var(--color-primary) l c h / 0.9)`,
      backgroundColor: `oklch(from var(--color-primary) l c h / 1)`,
      boxShadow: `0 0 14px oklch(from var(--color-primary) l c h / 0.8), 0 0 2px oklch(from var(--color-primary) l c h / 0.9)`,
    };
  }

  if (index === 1) {
    return {
      borderColor: `oklch(from var(--color-text-muted) l c h / 0.55)`,
      backgroundColor: `oklch(from var(--color-primary) l c h / 0.95)`,
      boxShadow: `0 0 6px oklch(from var(--color-primary) l c h / 0.5)`,
    };
  }

  const fade = total <= 3 ? 1 : 1 - (index - 1) / (total - 2);
  return {
    borderColor: `oklch(from var(--color-border-muted) l c h / ${0.55 * fade})`,
    backgroundColor: `oklch(from var(--color-text-muted) l c h / ${
      0.35 + 0.45 * fade
    })`,
    boxShadow: "none",
  };
}

function AboutCommentsSection({ initialData }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const { comments, total, loading, error, refetch } =
    useGetComments(initialData);
  // console.log(
  //   `Dados no componente vindos do hook: ${comments.map((cmt) => {
  //     return cmt.data.name;
  //   })} total: ${total}, loading: ${loading} erro: ${error}`,
  // );
  if (total <= 0) {
    return (
      <div>
        <Icon icon="mdi:load" className="w-5 h-5"></Icon>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <TooltipProvider>
      <article className="flex h-full w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <h4 className="font-display md:text-[18px] capitalize text-text-main">
            comentários, depoimentos & recomendações
          </h4>
          <span className="font-detail text-caption uppercase text-text-muted">
            {total} registrados
          </span>
        </div>
        <div className="group/cards relative flex h-full w-full flex-col gap-10 pl-6 sm:pl-8">
          {/* Linha vertical decorativa da timeline */}
          <span
            aria-hidden="true"
            className="absolute left-2 sm:left-2.5 top-3 bottom-5 w-px bg-border-muted"
          />
          {comments ? (
            comments.map((comment, index) => {
              const dotStyle = getTimelineDotStyle(
                hoveredIndex === index ? 0 : index,
                comments.length,
              );
              const isLong = comment.data.comment.length > COMMENT_LONG_LENGTH;

              return (
                // card
                <article
                  key={comment.key}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group/item relative animate-fade-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationDuration: "0.6s",
                  }}
                >
                  {/* Nó (bolinha) da timeline */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-6 sm:-left-8 top-1 flex items-center justify-center"
                  >
                    <span
                      className="flex size-4 items-center justify-center rounded-full border bg-bg-main ring-4 ring-bg-main transition-[background-color,border-color,box-shadow,opacity] duration-200 group-hover/cards:opacity-30 group-hover/item:opacity-100"
                      style={{ borderColor: dotStyle.borderColor }}
                    >
                      <span
                        className="size-1.5 rounded-full transition-[background-color,border-color,box-shadow,opacity] duration-200"
                        style={{
                          backgroundColor: dotStyle.backgroundColor,
                          boxShadow: dotStyle.boxShadow,
                        }}
                      />
                    </span>
                  </span>

                  <div className="flex h-full w-full flex-col gap-2.5 transition-opacity duration-200 group-hover/cards:opacity-60 group-hover/item:opacity-100">
                    <header className="flex flex-col gap-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                        <h4 className="font-display text-body text-text-main">
                          {comment.data.name}
                        </h4>
                        <time className="font-detail text-detail uppercase text-text-muted">
                          {formatDate(new Date(comment.data.postedon), true)}
                        </time>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                        <span className="text-caption text-primary/90">
                          {comment.data.jobtitle}
                        </span>
                        <i className="text-caption text-text-muted">•</i>
                        <span className="text-caption text-text-main/75">
                          {comment.data.relationship}
                        </span>
                      </div>
                    </header>
                    <div className="flex flex-col gap-2.5">
                      <p
                        className={`text-caption sm:text-body-sm font-light leading-relaxed text-text-main/85 ${
                          isLong && expandedKey !== comment.key
                            ? "line-clamp-3"
                            : ""
                        }`}
                      >
                        {comment.data.comment}
                      </p>
                      {isLong && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedKey((key) =>
                              key === comment.key ? null : comment.key,
                            )
                          }
                          aria-expanded={expandedKey === comment.key}
                          className="self-start text-caption text-text-muted transition-colors hover:text-primary cursor-pointer"
                        >
                          {expandedKey === comment.key
                            ? "Ler menos"
                            : "Ler mais"}
                        </button>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-caption text-text-muted">
                          Relacionado a {comment.data.experience}
                        </span>

                        <span className="flex uppercase tracking-wide text-caption font-detail items-center gap-1.5">
                          {comment.data.linkedin && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={normalizeUrl(comment.data.linkedin)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-text-muted transition-colors hover:text-primary"
                                  aria-label={`LinkedIn de ${comment.data.name}`}
                                >
                                  Linkedin
                                </a>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                sideOffset={6}
                                className={TOOLTIP_CONTENT_CLASS}
                              >
                                <span>Ir para LinkedIn</span>
                                <Icon
                                  icon="mdi:external-link"
                                  className="size-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                              </TooltipContent>
                            </Tooltip>
                          )}
                          <i>|</i>
                          {comment.data.github && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={normalizeUrl(comment.data.github)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-text-muted  transition-colors hover:text-primary"
                                  aria-label={`GitHub de ${comment.data.name}`}
                                >
                                  GitHub
                                </a>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                sideOffset={6}
                                className={TOOLTIP_CONTENT_CLASS}
                              >
                                <span>Ir para Github</span>
                                <Icon
                                  icon="mdi:external-link"
                                  className="size-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <p>Sem Comentários</p>
          )}
        </div>
      </article>
    </TooltipProvider>
  );
}

export default AboutCommentsSection;
