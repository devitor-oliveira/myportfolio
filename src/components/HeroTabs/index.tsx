import type { TabsType } from '../HeroContentWrapper';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

interface HeroTabsProps {
	tab?: TabsType;
	setTab?: (tab: TabsType) => void;
}

const HeroTabs = ({ tab, setTab }: HeroTabsProps) => {
	return (
		<header className="flex w-full p-2 bg-[#1B191F] border-b border-border-muted-alt">
			<Tabs
				value={tab}
				onValueChange={setTab}
				defaultValue="split"
			>
				<TabsList
					variant="line"
					className="font-detail tracking-wide"
				>
					<TabsTrigger value="split">Split</TabsTrigger>
					<TabsTrigger value="card"> Card</TabsTrigger>
					<TabsTrigger value="terminal">
						Terminal
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</header>
	);
};

export default HeroTabs;
