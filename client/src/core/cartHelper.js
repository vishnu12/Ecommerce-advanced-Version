
export const addItem=(item,next)=>{
    let cart=[]
    if(typeof window !==undefined){
        if(localStorage.getItem('cart')){
            cart=JSON.parse(localStorage.getItem('cart'))
        }

        cart.push({
            ...item,
            count:1
        })

        //to remove duplicates create a new set
        cart=Array.from(new Set(cart.map(p=>p._id)))
        .map(id=>{
            return cart.find(p=>p._id===id)
        })

        localStorage.setItem('cart',JSON.stringify(cart))
        next()
    }

}

export const itemTotal=()=>{
    if(typeof window !==undefined){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0
}

export const getCart=()=>{
    if(localStorage.getItem('cart')){
        return JSON.parse(localStorage.getItem('cart'))
    }
    return []
}

export const updateItem=(prodId,count)=>{
    let cart=[]
    if(typeof window !==undefined){
        if(localStorage.getItem('cart')){
            cart= JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((prod,index)=>{
          if(prod._id===prodId){
              cart[index].count=count
          }
        })

        localStorage.setItem('cart',JSON.stringify(cart))
    }
}

export const removeItem=(prodId)=>{
    let cart=[]
    if(typeof window !==undefined){
        if(localStorage.getItem('cart')){
            cart= JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((prod,index)=>{
          if(prod._id===prodId){
              cart.splice(index,1)
          }
        })

        localStorage.setItem('cart',JSON.stringify(cart))
    }
    return cart
}

export const emptyCart=(next)=>{
   if(typeof window !==undefined){
       localStorage.removeItem('cart')
       next()
   }
}