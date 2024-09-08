import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (credentials.password !== credentials.confirmPassword) {
      props.showalert("Passwords do not match.", "danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {                                                                                                                                 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        props.showalert("Account Created Successfully", "success");
        navigate("/");
      } else {
        props.showalert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      props.showalert("Something went wrong. Please try again later.", "danger");
    }
    
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container gap-2 col-6 border border-success rounded px-3 py-3">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input 
            type="text" 
            placeholder='Enter Full Name'
            className="form-control bg-secondary" 
            value={credentials.name} 
            onChange={onChange} 
            name="name" 
            id="name" 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="email" 
            placeholder='Enter Email'
            className="form-control bg-secondary" 
            value={credentials.email} 
            onChange={onChange} 
            id="email" 
            name="email" 
            aria-describedby="emailHelp" 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            placeholder='Enter Password'
            className="form-control bg-secondary" 
            value={credentials.password} 
            onChange={onChange} 
            minLength={8} 
            required 
            name="password" 
            id="password" 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input 
            type="password" 
            placeholder='Enter Confirm Password'
            className="form-control bg-secondary" 
            value={credentials.confirmPassword} 
            onChange={onChange} 
            required 
            name="confirmPassword" 
            id="confirmPassword" 
          />
        </div>
        <div>Already a member? <Link to="/login">Log in</Link></div>
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
