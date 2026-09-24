import { useState, type FormEvent } from "react";
import { ExperienceValue } from "@/lib/siteContent";
import { commentCreatedSchema, type CommentInput } from '@/lib/commentContracts';
import { normalizeProfileUrl } from '@/lib/profileUrl';

export interface CommentFormData {
  name: string;
  comment: string;
  relationship: string;
  jobtitle: string;
  experience: ExperienceValue | "";
  github: string;
  linkedin: string;
}

type Status = "idle" | "loading" | "success" | "error";

const MESSAGE_MAX_LENGTH = 500;
const REQUEST_TIMEOUT_MS = 8000;

const EMPTY_FORM_DATA: CommentFormData = {
  name: "",
  comment: "",
  relationship: "",
  jobtitle: "",
  experience: "",
  github: "",
  linkedin: "",
};

function isExperienceValue(value: string): value is ExperienceValue {
  return (Object.values(ExperienceValue) as string[]).includes(value);
}

function sanitizeText(value: string): string {
  return (
    value
      // biome-ignore lint/suspicious/noControlCharactersInRegex: Sanitizacao intencional de caracteres de controle ASCII
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .trim()
  );
}

export function useAboutComments() {
  const [formData, setFormData] = useState<CommentFormData>(EMPTY_FORM_DATA);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof CommentFormData>(
    field: K,
    value: CommentFormData[K],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function reset() {
    setFormData(EMPTY_FORM_DATA);
    setHoneypot("");
    setStatus("idle");
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (honeypot) {
      setStatus("success");
      return;
    }

    const name = sanitizeText(formData.name);
    const comment = sanitizeText(formData.comment);

    if (!name || !comment) {
      setStatus("error");
      setErrorMessage("Preencha nome e comentário.");
      return;
    }

    if (!isExperienceValue(formData.experience)) {
      setStatus("error");
      setErrorMessage("Selecione uma experiência.");
      return;
    }

    const linkedin = normalizeProfileUrl(formData.linkedin, 'linkedin');
    if (linkedin === null) {
      setStatus('error');
      setErrorMessage('Informe o usuário ou o link do seu perfil no LinkedIn.');
      return;
    }

    const github = normalizeProfileUrl(formData.github, 'github');
    if (github === null) {
      setStatus('error');
      setErrorMessage('Informe o usuário ou o link do seu perfil no GitHub.');
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const payload: CommentInput = {
      name,
      comment,
      relationship: sanitizeText(formData.relationship),
      jobtitle: sanitizeText(formData.jobtitle),
      experience: formData.experience,
      github,
      linkedin,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/comments.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`Erro no envio: ${response.status}`);

      const result: unknown = await response.json();
      if (!commentCreatedSchema.safeParse(result).success) {
        throw new Error("Resposta inválida no envio");
      }

      setStatus("success");
      setFormData(EMPTY_FORM_DATA);
    } catch (error) {
      clearTimeout(timeoutId);
      setStatus("error");

      if (error instanceof Error && error.name === "AbortError") {
        setErrorMessage(
          "Tempo limite excedido. Verifique sua conexão e tente novamente.",
        );
      } else {
        setErrorMessage(
          "Não foi possível enviar agora. Tente novamente em instantes.",
        );
      }
    }
  }

  return {
    formData,
    honeypot,
    status,
    errorMessage,
    messageMaxLength: MESSAGE_MAX_LENGTH,
    updateField,
    setHoneypot,
    handleSubmit,
    reset,
  };
}
