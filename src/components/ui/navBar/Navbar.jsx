import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {MyButton} from "../button/MyButton";
import {AuthContext} from "../../../context";

export const Navbar = () => {
	const { setIsAuth } = useContext(AuthContext);

	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem('auth');
	}

	return (<div>
		<div className='navbar'>
			<MyButton onClick={logout}>
				Log Out
			</MyButton>
			<div className='navbar__links'>
				<Link to='./about'>about site</Link>
				<Link to='./posts'> posts</Link>
			</div>
		</div>
	</div>)
}