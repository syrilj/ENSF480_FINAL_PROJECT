import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userType, setUserType] = useState(null);

  const handleLogin = (type) => {
    setUserType(type);
    setCurrentPage('home'); // Redirect to home after login
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home userType={userType} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      default:
        return <Home userType={userType} />;
    }
  };

  return (
    <div>
      <NavBar onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;
