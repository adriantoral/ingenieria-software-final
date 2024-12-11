'use client';

import React, { useState } from 'react';


type Product = {
	id: number;
	name: string;
	price: number;
};

type CoreReservasProps = {};

export default function CoreReservas( props: CoreReservasProps )
{
	const [ products, setProducts ] = useState<Product[]>( [] );
	const [ isPopupOpen, setIsPopupOpen ] = useState( false );
	const [ currentProduct, setCurrentProduct ] = useState<Omit<Product, 'id'> | null>( null );
	const [ editingId, setEditingId ] = useState<number | null>( null );

	// añadir producto
	const addProduct = ( newProduct: Omit<Product, 'id'> ) =>
	{
		const id = products.length ? products[products.length - 1].id + 1 : 1;
		setProducts( [ ...products, { id, ...newProduct } ] );
		closePopup();
	};

	//Comprobar que el producto a editar existe
	const handleSave = () =>
	{
		if ( currentProduct )
		{
			if ( editingId !== null )
			{
				modifyProduct( editingId, currentProduct );
			}
			else
			{
				addProduct( currentProduct );
			}
		}
	};

	// Modificar productos
	const modifyProduct = ( id: number, updatedProduct: Partial<Omit<Product, 'id'>> ) =>
	{
		setProducts(
			products.map( product =>
				product.id === id ? { ...product, ...updatedProduct } : product
			)
		);
		closePopup();
	};

	//pop up para rellenar elementos de los productos
	const openPopup = ( id?: number ) =>
	{
		if ( id !== undefined )
		{
			const product = products.find( p => p.id === id );
			if ( product )
			{
				setCurrentProduct( { name: product.name, price: product.price } );
				setEditingId( id );
			}
		}
		else
		{
			setCurrentProduct( { name: '', price: 0 } );
			setEditingId( null );
		}
		setIsPopupOpen( true );
	};


	const closePopup = () =>
	{
		setIsPopupOpen( false );
		setCurrentProduct( null );
		setEditingId( null );
	};

	/* html */
	return (
		<div className="p-4 bg-gray-100 min-h-screen">
			{/* Titulo */}
			<h1 className="text-2xl font-bold mb-4">Core Reservas</h1>
			{/* PopUp añadir producto*/}
			<div className="mb-4">
				<button
					onClick={ () => openPopup() }
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Añadir Producto
				</button>
			</div>

			{/*  */}
			<ul className="list-disc pl-5">
				{ products.map( product => (
					<li key={ product.id } className="mb-2 flex justify-between bg-gray-100 rounded-lg mx-4 mt-4 p-4 shadow-md">
						<div>
							<span className="font-medium">{ product.name }</span> -
							<span className="text-gray-700">${ product.price }</span>
						</div>
						<button
							onClick={ () => openPopup( product.id ) }
							className="text-blue-500 underline"
						>
							Editar
						</button>
					</li>
				) ) }
			</ul>

			{ isPopupOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-6 rounded shadow-md">
						<h2 className="text-xl font-bold mb-4">{ editingId !== null ? 'Edit Product' : 'Add Product' }</h2>
						<div className="mb-4">
							<label className="block text-gray-700">Name</label>
							<input
								type="text"
								value={ currentProduct?.name || '' }
								onChange={ e => setCurrentProduct( { ...currentProduct!, name: e.target.value } ) }
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Price</label>
							<input
								type="number"
								value={ currentProduct?.price || 0 }
								onChange={ e => setCurrentProduct( { ...currentProduct!, price: parseFloat( e.target.value ) } ) }
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="flex justify-end">
							<button
								onClick={ closePopup }
								className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
							>
								Cancel
							</button>
							<button
								onClick={ handleSave }
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			) }
		</div>
	);
}