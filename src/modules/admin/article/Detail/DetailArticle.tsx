import Card from '@/components/card/Card';
import ListComment from '@/modules/user/comment/List/ListComment';
import { useArticleDetail } from '@/services/api/articles/articles.hooks';
import formatDate from '@/utils/formatDate';
import { Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import parse from 'html-react-parser';

interface DetailArticleProps {
	articleId: string | null;
}

export default function DetailArticle({ articleId }: DetailArticleProps) {
	const getArticle = useArticleDetail({ articleId: articleId ?? '' });

	return (
		<>
			<Card
				flexDirection="column"
				w="100%"
				px="0px"
				mb={6}
				overflowX={{ sm: 'scroll', lg: 'hidden' }}>
				{getArticle.isLoading ? (
					<Flex
						justifyContent="center"
						textAlign="center"
						alignItems="center"
						height="20vh">
						<Spinner
							size="xl"
							emptyColor="purple.200"
							color="purple.500"
							thickness="5px"
						/>
					</Flex>
				) : (
					<Flex px={6} flexDirection="column">
						<Box>
							<Heading>Topic : {getArticle.data?.title}</Heading>
							<Text>{formatDate(getArticle.data?.created_at ?? '')}</Text>
						</Box>

						<Card
							flexDirection="column"
							w="100%"
							px={6}
							mt={6}
							overflowX={{ sm: 'scroll', lg: 'hidden' }}
							bg="gray.100">
							{parse(getArticle.data?.description ?? '')}
						</Card>
					</Flex>
				)}
			</Card>

			<Box mb={6}>
				<ListComment articleId={Number(articleId)} />
			</Box>
		</>
	);
}
