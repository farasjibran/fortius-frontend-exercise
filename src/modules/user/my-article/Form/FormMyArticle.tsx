import CKEditorForm from '@/components/form/CKEditorForm';
import InputForm from '@/components/form/inputForm';
import { paginationAtom } from '@/components/pagination/paginationAtom';
import { useArticleDetail } from '@/services/api/articles/articles.hooks';
import { myArticlesQueries } from '@/services/api/articles/articles.queries';
import {
	createArticles,
	updateArticles,
} from '@/services/api/articles/articles.service';
import {
	Button,
	Flex,
	Icon,
	IconButton,
	MenuItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdAdd, MdCreate } from 'react-icons/md';

import { z } from 'zod';

interface FormMyArticleParameter {
	articleId?: string;
}

export const myArticleForm = z.object({
	title: z.string({
		required_error: 'Title article can not be empty',
	}),
	description: z.string({
		required_error: 'Description can not be empty',
	}),
});

export type MyArticleFormSchema = z.infer<typeof myArticleForm>;

export default function FormMyArticle({ articleId }: FormMyArticleParameter) {
	const toast = useToast();
	const clientQuery = useQueryClient();
	const [pagination] = useAtom(paginationAtom);
	const { onOpen, isOpen, onClose } = useDisclosure();

	const textColor = useColorModeValue('secondaryGray.500', 'white');
	const textHover = useColorModeValue(
		{ color: 'secondaryGray.900', bg: 'unset' },
		{ color: 'secondaryGray.500', bg: 'unset' }
	);

	const { control, handleSubmit, reset } = useForm<MyArticleFormSchema>({
		resolver: zodResolver(myArticleForm),
	});

	const create = useMutation({
		mutationFn: createArticles,
		onSuccess() {
			toast({
				title: 'Artikel berhasil disimpan',
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

			onClose();
		},
		onError(error) {
			toast({
				title: `Artikel gagal disimpan: ${error}`,
				position: 'top-right',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const update = useMutation({
		mutationFn: updateArticles,
		onSuccess() {
			toast({
				title: 'Artikel berhasil diperbarui',
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

			onClose();
		},
		onError(error) {
			toast({
				title: `Artikel gagal disimpan: ${error}`,
				position: 'top-right',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const onSubmit: SubmitHandler<MyArticleFormSchema> = (
		values: MyArticleFormSchema
	) => {
		if (!articleId) {
			create.mutate(values);
		}
		if (typeof articleId === 'string') {
			update.mutate({ id: Number(articleId), ...values });
		}
	};

	const article = useArticleDetail({ articleId });

	useEffect(() => {
		if (!article.isLoading) {
			//  set the default values, initialize with empty string if none
			reset({
				title: article?.data?.title ?? '',
				description: article?.data?.description ?? '',
			});
		}
	}, [article.data, article.isLoading, reset]);

	const isLoading =
		create.isPending ||
		(Boolean(articleId) && (article.isLoading || update.isPending));

	return (
		<>
			{articleId ? (
				<IconButton
					aria-label="Update My Article"
					colorScheme="blue"
					shadow="xs"
					onClick={onOpen}
					icon={<MdCreate />}
				/>
			) : (
				<MenuItem
					transition="0.2s linear"
					color={textColor}
					_hover={textHover}
					p="0px"
					borderRadius="8px"
					_active={{
						bg: 'transparent',
					}}
					_focus={{
						bg: 'transparent',
					}}
					onClick={onOpen}>
					<Flex align="center">
						<Icon as={MdAdd} h="16px" w="16px" me="8px" />
						<Text fontSize="sm" fontWeight="400">
							Create My Article
						</Text>
					</Flex>
				</MenuItem>
			)}

			<Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						{articleId ? 'Update My Article' : 'Create My Article'}{' '}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<InputForm<MyArticleFormSchema>
							control={control}
							name="title"
							label="Title Article"
							placeholder="Example Title"
							type="text"
							isRequired={true}
						/>

						<CKEditorForm<MyArticleFormSchema>
							control={control}
							name="description"
							label="Description Article"
							placeholder="Description Article"
							isRequired={true}
						/>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="red" mr={3} onClick={onClose}>
							Tutup
						</Button>
						<Button
							onClick={handleSubmit(onSubmit)}
							colorScheme="brand"
							alignSelf="end"
							isLoading={isLoading}>
							{articleId ? 'Update' : 'Save'}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
