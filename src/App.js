import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Posts from "./pages/Posts";
import {About} from "./pages/About";
import {Navbar} from "./components/ui/navBar/Navbar";


function App() {
	return (
		<BrowserRouter>
			<Navbar/>
			<Routes>
				<Route exact path="/about" element={<About/>}/>
				<Route path="/posts" element={<Posts/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App;
