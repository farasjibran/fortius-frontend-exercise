import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@chakra-ui/icons';
import { Flex, IconButton, Select, Text, Tooltip } from '@chakra-ui/react';
import { useSetAtom } from 'jotai';
import React from 'react';

import { paginationAtom } from './paginationAtom';

type PaginationProps = {
	currentPage: number;
	gotoPage: (pageTarget: number) => void;
	setPerPage: (perPage: number) => void;
	perPage: number;
	lastPage: number;
	shownItems?: number;
	totalItems?: number;
	hideText?: boolean;
};

const Pagination = ({
	currentPage,
	gotoPage,
	perPage,
	setPerPage,
	lastPage,
	shownItems,
	totalItems,
	hideText,
}: PaginationProps) => {
	const canPreviousPage = currentPage > 1;
	const canNextPage = currentPage < lastPage;

	const isHidden = !totalItems || totalItems === 0;

	const setPaginationAtom = useSetAtom(paginationAtom);

	// reset pagination on unmount
	React.useEffect(() => {
		return () => {
			setPaginationAtom({
				currentPage: 1,
				perPage: 10,
			});
		};
	}, [setPaginationAtom]);

	if (isHidden) {
		return null;
	}

	return (
		<Flex justifyContent="space-between" mx={4} mt={4} alignItems="center">
			{hideText ? null : (
				<Flex alignItems="center">
					<Select
						w={32}
						value={perPage}
						onChange={(event) => {
							setPerPage(Number(event.target.value));
						}}>
						{[10, 20, 30, 40, 50].map((perPage) => (
							<option key={perPage} value={perPage}>
								Lihat {perPage}
							</option>
						))}
					</Select>
				</Flex>
			)}

			<Text flexShrink="0">
				<Text fontWeight="bold" as="span">
					{shownItems}
				</Text>{' '}
				dari{' '}
				<Text fontWeight="bold" as="span">
					{totalItems}{' '}
				</Text>
				data
			</Text>

			<Flex>
				<Tooltip label="Halaman Pertama">
					<IconButton
						aria-label="Halaman Pertama"
						onClick={() => gotoPage(1)}
						isDisabled={!canPreviousPage}
						icon={<ArrowLeftIcon h={3} w={3} />}
						mr={1}
						colorScheme="brand"
					/>
				</Tooltip>
				<Tooltip label="Halaman Sebelumnya">
					<IconButton
						aria-label="Halaman Sebelumnya"
						onClick={() => gotoPage(currentPage - 1)}
						isDisabled={!canPreviousPage}
						icon={<ChevronLeftIcon h={6} w={6} />}
						colorScheme="brand"
						mr={4}
					/>
				</Tooltip>
				<Tooltip label="Halaman Selanjutnya">
					<IconButton
						aria-label="Halaman Selanjutnya"
						onClick={() => gotoPage(currentPage + 1)}
						isDisabled={!canNextPage}
						icon={<ChevronRightIcon h={6} w={6} />}
						colorScheme="brand"
					/>
				</Tooltip>
				<Tooltip label="Halaman Terakhir">
					<IconButton
						aria-label="Halaman Terakhir"
						onClick={() => gotoPage(lastPage)}
						isDisabled={!canNextPage}
						icon={<ArrowRightIcon h={3} w={3} />}
						ml={1}
						colorScheme="brand"
					/>
				</Tooltip>
			</Flex>
		</Flex>
	);
};

export default Pagination;
