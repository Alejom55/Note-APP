import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [userList, setUserList] = useState([]); // List to store registered users
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [emailDomainError, setEmailDomainError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    if (!formData.email.endsWith('@gmail.com')) {
      setEmailDomainError(true);
      return;
    }

    // Simulate registration (replace with actual backend interaction)
    const newUser = { ...formData }; // Create a copy to avoid mutation
    setUserList([...userList, newUser]); // Add new user to the list
    setFormData({ // Reset form data
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setRegistrationSuccess(true);

    // Redirect after simulated registration (replace with success message)
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {passwordMatchError && <p style={{ color: 'red' }}>Las contraseñas no coinciden</p>}
      {emailDomainError && <p style={{ color: 'red' }}>El correo electrónico debe ser de dominio @gmail.com</p>}
      {registrationSuccess && (
        <p style={{ color: 'green' }}>
          ¡Registro exitoso! Serás redirigido a la página de inicio...
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      {/* Display registered users (for demonstration purposes) */}
      <h2>Usuarios Registrados</h2>
      <ul>
        {userList.map((user) => (
          <li key={user.email}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SignUp;
