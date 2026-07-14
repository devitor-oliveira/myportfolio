import type { ComponentProps } from 'react';

type Variants = 'default' | 'tab';

interface ButtonProps extends ComponentProps<'button'> {
  isActive?: boolean;
  variant?: Variants;
}

const variantStyle: Record<Variants, string> = {
  default: 'cursor-pointer bg-neutral-900 text-white p-2 rounded',
  tab: 'cursor-pointer text-neutral-400 hover:text-white',
};

const activeTabStyle = 'active-tab';

export default function Button({
  variant = 'default',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${variantStyle[variant]} font-body text-2xs transition-colors duration-150 ${className} ${props.isActive ? activeTabStyle : ''}`}
      {...props}
    />
  );
}
