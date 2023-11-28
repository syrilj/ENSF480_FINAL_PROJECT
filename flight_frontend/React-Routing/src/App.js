import {Routes, Route} from "react-router-dom";


import SignUpForm from "./component/Signup";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import Login from "./component/Login";


function App() {
  return (
    <>
    <Navbar />

    <Routes >
      <Route path="/" element={ <Home /> } />
      
      
      
      <Route path="/Login" element={ <Login /> } />
      <Route path="/Signup" element={ <SignUpForm /> } />
    </Routes>
    </>
  );
}

export default App;
