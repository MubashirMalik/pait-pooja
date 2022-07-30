import {useState, useEffect} from 'react'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CardLists from './components/CardList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Checkout from './components/CheckOut';

import {
	Route,
	Routes
 } from "react-router-dom";

import './App.css';

export default function App(){
	const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("authToken"))
	const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || [] )
	const [grandTotal, setGrandTotal] = useState(0)

	useEffect(() => {
		function getGrandTotal(total, item) {
			return total + item.price * item.quantity
		}
		setGrandTotal(() => {
			return cart.reduce(getGrandTotal, 0)
		})
		localStorage.setItem("cart", JSON.stringify(cart))
	}, [cart])

	console.log("App rendered!")
	return (
		<div className="App">
			<Navbar numItems={cart.length} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
			<div className="App-body">
				<Routes>
					<Route exact path="/" element={<CardLists setCart={setCart}/>} />
					<Route exact path="/checkout" element={<Checkout cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} grandTotal={grandTotal} />} />
					<Route path="*" element={ <PageNotFound />}/>
					<Route exact path="/login" element={ <Login setIsLoggedIn={setIsLoggedIn} /> } />
					<Route exact path="/sign-up" element={ <SignUp setIsLoggedIn={setIsLoggedIn} />} />
				</Routes>
			</div>
			<Footer />
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