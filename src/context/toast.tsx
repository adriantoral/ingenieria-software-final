'use client';

import {
	createContext,
	useContext,
	useState
}                     from 'react';

import ToastContainer from '@/components/toast';
import { ToastType }  from '@/types';


type ToastContextType = {
	addToast: ( toast: ToastType ) => void;
};

const ToastContext = createContext<ToastContextType>
(
	{
		addToast( _: ToastType ): void { }
	}
);

export default function ToastProvider
(
	{ children }:
		{ children: React.ReactNode }
)
{
	const [ toasts, setToast ] = useState<ToastType[]>( [] );

	function addToast( toast: ToastType )
	{
		setToast( ( prevToasts ) => [ ...prevToasts, toast ] );
		setTimeout( () => setToast( ( prevToasts ) => prevToasts.slice( 1 ) ), 5000 );
	}

	return (
		<ToastContext.Provider value={ { addToast } }>
			<ToastContainer toasts={ toasts }/>
			{ children }
		</ToastContext.Provider>
	);
}

export const useToastContext = () => useContext( ToastContext );
