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
            className="flex-center p-1  gap-1 text-xs font-detail tracking-widest text-text-main/80"
            target="_blank"
            href={social.link}
          >
            <Icon className="w-5 h-5" icon={social.icon} />
            <span className="uppercase">{socialName}</span>
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
