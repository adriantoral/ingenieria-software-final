'use client';
type CoreBodegaProps = {}

import React, { useState } from 'react';

const initialData = [
	{ id: 1, name: 'Harina', date: '2024-12-10', quantity: 50, description: 'Harina de trigo' },
	{ id: 2, name: 'Azúcar', date: '2024-12-11', quantity: 30, description: 'Azúcar refinada' },
];

export default function CoreBodega(props: CoreBodegaProps) {
	const [materials, setMaterials] = useState(initialData);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newMaterial, setNewMaterial] = useState({
		id: materials.length + 1,
		name: '',
		date: new Date().toISOString().split('T')[0],
		quantity: 0,
		description: '',
	});
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
	const [newUser, setNewUser] = useState({
		name: '',
		DNI: '',
		password: '',
		isAdmin: false,
	});
	const [isAdmin, setIsAdmin] = useState(true); // Simula si el usuario actual es administrador

	const addMaterial = () => {
		setMaterials([...materials, newMaterial]);
		setNewMaterial({
			id: materials.length + 2,
			name: '',
			date: new Date().toISOString().split('T')[0],
			quantity: 0,
			description: '',
		});
		setIsModalOpen(false);
	};

	const registerUser = () => {
		console.log('Nuevo usuario registrado:', newUser);
		setNewUser({
			name: '',
			DNI: '',
			password: '',
			isAdmin: false,
		});
		setIsRegisterModalOpen(false);
	};

	const deleteMaterial = (id: number) => {
		setMaterials(materials.filter((material) => material.id !== id));
	};

	return (
		<div className={'bg-gray-100 rounded-lg mx-4 mt-4 p-4 shadow-md'}>
			<h1 className="text-xl font-bold mb-4">Materias Primas</h1>
			<table className="table-auto w-full border-collapse border border-gray-300">
				<thead>
				<tr className="bg-gray-200">
					<th className="border border-gray-300 px-4 py-2">ID</th>
					<th className="border border-gray-300 px-4 py-2">Nombre</th>
					<th className="border border-gray-300 px-4 py-2">Fecha</th>
					<th className="border border-gray-300 px-4 py-2">Cantidad</th>
					<th className="border border-gray-300 px-4 py-2">Descripción</th>
					<th className="border border-gray-300 px-4 py-2">Acciones</th>
				</tr>
				</thead>
				<tbody>
				{materials.map((material) => (
					<tr key={material.id}>
						<td className="border border-gray-300 px-4 py-2 text-center">{material.id}</td>
						<td className="border border-gray-300 px-4 py-2">{material.name}</td>
						<td className="border border-gray-300 px-4 py-2">{material.date}</td>
						<td className="border border-gray-300 px-4 py-2 text-center">{material.quantity}</td>
						<td className="border border-gray-300 px-4 py-2">{material.description}</td>
						<td className="border border-gray-300 px-4 py-2 text-center">
							<button
								onClick={() => deleteMaterial(material.id)}
								className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
							>
								Borrar
							</button>
						</td>
					</tr>
				))}
				</tbody>
			</table>
			<button
				onClick={() => setIsModalOpen(true)}
				className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
			>
				Añadir Nuevo
			</button>

			{isAdmin && (
				<button
					onClick={() => setIsRegisterModalOpen(true)}
					className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 ml-4"
				>
					Registrar Personal
				</button>
			)}

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold mb-4">Añadir Nuevo Material</h2>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Nombre:</label>
							<input
								type="text"
								value={newMaterial.name}
								onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
								className="w-full border border-gray-300 rounded px-2 py-1"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Cantidad:</label>
							<input
								type="number"
								value={newMaterial.quantity}
								onChange={(e) => setNewMaterial({ ...newMaterial, quantity: parseInt(e.target.value, 10) })}
								className="w-full border border-gray-300 rounded px-2 py-1"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Descripción:</label>
							<textarea
								value={newMaterial.description}
								onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
								className="w-full border border-gray-300 rounded px-2 py-1"
							/>
						</div>
						<div className="flex justify-end">
							<button
								onClick={() => setIsModalOpen(false)}
								className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
							>
								Cancelar
							</button>
							<button
								onClick={addMaterial}
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
							>
								Guardar
							</button>
						</div>
					</div>
				</div>
			)}

			{isRegisterModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold mb-4">Registrar Nuevo Personal</h2>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Nombre:</label>
							<input
								type="text"
								value={newUser.name}
								onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
								className="w-full border border-gray-300 rounded px-2 py-1"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">DNI:</label>
							<input
								type="text"
								value={newUser.DNI}
								onChange={(e) => setNewUser({ ...newUser, DNI: e.target.value })}
								className="w-full border border-gray-300 rounded px-2 py-1"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Contraseña:</label>
							<input
								type="password"
								value={newUser.password}
								onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
								className="w-full border border-gray-300 rounded px-2 py-1"
							/>
						</div>
						<div className="mb-4">
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									checked={newUser.isAdmin}
									onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })}
									className="mr-2"
								/>
								Es administrador
							</label>
						</div>
						<div className="flex justify-end">
							<button
								onClick={() => setIsRegisterModalOpen(false)}
								className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
							>
								Cancelar
							</button>
							<button
								onClick={registerUser}
								className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
							>
								Registrar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
