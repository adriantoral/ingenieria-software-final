export type ActionReturnType =
	{
		success: true
		message: string
	} | {
		success: false
		error: string
	}

export type ToastType = {
	message: string
}