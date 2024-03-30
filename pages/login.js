import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login (replace with actual authentication logic)
    const isAuthenticated = true; // Replace with actual authentication check
    if (isAuthenticated) {
      setLoginError(false);
      // Redirect to home page after successful login
      router.push('/home');
    } else {
      setLoginError(true);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {loginError && <p style={{ color: 'red' }}>Correo electrónico o contraseña incorrectos</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
