// constants/sidebar-links.ts
import {
	FileTextIcon,
	UsersIcon,
	SettingsIcon,
	BarChartIcon,
	PlusIcon,
	ListIcon,
} from 'lucide-react';

export const sidebarLinks = [
	{
		label: 'Dashboard',
		icon: BarChartIcon,
		path: '/dashboard',
		children: [],
	},
	{
		label: 'Invoices',
		icon: FileTextIcon,
		path: '/invoices',
		children: [
			{
				label: 'Create Invoice',
				path: '/invoices/create',
				icon: PlusIcon,
			},
			{ label: 'List Invoices', path: '/invoices/list', icon: ListIcon },
		],
	},
	{
		label: 'Clients',
		icon: UsersIcon,
		path: '/clients',
		children: [
			{ label: 'New Client', path: '/clients/new', icon: PlusIcon },
			{ label: 'All Clients', path: '/clients/all', icon: ListIcon },
		],
	},
	{
		label: 'Settings',
		icon: SettingsIcon,
		path: '/settings',
		children: [],
	},
];
