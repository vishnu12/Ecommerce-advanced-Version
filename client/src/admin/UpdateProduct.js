import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { getSingleProduct, getCategories,updateProduct } from './apiAdmin'

const UpdateProduct = (props) => {

    const {user,token}=isAuthenticated()
    const prodId=props.match.params.productId

    const [values,setValues]=useState({
        name:'',
        description:'',
        price:'',
        category:'',
        shipping:'',
        photo:'',
        quantity:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirect:'',
        formData:''

    })

    const [categories, setCategories] = useState([]);

    const {name,description,price,category,shipping,quantity,
        error,loading,photo,redirect,createdProduct,formData}=values

    const preloadCate=()=>{
        getCategories()
        .then(({data})=>{
            setCategories(data)
        })
        .catch(err=>{
            setValues({
                ...values,
                error:err.response.data.error
            })
        })
    }


const loadProduct=(id)=>{
  getSingleProduct(id)
  .then(({data})=>{
      setValues({
          ...values,
          name:data.name,
          description:data.description,
          price:data.price,
          category:data.category._id,
          shipping:data.shipping,
          quantity:data.quantity,
          formData:new FormData()
          
          
      })

      preloadCate()
  })
  .catch(err=>setValues({...values,error:err.response.data.error}))
}



useEffect(()=>{
     loadProduct(prodId)
     
},[])

    

  
    const handleChange=e=>{
       const {name}=e.target
       const value=name==='photo' ? e.target.files[0]:e.target.value
       formData.set(name,value)
       setValues(
           {...values,
           [name]:value
        })

    }

    const submit=e=>{
        e.preventDefault()
        setValues({...values,error:'',loading:true})
        updateProduct(prodId,user._id,token,formData)
        .then(res=>{
            console.log(res.data)
            setValues({
                ...values,
                name:'',
                description:'',
                price:'',
                photo:'',
                quantity:'',
                loading:false,
                createdProduct:res.data.product.name,
                redirect:true
            })
        })
        .catch(err=>{
            setValues({
                ...values,
                error:err.response.data.error
            })
        })
    }
    
  const newForm=()=>{
      return <form className='mb-3' onSubmit={submit}>
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-secondary">
              <input
                onChange={handleChange}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
       <div className="form-group">
           <label className='text-muted'>Name</label>
           <input type='text' className='form-control' value={name}
           name='name' onChange={handleChange}/>
       </div>

       <div className="form-group">
           <label className='text-muted'>Description</label>
           <textarea type='text' className='form-control' value={description}
           name='description' onChange={handleChange}/>
       </div>
       <div className="form-group">
           <label className='text-muted'>Price</label>
           <input type='number' className='form-control' value={price}
           name='price' onChange={handleChange}/>
       </div>
       <div className="form-group">
           <label className='text-muted'>Category</label>
           <select className='form-control' value={category}
           name='category' onChange={handleChange}>
               <option>Please select</option>
               {
                   categories.map((cate)=>{
                       return <option key={cate._id} value={cate._id}>
                        {cate.name}
                       </option>
                   })
               }
               </select>
       </div>
       <div className="form-group">
           <label className='text-muted'>Shipping</label>
           <select className='form-control' value={shipping}
           name='shipping' onChange={handleChange}>
               <option>Please select</option>
               <option value='0'>No</option>
               <option value='1'>yes</option>
               </select>
       </div>

       <div className="form-group">
           <label className='text-muted'>Quantity</label>
           <input type='number' className='form-control' value={quantity}
           name='quantity' onChange={handleChange}/>
       </div>
    <button className="btn btn-outline-primary">update</button>
      </form>
   
  }

  const showSuccess=()=>{
    if(createdProduct){
       return <div className='alert alert-info'
       style={{display:createdProduct?'':'none'}}>
  <h3 text-success>{createdProduct} created successfully</h3>
       </div>
    }
}

const showError=()=>{
    if(error){
    return <h3 className='text-danger'>{error}</h3>
    }
}

const showLoading=()=>{
    if(loading){
        return <h3 className='text-info'>Loading....</h3>
    }
}

const redirectUser = () => {
    if (redirect) {
        if (!error) {
            return <Redirect to="/" />;
        }
    }
};

  return (
    <Layout title='Update thr product'
    description={`Good day ${user.name} ! update this product `}>
<div className="row">
    <div className="col-md-8 offset-md-2">
        {showLoading()}
        {showSuccess()}
        {showError()}
        {newForm()}
        {redirectUser(redirect)}
    </div>
</div>

    </Layout>
  )
}

export default UpdateProduct
