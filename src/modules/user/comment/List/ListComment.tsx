import Card from '@/components/card/Card';
import Pagination from '@/components/pagination/Pagination';
import { useCommentArticleHooks } from '@/services/api/comment/comment.hooks';
import formatDate from '@/utils/formatDate';
import {
	Avatar,
	Badge,
	Box,
	Flex,
	Heading,
	Spinner,
	Text,
} from '@chakra-ui/react';
import parse from 'html-react-parser';
import DeleteComment from './DeleteComment';

interface ListCommentProps {
	articleId: number;
}

export default function ListComment({ articleId }: ListCommentProps) {
	const {
		pagination,
		setPagination,
		commentArticleList,
		isLoadingCommentArticle,
		commentArticleLastPage,
		commentArticleTotal,
	} = useCommentArticleHooks({ articleId });

	return (
		<Card
			flexDirection="column"
			w="100%"
			px={6}
			overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Heading fontSize={18} mb={4}>
				Comments in this article
			</Heading>

			{commentArticleTotal == 0 && <Text>No Comment In This Article</Text>}

			{isLoadingCommentArticle ? (
				<Flex
					justifyContent="center"
					textAlign="center"
					alignItems="center"
					height="10vh">
					<Spinner
						size="xl"
						emptyColor="purple.200"
						color="purple.500"
						thickness="5px"
					/>
				</Flex>
			) : (
				commentArticleList.map((comment) => (
					<Box bg="gray.100" p={6} borderRadius={6} key={comment.id} mb={3}>
						<Flex gap={4} justify="space-between">
							<Flex gap={4}>
								<Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
								<Box>
									<Text fontSize={16} fontWeight={600}>
										{comment.comment_from}
										{comment.is_my_comment && (
											<Badge
												ml={2}
												colorScheme="brand"
												fontSize="0.6em"
												padding={2}>
												Your Comment
											</Badge>
										)}
									</Text>
									<Text fontSize={14} fontWeight={400}>
										{formatDate(comment.created_at ?? '')}
									</Text>
								</Box>
							</Flex>
							{comment.is_my_comment && (
								<Flex direction="row">
									<DeleteComment
										articleId={String(comment.article_id)}
										commentId={String(comment.id)}
									/>
								</Flex>
							)}
						</Flex>
						<Box mt={5}>{parse(comment.comment ?? '')}</Box>
					</Box>
				))
			)}

			<Pagination
				currentPage={pagination.currentPage}
				lastPage={commentArticleLastPage}
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
				shownItems={commentArticleList.length ?? 0}
				totalItems={commentArticleTotal}
				hideText={false}
			/>
		</Card>
	);
}
