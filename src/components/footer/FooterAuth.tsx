import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

export default function Footer(props: Readonly<{ [x: string]: any }>) {
	let textColor = useColorModeValue('gray.400', 'white');

	return (
		<Flex
			zIndex="3"
			flexDirection={{
				base: 'column',
				lg: 'row',
			}}
			alignItems={{
				base: 'center',
				xl: 'start',
			}}
			justifyContent="space-between"
			px={{ base: '30px', md: '0px' }}
			pb="30px"
			{...props}>
			<Text
				color={textColor}
				textAlign={{
					base: 'center',
					xl: 'start',
				}}
				mb={{ base: '20px', lg: '0px' }}>
				{' '}
				&copy; {new Date().getFullYear()}
				<Text as="span" fontWeight="500" ms="4px">
					Jibran. All Rights Reserved. Made with love
				</Text>
			</Text>
		</Flex>
	);
}
