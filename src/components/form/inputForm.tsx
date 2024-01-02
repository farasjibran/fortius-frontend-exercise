'use client';

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

interface InputFormProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	id?: string;
	label?: string;
	isRequired?: boolean;
	placeholder?: string;
	type?: string;
	disabled?: boolean;
	size?: string;
}

export default function InputForm<T extends {}>({
	control,
	name,
	id,
	label,
	isRequired = false,
	placeholder,
	type,
	disabled = false,
	size,
}: Readonly<InputFormProps<T>>) {
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorSecondary = 'gray.400';
	const brandStars = useColorModeValue('brand.500', 'brand.400');

	const [showPassword, setShowPassword] = useState(false);
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
					{type === 'password' ? (
						<InputGroup size="md">
							<Input
								isRequired={true}
								fontSize="sm"
								placeholder="Min. 8 characters"
								mb="24px"
								value={String(value ?? '')}
								onChange={(e) => onChange(e.target.value)}
								size="lg"
								type={showPassword ? 'text' : 'password'}
								variant="auth"
							/>
							<InputRightElement display="flex" alignItems="center" mt="4px">
								<Icon
									color={textColorSecondary}
									_hover={{ cursor: 'pointer' }}
									as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
									onClick={() => setShowPassword(!showPassword)}
								/>
							</InputRightElement>
						</InputGroup>
					) : (
						<Input
							isRequired={isRequired}
							variant="auth"
							value={String(value ?? '')}
							onChange={(e) => onChange(e.target.value)}
							fontSize="sm"
							ms={{ base: '0px', md: '0px' }}
							type={type}
							placeholder={placeholder}
							mb="24px"
							fontWeight="500"
							disabled={disabled}
							size={size}
						/>
					)}

					<FormErrorMessage>{error?.message?.toString()}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}
