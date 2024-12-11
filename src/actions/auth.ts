'use server';

import { cookies }          from 'next/headers';

import {
	iniciarSesion,
	registrarSesion
}                           from '@/lib/auth';
import {
	ModelUsuario,
	ModelUsuarioSignin
}                           from '@/models/usuario';
import { ActionReturnType } from '@/types';


export async function SigninAction( formdata: FormData ): Promise<ActionReturnType>
{
	const usuario: ModelUsuarioSignin = {
		nombre  : ( formdata.get( 'nombre' ) as string ) || 'Pedro Palotes',
		password: ( formdata.get( 'password' ) as string ) || ''
	};

	if ( !usuario.nombre.trim() || !usuario.password.trim() ) return {
		success: false,
		error  : 'Nombre y contraseña necesarios'
	};

	if ( !await iniciarSesion( usuario ) ) return {
		success: false,
		error  : 'Contraseña incorrecta'
	};

	const cookieStore = await cookies();
	cookieStore.set( 'session', 'true' );

	return {
		success: true,
		message: 'Inicio de sesion correcto'
	};
}

export async function SignupAction( formdata: FormData ): Promise<ActionReturnType>
{
	const usuario: ModelUsuario = {
		isAdmin : false,
		nombre  : ( formdata.get( 'nombre' ) as string ) || 'Pedro Palotes',
		password: ( formdata.get( 'password' ) as string ) || '',
		dni     : '123456789A'
	};

	if ( !await registrarSesion( usuario ) ) return {
		success: false,
		error  : 'Error al registrar al usuario'
	};

	return {
		success: true,
		message: 'Registro correcto'
	};
}
