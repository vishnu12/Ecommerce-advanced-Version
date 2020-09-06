import React,{useState} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { addCategory } from './apiAdmin'



const AddCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const {user,token}=isAuthenticated()

    const handleChange=e=>{
         setError('')
         setName(e.target.value)
    }

    const submit=e=>{
        e.preventDefault()
         setError('')
         setSuccess(false)
        const category={name}
        addCategory(user._id,token,category)
        .then(res=>{
            setSuccess(true)
        })
        .catch(err=>{
            setError('You must add a unique category')
        })

       
        
    }

    const newCategoryForm=()=>{
        return <form onSubmit={submit}>
            <div className="form-group">
                <label  className="text-muted">Name</label>
                <input type='text' className='form-control' value={name}
                onChange={handleChange}
                autoFocus/>
            </div>
            <button className="btn btn-outline-primary mt-2" type='submit'>Submit</button>
        </form>
    }

    const showSuccess=()=>{
        if(success){
           return <h3 className='text-success'>
            {name} is created successfully</h3>
        }
    }

    const showError=()=>{
        if(error){
        return <h3 className='text-danger'>{error}</h3>
        }
    }

    const goBack=()=>{
        return <div className='mt-5'>
            <Link  to='/admin/dashboard' className='text-warning'>
            Back to Dashboard
            </Link>
        </div>
    }

  return (
    <Layout title='Add a new category'
    description={`Good day ${user.name}, ready to add a new category`}
    >
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {goBack()}
            </div>
        </div>

    </Layout>
  )
}

export default AddCategory

