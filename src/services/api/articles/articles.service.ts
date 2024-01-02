import { ApiPaginatedRequest } from '@/types/api';
import {
	CreateArticleRequest,
	CreateArticleResponse,
	GetArticleDetailsResponse,
	GetArticlesDataResponse,
	UpdateArticleRequest,
	UpdateArticleResponse,
} from '@/types/articles';
import { axiosClient } from '../utils/axiosClient';

export const getMyArticles = async (parameters: ApiPaginatedRequest) => {
	const articles = await axiosClient.get<GetArticlesDataResponse>(
		`/my-article/paginate`,
		{
			params: parameters,
		}
	);

	return articles.data.data;
};

export const getArticles = async (parameters: ApiPaginatedRequest) => {
	const articles = await axiosClient.get<GetArticlesDataResponse>(
		`/article/paginate`,
		{
			params: parameters,
		}
	);

	return articles.data.data;
};

export const getArticleById = async (articleId: string | undefined) => {
	const users = await axiosClient.get<GetArticleDetailsResponse>(
		`/article/${articleId}`
	);

	return users.data.data;
};

export const createArticles = async (data: CreateArticleRequest) => {
	const article = await axiosClient.post<CreateArticleResponse>(
		`/article`,
		data
	);

	return article.data.data;
};

export const updateArticles = async (data: UpdateArticleRequest) => {
	const users = await axiosClient.put<UpdateArticleResponse>(
		`/article/${data.id}`,
		data
	);

	return users.data.data;
};

interface removeArticleParameter {
	articleId?: string;
}

export const removeArticle = async ({ articleId }: removeArticleParameter) => {
	const article = await axiosClient.delete(`/article/${articleId}`);

	return article.data.data;
};
