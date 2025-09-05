import { SidebarItem } from './sidebar-item';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface MobileSidebarProps {
	open: boolean;
	onClose: () => void;
	items: { icon: LucideIcon; label: string }[];
}

export function MobileSidebar({ open, onClose, items }: MobileSidebarProps) {
	return (
		<aside
			className={`fixed inset-y-0 left-0 w-64 bg-white z-50 p-4 shadow-lg transition-transform duration-300 md:hidden ${
				open ? 'translate-x-0' : '-translate-x-full'
			}`}
		>
			<div className='flex justify-end mb-4'>
				<Button
					variant='ghost'
					size='sm'
					onClick={onClose}
				>
					إغلاق
				</Button>
			</div>
			<nav className='flex flex-col gap-2'>
				{items.map((item) => (
					<SidebarItem
						key={item.label}
						icon={item.icon}
						label={item.label}
						collapsed={false}
					/>
				))}
			</nav>
		</aside>
	);
}
