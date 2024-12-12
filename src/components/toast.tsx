import { ToastType } from '@/types';


type ToastProps = ToastType


export function Toast( props: ToastProps )
{
	const { message } = props;

	return (
		<div
			id={ 'toast-default' }
			className={ 'flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow' }
			role={ 'alert' }
		>
			<p className={ 'text-center md:text-end text-sm font-normal' }>
				{ message }
			</p>
		</div>
	);
}


type ToastContainerProps = {
	toasts: ToastType[]
};


export default function ToastContainer( props: ToastContainerProps )
{
	const { toasts } = props;

	return (
		<div className={ 'fixed flex flex-col gap-4 top-4 end-1/2 translate-x-1/2 md:top-8 md:end-8 md:translate-x-0 z-10' }>
			{
				toasts.map
				(
					( { message }, index ) => <Toast key={ index } message={ message }/>
				)
			}
		</div>
	);
}