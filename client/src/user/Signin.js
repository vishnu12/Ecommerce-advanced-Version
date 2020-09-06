import React,{useState} from 'react'
import Layout from '../core/Layout'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import { API } from '../config'
import { authenticate, isAuthenticated } from '../auth'


const Signin = () => {

  const [values, setValues] = useState({
    email:'',
    password:'',
    error:'',
    loading:false,
    redirect:false
  })

  const {user}=isAuthenticated()

  const {email,password,error,loading,redirect} =values

  const handleChange=e=>{
    const {name,value}=e.target
    setValues({
      ...values,
      error:false,
      [name]:value
    })
  }
  
  const signIn=(data)=>{
     axios.post(`${API}/signin`,data)
     .then(res=>{
        authenticate(res.data,()=>{
          setValues({
            ...values,
            loading:false,
            redirect:true
            
          })
        })
     })
     .catch(err=>{
       setValues({
         ...values,
         error:err.response.data.error,
         redirect:false
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
  
  const showLoading=()=>{
    return loading && (
      <div className="container col-md-8 offset-md-2">
        <h2>Loading....</h2>
      </div>
    )
  }

  const redirectUser=()=>{
   if(redirect){
    if(user && user.role===1){
      return <Redirect to='/admin/dashboard'/>
    }else{
      return <Redirect to='/user/dashboard'/>
    }
   }
  }
  
  const submit=e=>{
    e.preventDefault()
    setValues({...values,loading:true,error:false})
    const user={email,password}
    signIn(user)
  }

  const signInForm=()=>{
    return(
      <form onSubmit={submit}>
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
      <>
    <Layout title='Signin Page' description='Signin to E-commerce application'
    className='container col-md-8 offset-md-2'>
     {showError()}
     {showLoading()} 
    {signInForm()}
    {redirectUser()}

    </Layout>
    </>
  )
}

export default Signin
