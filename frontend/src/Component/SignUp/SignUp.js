import React ,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function SignUp() {
    const  [state,setState]=useState({
        uname:"",
        email:"",
        password:"",
        r_password:""
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
      const res=await axios.post("http://localhost:4040/register",state)
      if(res.data.success==true)
      {
        alert(res.data.msg)
        navigate('/')
      }
      else{
        alert("FAILED REGISTRATION!!!")
      }
    }
  return (
    <section class="vh-100" style={{backgroundColor: '#eee'}}>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{borderRadius: '25px'}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" name="uname" value={state.uname} onChange={handleChange}  class="form-control" placeholder='ENTER NAME' />
                
                    </div>
                  </div>

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

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" class="form-control" name="r_password" value={state.r_password} onChange={handleChange}  placeholder='REPEAT PASSWORD' />
                      
                    </div>
                  </div>

                  

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-lg">Register</button>
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
   
  )
}
