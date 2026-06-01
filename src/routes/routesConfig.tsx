import { lazy } from 'react';

const Landing = lazy(() => import('../pages/Landing'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const InvoicesList = lazy(() => import('../pages/invoices/InvoicesList'));
const CreateInvoice = lazy(() => import('../pages/invoices/CreateInvoice'));
const ViewInvoice = lazy(() => import('../pages/invoices/ViewInvoice'));
const EditInvoice = lazy(() => import('../pages/invoices/EditInvoice'));
const Clients = lazy(() => import('../pages/clients/Clients'));
const AddClient = lazy(() => import('../pages/clients/AddClient'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Seed = lazy(() => import('../pages/Seed'));
const Wallet = lazy(() => import('../pages/Wallet'));

export type Route = {
	path: string;
	element: React.ReactNode;
	title?: string;
	children?: Route[];
	protected?: boolean; // ✅ جديد: هل الصفحة محمية
	publicOnly?: boolean; // ✅ جديد: هل الصفحة عامة فقط للمستخدمين غير مسجلين
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
