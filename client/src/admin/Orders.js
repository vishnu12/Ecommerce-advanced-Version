import React,{useState,useEffect} from 'react'
import moment from 'moment'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin'


const Orders = () => {

    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState([])
    const {user,token}=isAuthenticated()

    const loadOrders=()=>{
      listOrders(user._id,token)
      .then(res=>{
          setOrders(res.data)
      })
      .catch(err=>console.log(err))
    }

    const loadStatusValues=()=>{
        getStatusValues(user._id,token)
        .then(res=>{
            setStatus(res.data)
        })
        .catch(err=>console.log(err))
      }

    useEffect(()=>{
      loadOrders()
      loadStatusValues()
    },[])


    const showOrdersLength=()=>{
        if(orders.length>0){
            return (
            <h1 className='text-danger display-2'>Total orders: {orders.length}</h1>
            )
        }else{
            return <h1 className='text-danger'>No ordes</h1>
        }
    }

    const showInput=(key,value)=>{
     return <div className='input-group mb-2 mr-sm-2'>
       <div className='input-group-prepend'>
       <div className='input-group-text'>{key}</div>
       </div>
       <input type='text' value={value} className='form-control' readOnly/>
       </div>
    }


    const handleChange=(e,orderId)=>{
        const data={
            orderId:orderId,
            status:e.target.value
        }
        updateOrderStatus(user._id,token,orderId,data)
        .then(res=>{
            loadOrders()
        })
        .catch(err=>console.log(err))
    }

    const showStatus=(order)=>{
       return <div className='form-group'>
      <h3 className='mark mb-4'>Status: {order.status}</h3>
       <select className='form-control' 
       onChange={(e)=>handleChange(e,order._id)}>
   <option>Update status</option>
   {
       status.map((item,k)=>{
       return <option value={item} key={k}>{item}</option>
       })
   }
       </select>
        
        </div>
    }

  return (
    <Layout title='Your orders'
    description={`Hi ${user.name}, You can manage the orders here`}
    className='container'>
     {showOrdersLength(orders)}
     {
         orders.map((order,k)=>{
             return(
                 <div className='mt-4' key={k} style={{borderBottom:'5px solid indigo'}}>
           <h2 className='mb-4'>
             <span className='bg-primary'>Order ID : {order._id}</span>
           </h2>
           {showStatus(order)}
          
           <ul className='list-group mb-2'>
             {/* <li className='list-group-item'>Status: {showStatus(order)}</li> */}
             <li className='list-group-item'>Transaction ID: {order.transaction_id}</li>
             <li className='list-group-item'>Amount: ${order.amount}</li>
             <li className='list-group-item'>Ordered By: {order.user.name}</li>
             <li className='list-group-item'>Ordered on: {moment(order.createdAt).fromNow()}</li>
             <li className='list-group-item'>Delivery Address: {order.address}</li>
           </ul>

           <h3 className='mt-4 mb-4 font-italic'>
               Total products in the order :{order.products[0].count}
           </h3>
           {
               order.products.map((product,I)=>{
                   return <div className='mb-4' key={I}
                   style={{padding:'20px',border:'1px solid indigo'}}>
                    {showInput('Product name',product.name)}
                    {showInput('Product price',product.price)}
                    {showInput('Product total',product.count)}
                    {showInput('Product id',product._id)}
                   </div>
               })
           }
                 </div>
             )
         })
     }
    </Layout>
  )
}

export default Orders
