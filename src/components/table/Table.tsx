import {
	Table as ChakraTable,
	TableProps as ChakraTableProps,
	Flex,
	Spinner,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';

import { TableColumns, TableData } from './Table.type';

interface TableProps<TData> extends ChakraTableProps {
	data: TableData<TData>[];
	columns: TableColumns<TData>;
	renderRow?: (rowData: TableData<TData>, index: number) => React.ReactNode;
	isLoaded?: boolean;
}

function Table<TData>(props: TableProps<TData>) {
	const {
		colorScheme = 'green',
		variant = 'bandedRow',
		size = 'md',
		data,
		columns,
		renderRow,
		isLoaded = true,
		...restProps
	} = props;

	return !isLoaded ? (
		<Flex
			justifyContent="center"
			textAlign="center"
			alignItems="center"
			height="20vh">
			<Spinner
				size="xl"
				emptyColor="purple.200"
				color="purple.500"
				thickness="5px"
			/>
		</Flex>
	) : (
		<TableContainer>
			<ChakraTable
				colorScheme={colorScheme}
				variant={variant}
				size={size}
				{...restProps}>
				<Thead>
					<Tr>
						{columns.map((column, index) => (
							<Th
								key={String(column.key) + index}
								borderColor="gray.200"
								borderBottom={1}>
								{column.label}
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{data.length > 0 ? (
						data.map((row, rowIndex) =>
							renderRow ? (
								renderRow(row, rowIndex)
							) : (
								<Tr key={String(row.key)}>
									{columns.map((column) => {
										const data = row[column.key];
										return (
											<Td key={String(column.key)}>
												{column.render ? (
													column.render(data, row, rowIndex)
												) : (
													<Text>{String(data)}</Text>
												)}
											</Td>
										);
									})}
								</Tr>
							)
						)
					) : (
						<Tr>
							<Td colSpan={columns.length}>
								<Text textAlign={'center'}>No Data</Text>
							</Td>
						</Tr>
					)}
				</Tbody>
			</ChakraTable>
		</TableContainer>
	);
}

export default Table;
