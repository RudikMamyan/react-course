import React, {useContext} from 'react';
import {MyInput} from "../components/ui/input/MyInput";
import {MyButton} from "../components/ui/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {

	const {setIsAuth} = useContext(AuthContext)

	const login = e => {
		e.preventDefault();
		setIsAuth(true);
		localStorage.setItem('auth', 'true')
	}

	return (
		<div>
			<h1>login page</h1>
			<form onSubmit={login}>
				<MyInput type='text' placeholder='add login'/>
				<MyInput type='password' placeholder='add password'/>
				<MyButton>Go</MyButton>
			</form>
		</div>
	);
};

export default Login;