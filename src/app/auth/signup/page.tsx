'use client';

import Link                from 'next/link';
import { useRouter }       from 'next/navigation';
import * as React          from 'react';

import { signupAction }    from '@/actions/auth';
import { useToastContext } from '@/context/toast';


type SignupPageProps = {};


export default function SignupPage( props: SignupPageProps )
{
	const {} = props;

	const { push } = useRouter();
	const { addToast } = useToastContext();

	const [ nombre, setNombre ] = React.useState( '' );
	const [ password, setPassword ] = React.useState( '' );

	async function handler( event: React.FormEvent<HTMLFormElement> )
	{
		event.preventDefault();

		const data = await signupAction( { isAdmin: false, nombre, password, dni: '123456789A' } );
		if ( !data.success ) return addToast( { message: data.error } );

		push( '/' );
	}

	return (
		<div className={ 'flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-4' }>
			<form
				onSubmit={ handler }
				className={ 'bg-white shadow-lg rounded-lg p-6 max-w-sm w-full flex flex-col gap-6' }
			>
				<p className={ 'text-2xl font-bold text-center text-gray-700' }>
					Registrar Usuario
				</p>

				<input
					className={ 'w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' }
					type={ 'text' }
					name={ 'nombre' }
					placeholder={ 'Nombre de usuario' }
					onChange={ ( { target } ) => setNombre( target.value ) }
				/>

				<input
					className={ 'w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' }
					type={ 'password' }
					name={ 'password' }
					placeholder={ 'Contraseña' }
					onChange={ ( { target } ) => setPassword( target.value ) }
				/>

				<div className={ 'text-right' }>
					<Link
						href={ '/auth/signin' }
						className={ 'text-sm text-blue-500 hover:underline' }
					>
						Iniciar sesión
					</Link>
				</div>

				<button
					type={ 'submit' }
					className={ 'w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all' }
				>
					Registrar Usuario
				</button>
			</form>
		</div>
	);
}