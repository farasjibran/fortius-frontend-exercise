'use client';

import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

import DefaultAuthLayout from '@/layouts/auth/Default';

import RegisterForm from '@/modules/auth/register/RegisterForm';
import Link from 'next/link';

export default function SignUp() {
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorSecondary = 'gray.400';
	const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
	const textColorBrand = useColorModeValue('brand.500', 'white');

	return (
		<DefaultAuthLayout
			illustrationBackground={
				'https://images.unsplash.com/photo-1517504734587-2890819debab?q=80&w=1639&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
			}>
			<Flex
				maxW={{ base: '100%', md: 'max-content' }}
				w="100%"
				mx={{ base: 'auto', lg: '0px' }}
				me="auto"
				h="100%"
				alignItems="start"
				justifyContent="center"
				mb={{ base: '30px', md: '60px' }}
				px={{ base: '25px', md: '0px' }}
				mt={{ base: '40px', md: '14vh' }}
				flexDirection="column">
				<Box me="auto">
					<Heading color={textColor} fontSize="36px" mb="10px">
						Sign Up
					</Heading>
					<Text
						mb="36px"
						ms="4px"
						color={textColorSecondary}
						fontWeight="400"
						fontSize="md">
						Enter your information in the following form
					</Text>
				</Box>
				<Flex
					zIndex="2"
					direction="column"
					w={{ base: '100%', md: '420px' }}
					maxW="100%"
					background="transparent"
					borderRadius="15px"
					mx={{ base: 'auto', lg: 'unset' }}
					me="auto"
					mb={{ base: '20px', md: 'auto' }}>
					<RegisterForm />
					<Flex
						flexDirection="column"
						justifyContent="center"
						alignItems="start"
						maxW="100%"
						mt="0px">
						<Link href="/auth/sign-in">
							<Text color={textColorDetails} fontWeight="400" fontSize="14px">
								Registered yet?
								<Text
									color={textColorBrand}
									as="span"
									ms="5px"
									fontWeight="500">
									Sign in here
								</Text>
							</Text>
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</DefaultAuthLayout>
	);
}
