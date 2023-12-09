import React, { useEffect } from 'react'
import Axios from 'axios'

import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Display } from './Display'
import { Create } from './Create'

export const Blog = ({signup}) => {

  const location = useLocation()
  const navigate = useNavigate()

  // console.log(signup)

  const [display, setDisplay] = useState([])
  async function displayData()
  {
    await Axios.get("http://localhost:5000/display/post/")
  .then(function(output)
  { 
    setDisplay(output.data)
    console.log(output.data)
  })
  .catch(function(error)
  {
    console.log(error)
  })
  }

  useEffect(()=>{
    displayData()
  },[])


  return (
    <div>
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <div>
            <a className="navbar-brand">BLOG</a>
          </div>
          <div class="dropdown">
            <a type="button" className="navbar-brand" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i className="fa fa-plus-square"></i>
            </a>
            <a className="btn btn-primary dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                 {signup.map(signupdata => {
                    return (
                  (signupdata.email ==(localStorage.getItem("email")) ? signupdata.username : null)
                  )
                })}          
             </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a className="dropdown-item" onClick={() => navigate('/blog/profile')}>My Profile</a></li>
              <li><a className="dropdown-item" onClick={() => navigate('/')} >Logout</a></li>
            </ul>
          </div>
        </nav>
      </div><br /><br />

      <div className='row'>
      {display.map((display)=>{
          return(
            <Display key={display.id} display={display}/>
            
          )
        })}    
      </div>
     
      {/* create new post section */}

      <div >
        <Create/>
      </div>

    </div>

  )
}
