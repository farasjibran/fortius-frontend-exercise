import { Icon } from '@chakra-ui/react';
import { MdBook, MdBookmark, MdHome } from 'react-icons/md';

import { IRoute } from '@/types/navigation';

const routes: IRoute[] = [
	// Route for superadmin
	{
		name: 'Dashboard',
		layout: '/admin',
		icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
		path: '/dashboard',
	},
	{
		name: 'Articles',
		layout: '/admin',
		icon: <Icon as={MdBook} width="20px" height="20px" color="inherit" />,
		path: '/articles',
	},

	// Route for user
	{
		name: 'Dashboard',
		layout: '/user',
		icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
		path: '/dashboard',
	},
	{
		name: 'My Articles',
		layout: '/user',
		icon: <Icon as={MdBookmark} width="20px" height="20px" color="inherit" />,
		path: '/my-articles',
	},
	{
		name: 'Articles',
		layout: '/user',
		icon: <Icon as={MdBook} width="20px" height="20px" color="inherit" />,
		path: '/articles',
	},
];

export default routes;
