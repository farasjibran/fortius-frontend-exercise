'use client';

import React from 'react';

import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

import DefaultAuthLayout from '@/layouts/auth/Default';

import Link from 'next/link';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

export default function SignIn() {
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorSecondary = 'gray.400';
	const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	const brandStars = useColorModeValue('brand.500', 'brand.400');

	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
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
						Sign In
					</Heading>
					<Text
						mb="36px"
						ms="4px"
						color={textColorSecondary}
						fontWeight="400"
						fontSize="md">
						Enter your email and password to sign in!
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
					<FormControl>
						<FormLabel
							display="flex"
							ms="4px"
							fontSize="sm"
							fontWeight="500"
							color={textColor}
							mb="8px">
							Email<Text color={brandStars}>*</Text>
						</FormLabel>
						<Input
							isRequired={true}
							variant="auth"
							fontSize="sm"
							ms={{ base: '0px', md: '0px' }}
							type="email"
							placeholder="mail@simmmple.com"
							mb="24px"
							fontWeight="500"
							size="lg"
						/>
						<FormLabel
							ms="4px"
							fontSize="sm"
							fontWeight="500"
							color={textColor}
							display="flex">
							Password<Text color={brandStars}>*</Text>
						</FormLabel>
						<InputGroup size="md">
							<Input
								isRequired={true}
								fontSize="sm"
								placeholder="Min. 8 characters"
								mb="24px"
								size="lg"
								type={show ? 'text' : 'password'}
								variant="auth"
							/>
							<InputRightElement display="flex" alignItems="center" mt="4px">
								<Icon
									color={textColorSecondary}
									_hover={{ cursor: 'pointer' }}
									as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
									onClick={handleClick}
								/>
							</InputRightElement>
						</InputGroup>
						<Flex justifyContent="space-between" align="center" mb="24px">
							<FormControl display="flex" alignItems="center">
								<Checkbox
									id="remember-login"
									colorScheme="brandScheme"
									me="10px"
								/>
								<FormLabel
									htmlFor="remember-login"
									mb="0"
									fontWeight="normal"
									color={textColor}
									fontSize="sm">
									Keep me logged in
								</FormLabel>
							</FormControl>
							<Link href="/auth/forgot-password">
								<Text
									color={textColorBrand}
									fontSize="sm"
									w="124px"
									fontWeight="500">
									Forgot password?
								</Text>
							</Link>
						</Flex>
						<Button
							fontSize="sm"
							variant="brand"
							fontWeight="500"
							w="100%"
							h="50"
							mb="24px">
							Sign In
						</Button>
					</FormControl>
					<Flex
						flexDirection="column"
						justifyContent="center"
						alignItems="start"
						maxW="100%"
						mt="0px">
						<Link href="/auth/sign-up">
							<Text color={textColorDetails} fontWeight="400" fontSize="14px">
								Not registered yet?
								<Text
									color={textColorBrand}
									as="span"
									ms="5px"
									fontWeight="500">
									Create an Account
								</Text>
							</Text>
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</DefaultAuthLayout>
	);
}
