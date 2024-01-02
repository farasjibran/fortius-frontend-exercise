import InputForm from '@/components/form/inputForm';
import { errorToastOptions, successToastOptions } from '@/config/uiToastConfig';
import { authRegister } from '@/services/api/auth/authLogin.service';
import { Button, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { navigateToRoleDashboard } from '../login/navigateToRoleDashboard';

const RegisterSchema = z
	.object({
		name: z.string({
			required_error: 'Nama wajib diisi',
		}),
		email: z.string().email('Email wajib diisi dengan format email yang benar'),
		password: z.string().min(6, 'Password wajib diisi dan minimal 6 karakter'),
		passwordConfirm: z
			.string()
			.min(6, 'Konfirmasi Password wajib diisi dan minimal 6 karakter'),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords tidak cocok',
		path: ['passwordConfirm'],
	});

export type RegisterFormSchema = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
	const toast = useToast();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const { control, handleSubmit } = useForm<RegisterFormSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordConfirm: '',
		},
	});

	const onFormSubmit = handleSubmit(async (values) => {
		setIsLoading(true);

		const responseFormRegister = await authRegister({
			name: values.name,
			email: values.email,
			password: values.password,
			password_confirmation: values.passwordConfirm,
		});

		if (responseFormRegister.code === 200) {
			const response = await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
			});

			setIsLoading(false);

			if (response?.ok) {
				toast({
					...successToastOptions,
					title: 'Register Berhasil',
					description: 'Selamat datang',
				});

				const session = await getSession();
				const role = session?.role;

				const routeTarget = navigateToRoleDashboard({ role });
				router.replace(routeTarget);
			}
		} else {
			toast({
				...errorToastOptions,
				title: 'Register Gagal',
				description: responseFormRegister.message,
			});
		}
	});

	return (
		<form onSubmit={onFormSubmit}>
			<InputForm<RegisterFormSchema>
				control={control}
				name="name"
				label="Name"
				placeholder="john doe"
				type="text"
				isRequired={true}
			/>

			<InputForm<RegisterFormSchema>
				control={control}
				name="email"
				label="Email"
				placeholder="mail@example.com"
				type="email"
				isRequired={true}
			/>

			<InputForm<RegisterFormSchema>
				control={control}
				name="password"
				label="Password"
				placeholder="Min. 6 characters"
				type="password"
				isRequired={true}
			/>

			<InputForm<RegisterFormSchema>
				control={control}
				name="passwordConfirm"
				label="Password Confirmation"
				placeholder="Min. 6 characters"
				type="password"
				isRequired={true}
			/>

			<Button
				fontSize="sm"
				variant="brand"
				fontWeight="500"
				w="100%"
				h="50"
				type="submit"
				mb="24px"
				isLoading={isLoading}>
				Sign Up
			</Button>
		</form>
	);
}
