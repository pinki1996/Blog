import React from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

import {useState} from "react"

export const Signup = (props) => {
    const navigate = useNavigate()
    // http://localhost:3000
const[mytask, setMyTask] = useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:""
})
const [message, setMessage] = useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:""
})

function collectIt(event)
{    
  //collect the data and pass it to myTask varibale
  setMyTask((function (existingValues) {
    return { ...existingValues, [event.target.name]: event.target.value };
  }))
}

  async function handleSubmit(e)
  {
    //logic to send the data to the server
    e.preventDefault()
    await Axios.post("http://localhost:5000/signup", {"message": mytask })
    .then(function(output)
    { 
      setMessage(output.data)
      navigate('/')
    })
    .catch(function(error)
    {
      console.log(error)
    })
  }
  
  return (
    <section className="container">
            <div className="maindiv">
                <h2>Sign Up</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <label for="" class="label">Name </label><br />
                    <input type="text" name='username' placeholder="Enter Username" onChange={collectIt} className="input username" />
                    <p className="passalert"></p><br />

                    <label for="" className="label">Email</label> <br />
                    <input type="email" name='email' placeholder="Enter Email" onChange={collectIt} className="input email" />
                    <p className="emailalert"></p><br />

                    <label for="" class="label">Password </label><br />
                    <input type="password" name='password' placeholder="Enter Password" onChange={collectIt} className="input password" />
                    <p className="passalert"></p><br />

                    <label for="" class="label">Confirm Password </label><br />
                    <input type="password" name='confirmpassword' placeholder="Enter Password" onChange={collectIt} className="input password" />
                    <p className="passalert"></p><br />

                    <button type="submit"  className="button">Sign Up</button>
                    
                </form>
            </div>
        </section>
  )
}
