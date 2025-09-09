// AppRoutes.tsx
import { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { Toaster } from 'sonner';
import { appRoutes } from './routesConfig';

const AppRoutes = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<Toaster position='top-right' />
		<Routes>
			{appRoutes.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					element={route.element}
				/>
			))}
		</Routes>
	</Suspense>
);

export default AppRoutes;
