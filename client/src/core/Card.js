import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import ShowImage from './ShowImage'
import { addItem,updateItem,removeItem } from './cartHelper'

const Card = ({product,
  viewButton=true,
  showCartBtn=true,
  cartUpdate=false,
  showRemoveBtn=false,
  setRun = f => f,
  run = undefined}) => {

  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)

 const showViewProductButton=(cartUpdate)=>{
     return cartUpdate && (
       <button className='btn btn-outline-primary mt-2 ml-4'>
        View Product
       </button>
     )
 } 

 const showAddToCartButton=()=>{
   return showCartBtn && <button onClick={addToCart} className='btn btn-outline-warning mt-2 ml-4'>
             Add to cart
          </button>
 }

 const showARemoveFromCartButton=()=>{
  return showRemoveBtn && <button onClick={()=>{
    removeItem(product._id)
    setRun(!run)
  }} 
    className='btn btn-outline-danger mt-2 ml-4'>
            Remove from cart
         </button>
}

 const showStock=(quantity)=>{
   return quantity>0 ?<span className='badge badge-primary badge-pill ml-2'>
     In Stock
   </span>:
   <span className='badge badge-primary badge-pill ml-2'>
     Out of stock
   </span>
 }

const addToCart=()=>{
  addItem(product,()=>{
    setRedirect(true)
  })
}

const shouldRedirect=checker=>{
    if(checker){
      return <Redirect to='/cart'/>
    }
}

const handleChange=prodId=>e=>{
  setRun(!run);
  setCount(e.target.value<1?1:e.target.value)
  if(e.target.value >=1){
    updateItem(prodId,e.target.value)
  }
}

const showCartUpadte=update=>{
  return update && <div>
   <div className='input-group mb-3'>
 <div className='input-group-prepend'>
<span className='input-group-text'>
  Adjust Quantity
</span>
 </div>
 <input type='number' className='form-control' value={count}
 onChange={handleChange(product._id)}/>
   </div>
  </div>
}

  return (
      <div className='card'>
  <div className='card-header text-success name'>{product.name}</div>
  <div className='card-body'>
    {shouldRedirect(redirect)}
      <ShowImage item={product} url='product'/>
  <p className='lead mt-2'>{product.description}</p>
  <p className='black-10'>$ {product.price}</p>
  <p className='black-9'>Category : {product.category && product.category.name}</p>
  <p className='black-8'>Added on : {moment(product.createdAt).fromNow()}</p>
  
  {
    showStock(product.quantity)
  }
  <br/>
     <Link to={`/product/${product._id}`}>
      {showViewProductButton(viewButton)}
      </Link>
      {
        showAddToCartButton()
      }
      {
        showARemoveFromCartButton()
      }

      {
        showCartUpadte(cartUpdate)
      }

      
  
  </div>
      </div>
    
  )
}

export default Card
