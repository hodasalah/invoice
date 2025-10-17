// pages/DashboardPage.tsx
import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { MobileSidebar } from '@/components/dashboard/sidebar/MobileSidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
export default function DashboardPage() {
	const [collapsed, setCollapsed] = useState<boolean>(() => {
		const saved = localStorage.getItem('sidebarCollapsed');
		return saved ? JSON.parse(saved) : false;
	});

	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
	}, [collapsed]);

	return (
		<div className='flex h-screen overflow-hidden'>
			{/* Desktop Sidebar */}
			<TooltipProvider>
				<Sidebar collapsed={collapsed} />

				{/* Mobile Sidebar */}
				<MobileSidebar
					open={mobileOpen}
					onClose={() => setMobileOpen(false)}
				/>

				{/* المحتوى الرئيسي + الهيدر */}
				<div className='flex-1 flex flex-col overflow-auto'>
					<Header
						collapsed={collapsed}
						toggleCollapse={() => setCollapsed((prev) => !prev)}
						onMobileMenuClick={() => setMobileOpen(true)}
					/>
					<main className='p-4'>
						<Outlet />
					</main>
				</div>
			</TooltipProvider>
		</div>
	);
}
