// components/sidebar/Sidebar.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { sidebarLinks } from '@/constants/sidebar-links';
import { cn } from '@/lib/utils';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {
	collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
	const [expandedSection, setExpandedSection] = useState<string | null>(null);
	const location = useLocation();
	const navigate = useNavigate();

	const handleParentClick = (
		path: string,
		hasChildren: boolean,
		label: string,
	) => {
		if (hasChildren) {
			setExpandedSection((prev) => (prev === label ? null : label));
		} else {
			navigate(path);
		}
	};

	return (
		<aside
			className={cn(
				'hidden md:flex flex-col border-r bg-white h-screen transition-all duration-300 ease-in-out',
				collapsed ? 'w-16' : 'w-64',
			)}
		>
			<nav className='flex flex-col mt-4'>
				{sidebarLinks.map(({ label, icon: Icon, path, children }) => {
					const isActive = location.pathname.startsWith(path);
					const isExpanded = expandedSection === label;
					const hasChildren = children.length > 0;

					return (
						<div
							key={label}
							className='relative'
						>
							{/* main row */}
							<div
								onClick={() =>
									handleParentClick(path, hasChildren, label)
								}
								className={cn(
									'flex items-center px-4 py-2 rounded-md cursor-pointer transition-colors',
									isActive
										? 'bg-muted text-primary'
										: 'hover:bg-muted',
									collapsed
										? 'justify-center'
										: 'justify-between',
								)}
							>
								<div
									className={cn(
										'flex items-center',
										collapsed
											? 'justify-center w-full'
											: 'gap-3',
									)}
								>
									<Icon className='w-5 h-5' />
									{!collapsed && (
										<span className='text-sm font-medium'>
											{label}
										</span>
									)}
								</div>

								{!collapsed &&
									hasChildren &&
									(isExpanded ? (
										<ChevronDownIcon className='w-4 h-4 text-muted-foreground' />
									) : (
										<ChevronRightIcon className='w-4 h-4 text-muted-foreground' />
									))}
							</div>

							{/* sub-links */}
							<AnimatePresence>
								{!collapsed && isExpanded && hasChildren && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className='flex flex-col ml-8 overflow-hidden gap-1'
									>
										{children.map(
											({
												label: subLabel,
												path: subPath,
												icon: SubIcon,
											}) => (
												<SidebarItem
													key={subLabel}
													icon={SubIcon}
													label={subLabel}
													path={subPath}
													collapsed={false}
													isActive={
														location.pathname ===
														subPath
													}
													onClick={() =>
														navigate(subPath)
													}
												/>
											),
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</nav>
		</aside>
	);
}
