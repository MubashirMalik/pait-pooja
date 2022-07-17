import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './SignUp.css';

export default function SignUp(props) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
		mobileNumber: "",
	});
	const [error, setError] = useState("")

	useEffect(() => {
		if(localStorage.getItem('authToken')) {
			navigate('/')
		}
	})

	function handleChange(event) {
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value
			}
		});
	}
	
	async function registerUser() {
		const res = await fetch('http://localhost:3001/api/auth/register',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({...formData})
		})

		const resData = await res.json()
		if (!resData.user) {
			setError(resData.message);
		} else {
			localStorage.setItem('authToken', resData.token)
			props.setIsLoggedIn(true)
			navigate('/');
		} 
	}

	async function handleSubmit(event) {
		event.preventDefault();

		let _error = "";
		if (formData.name.length < 3) {
			_error = "Name must be atleast 3 characters long"
		} else if (formData.password !== formData.passwordConfirm) {
			_error = "Passwords don't match"
		} else if (formData.password.length < 8) {
			_error = "Password must be atleast 8 characters long"
		} else if (formData.mobileNumber.length !== 11) {
			_error = "Invalid mobile number"
		} else if (!/^[0-9]+$/.test(formData.mobileNumber)) {
			_error = 'Invalid mobile number'
		} else if (formData.mobileNumber[0] !== '0' || formData.mobileNumber[1] !== '3') {
			_error = 'Invalid mobile number'
		}

		setError(_error)
		if (_error === "") {
			await registerUser()
		}
	}

	return (
		<div className="App-body">
			<div className='SignUp'>
				<div>
					<h1>Register</h1>
					<svg className="cl-ao cl_af" viewBox="0 0 223 17" fill="none">
						<path opacity="0.5" d="M2 11.3686C17.6603 8.02778 33.9464 6.93097 49.9106 6.13771C76.6733 4.80789 103.638 4.48984 130.396 6.01883C154.367 7.38859 178.015 10.6844 201.964 7.92099C208.097 7.21339 216.371 7.08879 222.413 7.08879" stroke="#E7A4D0" strokeWidth="10" strokeLinejoin="round"></path>
					</svg>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="form-error">{error}</div>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						autoComplete="true"
						placeholder="Name"
					/>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						autoComplete="true"
						placeholder="Email Address"
					/>
					<input
						type="tel"
						name='mobileNumber'
						value={formData.mobileNumber}
						onChange={handleChange}
						placeholder='Mobile Number'
					/>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						autoComplete="true"
						placeholder="Password"
					/>
					<input
						type="password"
						name="passwordConfirm"
						value={formData.passwordConfirm}
						onChange={handleChange}
						autoComplete="true"
						placeholder="Confirm Password"
					/>
					<button>Sign up</button>
				</form>
				<div className="footer">Have an account?{" "}
				<Link to="/login">Log In</Link>
				</div>
			</div>
		</div>
	);
}
