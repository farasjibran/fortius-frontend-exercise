import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getArticleById, getArticles, getMyArticles } from './articles.service';

export const myArticlesQueries = createQueryKeys('myArticlesManagement', {
	myArticlesPaginate: (parameters: Parameters<typeof getMyArticles>[0]) => {
		const { page, per_page } = parameters;

		return {
			queryFn: () => getMyArticles(parameters),
			queryKey: ['myArticlesPaginate', page, per_page],
		};
	},
});

export const articleQueries = createQueryKeys('articleManagement', {
	articlesPaginate: (parameters: Parameters<typeof getArticles>[0]) => {
		const { page, per_page } = parameters;

		return {
			queryFn: () => getArticles(parameters),
			queryKey: ['articlesPaginate', page, per_page],
		};
	},

	details: ({ articleId }: { articleId?: string }) => ({
		queryFn: () => getArticleById(articleId),
		queryKey: ['details', articleId],
	}),
});
