'use client';

import {
	Box,
	Button,
	Center,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';

import { SidebarResponsive } from '@/components/sidebar/Sidebar';

import routes from '@/routes';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export default function HeaderLinks(props: Readonly<{ secondary: boolean }>) {
	const { secondary } = props;
	const { colorMode, toggleColorMode } = useColorMode();

	const navbarIcon = useColorModeValue('gray.400', 'white');
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);

	const session = useSession();
	const userName = session.data?.name;
	const initialsUser = userName
		?.split(' ')
		.map((word) => word[0])
		.join('');

	const router = useRouter();

	const onSignOut = async () => {
		// run sign out function
		await signOut();

		// redirect to login page
		router.replace('/auth/sign-in');
	};

	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}>
			<SidebarResponsive routes={routes} />

			<Button
				variant="no-hover"
				bg="transparent"
				p="0px"
				minW="unset"
				minH="unset"
				h="18px"
				w="max-content"
				onClick={toggleColorMode}>
				<Icon
					me="10px"
					h="18px"
					w="18px"
					color={navbarIcon}
					as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
				/>
			</Button>
			<Menu>
				<MenuButton p="0px" style={{ position: 'relative' }}>
					<Box
						_hover={{ cursor: 'pointer' }}
						color="white"
						bg="#11047A"
						w="40px"
						h="40px"
						borderRadius={'50%'}
					/>
					<Center top={0} left={0} position={'absolute'} w={'100%'} h={'100%'}>
						<Text fontSize={'xs'} fontWeight="bold" color={'white'}>
							{initialsUser}
						</Text>
					</Center>
				</MenuButton>
				<MenuList
					boxShadow={shadow}
					p="0px"
					mt="10px"
					borderRadius="20px"
					bg={menuBg}
					border="none">
					<Flex w="100%" mb="0px">
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="100%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							fontWeight="700"
							color={textColor}>
							👋&nbsp; Hey, {userName}
						</Text>
					</Flex>
					<Flex flexDirection="column" p="10px">
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color="red.400"
							borderRadius="8px"
							px="14px"
							onClick={() => onSignOut()}>
							<Text fontSize="sm">Log out</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}
