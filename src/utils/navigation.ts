import { IRoute } from '@/types/navigation';

export const isWindowAvailable = () => typeof window !== 'undefined';

export const findCurrentRoute = (routes: IRoute[]): IRoute => {
	const foundRoute: IRoute | undefined = routes.find(
		(route) =>
			isWindowAvailable() &&
			window.location.pathname == route.layout + route.path &&
			route
	);

	// Use non-null assertion operator to assert that foundRoute is not undefined
	return foundRoute!;
};

export const getActiveRoute = (routes: IRoute[]): string => {
	const route = findCurrentRoute(routes);

	return route?.name || '';
};

export const getActiveNavbar = (routes: IRoute[]): boolean => {
	const route = findCurrentRoute(routes);
	return route?.secondary ?? false;
};

export const getActiveNavbarText = (routes: IRoute[]): string | boolean => {
	return getActiveRoute(routes) || false;
};
