import {
	Flex,
	HStack,
	IconButton,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

import Card from '@/components/card/Card';
import Pagination from '@/components/pagination/Pagination';
import Table from '@/components/table/Table';
import { TableColumns } from '@/components/table/Table.type';
import { useArticleHooks } from '@/services/api/articles/articles.hooks';
import { Article } from '@/types/articles';
import Link from 'next/link';
import { MdRemoveRedEye } from 'react-icons/md';

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
		key: 'author',
		label: 'Author',
	},
	{
		key: 'id',
		label: 'Action',
		render(value) {
			return (
				<HStack>
					<IconButton
						aria-label="Show Article"
						colorScheme="blue"
						shadow="xs"
						as={Link}
						href={{
							pathname: '/user/articles/detail',
							query: { articleId: value },
						}}
						icon={<MdRemoveRedEye />}
					/>
				</HStack>
			);
		},
	},
];

export default function TableArticle() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const {
		pagination,
		setPagination,
		articleList,
		isLoadingArticle,
		articleLastPage,
		articleTotal,
	} = useArticleHooks();

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
					Article
				</Text>
			</Flex>

			<Table<Article>
				columns={columns}
				data={articleList.map((item: Article, key) => ({
					key: String(key + 1),
					id: item.id,
					title: item.title,
					total_comments: item.total_comments,
					author: item.author,
				}))}
				size="md"
				isLoaded={!isLoadingArticle}
			/>

			<Pagination
				currentPage={pagination.currentPage}
				lastPage={articleLastPage}
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
				shownItems={articleList.length ?? 0}
				totalItems={articleTotal}
				hideText={false}
			/>
		</Card>
	);
}
