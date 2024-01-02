import { ApiResponseSuccess } from '@/types/api';

export interface Dashboard {
	article: {
		all: number;
		myArticle: number;
	};
}

export type GetDashboardDataResponse = ApiResponseSuccess<Dashboard>;
