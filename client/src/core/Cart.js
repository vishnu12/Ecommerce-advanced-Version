import React,{useState,useEffect} from 'react'
import { getCart } from './cartHelper'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import Card from './Card'
import Checkout from './Checkout'

const Cart = () => {

 const [items, setItems] = useState([])
 const [run, setRun] = useState(false);

 useEffect(()=>{

    setItems(getCart())
 },[run])

 console.log(items)

 const showItems=()=>{
     return (
         <div>
             <h2>Your cart has {items.length} items</h2>
             <hr/>
             {items.map((item,k)=>{
                 return <Card product={item} key={k} 
                 showCartBtn={false}
                 cartUpdate={true}
                 showRemoveBtn={true}
                 setRun={setRun}
                 run={run}/>
             })}
         </div>
     )
 }

 
const emptyCart=()=>{
    return <h2>
        your cart is empty...
        <Link to='/shop'>Continue shopping</Link>
    </h2>
}

  return (
    <Layout title='Cart Page'
    description='Manage your cart items'
    className='container'>

   <div className='row'>
       <div className='col-6'>
     {items.length>0?showItems():emptyCart()}
       </div>
       <div className='col-6'>
        <h2 className='mb-4'>Your cart summary</h2> 
        <hr/>
        <Checkout 
        products={items}
        setRun={setRun}
        run={run}/>
       </div>
   </div>
    </Layout>
  )
}

export default Cart
