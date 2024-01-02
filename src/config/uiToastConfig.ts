import { UseToastOptions } from '@chakra-ui/react';

export const successToastOptions: UseToastOptions = {
	status: 'success',
	position: 'top-right',
	duration: 5000,
	isClosable: true,
	title: 'Sukses',
};

export const errorToastOptions: UseToastOptions = {
	status: 'error',
	position: 'top-right',
	duration: 5000,
	isClosable: true,
	title: 'Gagal',
	description: 'Coba ulangi lagi',
};
