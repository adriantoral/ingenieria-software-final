import {
	NextRequest,
	NextResponse
}                   from 'next/server';

import { isLogged } from '@/utils/auth';


export async function middleware( request: NextRequest )
{
	if ( !( await isLogged() ) )
		return NextResponse.redirect( new URL( '/auth/signin', request.url ).toString() );

	NextResponse.next();
}

export const config = {
	matcher: '/((?!auth/|_next/static|_next/image|favicon.ico).*)'
};