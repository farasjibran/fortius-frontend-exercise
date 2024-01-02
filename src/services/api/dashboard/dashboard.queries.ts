import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getDashboard } from './dashboard.service';

export const dashboardQueries = createQueryKeys('dashboardQueries', {
	get: () => ({
		queryFn: () => getDashboard(),
		queryKey: ['get'],
	}),
});
