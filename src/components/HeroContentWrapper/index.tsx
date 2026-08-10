import { useState } from 'react';
import HeroTabs from '../HeroTabs';

interface HeroContentProps {
	CardHeroSlot?: React.ReactNode;
	TerminalSlot?: React.ReactNode;
}
export type TabsType = 'terminal' | 'split' | 'card';

function HeroContentWrapper({
	CardHeroSlot,
	TerminalSlot,
}: HeroContentProps) {
	const [activeTab, setActiveTab] =
		useState<TabsType>('split');

	return (
		<section className=" flex flex-col min-h-120 max-w-6xl border border-border-muted-alt">
			<HeroTabs
				tab={activeTab}
				setTab={setActiveTab}
			></HeroTabs>
			{activeTab === 'split' ? (
				<div className="flex min-h-120 w-full grow">
					<div className="flex min-h-120 max-w-1/2">
						{CardHeroSlot}
					</div>
					<div className="flex min-h-120 grow border-l border-muted">
						{TerminalSlot}
					</div>
				</div>
			) : null}
			{activeTab === 'card' ? (
				<div className="flex min-h-120 min-w-6xl grow">
					<div className="flex grow">{CardHeroSlot}</div>
				</div>
			) : null}
			{activeTab === 'terminal' ? (
				<div className="flex min-h-120 min-w-6xl grow">
					<div className="flex grow">{TerminalSlot}</div>
				</div>
			) : null}
		</section>
	);
}

export default HeroContentWrapper;
