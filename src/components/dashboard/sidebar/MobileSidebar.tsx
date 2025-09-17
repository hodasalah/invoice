// components/sidebar/mobile-sidebar.tsx
import { PrimaryBtn } from '@/components/shared/button';
import { SidebarItem } from './SidebarItem';
import { sidebarLinks } from '@/constants/sidebar-links';
import { cn } from '@/lib/utils';
import { LucideSidebarClose } from 'lucide-react';

interface MobileSidebarProps {
	open: boolean;
	onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
	return (
		<aside
			className={cn(
				'fixed inset-y-0 left-0 w-64 bg-white z-50 p-4 shadow-lg transition-transform duration-300 md:hidden',
				open ? 'translate-x-0' : '-translate-x-full',
			)}
		>
			<div className='flex justify-end mb-4'>
				<PrimaryBtn
					type='button'
					className=''
					onClick={onClose}
					children={<LucideSidebarClose className='h-5 w-5' />}
					disabled={false}
				></PrimaryBtn>
			</div>
			<nav className='flex flex-col gap-2'>
				{sidebarLinks.map(({ label, icon, path, children }) => (
					<div key={label}>
						<SidebarItem
							icon={icon}
							label={label}
							path={path}
							collapsed={false}
							onClick={onClose}
						/>
						{children.length > 0 && (
							<div className='ml-6 mt-1 flex flex-col gap-1'>
								{children.map(({ label, path, icon }) => (
									<SidebarItem
										key={label}
										icon={icon}
										label={label}
										path={path}
										collapsed={false}
										onClick={onClose}
									/>
								))}
							</div>
						)}
					</div>
				))}
			</nav>
		</aside>
	);
}
