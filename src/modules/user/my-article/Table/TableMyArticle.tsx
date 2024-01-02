import { Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';

import Card from '@/components/card/Card';
import Pagination from '@/components/pagination/Pagination';
import Table from '@/components/table/Table';
import { TableColumns } from '@/components/table/Table.type';
import { useMyArticleHooks } from '@/services/api/articles/articles.hooks';
import { Article } from '@/types/articles';
import ArticleDeleteButton from '../Delete/ArticleDeleteButton';
import FormMyArticle from '../Form/FormMyArticle';
import MenuTableMyArticle from './MenuTableMyArticle';

const columns: TableColumns<Article> = [
	{
		key: 'key',
		label: 'NO',
	},
	{
		key: 'title',
		label: 'Title Article',
	},
	{
		key: 'total_comments',
		label: 'Total Comments',
	},
	{
		key: 'id',
		label: 'Action',
		render(value) {
			return (
				<HStack>
					<FormMyArticle articleId={String(value)} />
					<ArticleDeleteButton articleId={String(value)} />
				</HStack>
			);
		},
	},
];

export default function TableMyArticle() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const {
		pagination,
		setPagination,
		myArticleList,
		isLoadingMyArticle,
		myArticleLastPage,
		myArticleTotal,
	} = useMyArticleHooks();

	return (
		<Card
			flexDirection="column"
			w="100%"
			px="0px"
			overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Flex px="25px" mb="8px" justifyContent="space-between" align="center">
				<Text
					color={textColor}
					fontSize="22px"
					mb="4px"
					fontWeight="700"
					lineHeight="100%">
					My Article
				</Text>
				<MenuTableMyArticle />
			</Flex>

			<Table<Article>
				columns={columns}
				data={myArticleList.map((item: Article, key) => ({
					key: String(key + 1),
					id: item.id,
					title: item.title,
					total_comments: item.total_comments,
				}))}
				size="md"
				isLoaded={!isLoadingMyArticle}
			/>

			<Pagination
				currentPage={pagination.currentPage}
				lastPage={myArticleLastPage}
				perPage={pagination.perPage}
				gotoPage={(targetPage) =>
					setPagination((previous) => ({
						...previous,
						currentPage: targetPage,
					}))
				}
				setPerPage={(perPage) =>
					setPagination((previous) => ({
						...previous,
						perPage,
					}))
				}
				shownItems={myArticleList.length ?? 0}
				totalItems={myArticleTotal}
				hideText={false}
			/>
		</Card>
	);
}
