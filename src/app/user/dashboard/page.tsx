'use client';

import { Box, Icon, SimpleGrid, useColorModeValue } from '@chakra-ui/react';

import MiniStatistics from '@/components/card/MiniStatistics';
import IconBox from '@/components/icons/IconBox';
import { useDashboard } from '@/services/api/dashboard/dashboard.hooks';
import { MdBook, MdBookmark } from 'react-icons/md';

export default function Dashboard() {
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

	const getDashboard = useDashboard();

	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid
				columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
				gap="20px"
				mb="20px">
				<MiniStatistics
					startContent={
						<IconBox
							w="56px"
							h="56px"
							bg={boxBg}
							icon={
								<Icon w="32px" h="32px" as={MdBookmark} color={brandColor} />
							}
						/>
					}
					name="My Article"
					value={Number(getDashboard.data?.article.myArticle)}
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w="56px"
							h="56px"
							bg={boxBg}
							icon={<Icon w="32px" h="32px" as={MdBook} color={brandColor} />}
						/>
					}
					name="Total Articles"
					value={Number(getDashboard.data?.article.all)}
				/>
			</SimpleGrid>
		</Box>
	);
}
