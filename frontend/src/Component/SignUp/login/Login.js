import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { Link, useNavigate } from 'react-router-dom'
const socket = io.connect('http://localhost:4040')

export default function Login() {
  const s_id = localStorage.getItem("Id")
  useEffect(() => {
    socket.emit("join chat", s_id)
  }, [socket])
  const [state,setState]=useState({
    email:"",
    password:""
  })
const navigate=useNavigate()
  const handleChange=(e)=>
  {
    e.preventDefault()
    setState({...state,[e.target.name]:e.target.value})

  }
  
  const handleSubmit=async(e)=>
  {
    e.preventDefault()
    const res=await axios.post('http://localhost:4040/login',state)
    if(res.data.success==true && res.data.msg==="LOGIN SUCCESSFULLY")
    {
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("Id",res.data.Id)
      navigate('/chat')
     
    }
    else if(res.data.success==true)
    {
      alert(res.data.msg)
    }
    else{
      alert("CANT LOG YOU IN!!!")
    }
  }
  return (
    <div>
      <section class="vh-100" style={{backgroundColor: '#eee'}}>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{borderRadius: '25px'}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">LOGIN</p>

                <form class="mx-1 mx-md-4" onSubmit={handleSubmit} >

      

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" class="form-control" name="email" value={state.email} onChange={handleChange} placeholder='ENTER EMAIL' />
                   
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" class="form-control" name="password" value={state.password} onChange={handleChange} placeholder='ENTER PASSWORD'/>
                     
                    </div>
                  </div>

            

                  

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-lg">LOGIN</button>
                  </div>


                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <Link to='/signup'> CREATE A NEW ACCOUNT
                    </Link>
                  </div>
                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
