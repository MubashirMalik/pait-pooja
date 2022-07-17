import {useState} from 'react'
import Navbar from './components/Navbar';
import CardLists from './components/CardList';
import Login from './components/Login';
import SignUp from './components/SignUp';

import {
	Route,
	Routes
 } from "react-router-dom";

import './App.css';

export default function App(){
	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken"))

	return (
		<div className="App">
			<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
			<Routes>
				<Route exact path="/" element={<CardLists />} />
				<Route path="*" element={ <PageNotFound />}/>
				<Route exact path="/login" element={ <Login setIsLoggedIn={setIsLoggedIn} /> } />
				<Route exact path="/sign-up" element={ <SignUp setIsLoggedIn={setIsLoggedIn} />} />
			</Routes>
		</div>
  	);
}


function PageNotFound() {
	return(
		<div className="PageNotFound">
			<h1>Uh Oh!</h1>
			<div className="emoji">¯\_(ツ)_/¯</div>
			<div>We can't seem to find the page you're looking for.
				<svg className="cl-ao cl_af" viewBox="0 0 223 17" fill="none">
					<path opacity="0.5" d="M2 11.3686C17.6603 8.02778 33.9464 6.93097 49.9106 6.13771C76.6733 4.80789 103.638 4.48984 130.396 6.01883C154.367 7.38859 178.015 10.6844 201.964 7.92099C208.097 7.21339 216.371 7.08879 222.413 7.08879" stroke="#F59794" strokeWidth="10" strokeLinejoin="round"></path>
				</svg>
			</div>
		</div>
	)
}