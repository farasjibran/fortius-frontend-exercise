import { ApiPaginatedResponseSuccess, ApiResponseSuccess } from './api';

export type GetCommentArticleDataResponse =
	ApiPaginatedResponseSuccess<CommentArticle>;

export type CommentArticle = Partial<{
	id: number;
	article_id: number;
	article_title: string;
	comment: string;
	comment_from: string;
	is_my_comment: boolean;
	created_at: string;
}>;

export interface CommentArticleDetail {
	id: number;
	article_id: number;
	article_title: string;
	comment: string;
	comment_from: string;
	is_my_comment: boolean;
	created_at: string;
}

export type GetArticleDetailsResponse =
	ApiResponseSuccess<CommentArticleDetail>;

export interface CreateCommentArticleRequest {
	articleId: number;
	comment: string;
}
export type CreateCommentArticleResponse =
	ApiResponseSuccess<CommentArticleDetail>;

export interface UpdateCommentArticleRequest
	extends CreateCommentArticleRequest {
	id: number;
}
export type UpdateCommentArticleResponse =
	ApiResponseSuccess<CommentArticleDetail>;
