'use client';

import type * as React from 'react';
import {
	cva,
	type VariantProps,
} from 'class-variance-authority';
import { Tabs as TabsPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

function Tabs({
	className,
	orientation = 'horizontal',
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			data-orientation={orientation}
			className={cn(
				'group/tabs flex gap-2 data-horizontal:flex-col',
				className
			)}
			{...props}
		/>
	);
}

const tabsListVariants = cva(
	'group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none',
	{
		variants: {
			variant: {
				default: 'bg-muted',
				line: 'gap-1 bg-transparent',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

function TabsList({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
	VariantProps<typeof tabsListVariants>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			data-variant={variant}
			className={cn(
				tabsListVariants({ variant }),
				className
			)}
			{...props}
		/>
	);
}

function TabsTrigger({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				// Estrutura básica e acessibilidade neutra
				'relative inline-flex h-full items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium transition-all cursor-pointer whitespace-nowrap outline-none disabled:pointer-events-none disabled:opacity-50',
				// Suporte genérico à linha inferior na variante "line" (a cor será definida no className/CVA)
				'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:opacity-0 after:transition-opacity',
				'group-data-[variant=line]/tabs-list:data-active:after:opacity-100',
				className
			)}
			{...props}
		/>
	);
}

function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn(
				'flex-1 text-sm outline-none',
				className
			)}
			{...props}
		/>
	);
}

export {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	tabsListVariants,
};
