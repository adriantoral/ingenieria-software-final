export type ModelUsuario = {
	isAdmin: boolean
	nombre: string
	dni: string
	password: string
}

export type ModelUsuarioSignin = Pick<ModelUsuario, 'nombre' | 'password'>