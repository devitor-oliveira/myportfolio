import { useState } from 'react';
import { Input } from '../ui/input';
import { RippleButton } from '../ui/ripple-button';
import { Terminal, TypingAnimation } from '../ui/terminal';

const commands = [
	{ name: '/last-post', input: 'cd last --post' },
	{ name: '/last-project', input: 'cd last --project' },
];

function TerminalHero() {
	const [inputCMD, setInputCMD] = useState('');
	return (
		<Terminal className=" flex flex-col h-full w-full max-h-none border border-blue">
			<div className="flex flex-col min-h-0 flex-1">
				<div className="flex flex-col overflow-y-auto min-h-0 flex-1 pr-2">
					<p>Terminal iniciando...</p>
					<TypingAnimation>'hello World'</TypingAnimation>
				</div>
				<div className="flex gap-1.5">
					{commands
						? commands.map((cmd) => {
								return (
									<RippleButton
										className="text-xs p-1 rounded-full border"
										key={cmd.name}
										onClick={() => setInputCMD(cmd.input)}
									>
										{cmd.name}
									</RippleButton>
								);
							})
						: null}
				</div>
				<form action="" className="shrink-0 mt-1 w-full ">
					<Input
						placeholder="Insira um comando..."
						type="text"
						value={inputCMD}
						className=" bg-bg-b border"
					/>
				</form>
			</div>
		</Terminal>
	);
}

export default TerminalHero;
