import React,{useState} from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
import { API } from '../config'
import { Link } from 'react-router-dom'

const Signup = () => {

const [values, setValues] = useState({
  name:'',
  email:'',
  password:'',
  error:'',
  success:false
})

const {name,email,password,error,success} =values

const handleChange=e=>{
  const {name,value}=e.target
  setValues({
    ...values,
    error:false,
    [name]:value
  })
}

const signUp=(data)=>{
   axios.post(`${API}/signup`,data)
   .then(res=>{
     setValues({
       ...values,
       success:true,
       name:'',
       email:'',
       password:'',
       error:''
     })
   })
   .catch(err=>{
     setValues({
       ...values,
       error:err.response.data.error,
       success:false
     })
   })
}

const showError=()=>{
  return(
    <div className="alert alert-danger" style={{display:error?'':'none'}}>
      {error}
  </div>
  )
  
}

const showSuccess=()=>{
  return(
    <div className="alert alert-info" style={{display:success?'':'none'}}>
  Registered succesfully.Please click here to <Link to='/signin'>Login</Link>
    </div>
  )
}

const submit=e=>{
  e.preventDefault()
  const user={name,email,password}
  signUp(user)
}

const signUpForm=()=>{
  return(
    <form onSubmit={submit}>
    <div className="form-group">
      <label htmlFor="" className="text-muted">Name</label>
      <input type='text' className='form-control' value={name} name='name' onChange={handleChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="" className="text-muted">Email</label>
      <input type='email' className='form-control' value={email} name='email' onChange={handleChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="" className="text-muted">Password</label>
      <input type='password' className='form-control' value={password} name='password' onChange={handleChange}/>
    </div>
<button className="btn btn-primary" type='submit'>Submit</button>
  </form>
  )
  
}


  return (
    <Layout title='Sign-up page' description='Sign-up to get started'
    className='container col-md-8 offset-md-2'>
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>
  )
}

export default Signup
