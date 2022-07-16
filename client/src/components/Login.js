import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './Login.css';

export default function Login() {

	const [formData, setFormData] = useState({
    	email: "",
    	password: "",
    	error: ""
  	});

  	function handleChange(event) {
		setFormData(prevFormData => {
			return {
				...prevFormData, 
				[event.target.name]: event.target.value
			}
		})
	
	}
  	
	function handleSubmit(evt) {
    	evt.preventDefault();
  	}

	return (
		<div className='Login'>
			<div>
				<h1>Login</h1>
				<svg className="cl-ao cl_af" viewBox="0 0 223 17" fill="none">
					<path opacity="0.5" d="M2 11.3686C17.6603 8.02778 33.9464 6.93097 49.9106 6.13771C76.6733 4.80789 103.638 4.48984 130.396 6.01883C154.367 7.38859 178.015 10.6844 201.964 7.92099C208.097 7.21339 216.371 7.08879 222.413 7.08879" stroke="#E7A4D0" strokeWidth="10" strokeLinejoin="round"></path>
				</svg>
			</div>
			<form>
				<div className="form-error">{formData.error}</div>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					autoComplete="true"
					placeholder="Email"
				/>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					autoComplete="true"
					placeholder="Password"
				/>
				<button onClick={handleSubmit}>Log In</button>
			</form>
			<div className="footer">New Here?{" "}
				<Link to="/sign-up">Sign Up</Link>
			</div>
		</div>
	);
}
