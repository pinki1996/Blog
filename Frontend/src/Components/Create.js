import React, { useEffect } from 'react'
import Axios from 'axios'

import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Create = (props) => {

  const location = useLocation()
  const navigate = useNavigate()

  //create Post Section

  const [message, setMessage] = useState('')
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("");

  // function collectIt(event)
  //   {    
  //       setImage(event.target.files[0])
  //       console.log(event.target.files[0])
  //   }

  async function handleSubmit(e)
  {
    //logic to send the data to the server
    console.log(e)
    const postData = new  FormData();
    postData.append("title", title);
    postData.append("email", email);
    postData.append("image", image);
    postData.append("description", description);




    await Axios.post("http://localhost:5000/create/post", postData)
    .then(function(output)
    { 
      setMessage(output.data)
      console.log(output.data)
      alert('You Blog is saved successfully')
      
      navigate('/blog')
    })
    .catch(function(error)
    {
      console.log(error)
    })
  }


  return (
    <div>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">New Post</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form className='form-control' onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className="modal-body">
                
                    <p name="email" ></p>
                      Title:- <input  className="form-control" type='text' onChange={(e)=>{setTitle(e.target.value)}} name='title'/><br/>
                      Image:- <input className="form-control" type='file' filename="image" name='image' onChange={(e)=>{setImage(e.target.files[0])}}/><br/>
                      Description:- <textarea className="form-control" name='description'  onChange={(e)=>{setDescription(e.target.value)}}></textarea>                
              </div>
              <div class="modal-footer">
                <button type="button" className="button btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="button btn-primary" data-bs-dismiss="modal" aria-label="Close">Save</button>
              </div>
              </form>
            </div>
          </div>
        </div>


    </div>

  )
}
