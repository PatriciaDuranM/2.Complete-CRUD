import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const User = () => {
	// Guardamos los usuarios para poder pintarlos con user y setUsers
	const [user, setUser] = useState();
	const { id } = useParams();

	const navigate = useNavigate();
	useEffect(() => {
		findById(setUser, id);
		// Lo del [cuadrado] detras es para que si cambian los datos lo vuelva a pintar
	}, [id]);
	return (
		<>
			<h1>Datos del Usuario</h1>

			{/* Esto es necesario para recibir el usuario del servidor y que se ejecute bien  */}
			{!user && <p>No user available</p>}
			{user && (
				<>
					<h2>
						Name:<span>{user.name}</span>
					</h2>
					<h2>
						Email:<span>{user.email}</span>
					</h2>

					<h2>EDITAR USUARIO</h2>
					<form
						onSubmit={event => {
							updateUser(id, event, user, setUser);
						}}
					>
						<label htmlFor='name'>Name:</label>
						<input type='text' name='name' id='name' defaultValue={user.name} />

						<div>
							<label htmlFor='email'>Email:</label>
							<input
								type='text'
								name='email'
								id='email'
								defaultValue={user.email}
							/>
						</div>

						<input type='submit' value={'Actualizar Datos'}></input>
					</form>
				</>
			)}
			<div>
				<button onClick={() => deleteUser(id, navigate)}>
					Eliminar usuario
				</button>
			</div>
			<Link to='/'>
				<button>Back to users</button>
			</Link>
		</>
	);
};

const findById = async (setUser, id) => {
	// En esta funcion necesitamos el id para identificar y el setuser para guardar los datos
	try {
		const response = await fetch(`http://localhost:3000/api/users/${id}`);

		const users = await response.json();
		setUser(users);
		console.log(users);
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (userId, navigate) => {
	try {
		const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
			// Especificamos el metodo
			method: 'DELETE'
		});
		await response.json();
		navigate('/');
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async (id, event, user, setUser) => {
	event.preventDefault();
	try {
		const userData = {
			name: event.target.name.value || user.name,
			email: event.target.email.value || user.email
		};
		const response = await fetch(`http://localhost:3000/api/users/${id}`, {
			// Especificamos el metodo
			method: 'PATCH',
			// Lo que le metemos, los nuevos datos
			body: JSON.stringify(userData),
			// Especificamos al servidor el tipo de información, dato le enviamos
			headers: { 'Content-Type': 'application/json' }
		});
		const data = await response.json();
		setUser(data);
	} catch (error) {
		console.log(error);
	}
};

export default User;
