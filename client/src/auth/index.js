import axios from 'axios'
import { API } from '../config'

export const authenticate=(data,next)=>{
   if(typeof window !==undefined){
       localStorage.setItem('jwt',JSON.stringify(data))
       next()
   }
}

export const signOut=async (next)=>{
   if(typeof window !==undefined){
    localStorage.removeItem('jwt')
    next()
    
    try {
        const data=await axios.get(`${API}/signout`)
        return data
    } catch (error) {
        console.log(error)
    }
   }
}

export const isAuthenticated=()=>{
    if(typeof window ==undefined){
        return false
    }

    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}