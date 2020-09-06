import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { getProducts, deleteProduct } from './apiAdmin'
import { Link } from 'react-router-dom'


const ManageProducts = () => {

const [products, setProducts] = useState([])

const {user:{_id},token}=isAuthenticated()

const loadProducts=()=>{
    getProducts()
    .then(res=>{
       setProducts(res.data)
    })
    .catch(err=>console.log(err))
}

const removeProduct=(prodId)=>{
    deleteProduct(prodId,_id,token)
    .then(res=>{
        loadProducts()
    })
    .catch(err=>console.log(err))
}


useEffect(()=>{
   loadProducts()
},[])

  return (
    <Layout title='Manage Products'
    description='Manage your products here'
    className='container'>

  <div className='row'>
   <div className='col-12'>
  <h2 className='col-md-6 m-auto mb-4'>Total {products.length} products</h2>
  <hr/>
 <ul className='list-group'>
{products.map((p,i)=>{
    return <li key={i} className='list-group-item d-flex justify-content-between align-items-center'>
    <strong>{p.name}</strong>
    <Link to={`/admin/product/update/${p._id}`}>
        <span className='badge badge-warning badge-pill'>update</span>
    </Link>
    <span className='badge badge-danger' style={{cursor:"pointer"}} onClick={()=>removeProduct(p._id)}>delete</span>
    </li>
})}
 </ul>
   </div>
  </div>

    </Layout>
  )
}

export default ManageProducts
