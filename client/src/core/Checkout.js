import React,{useState,useEffect} from 'react'
import 'braintree-web'
import DropIn from 'braintree-web-drop-in-react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore'
import { emptyCart } from './cartHelper'
import { threeDSecure } from 'braintree-web'



const Checkout = ({products,
  setRun = f => f,
  run = undefined}) => {

const [data, setData] = useState({
  success:false,
  clientToken:null,
  error:'',
  instance:{},
  address:''
  
})




const {user:{_id},token}=isAuthenticated()

const getToken=(userId,authToken)=>{
    
     getBraintreeClientToken(userId,authToken)
     .then(res=>{
       setData({
         ...data,
         clientToken:res.data.clientToken
       })
     })
     .catch(err=>console.log(err))
}

useEffect(()=>{
   getToken(_id,token)
},[])

const handleAddress=(e)=>{
  setData({
    ...data,
    address:e.target.value
  })
}


const getTotal=()=>{
    const total=products.reduce((currValue,nextValue)=>{
        return currValue+=nextValue.price
    },0)

    return total
}


const buy=()=>{
  let nonce;
  let getNonce=data.instance.requestPaymentMethod()
  .then(res=>{
    nonce=res.nonce

    const paymentData={
      paymentMethodNonce:nonce,
      amount:getTotal()
    }

    processPayment(_id,token,paymentData)
    .then(result=>{
     //create order
     const orderData={
        products:products,
        transaction_id:result.data.transaction.id,
        amount:result.data.transaction.amount,
        address:data.address
     }

     createOrder(_id,token,orderData)
     .then(res)
     .catch(err=>console.log(err))


      setData({
        ...data,
        success:result.data.success  
      })
   
      //empty cart
      emptyCart(()=>{
        setRun(!run)
      })
      
    })
    .catch(error=>console.log(error))
  })
  .catch(err=>{
    setData({
      ...data,
      error:err.message
    })
  })
}

const showError=(error)=>{
 return <div className='alert alert-danger' style={{display:error?'':'none'}}>
    {error}
  </div>
}

const showSuccess=(suceess)=>{
  return <div className='alert alert-success' style={{display:suceess?'':'none'}}>
    <h2>Payment is successful</h2>
   </div>
 }

const showDropIn=()=>{
 return <div onBlur={()=>setData({...data,error:''})}>
    {
      data.clientToken !==null && products.length>0?(
          <div>

     <div className='form-group mb-3'>
<label className='text-muted'>Delivery Address :</label>
<textarea onChange={handleAddress}
           className='form-control'
           value={data.address}
           placeholder='Type the delivery address'
/>
      </div>

            <DropIn options={{
              authorization:data.clientToken
            }}
            onInstance={instance=>(data.instance=instance)}/>
            <button onClick={buy} className='btn btn-success btn-block'>Pay</button>
          </div>
      ):
      null
    }
  </div>
}

  return (
    <div>
      {showError(data.error)}
      {showSuccess(data.success)}
      <h2>Total: $ {getTotal()}</h2>
      {
          isAuthenticated()?(
 <div>{showDropIn()}</div>
          ):(
    <Link to='/signin'>
    <button className='btn btn-primary'>Sign-in to continue</button>
    </Link>
          )
      }
    </div>
  )
}

export default Checkout
