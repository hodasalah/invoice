import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
// Lazy load pages
const Landing = lazy(() => import('../pages/Landing'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Invoices = lazy(() => import('../pages/Invoices'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route
					path='/'
					element={<Landing />}
				/>
				<Route
					path='/dashboard'
					element={<Dashboard />}
				/>
				<Route
					path='/invoices'
					element={<Invoices />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
