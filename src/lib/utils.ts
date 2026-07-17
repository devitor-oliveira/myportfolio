import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date
    .toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
    .replace('. de', ',');
}
