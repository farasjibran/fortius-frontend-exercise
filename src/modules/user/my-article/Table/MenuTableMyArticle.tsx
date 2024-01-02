import {
	Icon,
	Menu,
	MenuButton,
	MenuList,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';

import { MdOutlineMoreHoriz } from 'react-icons/md';
import FormMyArticle from '../Form/FormMyArticle';

export default function MenuTableMyArticle(props: { [x: string]: any }) {
	const { ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.500', 'white');
	const textHover = useColorModeValue(
		{ color: 'secondaryGray.900', bg: 'unset' },
		{ color: 'secondaryGray.500', bg: 'unset' }
	);
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgList = useColorModeValue('white', 'whiteAlpha.100');
	const bgShadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
		'unset'
	);
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue(
		{ bg: 'secondaryGray.400' },
		{ bg: 'whiteAlpha.50' }
	);
	const bgFocus = useColorModeValue(
		{ bg: 'secondaryGray.300' },
		{ bg: 'whiteAlpha.100' }
	);

	const {
		isOpen: isOpen1,
		onOpen: onOpen1,
		onClose: onClose1,
	} = useDisclosure();

	return (
		<Menu isOpen={isOpen1} onClose={onClose1}>
			<MenuButton
				alignItems="center"
				justifyContent="center"
				bg={bgButton}
				_hover={bgHover}
				_focus={bgFocus}
				_active={bgFocus}
				w="37px"
				h="37px"
				lineHeight="100%"
				onClick={onOpen1}
				borderRadius="10px"
				{...rest}>
				<Icon as={MdOutlineMoreHoriz} color={iconColor} w="24px" h="24px" />
			</MenuButton>
			<MenuList
				w="100%"
				minW="unset"
				border="transparent"
				backdropFilter="blur(63px)"
				bg={bgList}
				boxShadow={bgShadow}
				borderRadius="20px"
				p="15px">
				<FormMyArticle />
			</MenuList>
		</Menu>
	);
}
