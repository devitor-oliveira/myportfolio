"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const experiences = [
  {
    year: "2024",
    title: "Desenvolvedor Front-end Sênior",
    description:
      "Liderança técnica em aplicações web de alta escala, arquitetura de componentes, code review e mentoria de desenvolvedores júnior em um time ágil.",
    link: "https://example.com/experience/senior-frontend",
  },
  {
    year: "2023",
    title: "Desenvolvedor Front-end",
    description:
      "Desenvolvimento de interfaces com React e TypeScript, integração de APIs REST, testes e melhorias de performance e acessibilidade.",
    link: "https://example.com/experience/frontend",
  },
  {
    year: "2022",
    title: "Desenvolvedor Web Júnior",
    description:
      "Construção de landing pages e sites responsivos, manutenção de projetos legados e colaboração com designers e product managers.",
    link: "https://example.com/experience/junior",
  },
];

function AboutExperiences() {
  const [hovered, setHovered] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const [openYear, setOpenYear] = useState<string | null>(null);

  return (
    <Accordion
      type="single"
      collapsible
      value={openYear as string}
      onValueChange={setOpenYear}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {experiences.map((experience) => {
        const isActive =
          hoveredYear === experience.year || openYear === experience.year;

        return (
          <AccordionItem
            key={experience.year}
            value={experience.year}
            className="border-border-muted-alt/80"
          >
            <AccordionTrigger
              className="p-4 hover:no-underline cursor-pointer hover:bg-surface-container-lowest"
              onMouseEnter={() => setHoveredYear(experience.year)}
              onMouseLeave={() => setHoveredYear(null)}
            >
              <span className="flex w-full items-baseline gap-4">
                <span className="shrink-0 font-detail text-detail text-primary">
                  {experience.year}
                </span>
                <span
                  className={cn(
                    "text-left transition-colors duration-200 ",
                    hovered && !isActive
                      ? "text-muted-foreground"
                      : isActive
                        ? "text-text-main/95"
                        : "text-text-main/95",
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
                  className="inline-block no-underline text-primary transition-colors hover:text-primary"
                >
                  Ler mais
                </a>
              </p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default AboutExperiences;
