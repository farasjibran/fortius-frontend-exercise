import AppWrappers from '@/utils/AppWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Frontend Exercise',
	description: 'This is a exercise for fortius fullstack',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body id={'root'}>
				<AppWrappers>{children}</AppWrappers>
			</body>
		</html>
	);
}
