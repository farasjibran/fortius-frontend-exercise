export interface TableColumn<T> {
	key: keyof TableData<T>;
	label: string;
	render?: (value: T[key], row: TableData<T>, index: number) => React.ReactNode;
}

export type TableColumns<T> = Array<TableColumn<T>>;

export type TableData<T> = {
	[key in keyof T]: T[key];
} & {
	key: string;
};
