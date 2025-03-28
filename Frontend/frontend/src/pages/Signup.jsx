import React from 'react'
import { useState } from 'react';
import { register } from '../services/authService';

function Signup() {
  
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [serverError, setServerError] = useState("");

    const validateForm = () => {
        const newErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = "Full Name is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    if (validateForm()) {
      try {
        const response = await register(fullName, email, password);
        setSuccessMessage(response.message);
      } catch (err) {
        setServerError(err.error || "Registration failed");
      }

    }
  };

  
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Signup</h1>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {serverError && <p className="text-red-500">{serverError}</p>}
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 m-2 w-64"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}

          <input
            type="email"
            placeholder="Email"
            className="border p-2 m-2 w-64"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            className="border p-2 m-2 w-64"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-2 m-2 w-64"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}

          <button
            className="bg-green-500 text-white p-2 mt-2 w-64"
            type="submit"
          >
            Signup
          </button>
        </form>
      </div>
    );
}

export default Signup