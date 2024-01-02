'use client';

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface CKEditorFormProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	id?: string;
	label?: string;
	isRequired?: boolean;
	placeholder?: string;
	disabled?: boolean;
}

export default function CKEditorForm<T extends {}>({
	control,
	name,
	id,
	label,
	isRequired = false,
	placeholder,
	disabled = false,
}: Readonly<CKEditorFormProps<T>>) {
	const textColor = useColorModeValue('navy.700', 'white');
	const brandStars = useColorModeValue('brand.500', 'brand.400');

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<FormControl id={id} isInvalid={Boolean(error)}>
					<FormLabel
						display="flex"
						ms="4px"
						fontSize="sm"
						fontWeight="500"
						color={textColor}
						mb="8px">
						{label}
						{isRequired && <Text color={brandStars}>*</Text>}
					</FormLabel>
					<CKEditor
						editor={ClassicEditor}
						disabled={disabled}
						onReady={(editor) => {
							editor.editing.view.change((writer) => {
								const root = editor.editing.view.document.getRoot();
								if (root) {
									writer.setStyle('height', '300px', root);
								}
							});
						}}
						data={value}
						onChange={(event, editor) => {
							const data = editor.getData();
							onChange(data);
						}}
					/>

					<FormErrorMessage>{error?.message?.toString()}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}
