import { Icon } from "@iconify/react";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useAboutComments } from "@/hooks/useAboutComments";
import { EASE_SNAPPY } from "@/lib/motion";
import { EXPERIENCE_OPTIONS, type ExperienceValue } from "@/lib/siteContent";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { RippleButton } from "../ui/ripple-button";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE_SNAPPY } },
};

interface AboutCommentsFormProps {
  title: string;
}

export default function AboutCommentsForm({ title }: AboutCommentsFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4">
        <h3
          id={titleId}
          className="text-display text-body-sm md:text-body text-text-main"
        >
          {title}
        </h3>
        <RippleButton
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          rippleColor="var(--primary)"
          className="border-outline-variant bg-transparent text-text-main hover:bg-surface-container shrink-0 rounded-md border px-4 py-2 text-caption md:text-sm font-medium"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <Icon icon="mdi:close" className="w-4 h-4" />
                Fechar
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <Icon icon="mdi:message-text" className="w-4 h-4" />
                Comentar
              </motion.span>
            )}
          </AnimatePresence>
        </RippleButton>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <CommentPanel titleId={titleId} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CommentPanel({
  titleId,
  onClose,
}: {
  titleId: string;
  onClose: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const {
    formData,
    honeypot,
    status,
    errorMessage,
    messageMaxLength,
    updateField,
    setHoneypot,
    handleSubmit,
    reset,
  } = useAboutComments();

  const nameRef = useRef<HTMLInputElement>(null);
  const nameId = useId();
  const jobtitleId = useId();
  const relationshipId = useId();
  const experienceId = useId();
  const messageId = useId();
  const linkedinId = useId();
  const githubId = useId();

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const remaining = messageMaxLength - formData.comment.length;

  useEffect(() => {
    if (!isSuccess) nameRef.current?.focus();
  }, [isSuccess]);

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE_SNAPPY }}
      className="overflow-hidden"
    >
      <div className="border-t border-border-muted-alt/60 mt-6 pt-6">
        {isSuccess ? (
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-3 py-8 text-center"
          >
            <Icon icon="mdi:check-circle" className="w-8 h-8 text-success" />
            <p className="font-display text-h3 text-text-main">
              Comentário enviado
            </p>
            <p className="max-w-sm text-body-sm text-text-muted">
              Obrigado! Ele ficará visível na página assim que for revisado.
            </p>
            <div className="mt-2 flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={reset}
                className="text-text-muted hover:text-text-main cursor-pointer"
              >
                Escrever outro comentário
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="text-text-muted hover:text-text-main cursor-pointer"
              >
                Fechar
              </Button>
            </div>
          </div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            aria-labelledby={titleId}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5"
          >
            {/* Honeypot anti-spam totalmente invisível para leitores de tela e humanos */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="website-hp">Não preencha este campo</label>
              <input
                id="website-hp"
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <fieldset
              disabled={isLoading}
              className="flex flex-col gap-5 disabled:opacity-60"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <motion.div variants={fieldVariants}>
                  <Field>
                    <FieldLabel htmlFor={nameId}>
                      Seu Nome <span className="text-danger">*</span>
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={nameId}
                        ref={nameRef}
                        required
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Ex: Maria Silva"
                        maxLength={80}
                      />
                      <InputGroupAddon align="inline-start">
                        <Icon
                          icon="mdi:account"
                          className="w-4 h-4 text-text-muted"
                        />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <Field>
                    <FieldLabel htmlFor={jobtitleId}>
                      Seu Cargo (opcional)
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={jobtitleId}
                        value={formData.jobtitle}
                        onChange={(e) =>
                          updateField("jobtitle", e.target.value)
                        }
                        placeholder="Ex: Desenvolvedora Front-end"
                        maxLength={80}
                      />
                      <InputGroupAddon align="inline-start">
                        <Icon
                          icon="mdi:briefcase-outline"
                          className="w-4 h-4 text-text-muted"
                        />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <Field>
                    <FieldLabel htmlFor={relationshipId}>
                      Relação Comigo (opcional)
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={relationshipId}
                        value={formData.relationship}
                        onChange={(e) =>
                          updateField("relationship", e.target.value)
                        }
                        placeholder="Ex: Colega de Equipe | Gestor"
                        maxLength={80}
                      />
                      <InputGroupAddon align="inline-start">
                        <Icon
                          icon="mdi:account-group"
                          className="w-4 h-4 text-text-muted"
                        />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <Field>
                    <FieldLabel htmlFor={experienceId}>
                      Relacionado a Experiência...
                    </FieldLabel>
                    <div className="relative">
                      <select
                        id={experienceId}
                        value={formData.experience}
                        onChange={(e) =>
                          updateField(
                            "experience",
                            e.target.value as ExperienceValue,
                          )
                        }
                        className={cn(
                          "flex h-9 w-full appearance-none rounded-md border border-input bg-transparent py-2 pr-8 pl-3 text-sm shadow-xs outline-none transition-[color,box-shadow]",
                          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                          formData.experience
                            ? "text-text-main"
                            : "text-text-muted",
                        )}
                      >
                        <option
                          value=""
                          disabled
                          className="bg-surface-container-low text-text-muted"
                        >
                          Escolha uma das opções
                        </option>
                        {EXPERIENCE_OPTIONS.map((exp) => {
                          if (exp.label === "") return null;

                          return (
                            <option
                              key={exp.value}
                              value={exp.value}
                              className="bg-surface-container-low text-text-main"
                            >
                              {exp.label}
                            </option>
                          );
                        })}
                      </select>
                      <Icon
                        icon="mdi:chevron-down"
                        className="pointer-events-none absolute right-2.5 top-1/2 w-4 h-4 -translate-y-1/2 text-text-muted"
                      />
                    </div>
                  </Field>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <Field>
                    <FieldLabel htmlFor={linkedinId}>
                      LinkedIn (opcional)
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={linkedinId}
                        value={formData.linkedin}
                        onChange={(e) =>
                          updateField("linkedin", e.target.value)
                        }
                        placeholder="Ex: linkedin.com/in/maria-silva"
                        maxLength={120}
                      />
                      <InputGroupAddon align="inline-start">
                        <Icon
                          icon="mdi:linkedin"
                          className="w-4 h-4 text-text-muted"
                        />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <Field>
                    <FieldLabel htmlFor={githubId}>
                      GitHub (opcional)
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={githubId}
                        value={formData.github}
                        onChange={(e) => updateField("github", e.target.value)}
                        placeholder="Ex: github.com/maria-silva"
                        maxLength={120}
                      />
                      <InputGroupAddon align="inline-start">
                        <Icon
                          icon="mdi:github"
                          className="w-4 h-4 text-text-muted"
                        />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </motion.div>
              </div>

              <motion.div variants={fieldVariants}>
                <Field>
                  <FieldLabel htmlFor={messageId}>
                    Comentário <span className="text-danger">*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      id={messageId}
                      required
                      rows={4}
                      value={formData.comment}
                      onChange={(e) =>
                        updateField(
                          "comment",
                          e.target.value.slice(0, messageMaxLength),
                        )
                      }
                      placeholder="Escreva seu comentário..."
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText
                        aria-live="polite"
                        className={cn(
                          "ml-auto font-detail text-caption transition-colors",
                          remaining < 20
                            ? "text-danger font-medium"
                            : "text-text-muted",
                        )}
                      >
                        {remaining}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </motion.div>

              {status === "error" && (
                <FieldError role="alert">
                  <span className="flex items-center gap-2 text-danger">
                    <Icon
                      icon="mdi:alert-circle"
                      className="w-4 h-4 shrink-0"
                    />
                    {errorMessage}
                  </span>
                </FieldError>
              )}

              <motion.div variants={fieldVariants} className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-brand-primary text-surface-container-lowest hover:bg-brand-hover cursor-pointer transition-colors"
                >
                  {isLoading && (
                    <Spinner data-icon="inline-start" className="size-4" />
                  )}
                  {isLoading ? "Enviando..." : "Enviar comentário"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="text-text-muted hover:text-text-main cursor-pointer border border-border-muted-alt/70"
                >
                  Cancelar
                </Button>
              </motion.div>
            </fieldset>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
}
