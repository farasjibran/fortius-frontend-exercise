import { Flex, Text } from '@chakra-ui/react';

import { HSeparator } from '@/components/separator/Separator';

export function SidebarBrand() {
	return (
		<Flex alignItems="center" flexDirection="column">
			<Text fontSize="xx-large" mb={5} fontWeight={700}>
				E-Article
			</Text>
			<HSeparator mb="20px" />
		</Flex>
	);
}

export default SidebarBrand;
