import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { Blog } from './Components/Blog';
import { useState, useEffect } from 'react';
import  Axios  from 'axios';
import Delete from './Components/Delete';

function App() {

  const [signup, setSignup] = useState([])

  async function signupData (){
    await Axios.get("http://localhost:5000/signup/data")
    .then(function(output)
    { 
      setSignup(output.data)      
      console.log(output.data)
    })
    .catch(function(error)
    {
      console.log(error)
    })
  }
  useEffect(()=>{
    signupData()
  },[])

  return (

    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<Blog signup={signup}/>} />
          <Route path='/delete' element={<Delete/>}></Route>
      
        </Routes>
      </Router>

     
    </div>
  );
}

export default App;
