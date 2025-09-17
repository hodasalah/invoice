// Header.tsx
import { PrimaryBtn } from '@/components/shared/button';
import { SearchBar } from '@/components/shared/ٍSearchBar';
import { appRoutes } from '@/routes/routesConfig';
import { Bell, Inbox, Mail, Menu, Plus } from 'lucide-react';
import { matchPath, useLocation } from 'react-router';
import { HeaderIcon } from './HeaderIcon';
import { SidebarButton } from './SidebarButton';

type HeaderProps = {
	collapsed: boolean;
	toggleCollapse: () => void;
	onMobileMenuClick: () => void;
};

export function Header({
	collapsed,
	toggleCollapse,
	onMobileMenuClick,
}: HeaderProps) {
	const location = useLocation();

	// نجيب العنوان من الـ route object مباشرة
	const currentRoute = appRoutes.find((route) =>
		matchPath({ path: route.path, end: true }, location.pathname),
	);

	const pageTitle = currentRoute?.title || 'Page';

	return (
		<header className='flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900'>
			<div className='flex items-center gap-3'>
				<PrimaryBtn
					type='button'
					disabled={false}
					className='md:hidden'
					onClick={onMobileMenuClick}
				>
					<Menu className='w-5 h-5' />
				</PrimaryBtn>
				<SidebarButton
					collapsed={collapsed}
					toggleCollapse={toggleCollapse}
				/>

				<h2 className='text-lg md:text-xl font-semibold text-primary dark:text-gray-100'>
					{pageTitle}
				</h2>
			</div>
			<SearchBar />
			<div className='flex items-center gap-4'>
				<div className='flex gap-4 items-center'>
					<HeaderIcon
						icon={<Bell size={20} />}
						gradientClass='bg-gradient1'
						tooltip='Notifications'
						count={5}
					/>
					<HeaderIcon
						icon={<Mail size={20} />}
						gradientClass='bg-gradient2'
						tooltip='Messages'
						count={2}
					/>
					<HeaderIcon
						icon={<Inbox size={20} />}
						gradientClass='bg-gradient3'
						tooltip='New Invoice'
						count={10}
					/>
				</div>
				<PrimaryBtn
					type='button'
					disabled={false}
					icon={<Plus className='w-4 h-4' />}
					onClick={() => console.log('Create Invoice')}
				>
					Create Invoice
				</PrimaryBtn>
			</div>
		</header>
	);
}
