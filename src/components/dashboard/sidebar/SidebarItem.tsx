import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import type { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
	icon: LucideIcon;
	label: string;
	collapsed: boolean;
	isActive?: boolean;
	path: string;
	onClick: () => void;
}

export function SidebarItem({
	icon: Icon,
	label,
	collapsed=true,
	isActive,
	onClick,
}: SidebarItemProps) {
	const content = (
		<div
			onClick={onClick}
			className={cn(
				'flex items-center px-4 py-2 rounded-md cursor-pointer select-none transition-colors',
				isActive ? 'bg-muted text-primary' : 'hover:bg-muted',
				collapsed ? 'justify-center' : 'gap-2 justify-start',
			)}
		>
			<Icon className='w-6 h-6' />
			{!collapsed && <span className='text-sm font-medium'>{label}</span>}
		</div>
	);

	if (collapsed) {
		return (
			<Tooltip>
				<TooltipTrigger asChild>{content}</TooltipTrigger>
				<TooltipContent
					side='bottom'
					arrow
				>
					{label}
					<TooltipArrow />
				</TooltipContent>
			</Tooltip>
		);
	}

	return content;
}
