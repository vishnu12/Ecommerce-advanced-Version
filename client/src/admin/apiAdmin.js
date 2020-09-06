import { API } from '../config'
import { isAuthenticated } from '../auth'
import axios from 'axios'

export const addCategory=(userId,token,category)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    return axios.post(`${API}/category/create/${userId}`,category,config)
    

}

export const createProduct=(userId,token,product)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    return axios.post(`${API}/product/create/${userId}`,product,config)
    

}

export const getCategories=()=>{
    return axios.get(`${API}/categories`)
    
}

export const listOrders=(userId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    return axios.get(`${API}/order/list/${userId}`,config)
    
}

export const getStatusValues=(userId,token)=>{

    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    return axios.get(`${API}/order/status/${userId}`,config)
    
}


export const updateOrderStatus=(userId,token,orderId,data)=>{

    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    return axios.put(`${API}/order/${orderId}/status/${userId}`,data,config)
    
}


//perform CRUD on products


export const getProducts=()=>{

    return axios.get(`${API}/products?limit=100`)
    //set limit=undefined also
    
}

export const deleteProduct=(prodId,userId,token)=>{

    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    return axios.delete(`${API}/product/${prodId}/${userId}`,config)
    
}

export const getSingleProduct=(prodId)=>{

    return axios.get(`${API}/product/${prodId}`)
    
}


export const updateProduct=(prodId,userId,token,product)=>{

    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    return axios.put(`${API}/product/${prodId}/${userId}`,product,config)
    
}

