import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import { getUser, updateUser, updateLocalstorageUser } from './apiUser'
import { Redirect } from 'react-router-dom'


const Profile = (props) => {

const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:false,
    success:false
})

const {name,email,password,error,success}=values
const userId=props.match.params.userId
const {token}=isAuthenticated()

const loadUser=(id,authToken)=>{
  getUser(id,authToken)
  .then(res=>{
      console.log(res.data)
     setValues({
        ...values,
        name:res.data.name,
        email:res.data.email,
        
     })
  })
  .catch(err=>setValues({...values,error:true}))
}

useEffect(()=>{
     loadUser(userId,token)
},[])

const handleChange=e=>{
   const {name,value}=e.target

   setValues({
       ...values,
       [name]:value
   })
}

const submit=e=>{
    e.preventDefault()
    const userData={
        name:name,
        email:email,
        password:password
    }

    updateUser(userId,token,userData)
    .then((response)=>{
        console.log(response)
        updateLocalstorageUser(response.data,()=>{
            setValues({
                ...values,
                name:response.data.name,
                email:response.data.email,
                success:true

            })
        })
    })
    .catch(err=>console.log(err))
}

const redirectUser=check=>{
    if(check){
        return <Redirect to='/cart'/>
    }
}

const profileUpdate=(userName,userEmail,userPassword)=>{
  return(
      <form onSubmit={submit}>
          <div className='form-group'>
              <label className='text-muted'>Name</label>
              <input type='text' className='form-control'
              name='name' value={name} onChange={handleChange} />
          </div>
          <div className='form-group'>
              <label className='text-muted'>Email</label>
              <input type='email' className='form-control'
              name='email' value={email} onChange={handleChange} />
          </div>
          <div className='form-group'>
              <label className='text-muted'>Password</label>
              <input type='password' className='form-control'
              name='password' value={password} onChange={handleChange} />
          </div>
          <button type='submit' className='btn btn-primary' onClick={submit}>Update</button>
      </form>
  )
}

  return (
    <Layout title='Profile'
    description='Update your profile'
    className='container'>
        <h2>Profile update</h2>
        {profileUpdate(name,email,password)}
        {redirectUser(success)}
    </Layout>
  )
}

export default Profile
