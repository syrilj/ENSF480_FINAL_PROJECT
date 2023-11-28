import React from 'react';

const NavBar = ({ onPageChange }) => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <button style={styles.navButton} onClick={() => onPageChange('home')}>Home</button>
        </li>
        <li style={styles.navItem}>
          <button style={styles.navButton} onClick={() => onPageChange('login')}>Login</button>
        </li>
        <li style={styles.navItem}>
          <button style={styles.navButton} onClick={() => onPageChange('Sign Up')}>Sign Up</button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#007BFF',
    padding: '10px',
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  navItem: {
    margin: '0 10px',
  },
  navButton: {
    backgroundColor: '#fff',
    color: '#007BFF',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default NavBar;
