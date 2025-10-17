import { useLocation, matchPath } from 'react-router';
import { appRoutes } from '../routes/routesConfig';

export const usePageTitle = (): string => {
	const location = useLocation();

	const findTitle = (
		routes: typeof appRoutes,
		parentPath = '',
	): string | undefined => {
		for (const route of routes) {
			const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/');

			// 1️⃣ check children first
			if (route.children) {
				const childTitle = findTitle(route.children, fullPath);
				if (childTitle) return childTitle;
			}

			// 2️⃣ check the route itself
			if (matchPath({ path: fullPath, end: true }, location.pathname)) {
				return route.title;
			}
		}
		return undefined;
	};

	return findTitle(appRoutes) || 'MyApp';
};
