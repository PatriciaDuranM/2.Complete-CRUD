import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import User from '../pages/user/User';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/user/:id' element={<User />} />
		</Routes>
	);
};

export default Router;
