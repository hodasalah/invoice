// constants/sidebar-links.ts
import {
	BadgeDollarSign,
	BarChartIcon,
	CreditCardIcon,
	FileTextIcon,
	ListIcon,
	PlusIcon,
	SettingsIcon,
	UsersIcon,
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
				path: '/dashboard/invoices/create',
				icon: PlusIcon,
			},
			{
				label: 'List Invoices',
				path: '/dashboard/invoices/list',
				icon: ListIcon,
			},
		],
	},
	{
		label: 'Clients',
		icon: UsersIcon,
		path: '/clients',
		children: [
			{
				label: 'New Client',
				path: '/dashboard/clients/new',
				icon: PlusIcon,
			},
			{
				label: 'All Clients',
				path: '/dashboard/clients/list',
				icon: ListIcon,
			},
		],
	},
	{
		label: 'Wallets',
		icon: CreditCardIcon,
		path: '/dashboard/wallets',
		children: [],
	},
	{
		label: 'Payments',
		icon: BadgeDollarSign,
		path: '/dashboard/payments',
		children: [],
	},
	{
		label: 'Settings',
		icon: SettingsIcon,
		path: '/settings',
		children: [],
	},
];
