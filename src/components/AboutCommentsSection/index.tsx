import { useState } from "react";
import {
  useGetComments,
  type CommentsApiResponse,
} from "@/hooks/useGetComments";
import { formatDate, localStorageProvider } from "@/lib/utils";
import { Icon } from "@iconify/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SWRConfig } from "swr";

interface Props {
  initialData: CommentsApiResponse;
}

const COMMENT_LONG_LENGTH = 200;

function normalizeLinkedinUrl(value: string): string {
  if (value.startsWith("http")) return value;
  if (value.includes("linkedin.com")) return `https://${value}`;
  return `https://linkedin.com/in/${value.replace(/^\/+/, "")}`;
}

function normalizeGithubUrl(value: string): string {
  if (value.startsWith("http")) return value;
  if (value.includes("github.com")) return `https://${value}`;
  return `https://github.com/${value.replace(/^\/+/, "")}`;
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

  const { comments, total, loading } = useGetComments(initialData);

  return (
    <SWRConfig
      value={{ provider: localStorageProvider, dedupingInterval: 60000 }}
    >
      <TooltipProvider>
        <article className="flex h-full w-full flex-col gap-6">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-body md:text-[18px] capitalize text-text-main/95">
              comentários, depoimentos & recomendações
            </h4>
            <span className="min-w-fit font-detail text-[10px] md:text-caption uppercase text-text-muted">
              {total} registrados
            </span>
          </div>

          {loading && comments.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-text-muted">
              <Icon icon="mdi:loading" className="w-6 h-6 animate-spin" />
            </div>
          ) : comments.length > 0 ? (
            <div className="group/cards relative flex h-full w-full flex-col gap-10 pl-6 sm:pl-8">
              <span
                aria-hidden="true"
                className="absolute left-2 sm:left-2.5 top-3 bottom-5 w-px bg-border-muted"
              />
              {comments.map((comment, index) => {
                const dotStyle = getTimelineDotStyle(
                  hoveredIndex === index ? 0 : index,
                  comments.length,
                );
                const isLong =
                  comment.data.comment.length > COMMENT_LONG_LENGTH;

                const linkedinUrl = comment.data.linkedin
                  ? normalizeLinkedinUrl(comment.data.linkedin)
                  : null;
                const githubUrl = comment.data.github
                  ? normalizeGithubUrl(comment.data.github)
                  : null;

                return (
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
                          <h4 className="font-display tracking-wide md:tracking-normal text-body-sm md:text-body text-text-main">
                            {comment.data.name}
                          </h4>
                          <time className="font-detail text-[10px] md:text-detail uppercase text-text-main/70">
                            {formatDate(new Date(comment.data.postedon), true)}
                          </time>
                        </div>

                        <div className="text-detail md:text-caption flex flex-wrap items-center gap-x-1 gap-y-1">
                          <span className="text-primary/90">
                            {comment.data.jobtitle}
                          </span>
                          <i className="text-text-muted">•</i>
                          <span className="text-text-main/80">
                            {comment.data.relationship}
                          </span>
                        </div>
                      </header>

                      <div className="flex flex-col gap-2.5">
                        <p
                          className={`text-caption text-justify sm:text-body-sm font-light  text-text-main/90 ${
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
                            className="self-start text-caption text-primary transition-colors hover:text-brand-hover cursor-pointer"
                          >
                            {expandedKey === comment.key
                              ? "Ler menos"
                              : "Ler mais"}
                          </button>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-detail md:text-caption text-text-main/70">
                            Relacionado a {comment.data.experience}
                          </span>

                          {(linkedinUrl || githubUrl) && (
                            <span className="flex uppercase text-detail md:tracking-wide md:text-caption font-detail items-center gap-1 md:gap-1.5">
                              {linkedinUrl && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={linkedinUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-text-main/70 transition-colors hover:text-primary"
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

                              {linkedinUrl && githubUrl && (
                                <i className="text-text-muted">|</i>
                              )}

                              {githubUrl && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-text-main/70 transition-colors hover:text-primary"
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
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border-muted p-8 text-center">
              <p className="text-body-sm text-text-muted">
                Nenhum comentário registrado até o momento.
              </p>
            </div>
          )}
        </article>
      </TooltipProvider>
    </SWRConfig>
  );
}

export default AboutCommentsSection;
