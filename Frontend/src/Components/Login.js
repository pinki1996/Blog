import React, { useEffect, useState } from 'react'
import axios, { Axios } from 'axios'

import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] =useState("")    
    const [password, setPassword] = useState("")

    async function handleSubmit(e){
        e.preventDefault();
        
        try{

            await axios.post("http://localhost:5000/",{
                email, password
            })
            .then(res=>{
                console.log(res.data)
                if(res.data=="exist"){
                    navigate('/blog',{state:{id:email}})
                    localStorage.setItem("email",email)
                    
                }
                else if(res.data=="not exist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e)
            })

        }
        catch(e){
            console.log(e)
        }

        console.log(email, password)
    }



    
    return (
        <section className="container">
            <div className="maindiv">
                <h2>Login</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <label for="" className="label">Email</label> <br />
                    <input type="email" placeholder="Enter Email" name='email'  onChange={(e)=>{setEmail(e.target.value)}}  className="input email" />
                    <p className="emailalert"></p><br />

                    <label for="" className="label">Password </label><br />
                    <input type="password" placeholder="Enter Password" name='password' onChange={(e)=>{setPassword(e.target.value)}}  className="input password" />
                    <p className="passalert"></p><br />

                    <div className="form-check mb-3">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                        </label>
                    </div>

                    <button  type="submit" className="button">Login</button>
                </form>
                <hr />
                <div className='register'>
                    <span>Don't have a account ?</span>
                    <a onClick={()=> navigate('/signup')} className='registerBtn'>REGISTER HERE</a>
                </div>
            </div>
        </section>
    )
}