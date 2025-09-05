import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import {Toaster} from  'sonner'


// Lazy load pages
const Landing = lazy(() => import('../pages/Landing'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Invoices = lazy(() => import('../pages/Invoices'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Seed = lazy(() => import('../pages/Seed'));

const AppRoutes = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Toaster position='top-right' />
			<Routes>
				<Route
					path='/'
					element={<Landing />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
				<Route
					path='/dashboard'
					element={<Dashboard />}
				/>
				<Route
					path='/invoices'
					element={<Invoices />}
				/>
				<Route path='/seed' element={<Seed />} />
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
