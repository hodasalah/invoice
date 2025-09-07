// pages/dashboard.tsx
import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { MobileSidebar } from '@/components/dashboard/sidebar/MobileSidebar';
import { useState } from 'react';

export default function DashboardPage() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className='flex h-screen overflow-hidden'>
			{/* Desktop (wide/mini) sidebar */}
			<Sidebar />

			{/* Mobile sidebar */}
			<MobileSidebar
				open={mobileOpen}
				onClose={() => setMobileOpen(false)}
			/>

			{/* Main content area */}
			<div className='flex-1 flex flex-col overflow-auto'>
				{/* Header with burger menu on mobile */}
				<Header onMobileMenuClick={() => setMobileOpen(true)} />

				{/* Your dashboard content goes here */}
				<main className='p-4'>
					{/* e.g. Greeting, search, action buttons, charts… */}
				</main>
			</div>
		</div>
	);
}
