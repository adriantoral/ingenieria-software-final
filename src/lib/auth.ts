'use server';

import * as fs from 'node:fs';
import path    from 'node:path';

import {
	ModelUsuario,
	ModelUsuarioSignin
}              from '@/models/usuario';


export async function registrarSesion( usuario: ModelUsuario )
{
	const filePath = path.resolve( './data/users.json' );
	const usuariosBBDD = JSON.parse( fs.readFileSync( filePath, { encoding: 'utf-8' } ) );

	if ( usuario.password.length < 8 )
		return false;

	try
	{
		fs.writeFileSync( filePath, JSON.stringify( [ ...usuariosBBDD, usuario ], null, 2 ), { encoding: 'utf-8' } );
		return true;
	}
	catch ( e )
	{ return false; }
}

export async function iniciarSesion( usuario: ModelUsuarioSignin )
{
	const filePath = path.resolve( './data/users.json' );
	const usuariosBBDD = JSON.parse( fs.readFileSync( filePath, { encoding: 'utf-8' } ) );

	return usuariosBBDD.find( ( user: ModelUsuario ) => user.nombre === usuario.nombre && user.password === usuario.password );
}