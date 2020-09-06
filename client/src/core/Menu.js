import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import { signOut, isAuthenticated } from '../auth'
import { itemTotal } from './cartHelper'

const isActive=(history,path)=>{
    if(history.location.pathname===path){
        return {color:'#e33917'}
    }else{
        return {color:'#ffffff'}
    }
}

const Menu = ({history}) => {
    const {user}=isAuthenticated()
  return (
    <nav >
      <ul className="nav nav-tabs bg-primary">

      <li className="nav-item">
              <Link className="nav-link" to='/' style={isActive(history,'/')}>
               Home
              </Link>
          </li> 


          <li className="nav-item">
              <Link className="nav-link" to='/shop' style={isActive(history,'/shop')}>
               Shop
              </Link>
          </li>

          <li className="nav-item">
              <Link className="nav-link" to='/cart' style={isActive(history,'/cart')}>
              Cart <sup><small className='cart-badge'>{itemTotal()}</small></sup>
              </Link>
          </li>     
          
          {
              isAuthenticated() && isAuthenticated().user.role===0 && (
                <li className="nav-item">
                <Link className="nav-link" to='/user/dashboard' style={isActive(history,'/user/dashboard')}>
                 Dashboard
                </Link>
            </li>  
              )
          }   

           {
              isAuthenticated() && isAuthenticated().user.role===1 && (
                <li className="nav-item">
                <Link className="nav-link" to='/admin/dashboard' style={isActive(history,'/admin/dashboard')}>
                 Dashboard
                </Link>
            </li>  
              )
          }           

{
    !isAuthenticated() &&(
        <>
        

          <li className="nav-item">
              <Link className="nav-link " to='/signin' style={isActive(history,'/signin')}>
               Sign-In
              </Link>
          </li>

          <li className="nav-item">
              <Link className="nav-link " to='/signup' style={isActive(history,'/signup')}>
               Sign-Up
              </Link>
          </li>
          </>
    )

}
          
{
    isAuthenticated() && (
    
               <li className="nav-item">
              <span className="nav-link " to='/signin' style={{cursor:'pointer',color:'#ffffff'}}
              onClick={()=>signOut(()=>{
                  history.push('/signin')
              })}>
               Sign-Out
              </span>
             </li>
        
    )
}
       
      </ul>
    </nav>
  )
}

export default withRouter(Menu)
