export type ActionReturnType =
	{
		success: true
		message: string
	} | {
		success: false
		error: string
	}