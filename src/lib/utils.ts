import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, day: boolean = false): string {
  return day ? date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : 
    date
    .toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
    .replace('. de', ',');
}


export const terminalTitles: string[] = ['[ Vitor Dev ]' , '[ Full Stack ]', '[ Available for projects ]']

export const commands: command[] = [
	{ name: '/last-post', input: 'cd last --post' },
	{ name: '/last-project', input: 'cd last --project' },
];

export type command = {name: string, input: string}