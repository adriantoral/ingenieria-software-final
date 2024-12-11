'use client';

import Link             from 'next/link';
import { useRouter }    from 'next/navigation';
import * as React       from 'react';

import { SigninAction } from '@/actions/auth';


type SigninPageProps = {};


export default function SigninPage( props: SigninPageProps )
{
	const {} = props;

	const router = useRouter();

	async function handler( formdata: FormData )
	{
		const data = await SigninAction( formdata );
		if ( !data.success ) return alert( data.error );

		router.push( '/' );
	}

	return (
		<div className={ 'flex flex-row justify-center items-center w-dvw h-dvh' }>
			<form action={ handler } className={ 'flex flex-col gap-4' }>
				<p className={ 'text-3xl text-center' }>Iniciar sesion</p>
				<input
					className={ 'rounded border focus:outline-0 p-2' }
					type={ 'text' }
					name={ 'nombre' }
					placeholder={ 'Nombre de usuario' }
				/>
				<input
					className={ 'rounded border focus:outline-0 p-2' }
					type={ 'password' }
					name={ 'password' }
					placeholder={ 'Contraseña' }
				/>
				<Link href={ '/auth/signup' } className={ 'text-blue-500 text-xs text-end' }>Registrar usuario</Link>
				<button type={ 'submit' } className={ 'rounded border bg-gray-200 p-4' }>Iniciar sesion</button>
			</form>
		</div>
	);
}