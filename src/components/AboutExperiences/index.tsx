"use client";

import { EXPERIENCES } from "@/lib/siteContent";
import { cn } from "@/lib/utils";
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
          key={experience.title}
          value={experience.title}
          className="border-border-muted-alt/80 "
        >
          <AccordionTrigger className="group/trigger py-4 px-2 md:p-4 cursor-pointer hover:no-underline hover:bg-surface-container-lowest transition-colors">
            <span className="flex w-full items-center justify-between">
              <div className="flex gap-4 items-center">
                <span className=" font-detail text-detail mt-0.5 text-primary leading-0">
                  {experience.yearEnd ? (
                    <span className="flex flex-col gap-3.5">
                      <p>{experience.yearEnd}</p>
                      <p>{experience.year}</p>
                    </span>
                  ) : (
                    experience.year
                  )}
                </span>
                <span
                  className={cn(
                    "text-left text-text-main/95 transition-colors duration-200 text-body-sm md:text-body-sm",
                    "group-hover/accordion:text-text-muted",
                    "group-hover/trigger:text-text-main/95",
                    "group-data-[state=open]/trigger:text-text-main/95",
                  )}
                >
                  {experience.title}
                </span>
              </div>
              <span
                className={cn(
                  "text-right text-text-main/80 transition-colors duration-200 md:mr-4 mr-1.5 ml-0.5 text-detail md:text-body-sm",
                  "group-hover/accordion:text-text-muted",
                  "group-hover/trigger:text-text-main/90",
                  "group-data-[state=open]/trigger:text-text-main/90",
                )}
              >
                {experience.company}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="py-2 px-3">
            <p className="text-text-main/85 text-caption md:text-body-sm text-justify">
              {experience.description}

              {experience.link !== "" ? (
                <a
                  href={experience.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-primary no-underline transition-colors hover:underline"
                >
                  Ver projeto
                </a>
              ) : null}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AboutExperiences;
