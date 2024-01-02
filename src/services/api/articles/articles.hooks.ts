import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { paginationAtom } from '@/components/pagination/paginationAtom';
import { useToast } from '@chakra-ui/react';
import { articleQueries, myArticlesQueries } from './articles.queries';
import { removeArticle } from './articles.service';

export const useMyArticleHooks = () => {
	const [pagination, setPagination] = useAtom(paginationAtom);

	const { data: myArticleData, isLoading: isLoadingMyArticle } = useQuery({
		...myArticlesQueries.myArticlesPaginate({
			page: pagination.currentPage,
			per_page: pagination.perPage,
		}),
	});

	const myArticleList = myArticleData?.items ?? [];

	const noData = !isLoadingMyArticle && myArticleList?.length === 0;

	return {
		myArticleList,
		myArticleLastPage: myArticleData?.last_page ?? 0,
		myArticleTotal: myArticleData?.total ?? 0,
		noData,
		isLoadingMyArticle,
		pagination,
		setPagination,
	};
};

export const useArticleHooks = () => {
	const [pagination, setPagination] = useAtom(paginationAtom);

	const { data: articleData, isLoading: isLoadingArticle } = useQuery({
		...articleQueries.articlesPaginate({
			page: pagination.currentPage,
			per_page: pagination.perPage,
		}),
	});

	const articleList = articleData?.items ?? [];

	const noData = !isLoadingArticle && articleList?.length === 0;

	return {
		articleList,
		articleLastPage: articleData?.last_page ?? 0,
		articleTotal: articleData?.total ?? 0,
		noData,
		isLoadingArticle,
		pagination,
		setPagination,
	};
};

export const useArticleDetail = ({ articleId }: { articleId?: string }) => {
	return useQuery({
		...articleQueries.details({
			articleId: articleId,
		}),
		enabled: Boolean(articleId),
	});
};

export const useRemoveArticle = () => {
	const clientQuery = useQueryClient();
	const toast = useToast();
	const [pagination] = useAtom(paginationAtom);

	return useMutation({
		mutationFn: removeArticle,
		onSuccess() {
			toast({
				title: 'Artikel berhasil dihapus',
				position: 'top-right',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			clientQuery.invalidateQueries(
				myArticlesQueries.myArticlesPaginate({
					page: pagination.currentPage,
					per_page: pagination.perPage,
				})
			);
		},
	});
};
