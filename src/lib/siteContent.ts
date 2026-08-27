import type { CardProps } from '@/components/Card/HeroCard.astro';

const socials = ['linkedin', 'github', 'discord'];

export const heroCardContent: CardProps = {
	title: 'Olá, sou o Vitor!',
	description:
		'Sou um desenvolvedor web apaixonado por criar experiências digitais envolventes e funcionais. Com habilidades em front-end e back-end, busco constantemente aprimorar minhas competências e explorar novas tecnologias para entregar soluções inovadoras.',
	image: '',
	socials: socials,
};
