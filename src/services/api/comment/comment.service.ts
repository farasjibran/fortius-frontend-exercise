import { ApiPaginatedRequest } from '@/types/api';
import {
	CreateCommentArticleRequest,
	CreateCommentArticleResponse,
	GetCommentArticleDataResponse,
} from '@/types/comment-articles';
import { axiosClient } from '../utils/axiosClient';

interface getCommentArticleProps extends ApiPaginatedRequest {
	articleId: number;
}

export const getCommentArticle = async (parameters: getCommentArticleProps) => {
	const commentArticles = await axiosClient.get<GetCommentArticleDataResponse>(
		`/comment-article/paginate?article_id=${parameters.articleId}`,
		{
			params: {
				per_page: parameters.per_page,
				page: parameters.page,
			},
		}
	);

	return commentArticles.data.data;
};

export const createCommentArticle = async (
	data: CreateCommentArticleRequest
) => {
	const commentArticle = await axiosClient.post<CreateCommentArticleResponse>(
		`/comment-article?article_id=${data.articleId}`,
		{
			comment: data.comment,
		}
	);

	return commentArticle.data.data;
};

interface removeCommentArticleParameter {
	commentArticleId?: string;
}

export const removeCommentArticle = async ({
	commentArticleId,
}: removeCommentArticleParameter) => {
	const commentArticle = await axiosClient.delete(
		`/comment-article/${commentArticleId}`
	);

	return commentArticle.data.data;
};
