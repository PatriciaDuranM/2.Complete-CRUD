import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState({ name: '', email: '' });

	useEffect(() => {
		fetchUsers(setUsers);
	}, []);

	const inputText = event => {
		const { name, value } = event.target;
		setNewUser({ ...newUser, [name]: value });
	};

	return (
		<>
			<h1>Home</h1>
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
				<button onClick={() => createUser(newUser, setNewUser)}>
					CREAR NUEVO USUARIO
				</button>
			</div>
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
		const response = await fetch('http://localhost:3000/api/users');
		const users = await response.json();
		setUsers(users);
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (newUser, setNewUser) => {
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
		await response.json();
		// Dejar los campos en blanco de nuevo
		setNewUser({ name: '', email: '' });
	} catch (error) {
		console.log(error);
	}
};

export default Home;
