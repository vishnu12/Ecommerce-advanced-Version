
import axios from 'axios'
import { API } from "../config"



export const getUser=(userId,token)=>{

    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

 return axios.get(`${API}/user/${userId}`,config)

}

export const updateUser=(userId,token,user)=>{

    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
   
return axios.put(`${API}/user/${userId}`,user,config)

}


//update local storage

export const updateLocalstorageUser=(user,next)=>{

    if(typeof window !==undefined){
        if(localStorage.getItem('jwt')){
            let auth=JSON.parse(localStorage.getItem('jwt'))
            auth.user=user
            localStorage.setItem('jwt',JSON.stringify(auth))
            next()
        }
    }
}


export const getPurchaseHistory=(userId,token)=>{

    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

 return axios.get(`${API}/orders/by/user/${userId}`,config)

}