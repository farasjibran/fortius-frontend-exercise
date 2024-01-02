import Card from '@/components/card/Card';
import CKEditorForm from '@/components/form/CKEditorForm';
import { paginationAtom } from '@/components/pagination/paginationAtom';
import { commentArticleQueries } from '@/services/api/comment/comment.queries';
import { createCommentArticle } from '@/services/api/comment/comment.service';
import { Button, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormCommentProps {
	articleId?: string;
	commentId?: string;
}

export const commentForm = z.object({
	comment: z.string({
		required_error: 'Comment can not be empty',
	}),
});

export type CommentFormSchema = z.infer<typeof commentForm>;

export default function FormComment({
	articleId,
	commentId,
}: FormCommentProps) {
	const toast = useToast();
	const clientQuery = useQueryClient();
	const [pagination] = useAtom(paginationAtom);

	const { control, handleSubmit, reset } = useForm<CommentFormSchema>({
		resolver: zodResolver(commentForm),
	});

	const create = useMutation({
		mutationFn: createCommentArticle,
		onSuccess() {
			toast({
				title: 'Berhasil mengirim komen pada artikel ini',
				position: 'top-right',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});

			clientQuery.invalidateQueries(
				commentArticleQueries.commentArticlePaginate({
					articleId: Number(articleId),
					page: pagination.currentPage,
					per_page: pagination.perPage,
				})
			);

			reset({
				comment: '',
			});
		},
		onError(error) {
			toast({
				title: `Komen gagal terkirim: ${error}`,
				position: 'top-right',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const onSubmit: SubmitHandler<CommentFormSchema> = (
		values: CommentFormSchema
	) => {
		if (!commentId) {
			create.mutate({ comment: values.comment, articleId: Number(articleId) });
		}
		// if (typeof articleId === 'string') {
		// 	update.mutate({ id: Number(articleId), ...values });
		// }
	};

	return (
		<Card
			flexDirection="column"
			w="100%"
			px={6}
			overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<CKEditorForm<CommentFormSchema>
				control={control}
				name="comment"
				label="Comment To This Article"
				placeholder="Comment to Article"
				isRequired={true}
			/>
			<Button
				mt={5}
				onClick={handleSubmit(onSubmit)}
				colorScheme="brand"
				alignSelf="end"
				isLoading={create.isPending}>
				{commentId ? 'Update Comment' : 'Send Comment'}
			</Button>
		</Card>
	);
}
