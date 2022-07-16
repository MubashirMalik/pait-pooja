import {Link} from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
	return (
		<header>
			<div className="logo">
				<Link to="/">PaitPooja</Link>
			</div>
			<ul>
				<li>
					<Link to="/sign-up">Create Account</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
			</ul>
		</header>
	)
}
