import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

	const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password, cpassword } = credentials;

		if (password === cpassword) {
			const response = await fetch('http://localhost:5000/api/auth/createuser', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, password })
			});

			const json = await response.json();

			if (json.success) {
				localStorage.setItem('token', json.authToken);
				navigate('/');
				props.showAlert('Account created successfully.', 'success');
			}
			else {
				props.showAlert('Invalid Details.', 'danger');
			}
		}
		else {
			props.showAlert('Passwords did not match.', 'warning');
		}
	}

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	}

	return (
		<>
			<div className="mt-5">
				<h1>Create an account to use iNotebook</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="name" className="form-label">Name</label>
						<input type="text" className="form-control" onChange={onChange} id="name" name='name' minLength={3} />
					</div>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email address</label>
						<input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
						<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">Password</label>
						<input type="password" className="form-control" onChange={onChange} id="password" name='password' minLength={5} />
					</div>
					<div className="mb-3">
						<label htmlFor="cpassword" className="form-label">Confirm Password</label>
						<input type="password" className="form-control" onChange={onChange} id="cpassword" name='cpassword' minLength={5} />
					</div>
					<button type="submit" className="btn btn-primary">Sign Up</button>
				</form>
			</div>
		</>
	)
}

export default Signup