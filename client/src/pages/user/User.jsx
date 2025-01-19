import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const User = () => {
	const [user, setUser] = useState();
	const { id } = useParams();
	const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });

	const inputText = event => {
		const { name, value } = event.target;
		setUpdatedUser({ ...updatedUser, [name]: value });
	};

	useEffect(() => {
		findById(setUser, id);
	}, [id]);
	return (
		<>
			<h1>User</h1>
			{!user && <p>Loading</p>}
			{user && (
				<>
					<h2>
						Name:<span>{user.name}</span>
					</h2>
					<h2>
						Email:<span>{user.email}</span>
					</h2>

					<h2>EDITAR USUARIO</h2>
					<div>
						<label>Name:</label>
						<input
							type='text'
							name='name'
							placeholder={user.name}
							value={updatedUser.name}
							onInput={inputText}
						/>
					</div>
					<div>
						<label>Email:</label>
						<input
							type='text'
							name='email'
							placeholder={user.email}
							value={updatedUser.email}
							onInput={inputText}
						/>
					</div>

					<button onClick={() => updateUser(updatedUser, setUpdatedUser)}>
						Actualizar Datos
					</button>
				</>
			)}
			<div>
				<button onClick={() => deleteUser(id)}>Eliminar usuario</button>
			</div>
			<Link to='/'>
				<button>Back to users</button>
			</Link>
		</>
	);
};

const findById = async (setUser, id) => {
	try {
		const response = await fetch(`http://localhost:3000/api/users/${id}`);
		const users = await response.json();
		setUser(users);
		console.log(users);
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async userId => {
	try {
		const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
			// Especificamos el metodo
			method: 'DELETE'
		});
		await response.json();
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async ({ id, setUser, setUpdatedUser }) => {
	try {
		// Aqui el fetch le sigue una coma para que le demos instrucciones de que hacer en un objeto de configuración
		const response = await fetch(`http://localhost:3000/api/users/${id}`, {
			// Especificamos el metodo
			method: 'PATCH',
			// Lo que le metemos, los nuevos datos
			body: JSON.stringify(updateUser),
			// Especificamos al servidor el tipo de información, dato le enviamos
			headers: { 'Content-Type': 'application/json' }
		});
		const updated = await response.json();
		setUser(updated);
		// Dejar los campos en blanco de nuevo
		setUpdatedUser({ name: '', email: '' });
	} catch (error) {
		console.log(error);
	}
};

export default User;
