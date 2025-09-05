import { useState, useEffect } from 'react';
import { FileTextIcon, UsersIcon, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Dashboard() {
	const [collapsed, setCollapsed] = useState(() => {
		const saved = localStorage.getItem('sidebarCollapsed');
		return saved ? JSON.parse(saved) : false;
	});

	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
	}, [collapsed]);

	const items = [
		{ icon: FileTextIcon, label: 'Invoices' },
		{ icon: UsersIcon, label: 'Clients' },
		{ icon: SettingsIcon, label: 'Settings' },
	];

	return (
		<div className='flex h-screen overflow-hidden'>
			{/* Sidebar - Desktop */}
			<aside
				className={cn(
					'hidden md:flex flex-col border-r bg-white transition-all duration-300 ease-in-out',
					collapsed ? 'w-16' : 'w-64',
				)}
			>
				{/* Toggle Button */}
				<div className='p-2'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => setCollapsed(!collapsed)}
					>
						{collapsed ? '⏩' : '⏪'}
					</Button>
				</div>

				{/* Sidebar Items */}
				<nav className='flex flex-col gap-2 mt-4'>
					{items.map((item) => (
						<div
							key={item.label}
							className={cn(
								'flex items-center px-4 py-2 rounded-md cursor-pointer transition-colors hover:bg-muted',
								collapsed
									? 'justify-center'
									: 'gap-3 justify-start',
							)}
						>
							<item.icon className='w-5 h-5' />
							{!collapsed && (
								<span className='text-sm font-medium'>
									{item.label}
								</span>
							)}
						</div>
					))}
				</nav>
			</aside>

			{/* Sidebar - Mobile */}
			<aside
				className={cn(
					'fixed inset-y-0 left-0 w-64 bg-white z-50 p-4 shadow-lg transition-transform duration-300 md:hidden',
					mobileOpen ? 'translate-x-0' : '-translate-x-full',
				)}
			>
				<div className='flex justify-end mb-4'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => setMobileOpen(false)}
					>
						إغلاق
					</Button>
				</div>
				<nav className='flex flex-col gap-2'>
					{items.map((item) => (
						<div
							key={item.label}
							className='flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors hover:bg-muted'
						>
							<item.icon className='w-5 h-5' />
							<span className='text-sm font-medium'>
								{item.label}
							</span>
						</div>
					))}
				</nav>
			</aside>

			{/* Main Content */}
			<div className='flex-1 overflow-auto'>
				{/* Header */}
				<header className='flex justify-between items-center p-4 border-b bg-white'>
					<h2 className='text-xl font-semibold'>
						Hi Hoda, Welcome Back!
					</h2>
					<div className='flex items-center gap-2'>
						<span className='text-sm text-muted-foreground'>
							06/19/2025
						</span>
						<Button
							variant='outline'
							size='sm'
							className='md:hidden'
							onClick={() => setMobileOpen(true)}
						>
							☰
						</Button>
					</div>
				</header>

				{/* باقي المحتوى هنا */}
				<main className='p-4'>
					<p className='text-muted-foreground'>
						Dashboard content goes here...
					</p>
				</main>
			</div>
		</div>
	);
}
