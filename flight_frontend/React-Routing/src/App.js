import {Routes, Route} from "react-router-dom";


import Signup from "./component/Signup";

import Navbar from "./component/Navbar";
import Login from "./component/Login";


function App() {
  return (
    <>
    <Navbar />

    <Routes >
      
      
      
      
      <Route path="/" element={ <Login /> } />
      <Route path="/Signup" element={ <Signup /> } />
    </Routes>
    </>
  );
}

export default App;
