import { useState, useEffect } from 'react';
import { SidebarItem } from './SidebarItem';
import { SidebarToggle } from './SidebarToggle';
import { MobileSidebar } from './MobileSidebar';
import { FileTextIcon, UsersIcon, SettingsIcon } from 'lucide-react';

export function Sidebar() {
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
		<>
			{/* Desktop Sidebar */}
			<aside
				className={`hidden md:flex flex-col border-r bg-white transition-all duration-300 ease-in-out ${
					collapsed ? 'w-16' : 'w-64'
				}`}
			>
				<SidebarToggle
					collapsed={collapsed}
					toggle={() => setCollapsed(!collapsed)}
				/>
				<nav className='flex flex-col gap-2 mt-4'>
					{items.map((item) => (
						<SidebarItem
							key={item.label}
							icon={item.icon}
							label={item.label}
							collapsed={collapsed}
						/>
					))}
				</nav>
			</aside>

			{/* Mobile Sidebar */}
			<MobileSidebar
				open={mobileOpen}
				onClose={() => setMobileOpen(false)}
				items={items}
			/>

			{/* زر فتح الموبايل سايدبار */}
			<div className='md:hidden p-2'>
				<button onClick={() => setMobileOpen(true)}>☰</button>
			</div>
		</>
	);
}
