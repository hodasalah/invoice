import { Button } from '@/components/ui/button';

interface HeaderProps {
	onMobileMenuClick: () => void;
}

export function Header({ onMobileMenuClick }: HeaderProps) {
	return (
		<header className='flex justify-between items-center p-4 border-b bg-white'>
			<h2 className='text-xl font-semibold'>Hi Hoda, Welcome Back!</h2>
			<div className='flex items-center gap-2'>
				<span className='text-sm text-muted-foreground'>
					06/19/2025
				</span>
				<Button
					variant='outline'
					size='sm'
					className='md:hidden'
					onClick={onMobileMenuClick}
				>
					☰
				</Button>
			</div>
		</header>
	);
}
