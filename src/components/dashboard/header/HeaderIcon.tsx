import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import type { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeaderIconProps {
  icon: ReactNode;
  gradientClass: string;
  tooltip?: string;
  count?: number;
  popoverContent?: ReactNode;
}

export const HeaderIcon: FC<HeaderIconProps> = ({
	icon,
	gradientClass,
	tooltip,
	count,
	popoverContent,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const triggerButton = (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className={cn(
				'relative w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md cursor-pointer transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-950',
				gradientClass,
			)}
		>
			<div className='z-10'>{icon}</div>

			{typeof count === 'number' && count > 0 && (
				<span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow z-20 animate-pulse'>
					{count}
				</span>
			)}
		</motion.button>
	);

	const iconWithTooltip = tooltip ? (
		<Tooltip.Root open={isOpen ? false : undefined} delayDuration={200}>
			<Tooltip.Trigger asChild>
				{triggerButton}
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					side='bottom'
					sideOffset={6}
					className='bg-slate-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium shadow-md border border-slate-800 z-50'
				>
					{tooltip}
					<Tooltip.Arrow className='fill-slate-900' />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	) : (
		triggerButton
	);

	if (!popoverContent) {
		return iconWithTooltip;
	}

	return (
		<Popover.Root open={isOpen} onOpenChange={setIsOpen}>
			<Tooltip.Root open={isOpen ? false : undefined} delayDuration={200}>
				<Tooltip.Trigger asChild>
					<Popover.Trigger asChild>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={cn(
								'relative w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md cursor-pointer transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-950',
								gradientClass,
							)}
						>
							<div className='z-10'>{icon}</div>

							{typeof count === 'number' && count > 0 && (
								<span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow z-20 animate-pulse'>
									{count}
								</span>
							)}
						</motion.button>
					</Popover.Trigger>
				</Tooltip.Trigger>
				{tooltip && (
					<Tooltip.Portal>
						<Tooltip.Content
							side='bottom'
							sideOffset={6}
							className='bg-slate-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium shadow-md border border-slate-800 z-50'
						>
							{tooltip}
							<Tooltip.Arrow className='fill-slate-900' />
						</Tooltip.Content>
					</Tooltip.Portal>
				)}
			</Tooltip.Root>
			<Popover.Portal>
				<Popover.Content
					side='bottom'
					align='end'
					sideOffset={8}
					className='z-50 w-80 md:w-96 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl outline-none overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-200'
				>
					{popoverContent}
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};
