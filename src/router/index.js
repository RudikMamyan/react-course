import {About} from "../pages/About";
import {Posts} from "../pages/Posts";
import {PostIdPages} from "../pages/PostIdPages";
import Login from "../pages/Login";
import {Navigate} from "react-router-dom";

export const privateRoutes = [
	{path: '/about', element: <About/>, exact: true, key: Math.random()},
	{path: '/posts', element: <Posts/>, exact: true, key: Math.random()},
	{path: 'posts/:id', element: <PostIdPages/>, exact: true, key: Math.random()},
	{path: '/*', element: <Navigate to={'/posts'}/>, exact: true, key: Math.random()}
]

export const publicRoutes = [
	{path: '/login', element: <Login/>, exact: true, key: Math.random()},
	{path: '/*', element: <Navigate to={'/login'}/>, exact: true, key: Math.random()},
]