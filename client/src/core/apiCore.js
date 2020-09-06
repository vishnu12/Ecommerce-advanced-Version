import axios from 'axios'
import queryString from 'query-string'

const { API } = require("../config");


export const getProducts=(sortBy)=>{
    return axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
}


export const getCategories=()=>{
    return axios.get(`${API}/categories`)
    
}

export const getFilteredProducts=(skip,limit,filters={})=>{
   const data={
       skip,limit,filters
   }
    return axios.post(`${API}/products/by/search`,data)
    

}

export const listProd=(params)=>{
    const query=queryString.stringify(params)
    return axios.get(`${API}/products/search?${query}`)
}


export const getSingleProduct=(productId)=>{
    
    return axios.get(`${API}/product/${productId}`)
}

export const relatedProducts=(productId)=>{
    return axios.get(`${API}/products/related/${productId}`)
}

export const getBraintreeClientToken=(userId,token)=>{
    
    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
     return axios.get(`${API}/braintree/getToken/${userId}`,config)
     
 
 }


 export const processPayment=(userId,token,paymentData)=>{
    
    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
     return axios.post(`${API}/braintree/payment/${userId}`,paymentData,config)
     
 
 }

 export const createOrder=(userId,token,orderData)=>{
    
    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
     return axios.post(`${API}/order/create/${userId}`,orderData,config)
     
 
 }


