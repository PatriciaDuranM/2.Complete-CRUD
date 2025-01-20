import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState({ name: '', email: '' });

	useEffect(() => {
		// Guardar en el estado los datos que han llegado, se usa el set
		fetchUsers(setUsers);
	}, []);

	const inputText = event => {
		const { name, value } = event.target;
		setNewUser({ ...newUser, [name]: value });
	};

	return (
		<>
			<h1>Home</h1>
			<form
				onSubmit={event => createUser(event, newUser, setUsers, setNewUser)}
			>
				<div>
					<h2>Crear un nuevo usuario</h2>
					<input
						type='text'
						name='name'
						placeholder='Nombre'
						value={newUser.name}
						onInput={inputText}
					/>
					<input
						type='text'
						name='email'
						placeholder='nombre@gmail.com'
						value={newUser.email}
						onInput={inputText}
					/>
					<input type='submit' value={'CREAR NUEVO USUARIO'}></input>
				</div>
			</form>
			<h2>Lista de usuarios </h2>
			{users.length === 0 && <h2>No Users</h2>}
			{users.map(user => (
				<div key={user.userId}>
					<h2>{user.name}</h2>
					<Link to={`/user/${user.userId}`}>
						<button>View user Info</button>
					</Link>
				</div>
			))}
		</>
	);
};

const fetchUsers = async setUsers => {
	try {
		// Aqui el fetch no le sigue una coma para que le demos instrucciones de que hacer, por lo que hace el get por defecto de todos los users
		// Pide los datos hasta obtenerlos
		const response = await fetch('http://localhost:3000/api/users');
		// Convierte los datos a un formato JSON y despues imprime
		const data = await response.json();
		// Cuando quiera guardar los usuarios
		setUsers(data);
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (event, newUser, setUsers, setNewUser) => {
	event.preventDefault();
	try {
		// Aqui el fetch le sigue una coma para que le demos instrucciones de que hacer en un objeto de configuración
		const response = await fetch('http://localhost:3000/api/users', {
			// Especificamos el metodo
			method: 'POST',
			// Lo que le metemos, los nuevos datos
			body: JSON.stringify(newUser),
			// Especificamos al servidor el tipo de información, dato le enviamos
			headers: { 'Content-Type': 'application/json' }
		});
		const data = await response.json();
		setUsers(data);
		// Dejar los campos en blanco de nuevo
		setNewUser({ name: '', email: '' });
	} catch (error) {
		console.log(error);
	}
};

export default Home;
