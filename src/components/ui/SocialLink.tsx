import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

import { Icon } from "@iconify/react";

export interface socialItem {
  icon: string;
  link: string;
  tooltipValue?: string;
}

interface socialProps {
  social: socialItem;
  socialName?: string;
}

const SocialLink = ({ social, socialName }: socialProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            rel="noreferrer"
            className="flex-center p-1 hover:text-primary-container gap-3 font-detail tracking-wide text-text-main/85"
            target="_blank"
            href={social.link}
          >
            {/* <Icon className="w-5 h-5" icon={social.icon} /> */}
            <span className="capitalize text-caption md:text-[13px]">
              {socialName}
            </span>
          </a>
        </TooltipTrigger>
        {social.tooltipValue ? (
          <TooltipContent className="bg-border-muted-alt text-border-muted-alt">
            <p className="text-text-main">{social.tooltipValue}</p>
          </TooltipContent>
        ) : null}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SocialLink;
