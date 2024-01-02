import { useQuery } from '@tanstack/react-query';
import { dashboardQueries } from './dashboard.queries';

export const useDashboard = () => {
	return useQuery({
		...dashboardQueries.get(),
	});
};
