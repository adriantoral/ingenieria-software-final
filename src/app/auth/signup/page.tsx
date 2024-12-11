'use client';

import Link             from 'next/link';
import { useRouter }    from 'next/navigation';

import { SignupAction } from '@/actions/auth';


type SignupPageProps = {};
export default function SignupPage( props: SignupPageProps )
{
	const {} = props;

	const router = useRouter();

	async function handler( formdata: FormData )
	{
		const data = await SignupAction( formdata );
		if ( !data.success ) return alert( data.error );

		router.push( '/auth/signin' );
	}

	return (
		<div className={ 'flex flex-row justify-center items-center w-dvw h-dvh' }>
			<form action={ handler } className={ 'flex flex-col gap-4' }>
				<p className={ 'text-3xl text-center' }>Registrar usuario</p>
				<input className={ 'rounded border focus:outline-0 p-2' } type={ 'text' } name={ 'nombre' } placeholder={ 'Nombre de' +
					' usuario' }/>
				<input className={ 'rounded border focus:outline-0 p-2' } type={ 'password' } name={ 'password' }
				       placeholder={ 'Contraseña' }/>
				<Link href={ '/auth/signin' } className={ 'text-blue-500 text-xs text-end' }>Iniciar sesion</Link>
				<button type={ 'submit' } className={ 'rounded border bg-gray-200 p-4' }>Registrar usuario</button>
			</form>
		</div>
	);
}