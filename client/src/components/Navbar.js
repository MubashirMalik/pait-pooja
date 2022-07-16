import {Link} from 'react-router-dom';
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
				</ul> 
				:
				<ul>
					<li><Link to="/">Welcome Mubashir!</Link></li>
					<li><button onClick={logout}>Logout</button></li>
				</ul>
			}
		</header>
	)
}
