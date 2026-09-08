import { useState, type FormEvent } from "react";
import { ExperienceValue } from "@/lib/siteContent";

export interface CommentFormData {
  name: string;
  comment: string;
  relationship: string;
  jobtitle: string;
  experience: ExperienceValue | "";
  github: string;
  linkedin: string;
}

export interface WebhookCommentPayload {
  name: string;
  comment: string;
  relationship: string;
  jobtitle: string;
  experience: ExperienceValue;
  postedon: string;
  github: string;
  linkedin: string;
}

type Status = "idle" | "loading" | "success" | "error";

const WEBHOOK_URL = import.meta.env.PUBLIC_COMMENTS_WEBHOOK_URL as string;
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

    if (!WEBHOOK_URL) {
      setStatus("error");
      setErrorMessage(
        "Erro no envio do formulário, tente novamente mais tarde.",
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const payload: WebhookCommentPayload = {
      name,
      comment,
      relationship: sanitizeText(formData.relationship),
      jobtitle: sanitizeText(formData.jobtitle),
      experience: formData.experience,
      postedon: new Date().toISOString(),
      github: sanitizeText(formData.github),
      linkedin: sanitizeText(formData.linkedin),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`Webhook respondeu ${response.status}`);

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
        console.log("Error: " + error);
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
