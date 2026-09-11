import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

function Spinner({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Icon>, "icon">) {
  return (
    <Icon
      icon="mdi:loading"
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
