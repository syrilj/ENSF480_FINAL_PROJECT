import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('regular'); // Default to regular user type

  const handleLogin = () => {
    // Simulate authentication logic (replace with actual authentication)
    if (username === 'admin' && password === 'adminpassword') {
      onLogin('admin');
    } else if (username === 'registereduser' && password === 'userpassword') {
      onLogin('registered');
    } else if (username === 'regularuser' && password === 'userpassword') {
      onLogin('regular');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>User Type:</label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)} style={styles.input}>
          <option value="regular">Regular User</option>
          <option value="registered">Registered User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button style={styles.loginButton} onClick={handleLogin}>Login</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '2em',
    color: '#333',
  },
  formGroup: {
    margin: '15px 0',
  },
  label: {
    fontSize: '1.2em',
    color: '#333',
    marginRight: '10px',
  },
  input: {
    padding: '8px',
    fontSize: '1em',
    width: '200px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;
