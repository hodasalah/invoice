// components/layout/Header.tsx
import { Button } from '@/components/ui/button';
import  { Menu as MenuIcon } from 'lucide-react';

interface HeaderProps {
	collapsed: boolean;
	toggleCollapse: () => void;
	onMobileMenuClick: () => void;
}

export function Header({
	collapsed,
	toggleCollapse,
	onMobileMenuClick,
}: HeaderProps) {
	return (
		<header className='flex items-center justify-between p-4 border-b bg-white'>
			<div className='flex items-center gap-2'>
				{/* زرار فتح الموبايل */}
				<Button
					variant='outline'
					size='sm'
					className='md:hidden'
					onClick={onMobileMenuClick}
				>
					<MenuIcon className='w-5 h-5' />
				</Button>
				{/* زرار collapse/expand للـ desktop */}
				<Button
					variant='ghost'
					size='sm'
					className='hidden md:inline-flex'
					onClick={toggleCollapse}
				>
					{collapsed ? '⏩' : '⏪'}
				</Button>
				{/* عنوان */}
				<h2 className='text-xl font-semibold'>
					Hi Hoda, Welcome Back!
				</h2>
			</div>

			<div className='flex items-center gap-2'>
				{/* التاريخ */}
				<span className='text-sm text-muted-foreground'>
					09/18/2025
				</span>
			</div>
		</header>
	);
}
