import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
	const [credentials, setCredentials] = useState({ email: '', password: '' });

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('http://localhost:5000/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: credentials.email, password: credentials.password })
		});
		const json = await response.json();

		if (json.success) {
			localStorage.setItem('token', json.authToken);
			navigate('/');
			props.showAlert('Logged in successfully.', 'success')
		}
		else {
			props.showAlert('Invalid Credentials.', 'danger')
		}
	}

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	}

	return (
		<>
			<div className="mt-5">
				<h1>Log In to continue to iNotebook</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
						<input type="email" className="form-control" name='email' id="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
						<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
						<input type="password" className="form-control" name='password' id="password" onChange={onChange} value={credentials.password} />
					</div>
					<button type="submit" className="btn btn-primary">Log In</button>
				</form>
			</div>
		</>
	)
}

export default Login