import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
	icon: LucideIcon;
	label: string;
	collapsed: boolean;
}

export function SidebarItem({
	icon: Icon,
	label,
	collapsed,
}: SidebarItemProps) {
	return (
		<div
			className={cn(
				'flex items-center px-4 py-2 rounded-md cursor-pointer transition-colors hover:bg-muted',
				collapsed ? 'justify-center' : 'gap-3 justify-start',
			)}
		>
			<Icon className='w-5 h-5' />
			{!collapsed && <span className='text-sm font-medium'>{label}</span>}
		</div>
	);
}
