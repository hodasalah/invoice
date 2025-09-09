// components/sidebar/sidebar-item.tsx
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
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
	collapsed,
	isActive,
	onClick,
}: SidebarItemProps) {
	const item = (
		<div
			onClick={onClick}
			className={cn(
				'flex items-center px-4 py-2 rounded-md cursor-pointer select-none transition-colors',
				isActive ? 'bg-muted text-primary' : 'hover:bg-muted',
				collapsed ? 'justify-center' : 'gap-3 justify-start',
			)}
		>
			<Icon className='w-5 h-5' />
			{!collapsed && <span className='text-sm font-medium'>{label}</span>}
		</div>
	);

	return collapsed ? (
		<Tooltip>
			<TooltipTrigger asChild>
				<button>{item}</button>
			</TooltipTrigger>
			<TooltipContent
				side='left'
				arrow
			>
				{label}
			</TooltipContent>
		</Tooltip>
	) : (
		item
	);
}
