import React, { useState } from 'react'
import { login } from '../services/authService';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');


    const validateForm = () => {
        const newErrors = {}

        if(!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email should be valid';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password should be atleast 6 characters';
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting form with:", email, password);

        if(validateForm()) {
          setLoading(true);
          setErrorMessage('');

          try {
            const response = await login( email, password );

            if (response.token) {
              localStorage.setItem('token', response.token);
              console.log('Login successful:', response);


            }
          } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error);
            setErrorMessage(error.message || 'Login failed. Try again.');
          } finally {
            setLoading(false);
          }
        }
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Login</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form className="mt-4" onSubmit={handleSubmit} >
        <input 
        type="email" 
        placeholder="Email" 
        className="border p-2 m-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        
        {errors.email && <p className="text-red-500"> {errors.email} </p>}

        <input 
        type="password" 
        placeholder="Password" 
        className="border p-2 m-2" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        {errors.password && <p className="text-red-500"> {errors.password} </p>}

        <button 
        className="bg-blue-500 text-white p-2 mt-2" 
        type='submit'
        disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login