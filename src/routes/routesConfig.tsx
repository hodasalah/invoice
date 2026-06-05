import { lazy } from 'react';

const Landing = lazy(() => import('../pages/Landing'));
const Dashboard = lazy(() => import('../pages/dashboard/DashboardPage'));
const HomePage = lazy(() => import('../pages/dashboard/HomePage'));
const InvoicesList = lazy(() => import('../pages/dashboard/invoices/InvoicesList'));
const CreateInvoice = lazy(() => import('../pages/dashboard/invoices/CreateInvoice'));
const ViewInvoice = lazy(() => import('../pages/dashboard/invoices/ViewInvoice'));
const EditInvoice = lazy(() => import('../pages/dashboard/invoices/EditInvoice'));
const Clients = lazy(() => import('../pages/dashboard/clients/Clients'));
const AddClient = lazy(() => import('../pages/dashboard/clients/AddClient'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Seed = lazy(() => import('../pages/Seed'));
const Wallet = lazy(() => import('../pages/dashboard/Wallet'));
const Payments = lazy(() => import('../pages/dashboard/Payments'));
const ProfilePage = lazy(() => import('../pages/dashboard/ProfilePage'));

export type Route = {
	path?: string;
	index?: boolean;
	element: React.ReactNode;
	title?: string;
	children?: Route[];
	protected?: boolean;
	publicOnly?: boolean;
};

export const appRoutes: Route[] = [
	{ path: '/', element: <Landing />, title: 'Landing' },
	{ path: '/login', element: <Login />, title: 'Login', publicOnly: true },
	{ path: '/signup', element: <Signup />, title: 'Signup', publicOnly: true },
	{
		path: '/dashboard',
		element: <Dashboard />,
		title: 'Dashboard',
		protected: true, // ✅ الصفحة محمية
		children: [
			{
				index: true,
				element: <HomePage />,
				title: 'Dashboard',
				protected: true
			},
			{
				path: 'invoices/list',
				element: <InvoicesList />,
				title: 'Invoices',
				protected: true,
			},
			{
				path: 'invoices/create',
				element: <CreateInvoice />,
				title: 'Create Invoice',
				protected: true,
			},
			{
				path: 'invoices/:id',
				element: <ViewInvoice />,
				title: 'View Invoice',
				protected: true,
			},
			{
				path: 'invoices/edit/:id',
				element: <EditInvoice />,
				title: 'Edit Invoice',
				protected: true,
			},
			{
				path: 'clients/list',
				element: <Clients />,
				title: 'Clients',
				protected: true,
			},
			{
				path: 'clients/new',
				element: <AddClient />,
				title: 'Clients',
				protected: true,
			},
			{
				path: 'wallets',
				element: <Wallet />,
				title: 'Wallets',
				protected: true,
			},
			{
				path: 'payments',
				element: <Payments />,
				title: 'Payments',
				protected: true,
			},
			{
				path: 'profile',
				element: <ProfilePage />,
				title: 'Profile',
				protected: true,
			},
		],
	},
	{ path: '/seed', element: <Seed />, title: 'Seed', protected: false },
	{
		path: '*',
		element: <NotFound />,
		title: 'Page Not Found',
		protected: false,
	},
];
