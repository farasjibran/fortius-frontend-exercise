import { GetDashboardDataResponse } from '@/types/dashboard';
import { axiosClient } from '../utils/axiosClient';

export const getDashboard = async () => {
	const dashboard =
		await axiosClient.get<GetDashboardDataResponse>(`/dashboard`);

	return dashboard.data.data;
};
