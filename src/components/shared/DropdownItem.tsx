import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface UserDropdownItemProps {
	icon: LucideIcon;
	label: string;
	onClick: () => void;
	isActive?: boolean;
}

export function DropdownItem({
	icon: Icon,
	label,
	onClick,
	isActive,
}: UserDropdownItemProps) {
	return (
		<div
			onClick={onClick}
			className={cn(
				'flex items-center px-4 py-2 rounded-md cursor-pointer select-none transition-colors',
				isActive ? 'bg-muted text-primary' : 'hover:bg-muted',
			)}
		>
			<Icon className='w-5 h-5' />
			<span className='text-sm font-medium ml-3'>{label}</span>
		</div>
	);
}
