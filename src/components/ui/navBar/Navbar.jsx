import {Link} from "react-router-dom";
import React from "react";

export const Navbar = () => {
	return (
		<div>
			<div className='navbar'>
				<div className='navbar-items'>
					<Link to='./about'>about site</Link>
					<Link to='./posts'> posts</Link>
				</div>
			</div>
		</div>
	)
}