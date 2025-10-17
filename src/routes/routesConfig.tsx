import { lazy } from 'react';

const Landing = lazy(() => import('../pages/Landing'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const InvoicesList = lazy(() => import('../pages/invoices/InvoicesList'));
const InvoiceForm = lazy(() => import('../pages/invoices/InvoiceForm'));

const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Seed = lazy(() => import('../pages/Seed'));

export type Route = {
	path: string;
	element: React.ReactNode;
	title?: string;
	children?: Route[];
};

export const appRoutes: Route[] = [
	{ path: '/', element: <Landing />, title: 'Landing' },
	{ path: '/login', element: <Login />, title: 'Login' },
	{ path: '/signup', element: <Signup />, title: 'Signup' },
	{
		path: '/dashboard',
		element: <Dashboard />,
		title: 'Dashboard',
		children: [
			{
				path: 'invoices/list',
				element: <InvoicesList />,
				title: 'Invoices',
			},
			{
				path: 'invoices/create',
				element: <InvoiceForm />,
				title: 'Create Invoice',
			},
		],
	},

	{ path: '/seed', element: <Seed />, title: 'Seed' },
	{ path: '*', element: <NotFound />, title: 'Page Not Found' },
];
