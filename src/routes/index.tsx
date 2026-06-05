import ProtectedRoute from '@/components/ProtectedRoute';
import PublicRoute from '@/components/PublicRoute';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Toaster } from 'sonner';
import { appRoutes } from './routesConfig';

const AppRoutes = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<Toaster position='top-right' />

		<Routes>
			{appRoutes.map((route) => {
				let element = route.element;

				if (route.protected) {
					element = <ProtectedRoute>{element}</ProtectedRoute>;
				} else if (route.publicOnly) {
					element = <PublicRoute>{element}</PublicRoute>;
				}

				return (
					<Route
						key={route.path ?? 'root'}
						path={route.path}
						element={element}
						handle={{ title: route.title }}
					>
						{route.children?.map((child) => {
							let childElement = child.element;

							if (child.protected) {
								childElement = (
									<ProtectedRoute>
										{childElement}
									</ProtectedRoute>
								);
							} else if (child.publicOnly) {
								childElement = (
									<PublicRoute>
										{childElement}
									</PublicRoute>
								);
							}

							return (
								<Route
									key={
										child.index
											? `${route.path}-index`
											: child.path
									}
									index={child.index}
									path={
										child.index
											? undefined
											: child.path
									}
									element={childElement}
									handle={{
										title: child.title,
									}}
								/>
							);
						})}
					</Route>
				);
			})}
		</Routes>
	</Suspense>
);

export default AppRoutes;