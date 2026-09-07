"use client";

import { cn } from "@/lib/utils";
import { EXPERIENCES } from "@/lib/siteContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

function AboutExperiences() {
  return (
    <Accordion type="single" collapsible className="group/accordion w-full">
      {EXPERIENCES.map((experience) => (
        <AccordionItem
          key={experience.year}
          value={experience.year}
          className="border-border-muted-alt/80"
        >
          <AccordionTrigger className="group/trigger p-4 cursor-pointer hover:no-underline hover:bg-surface-container-lowest transition-colors">
            <span className="flex w-full items-baseline gap-4">
              <span className="shrink-0 font-detail text-detail text-primary">
                {experience.year}
              </span>
              <span
                className={cn(
                  "text-left text-text-main/95 transition-colors duration-200",
                  // Diminui a opacidade dos títulos quando o mouse entra no container geral
                  "group-hover/accordion:text-text-muted",
                  // Restaura e destaca o item específico sob hover do mouse
                  "group-hover/trigger:text-text-main/95",
                  // Mantém o item aberto destacado via data-attribute nativo do Radix UI
                  "group-data-[state=open]/trigger:text-text-main/95",
                )}
              >
                {experience.title}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="py-2 px-3">
            <p className="text-text-main/85">
              {experience.description}{" "}
              <a
                href={experience.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-primary no-underline transition-colors hover:underline focus-brand"
              >
                Ler mais
              </a>
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AboutExperiences;
