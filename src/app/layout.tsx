import type { Metadata } from 'next';

import ToastProvider     from '@/context/toast';

import './globals.css';


export const metadata: Metadata = {
	title      : 'La viñeda',
	description: 'La viñeda'
};

export default function RootLayout
(
	{
		children
	}: Readonly<{
		children: React.ReactNode;
	}>
)
{
	return (
		<html lang="es">
		<body>
		<ToastProvider>
			{ children }
		</ToastProvider>
		</body>
		</html>
	);
}
