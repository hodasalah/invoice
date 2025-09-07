// components/sidebar/Sidebar.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sidebarLinks } from '@/constants/sidebar-links';
import { cn } from '@/lib/utils';
import { SidebarItem } from './SidebarItem';
import { SidebarToggle } from './SidebarToggle';

export function Sidebar() {
	const [collapsed, setCollapsed] = useState<boolean>(() => {
		const saved = localStorage.getItem('sidebarCollapsed');
		return saved ? JSON.parse(saved) : false;
	});
	const [expandedSection, setExpandedSection] = useState<string | null>(null);
	const [mobileOpen, setMobileOpen] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
	}, [collapsed]);

	const handleParentClick = (
		path: string,
		hasChildren: boolean,
		label: string,
	) => {
		if (hasChildren) {
			setExpandedSection((prev) => (prev === label ? null : label));
		} else {
			navigate(path);
			setMobileOpen(false);
		}
	};

	return (
		<>
			{/* Desktop Sidebar (wide + mini) */}
			<aside
				className={cn(
					'hidden md:flex flex-col border-r bg-white h-screen transition-all duration-300 ease-in-out',
					collapsed ? 'w-16' : 'w-64',
				)}
			>
				<SidebarToggle
					collapsed={collapsed}
					toggle={() => setCollapsed((prev) => !prev)}
				/>

				<nav className='flex flex-col mt-4'>
					{sidebarLinks.map(
						({ label, icon: Icon, path, children }) => {
							const isActive = location.pathname.startsWith(path);
							const isExpanded = expandedSection === label;
							const hasChildren = children.length > 0;

							// Mini mode + children → use DropdownMenu
							if (collapsed && hasChildren) {
								return (
									<DropdownMenu key={label}>
										<DropdownMenuTrigger asChild>
											<div
												className={cn(
													'flex items-center justify-center p-2 rounded-md cursor-pointer transition-colors',
													isActive
														? 'bg-muted text-primary'
														: 'hover:bg-muted',
												)}
											>
												<Icon className='w-5 h-5' />
											</div>
										</DropdownMenuTrigger>

										<DropdownMenuContent
											side='right'
											align='start'
											sideOffset={4}
											className='min-w-[160px] p-1'
										>
											<DropdownMenuArrow className='fill-current text-popover-border' />
											<DropdownMenuLabel className='px-2 text-sm font-medium'>
												{label}
											</DropdownMenuLabel>
											{children.map(
												({
													label: subLabel,
													path: subPath,
													icon: SubIcon,
												}) => (
													<DropdownMenuItem
														key={subLabel}
														onSelect={() =>
															navigate(subPath)
														}
														className='gap-2 px-2 py-1 text-sm'
													>
														<SubIcon className='w-4 h-4' />
														{subLabel}
													</DropdownMenuItem>
												),
											)}
										</DropdownMenuContent>
									</DropdownMenu>
								);
							}

							// Wide mode or no children
							return (
								<div
									key={label}
									className='relative'
								>
									<div
										onClick={() =>
											handleParentClick(
												path,
												hasChildren,
												label,
											)
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

									<AnimatePresence>
										{!collapsed &&
											isExpanded &&
											hasChildren && (
												<motion.div
													initial={{
														height: 0,
														opacity: 0,
													}}
													animate={{
														height: 'auto',
														opacity: 1,
													}}
													exit={{
														height: 0,
														opacity: 0,
													}}
													transition={{
														duration: 0.2,
													}}
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
																collapsed={
																	false
																}
																isActive={
																	location.pathname ===
																	subPath
																}
																onClick={() =>
																	navigate(
																		subPath,
																	)
																}
															/>
														),
													)}
												</motion.div>
											)}
									</AnimatePresence>
								</div>
							);
						},
					)}
				</nav>
			</aside>

			{/* Mobile Sidebar */}
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
					{sidebarLinks.map(({ label, icon, path, children }) => (
						<div key={label}>
							<SidebarItem
								icon={icon}
								label={label}
								path={path}
								collapsed={false}
								isActive={location.pathname.startsWith(path)}
								onClick={() => navigate(path)}
							/>
							{children.length > 0 && (
								<div className='ml-6 mt-1 flex flex-col gap-1'>
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
								</div>
							)}
						</div>
					))}
				</nav>
			</aside>

			{/* Mobile menu toggle */}
			<div className='md:hidden p-2'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => setMobileOpen(true)}
				>
					☰
				</Button>
			</div>
		</>
	);
}
