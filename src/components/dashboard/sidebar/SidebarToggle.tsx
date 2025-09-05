import { Button } from '@/components/ui/button';

interface SidebarToggleProps {
	collapsed: boolean;
	toggle: () => void;
}

export function SidebarToggle({ collapsed, toggle }: SidebarToggleProps) {
	return (
		<div className='p-2'>
			<Button
				variant='ghost'
				size='sm'
				onClick={toggle}
			>
				{collapsed ? '⏩' : '⏪'}
			</Button>
		</div>
	);
}
