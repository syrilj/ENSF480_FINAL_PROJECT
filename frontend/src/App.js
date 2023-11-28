import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';

function App() {
  const [userType, setUserType] = useState(null);

  const handleLogin = (type) => {
    setUserType(type);
  };

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/home">
            <Home userType={userType} />
          </Route>
          <Route path="/" exact>
            {/* Redirect to home page when the root path is accessed */}
            <Home userType={userType} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
