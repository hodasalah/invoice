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
				element: <InvoiceForm />,
				title: 'Create Invoice',
				protected: true,
			},
		],
	},
	{ path: '/seed', element: <Seed />, title: 'Seed', protected: true },
	{ path: '*', element: <NotFound />, title: 'Page Not Found', protected: false},
];