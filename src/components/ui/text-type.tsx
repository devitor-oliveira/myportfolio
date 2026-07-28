'use client';

import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextTypeProps {
	words: string[];
	typingSpeed?: number;
	deletingSpeed?: number;
	pauseDuration?: number;
	className?: string;
	variant?: 'default' | 'last-word-colorful' | 'one-word';
}

export default function TextType({
	words,
	typingSpeed = 120,
	deletingSpeed = 50,
	pauseDuration = 2000,
	className,
	variant = 'default',
}: TextTypeProps) {
	const [currentWordIndex, setCurrentWordIndex] =
		useState(0);
	const [currentText, setCurrentText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		if (!words || words.length === 0) return;

		const fullWord = words[currentWordIndex];
		const speed = isDeleting ? deletingSpeed : typingSpeed;

		const handleType = () => {
			if (!isDeleting) {
				setCurrentText(
					fullWord.substring(0, currentText.length + 1)
				);
				if (currentText === fullWord) {
					setTimeout(
						() => setIsDeleting(true),
						pauseDuration
					);
				}
			} else {
				setCurrentText(
					fullWord.substring(0, currentText.length - 1)
				);
				if (currentText === '') {
					setIsDeleting(false);
					setCurrentWordIndex(
						(prev) => (prev + 1) % words.length
					);
				}
			}
		};

		const timer = setTimeout(handleType, speed);
		return () => clearTimeout(timer);
	}, [
		currentText,
		isDeleting,
		currentWordIndex,
		words,
		typingSpeed,
		deletingSpeed,
		pauseDuration,
	]);

	// string mais longa do array define a largura máxima reservada
	const longestWord = useMemo(() => {
		if (!words || words.length === 0) return '';
		return words.reduce(
			(a, b) => (b.length > a.length ? b : a),
			''
		);
	}, [words]);

	const renderedContent = useMemo(() => {
		if (variant === 'one-word' || variant === 'default') {
			return (
				<span className={cn(className)}>{currentText}</span>
			);
		}

		if (variant === 'last-word-colorful') {
			const fraseCompleta = words[currentWordIndex];
			const ultimoEspacoIndex =
				fraseCompleta.lastIndexOf(' ');

			if (ultimoEspacoIndex === -1) {
				return (
					<span className={cn(className)}>
						{currentText}
					</span>
				);
			}

			const tamanhoTextoBase = ultimoEspacoIndex + 1;

			if (currentText.length <= tamanhoTextoBase) {
				return <span>{currentText}</span>;
			}

			const textoBaseDigitado = currentText.substring(
				0,
				tamanhoTextoBase
			);
			const ultimaPalavraParcial = currentText.substring(
				tamanhoTextoBase
			);

			return (
				<>
					<span>{textoBaseDigitado}</span>
					<span className={cn(className)}>
						{ultimaPalavraParcial}
					</span>
				</>
			);
		}

		return null;
	}, [
		currentText,
		variant,
		className,
		words,
		currentWordIndex,
	]);

	return (
		<span className="relative inline-grid animate-cursor-blink border-r-2 border-transparent pr-1 will-change-contents leading-normal">
			{/* reserva de espaço: mesma célula do grid, invisível, nunca muda de tamanho */}
			<span
				aria-hidden="true"
				className={cn(
					'invisible col-start-1 row-start-1 whitespace-pre leading-normal',
					className
				)}
			>
				{longestWord}
			</span>

			{/* conteúdo animado, sobreposto na mesma célula */}
			<span className="col-start-1 row-start-1 whitespace-pre leading-normal">
				{currentText ? renderedContent : '\u00A0'}
			</span>
		</span>
	);
}
