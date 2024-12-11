import { cookies } from 'next/headers';


export async function isLogged()
{
	return ( await cookies() ).has( 'session' );
}