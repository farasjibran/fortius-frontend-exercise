import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { paginationAtom } from '@/components/pagination/paginationAtom';
import { useToast } from '@chakra-ui/react';
import { commentArticleQueries } from './comment.queries';
import { removeCommentArticle } from './comment.service';

interface commentArticleHooksProps {
	articleId: number;
}

export const useCommentArticleHooks = ({
	articleId,
}: commentArticleHooksProps) => {
	const [pagination, setPagination] = useAtom(paginationAtom);

	const { data: commentArticleData, isLoading: isLoadingCommentArticle } =
		useQuery({
			...commentArticleQueries.commentArticlePaginate({
				articleId: articleId,
				page: pagination.currentPage,
				per_page: pagination.perPage,
			}),
		});

	const commentArticleList = commentArticleData?.items ?? [];

	const noData = !isLoadingCommentArticle && commentArticleList?.length === 0;

	return {
		commentArticleList,
		commentArticleLastPage: commentArticleData?.last_page ?? 0,
		commentArticleTotal: commentArticleData?.total ?? 0,
		noData,
		isLoadingCommentArticle,
		pagination,
		setPagination,
	};
};

interface removeCommentArticleParameters {
	articleId: number;
}

export const useRemoveCommentArticle = ({
	articleId,
}: removeCommentArticleParameters) => {
	const clientQuery = useQueryClient();
	const toast = useToast();
	const [pagination] = useAtom(paginationAtom);

	return useMutation({
		mutationFn: removeCommentArticle,
		onSuccess() {
			toast({
				title: 'Komen pada artikel ini berhasil dihapus',
				position: 'top-right',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			clientQuery.invalidateQueries(
				commentArticleQueries.commentArticlePaginate({
					page: pagination.currentPage,
					per_page: pagination.perPage,
					articleId: articleId,
				})
			);
		},
	});
};
