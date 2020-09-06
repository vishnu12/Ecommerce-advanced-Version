
import React,{useState,useEffect} from 'react'
import moment from 'moment'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from './apiUser'

const UserDashboard = () => {

    const {user:{_id,name,email,role},token}=isAuthenticated()

    const [history, setHistory] = useState([])
   
    const init=(id,authToken)=>{
      getPurchaseHistory(id,authToken)
      .then(res=>setHistory(res.data))
      .catch(err=>console.log(err))
    }

    useEffect(()=>{
      init(_id,token)
    },[])

    console.log(history)

  return (
    <Layout title='UserDashboard' description={`Good Day ${name} !`}
    className='container'>
      <div className="row">
          <div className="col-3">
          <div className="card">
            <h4 className="card-header">User Links</h4>
        <ul className="list-group">
             <li className="list-group-item">
                 <Link className='nav-link' to='/cart'>My Cart</Link>
             </li>
             <li className="list-group-item">
                 <Link className='nav-link' to={`/profile/${_id}`}>Update Profile</Link>
             </li>
         </ul>
           
           </div>
          </div>
          <div className="col-9">
          <div className="card mb-5">
          <h3 className="card-header">User Information</h3>
         <ul className="list-group">
             <li className="list-group-item">{name}</li>
             <li className="list-group-item">{email}</li>
             <li className="list-group-item">{role===1?'Admin':'Registered User'}</li>
         </ul>
      </div>

      <div className="card mb-5">
          <h3 className="card-header">Purchases</h3>
          <ul className="list-group">
          <li className="list-group-item">
            {history.map((h,k)=>{
              return <div>
                <hr />
                {h.products.map((p,i)=>{

             return <div key={k}>
             <h6>Product name: {p.name}</h6>
             <h6>Price : ${p.price}</h6>
            <h6>Purchased date : {moment(p.createdAt).fromNow()}</h6>

                </div>
               
              })}
              </div>
            })}
          </li>
          </ul>
      </div>
          </div>
      </div>
    </Layout>
  )
}

export default UserDashboard
