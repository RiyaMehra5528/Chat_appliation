import axios from 'axios'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import jwt_decode from 'jwt-decode'
import './Chat.css'
import { useNavigate } from 'react-router-dom'
import ScrollToBottom from 'react-scroll-to-bottom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const socket = io.connect('http://localhost:4040')

export default function Chat() {

  const navigate=useNavigate()

  const [list, setList] = useState([])
  const [r_id, setRid] = useState()
  const [msg, setMsg] = useState("")
  const [msgList, setMsgList] = useState([])
  const s_id = localStorage.getItem("Id")
  const token=localStorage.getItem("token")
  const {user}=jwt_decode(token)
  const userName=user.Name
  const [recName,setRecName]=useState("")
  console.log(s_id)
  
  console.log("this is socket", socket)

  useEffect(() => {
    socket.emit("join chat", s_id)
  }, [socket])
  
  

  const getUser = async () => {
    const res = await axios.get('http://localhost:4040/getUser')
    console.log(res.data)
    setList(res.data.users)
  }


  // const handleChange=(e)=>
  // {
  //   e.preventDefault()
  //   setState({...state,[e.target.name]:e.target.value})
  // }
  useEffect(() => {
    getUser()
  }, [])

  const handleClick =  (id,uname) => {
    console.log(r_id)
    
   setRid(id)
    setRecName(uname)
  //  await  getMsg()
    
  }
  useEffect(() => {
    console.log("this is rid", r_id)
    if (r_id !== undefined) {
      getMsg();
    }
  }, [r_id]);

  const sendMessage = async (e) => {
    const res = await axios.post("http://localhost:4040/sendMessage", { s_id, r_id, msg })
    if (res.data.success) {
      socket.emit("send-msg", res.data.message)
      setMsgList((list) => [...list, res.data.message])
      console.log("message at sender side:", res.data.message)
      alert("message send")
    }
    setMsg("")
  }
  useEffect(() => {
    console.log("socket to receiver message hits")
    socket.on("receive-msg",(data)=>
    {
      setMsgList((list) => [...list, data])
      console.log("Msg at receiver:", data)
    })
  },[])
  

const logOut=(e)=>
{
  e.preventDefault()
  localStorage.clear()
  navigate('/')
  
}
  const getMsg = async () => {
 console.log("this hits")
    const res = await axios.get(`http://localhost:4040/getMsg?s_id=${s_id}&r_id=${r_id}`)
    console.log("and this is the response",res)
    setMsgList(res.data.message)
 
  }
  return (
    <>
      <h1>CHAT ROOM</h1>



      <div class="float-container">

<div class="float-child1">
   
        {list.length > 0 && list.map((item) =>
        (
          item.Id != s_id &&
          <> 
          <button id="userBtn" onClick={() => handleClick(item.Id,item.Name)}>{item.Name}</button>
          </>

        )


        )}
     
</div>

<div class="float-child2">



<Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        
   
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
             <Navbar.Text>
            Signed In As: {userName}
          </Navbar.Text>
           
    
          </Nav>
          <Form className="d-flex">
            
            <Button variant="outline-danger" onClick={logOut} >LOGOUT</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 

<div className='chat-body'>
<h3 id="receiver">{recName}</h3>
<ScrollToBottom  className='message-container'>
{msgList.map((messageContent) => {
      return (
          
        <div className='message' id={s_id == messageContent.senderId ? "you" : "other"}>
         
            <div className='message-content'>
              <p>
                {messageContent.Msg}
              </p>
            </div>
           
            </div>
       
      )
    })}
    </ScrollToBottom>
</div>

<div id="send">
       
        <input type="text" name="msg" value={msg} id="sendBox" onChange={(event) => {
          event.preventDefault()
          setMsg(event.target.value)
        }} placeholder="ENTER MESSAGE" />
        <button onClick={sendMessage} id="sendBtn">SEND</button>
        {/* <button onClick={getMsg}>GET MESSAGE</button> */}

        
      </div>
</div>

</div>
    
    

    


   
    </>
  )
}
