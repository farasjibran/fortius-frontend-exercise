import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getCommentArticle } from './comment.service';

export const commentArticleQueries = createQueryKeys(
	'commentArticleManagement',
	{
		commentArticlePaginate: (
			parameters: Parameters<typeof getCommentArticle>[0]
		) => {
			const { page, per_page } = parameters;

			return {
				queryFn: () => getCommentArticle(parameters),
				queryKey: ['myArticlesPaginate', page, per_page],
			};
		},
	}
);
