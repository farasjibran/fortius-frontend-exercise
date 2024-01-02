import InputForm from '@/components/form/inputForm';
import { errorToastOptions, successToastOptions } from '@/config/uiToastConfig';
import { Button, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { navigateToRoleDashboard } from './navigateToRoleDashboard';

const LoginSchema = z.object({
	email: z.string().email('Email wajib diisi dengan format email yang benar'),
	password: z.string().min(6, 'Password wajib diisi dan minimal 6 karakter'),
});

export type LoginFormSchema = z.infer<typeof LoginSchema>;

export default function LoginForm() {
	const toast = useToast();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const { control, handleSubmit } = useForm<LoginFormSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onFormSubmit = handleSubmit(async (values) => {
		setIsLoading(true);

		const response = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false,
		});

		setIsLoading(false);

		if (response?.error) {
			if (response.error === 'pengguna belum terdaftar') {
				toast({
					...errorToastOptions,
					title: 'Login Gagal',
					description:
						'Email dan password yang Anda masukkan tidak ditemukan pada sistem kami.',
				});
			} else if (response.error === 'password salah') {
				toast({
					...errorToastOptions,
					title: 'Login Gagal',
					description: 'Password yang Anda masukkan salah.',
				});
			}

			return;
		}

		if (response?.ok) {
			toast({
				...successToastOptions,
				title: 'Login Berhasil',
				description: 'Selamat datang',
			});

			const session = await getSession();
			const role = session?.role;

			const routeTarget = navigateToRoleDashboard({ role });
			router.replace(routeTarget);
		}
	});

	return (
		<form onSubmit={onFormSubmit}>
			<InputForm<LoginFormSchema>
				control={control}
				name="email"
				label="Email"
				placeholder="mail@example.com"
				type="email"
				isRequired={true}
			/>

			<InputForm<LoginFormSchema>
				control={control}
				name="password"
				label="Password"
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
				Sign In
			</Button>
		</form>
	);
}
