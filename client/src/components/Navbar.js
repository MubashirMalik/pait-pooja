import {Link} from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './Navbar.css'

export default function Navbar(props) {

	function logout() {
		localStorage.removeItem("authToken")
		props.setIsLoggedIn(false)
	}

	return (
		<header>
			<div className="logo">
				<Link to="/">PaitPooja</Link>
			</div>
			{ !props.isLoggedIn?
				<ul>
					<li><Link to="/sign-up">Create Account</Link></li>
					<li><Link to="/login">Log In</Link></li>
					<li className="cart"><ShoppingCartCheckoutIcon /> [{props.numItems}] 
						<Link to="/">Checkout</Link>
					</li>
				</ul> 
				:
				<ul>
					<li><Link to="/">Welcome Mubashir!</Link></li>
					<li><button onClick={logout}>Logout</button></li>
					<li className="cart"><ShoppingCartCheckoutIcon /> [{props.numItems}] 
						<Link to="/">Checkout</Link>
					</li>
				</ul>
			}
		</header>
	)
}
