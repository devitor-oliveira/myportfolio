import { useState } from 'react';
import { Input } from '../ui/input';
import { RippleButton } from '../ui/ripple-button';
import {
	AnimatedSpan,
	Terminal,
	TypingAnimation,
} from '../ui/terminal';
import { Icon } from '@iconify/react';
import {
	useTerminalCommand,
	type CommandLog,
} from '@/hooks/useTerminalCommand';
import TextType from '../ui/text-type';
import { commands } from '@/lib/utils';

interface TerminalHeroProps {
	lastPostID: string;
}

function TerminalHero({ lastPostID }: TerminalHeroProps) {
	const [inputCMD, setInputCMD] = useState('');
	const { logs, executeCommand } = useTerminalCommand();

	const handleSubmit = (ev: React.SubmitEvent) => {
		ev.preventDefault();
		executeCommand(inputCMD, lastPostID);
		setInputCMD('');
		return;
	};

	return (
		<Terminal
			sequence={false}
			className=" flex flex-col h-full w-full max-h-none border border-blue bg-bg-main shadow-xl"
		>
			<div className="flex flex-col min-h-0 flex-1">
				<div className="flex flex-col overflow-y-auto min-h-0 flex-1 pr-2 font-detail text-caption">
					<p className="animate-fade-up text-text-main/70">
						Terminal iniciando...
					</p>
					<TypingAnimation
						startOnView={false}
						delay={0}
						duration={30}
						className="text-success"
					>
						{'[OK] Componentes carregados...'}
					</TypingAnimation>
					<TypingAnimation
						startOnView={false}
						delay={1000}
						duration={30}
						className="text-warning"
					>
						{'[WARN] Aguardando comandos...'}
					</TypingAnimation>
					{logs.map((log: CommandLog) => {
						return (
							<>
								<TypingAnimation
									className="text-success"
									key={log.id}
								>
									{log.command}
								</TypingAnimation>
								{log.status === 'pending' && (
									<TextType
										className="text-text-main/80"
										words={['Executando...']}
										variant="one-word"
									/>
								)}
								{log.status === 'success' && (
									<AnimatedSpan className="text-success">
										{log.output}
									</AnimatedSpan>
								)}
								{log.status === 'failed' && (
									<AnimatedSpan className="text-danger">
										{log.output}
									</AnimatedSpan>
								)}
							</>
						);
					})}
				</div>
				<div className="flex gap-1.5">
					{commands
						? commands.map((cmd) => {
								return (
									<RippleButton
										className="rounded-full border border-border-muted-alt bg-bg-surface px-2 py-0.5 font-detail text-[11px] leading-none text-text-main/75 transition-colors hover:border-brand-hover  hover:text-brand-hover"
										rippleColor="#03a9f4"
										key={cmd.name}
										onClick={() => setInputCMD(cmd.input)}
									>
										{cmd.name}
									</RippleButton>
								);
							})
						: null}
				</div>
				<form
					onSubmit={handleSubmit}
					className="mt-2 flex shrink-0 items-center gap-1"
				>
					<Input
						placeholder="Insira um comando..."
						type="text"
						value={inputCMD}
						onChange={(ev) => setInputCMD(ev.target.value)}
						className="border-border-muted bg-bg-surface font-detail text-body-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-border-muted"
					/>
					<RippleButton
						type="submit"
						disabled={!inputCMD.trim()}
						className=" border-none h-auto w-auto p-0 font-detail text-caption font-medium text-brand-primary transition-colors  disabled:cursor-not-allowed disabled:opacity-40"
					>
						<Icon
							className="h-8 w-8"
							icon="ic:round-keyboard-arrow-right"
						/>
					</RippleButton>
				</form>
			</div>
		</Terminal>
	);
}

export default TerminalHero;
