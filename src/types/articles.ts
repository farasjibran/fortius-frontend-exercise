import { ApiPaginatedResponseSuccess, ApiResponseSuccess } from '@/types/api';

export type GetArticlesDataResponse = ApiPaginatedResponseSuccess<Article>;

export type Article = Partial<{
	id: number;
	title: string;
	description: string;
	total_comments: number;
	author: string;
	created_at: string;
}>;

export interface ArticleDetail {
	id: number;
	title: string;
	description: string;
	total_comments: number;
	author: string;
	created_at: string;
}

export type GetArticleDetailsResponse = ApiResponseSuccess<ArticleDetail>;

export interface CreateArticleRequest {
	title: string;
	description: string;
}
export type CreateArticleResponse = ApiResponseSuccess<ArticleDetail>;

export interface UpdateArticleRequest extends CreateArticleRequest {
	id: number;
}
export type UpdateArticleResponse = ApiResponseSuccess<ArticleDetail>;
