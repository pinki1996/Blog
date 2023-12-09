import React  from 'react'
import { useState, useEffect } from 'react'
import { Comment } from './Comment'
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import  Axios  from 'axios';

export const Display = (props) => {
  const navigate = useNavigate()
  const [deletePost, setDeletePost] = useState([])
  const [isActive, setIsActive] = useState(false);
  
  async function handleDelete()
    {
      const id = props.display._id
      await Axios.delete(`http://localhost:5000/delete/${id}`)
    .then(function(output)
    { 
      setDeletePost(output.data)
      // window.confirm("Are you want to delete the post")
      console.log(output.data)
    })
    .catch(function(error)
    {
      console.log(error)
    })
    } 
    useEffect(()=>{
      handleDelete()
    },[])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) =>{
    console.log(e)
    setShow(true)};
  


    const [message, setMessage] = useState({
      email: localStorage.getItem("email"),
      postId: props.display._id
    })
  
   //Like Section

    async function handleLike(e){
      setIsActive(current => !current)
      await Axios.post("http://localhost:5000/create/like", { "message": message })
        .then(function (output) {
          setMessage(output.data)
          console.log(output)
          navigate('/blog')
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    const [display, setDisplay] = useState([])  
    async function commentdata() {
      await Axios.get("http://localhost:5000/like/data")
        .then(function (output) {
          setDisplay(output.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    useEffect(() => {
      commentdata()
    }, [])

    

  return (


    <div className="col-sm-7">
      <div className="card">
        <div className="card-body">
          <p>{props.display.username}</p>
          
          <h3 className="card-title">{props.display.title}</h3>
          <hr/>
          
          <img className="card-img-top" height="450rem" width="200rem" src={(`http://localhost:5000/uploads/${props.display.imageUrl}`)} />
          
          
          <h5 className="card-text" >{props.display.description}</h5>
          <hr />
          <p>{display.like}</p>
          <a onClick={handleLike}>
            <i className= {isActive ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up'}></i>
          </a>
          <a variant="primary" onClick={handleShow}>
              <i value={props.display._id} className="fa fa-comments" ></i>
          </a>
          <a>
            {(props.display.userEmail == localStorage.getItem("email")) ? <i value={props.display._id} className="fa fa-pencil"></i> : (null)}
          </a>
          <a  variant ="primary" onClick={handleDelete}>
            {(props.display.userEmail == localStorage.getItem("email")) ? <i value={props.display._id} className="fa fa-trash"></i> : (null)}
          </a>

          <Modal show={show}  onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Comment postId = {props.display._id}/>
            </Modal.Body>
          </Modal>
        </div>
      </div><br />
    </div>

  )
}
