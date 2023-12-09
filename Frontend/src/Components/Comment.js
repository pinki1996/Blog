import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { useNavigate } from 'react-router-dom'

export const Comment = (props) => {
  const navigate = useNavigate()

  console.log(props.postId)

  const [mytask, setMyTask] = useState({
    email: localStorage.getItem("email"),
    postId: props.postId,
    comment: ""
  })
  const [message, setMessage] = useState({
    email: localStorage.getItem("email"),
    postId: props.postId,
    comment: ""
  })

  function collectIt(event) {
    //collect the data and pass it to myTask varibale
    setMyTask((function (existingValues) {
      return { ...existingValues, [event.target.name]: event.target.value };
    }))
  }
  async function handleSubmit(e) {
    console.log(e)
    await Axios.post("http://localhost:5000/create/comment", { "message": mytask })
      .then(function (output) {
        setMessage(output.data)
        console.log(output)
        navigate('/blog')
      })
      .catch(function (error) {
        console.log(error)
      })

  }


  //display comment section

  const [display, setDisplay] = useState([])
  const id = props.postId

  async function commentdata() {
    await Axios.get("http://localhost:5000/comment/data")
      .then(function (output) {
        setDisplay(output.data)
        console.log(output.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    commentdata()
  }, [])



  return (
    <div>
      <div className='row'>
        {display.map((display) => {
          return (
            (props.postId == display.postId) ?
              <>
                <div>
                  <div className="comment">
                    <p className='username'>{display.userEmail}</p>
                    <p className='commentdata'> {display.comment}</p>
                  </div><br />
                </div>
              </> : null
          )
        })}
      </div>

      <form className='form-inline' onSubmit={handleSubmit}>        
          <p name="email"></p>
          <p name="postid" ></p>
          <div className='commentBlog'>
            <input className="form-control" name='comment' id='inputComment' onChange={collectIt} placeholder='Write a comment' />
            <button type="submit" className="btn"><i className='fa fa-send'></i></button>
          </div>       
      </form>

    </div>



  )
}
